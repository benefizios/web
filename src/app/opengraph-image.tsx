import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Benefizios — Tu decisión inteligente";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(
    join(process.cwd(), "public/logo-benefizios.png"),
  );
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

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
          background:
            "linear-gradient(135deg, #ffcb03 0%, #ffdd55 48%, #fff3cf 100%)",
        }}
      >
        {/* Logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} alt="Benefizios" width={660} height={135} />

        {/* Subrayado de marca */}
        <div
          style={{
            marginTop: 40,
            width: 120,
            height: 10,
            borderRadius: 999,
            background: "#232323",
          }}
        />

        {/* Eslogan */}
        <div
          style={{
            marginTop: 36,
            fontSize: 40,
            fontWeight: 600,
            color: "#232323",
          }}
        >
          Descuentos que valen tu membresía
        </div>
      </div>
    ),
    { ...size },
  );
}
