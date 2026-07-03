import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0f172a 0%, #312e81 100%)",
          color: "#ffffff",
          fontFamily: "monospace",
        }}
      >
        <div style={{ fontSize: 28, color: "#818cf8", display: "flex" }}>
          ~/bagas
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 64,
            fontWeight: 700,
            display: "flex",
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 32,
            color: "#c7d2fe",
            display: "flex",
          }}
        >
          {siteConfig.role}
        </div>
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "#a5b4fc",
            display: "flex",
          }}
        >
          Full-stack systems · REST API · Machine Learning · Web & Mobile
        </div>
      </div>
    ),
    size,
  );
}
