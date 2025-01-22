import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        throw new Error(
            "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local",
        );
    }

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET);

    // Get headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error: Missing Svix headers", {
            status: 400,
        });
    }

    // Get body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    let evt: WebhookEvent;

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error: Could not verify webhook:", err);
        return new Response("Error: Verification error", {
            status: 400,
        });
    }

    // Handle user.created event
    if (evt.type === "user.created") {
        try {
            const {
                id,
                email_addresses,
                first_name,
                last_name,
                username,
                phone_numbers,
            } = evt.data;

            // Prepare user data according to your schema
            const userData = {
                user: username || id,
                email: email_addresses[0]?.email_address,
                name: first_name || "",
                lastName: last_name || "",
                phone: phone_numbers?.[0]?.phone_number || "",
                role: "USER_ROLE",
                status: true,
                address: "Empty",
            };

            // Log user data
            console.log("User data:", userData);

            // Send to your backend
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                },
            );

            // Log response status
            console.log("Backend response status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Backend response error:", errorText);
                throw new Error("Failed to create user in database");
            }

            return new Response("User created successfully", { status: 200 });
        } catch (error) {
            console.error("Error creating user:", error);
            return new Response("Error creating user", { status: 500 });
        }
    }

    return new Response("Webhook received", { status: 200 });
}
