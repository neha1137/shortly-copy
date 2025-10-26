import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

function NotFound({ shorturl }) {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>404 - Short URL Not Found</h1>
            <p>The short URL <strong>{shorturl}</strong> does not exist.</p>
            <a href={process.env.NEXT_PUBLIC_HOST || "/"}>Go Home</a>
        </div>
    );
}

export default async function Page({ params }) {
    const { shorturl } = await Promise.resolve(params);

    if (!shorturl) {
        redirect(process.env.NEXT_PUBLIC_HOST || "/");
    }

    // Normalize shorturl (remove slashes and trim)
    const cleanShorturl = shorturl.replace(/\//g, "").trim();

    let doc;
    try {
    // ✅ fixed shadowing bug — don't redeclare doc
    doc = await prisma.url.findUnique({
      where: { shorturl: cleanShorturl },
    });
    } catch (error) {
        console.error("❌ MongoDB error:", error);
        redirect(process.env.NEXT_PUBLIC_HOST || "/");
    }

    if (doc?.url) {
        // Ensure full URL with protocol
        let target = doc.url.trim();
        if (!/^https?:\/\//i.test(target)) {
            target = "https://" + target;
        }
        redirect(target);
    } else {
        return <NotFound shorturl={cleanShorturl} />;
    }
}
