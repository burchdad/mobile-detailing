import test from 'node:test';
import assert from 'node:assert/strict';
import {handleWorker} from '../lib/crm/worker-handler.ts';
const token='synthetic_worker_secret_'.padEnd(40,'x');
const env={AS_CRM_WORKER_ENABLED:'true',AS_CRM_WORKER_TOKEN:token,AS_CRM_ENABLED:'true',AS_CRM_DATABASE_URL:'https://abcdefghijklmnop.supabase.co',AS_CRM_SERVICE_KEY:'synthetic_db_key_'.padEnd(40,'x'),AS_CRM_SITE_ORIGIN:'https://example.com',AS_CRM_EMAIL_ENABLED:'true',AS_CRM_EMAIL_API_KEY:'re_synthetic_not_a_real_key',AS_CRM_EMAIL_FROM:'alerts@example.com',AS_CRM_EMAIL_TO:'owner@example.com'};
const req=(options={})=>new Request('https://example.com/api/internal/crm-worker',{method:'POST',headers:{authorization:`Bearer ${token}`},...options});
test('worker disabled, misconfigured, credential reuse and unauthenticated requests never invoke queue',async()=>{
 const never=async()=>{throw new Error('Unexpected run');};
 for(const patch of [{AS_CRM_WORKER_ENABLED:'false'},{AS_CRM_WORKER_TOKEN:''},{AS_CRM_WORKER_TOKEN:env.AS_CRM_SERVICE_KEY},{AS_CRM_EMAIL_ENABLED:'false'},{AS_INTAKE_WEBHOOK_TOKEN:token}]) assert.equal((await handleWorker(req(),{...env,...patch},never)).status,503);
 assert.equal((await handleWorker(req({headers:{}}),env,never)).status,401);
 assert.equal((await handleWorker(req({headers:{authorization:'Bearer bad'}}),env,never)).status,401);
 assert.equal((await handleWorker(req({method:'GET'}),env,never)).status,405);
});
test('authenticated worker accepts only empty POST, reports counts without caching or error details',async()=>{
 let count=0;const run=async()=>{count++;return {enabled:true,sent:1,retried:0,uncertain:0};};
 assert.equal((await handleWorker(req({body:'{}'}),env,run)).status,400);
 assert.equal((await handleWorker(new Request('https://example.com/api/internal/crm-worker?to=x',{method:'POST',headers:{authorization:`Bearer ${token}`}}),env,run)).status,400);
 const result=await handleWorker(req(),env,run);assert.equal(result.status,200);assert.match(result.headers.get('cache-control'),/no-store/);assert.equal(count,1);
 const failed=await handleWorker(req(),env,async()=>{throw new Error('secret');});assert.equal(failed.status,503);assert.doesNotMatch(await failed.text(),/secret/);
});
test('health requires a live staff session and exposes only RPC summary',async()=>{
 const {handleHealth}=await import('../lib/crm/health-handler.ts');
 let calls=[];
 const db={call:async(name,args)=>{calls.push(name);return name==='as_session'?{tenant:'as-detailing',active:true,role:'staff',expiresAt:new Date(Date.now()+60000).toISOString()}:{pending:2,failed:1};}};
 assert.equal((await handleHealth(new Request('https://example.com'),env,db)).status,401);assert.equal(calls.length,0);
 const res=await handleHealth(new Request('https://example.com',{headers:{cookie:`__Host-as_staff=${'a'.repeat(64)}`}}),env,db);
 assert.equal(res.status,200);assert.deepEqual(await res.json(),{pending:2,failed:1});assert.deepEqual(calls,['as_session','as_outbox_health']);
 assert.match(res.headers.get('cache-control'),/no-store/);
});
