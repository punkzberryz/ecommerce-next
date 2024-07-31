import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import { github, lucia } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const storedState = cookies().get("github_oauth_state")?.value ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.json(null, {
      status: 400,
    });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();

    // Replace this with your own DB client.
    const existingUser = await db.user.findFirst({
      where: {
        githubId: githubUser.id,
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
        githubId: githubUser.id,
        displayName: githubUser.login,
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
interface GitHubUser {
  id: number;
  login: string;
}
