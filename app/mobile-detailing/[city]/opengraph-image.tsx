import { ImageResponse } from "next/og";
import { cityLandingData } from "@/lib/landingData";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: { city: string };
};

export default function Image({ params }: Props) {
  const landing = cityLandingData.find((city) => city.slug === params.city) ?? cityLandingData[0];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at 18% 20%, rgba(255,0,127,0.24), transparent 36%), radial-gradient(circle at 84% 78%, rgba(0,207,255,0.22), transparent 35%), linear-gradient(160deg, #040409 0%, #080b14 100%)",
          color: "white",
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg,#ff007f,#00cfff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 24,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 20, opacity: 0.9, letterSpacing: 1.2 }}>A&S Mobile Detail</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 20, letterSpacing: 2.2, textTransform: "uppercase", opacity: 0.7 }}>City Landing</div>
          <div style={{ fontSize: 68, lineHeight: 1.03, fontWeight: 900, maxWidth: 980 }}>
            Mobile Detailing in {landing.city}, {landing.region}
          </div>
          <div style={{ fontSize: 24, opacity: 0.84, maxWidth: 980 }}>{landing.description}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 18, opacity: 0.8 }}>Ceramic Coating • Paint Correction • Full Detail</div>
          <div style={{ fontSize: 18, color: "#8aa4ad" }}>asdetailing.org</div>
        </div>
      </div>
    ),
    size,
  );
}
