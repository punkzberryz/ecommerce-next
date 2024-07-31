import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { google, lucia } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("google_oauth_state")?.value ?? null;
  const storeCodeVerifier =
    cookies().get("google_oauth_code_verifier")?.value ?? null;
  if (
    !code ||
    !state ||
    !storedState ||
    state !== storedState ||
    !storeCodeVerifier
  ) {
    return NextResponse.json(null, {
      status: 400,
    });
  }

  try {
    const tokens = await google.validateAuthorizationCode(
      code,
      storeCodeVerifier,
    );
    const googleUserResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );
    const googleUser: GoogleUser = await googleUserResponse.json();

    // Replace this with your own DB client.
    const existingUser = await db.user.findFirst({
      where: {
        googleId: googleUser.sub,
      },
    });

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
      return NextResponse.json(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    }

    const userId = generateIdFromEntropySize(10); // 16 characters long

    // Replace this with your own DB client.
    await db.user.create({
      data: {
        id: userId,
        googleId: googleUser.sub,
        displayName: googleUser.name,
      },
    });

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return NextResponse.json(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (err) {
    // the specific error message depends on the provider
    if (err instanceof OAuth2RequestError) {
      // invalid code
      return NextResponse.json(null, {
        status: 400,
      });
    }
    return NextResponse.json(null, {
      status: 500,
    });
  }
}
interface GoogleUser {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}
