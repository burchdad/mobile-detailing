export type CrmConfig = { databaseUrl: string; serviceKey: string; siteOrigin: string; intakeToken: string | null };
export type Environment = Record<string, string | undefined>;
export function readCrmConfig(env: Environment): CrmConfig | null {
  if (env.AS_CRM_ENABLED !== "true") return null;
  try {
    const db = new URL(env.AS_CRM_DATABASE_URL ?? "");
    const site = new URL(env.AS_CRM_SITE_ORIGIN ?? "");
    if (db.protocol !== "https:" || !/^[a-z0-9]{12,40}\.supabase\.co$/.test(db.hostname) ||
      db.pathname !== "/" || db.search || db.hash || db.username || db.password || db.port ||
      site.protocol !== "https:" || site.pathname !== "/" || site.search || site.hash || site.username || site.password ||
      !env.AS_CRM_SERVICE_KEY || env.AS_CRM_SERVICE_KEY.length < 32) return null;
    return { databaseUrl: db.origin, serviceKey: env.AS_CRM_SERVICE_KEY, siteOrigin: site.origin,
      intakeToken: (env.AS_CRM_INTAKE_TOKEN?.length ?? 0) >= 32 ? env.AS_CRM_INTAKE_TOKEN! : null };
  } catch { return null; }
}
