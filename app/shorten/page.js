'use client';

import Link from "next/link";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";

export default function Shorten() {
    const [url, setUrl] = useState("");
    const [shorturl, setShorturl] = useState("");
    const [generated, setGenerated] = useState("");
    const [error, setError] = useState("");

    const { isSignedIn } = useUser();

    const generate = async () => {
        setError("");
        setGenerated("");

        // ✅ Check if user is signed in
        if (!isSignedIn) {
            toast.error("⚠️ Please log in before shortening URLs");
            return;
        }

        const finalShort = shorturl.trim() || nanoid(6);

        try {
            const response = await fetch("/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, shorturl: finalShort }),
                credentials: "include",
            });

            const result = await response.json();

            if (result.success) {
                setGenerated(`${window.location.origin}/${finalShort}`);
                setError("");
            } else {
                setError(result.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="mx-auto max-w-lg bg-purple-100 my-16 p-8 rounded-lg flex flex-col gap-4">
            <Toaster position="top-center" reverseOrder={false} />

            <h1 className="font-bold text-2xl">Generate your short URLs</h1>

            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    value={url}
                    className="px-4 py-2 focus:outline-purple-600 rounded-md"
                    placeholder="Enter your URL"
                    onChange={(e) => setUrl(e.target.value)}
                />

                <input
                    type="text"
                    value={shorturl}
                    className="px-4 py-2 focus:outline-purple-600 rounded-md"
                    placeholder="Enter your preferred short URL text (optional)"
                    onChange={(e) => setShorturl(e.target.value)}
                />

                <button
                    onClick={generate}
                    className="bg-purple-500 rounded-lg shadow-lg p-3 py-1 my-3 font-bold text-white"
                >
                    Generate
                </button>

                {error && <span className="text-red-600 font-semibold">{error}</span>}
            </div>

            {generated && (
                <>
                    <span className="font-bold text-lg">Your Link </span>
                    <code>
                        <Link target="_blank" href={generated}>
                            {generated}
                        </Link>
                    </code>
                </>
            )}
        </div>
    );
}
