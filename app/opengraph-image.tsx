import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Subodh Rijal | MERN Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBytes = await readFile(
    join(process.cwd(), "public/images/profile/subodh_white.png"),
  );
  const logoSrc = `data:image/png;base64,${Buffer.from(logoBytes).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#ffffff",
        }}
      >
        <img src={logoSrc} width={128} height={128} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            marginTop: 28,
            letterSpacing: "-0.04em",
          }}
        >
          Subodh Rijal
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            color: "#d2ff00",
            marginTop: 12,
          }}
        >
          MERN Developer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#9ca3af",
            marginTop: 20,
            maxWidth: 780,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Architecting robust, scalable, and user-centric web applications
        </div>
      </div>
    ),
    { ...size },
  );
}
