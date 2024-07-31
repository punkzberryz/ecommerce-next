import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { line, lucia } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("line_oauth_state")?.value ?? null;
  const storeCodeVerifier =
    cookies().get("line_oauth_code_verifier")?.value ?? null;
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
    const tokens = await line.validateAuthorizationCode(
      code,
      storeCodeVerifier,
    );

    const lineUserResponse = await fetch(
      "https://api.line.me/oauth2/v2.1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    const lineUser: LineUser = await lineUserResponse.json();

    // Replace this with your own DB client.
    const existingUser = await db.user.findFirst({
      where: {
        lineLoginId: lineUser.sub,
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
        lineLoginId: lineUser.sub,
        displayName: lineUser.name,
        email: lineUser.email,
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
    console.log({ err });
    return NextResponse.json(null, {
      status: 500,
    });
  }
}
interface LineUser {
  sub: string;
  name: string;
  picture: string;
  email?: string;
}
