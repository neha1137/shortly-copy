import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";

// --- Helper to extract visitor details ---
async function getVisitorInfo() {
  const h =await headers();
  const userAgent = h.get("user-agent") || "Unknown";

  // ✅ Detect device type
  const device = /mobile/i.test(userAgent)
    ? "Mobile"
    : /tablet/i.test(userAgent)
    ? "Tablet"
    : "Desktop";

  // ✅ Detect OS
  let os = "Unknown";
  if (/windows/i.test(userAgent)) os = "Windows";
  else if (/mac/i.test(userAgent)) os = "MacOS";
  else if (/linux/i.test(userAgent)) os = "Linux";
  else if (/android/i.test(userAgent)) os = "Android";
  else if (/ios|iphone|ipad/i.test(userAgent)) os = "iOS";

  // ✅ Detect browser
  let browser = "Unknown";
  if (/chrome|crios/i.test(userAgent)) browser = "Chrome";
  else if (/firefox|fxios/i.test(userAgent)) browser = "Firefox";
  else if (/safari/i.test(userAgent)) browser = "Safari";
  else if (/edg/i.test(userAgent)) browser = "Edge";
  else if (/opr\//i.test(userAgent)) browser = "Opera";

  // ✅ Get IP + Referrer
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "Unknown";

  const referrer = h.get("referer") || "Direct";

  // ✅ Get location via IP
  let location = "Unknown";
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      if (!data.error) {
        location = `${data.city || "Unknown"}, ${data.country_name || "Unknown"}`;
      }
    }
  } catch (err) {
    console.warn("⚠️ Location lookup failed:", err.message);
  }

  return { device, os, browser, location, referrer };
}

// --- 404 Component ---
function NotFound({ shorturl }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Short URL Not Found</h1>
      <p>
        The short URL <strong>{shorturl}</strong> does not exist.
      </p>
      <a href={process.env.NEXT_PUBLIC_HOST || "/"}>Go Home</a>
    </div>
  );
}

export default async function Page({ params }) {
  const { shorturl } = await params;
  const cleanShorturl = shorturl?.replace(/\//g, "").trim();
  if (!cleanShorturl) redirect("/");

  // ✅ Find URL
  let doc;
  try {
    doc = await prisma.url.findUnique({ where: { shorturl: cleanShorturl } });
  } catch (error) {
    console.error("❌ DB error:", error);
    redirect("/");
  }

  if (!doc) {
    console.warn(`⚠️ No URL found for ${cleanShorturl}`);
    return <NotFound shorturl={cleanShorturl} />;
  }

  // ✅ Collect visitor info
  const visitor = await getVisitorInfo();

  // ✅ Fire & forget logging (non-blocking)
  fetch(`${process.env.NEXT_PUBLIC_HOST}/api/track-visit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      urlId: doc.id,
      device: visitor.device,
      os: visitor.os,
      browser: visitor.browser,
      location: visitor.location,
      referrer: visitor.referrer,
    }),
  }).catch((err) => console.error("⚠️ Visit tracking failed:", err));

  // ✅ Redirect to actual link
  let target = doc.url.trim();
  if (!/^https?:\/\//i.test(target)) target = "https://" + target;
  redirect(target);
}
