import { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignInForm } from "./components/form/signin-form";
import { FetchUserOnAuth } from "../components/fetch-user";
import {
  GithubSignInButton,
  GoogleSignInButton,
  LineSignInButton,
} from "../components/oauth-buttons";
import { Separator } from "@/components/ui/separator";

const SignInPage = () => {
  return (
    <Card className="w-[80%] px-5 sm:px-10 md:w-[500px]">
      <CardHeader className="text-center">
        <CardTitle>เข้าสู่ระบบ</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4 pt-10">
        <FetchUserOnAuth>
          {/* Oauth */}
          <div className="flex w-full flex-col gap-4">
            <GithubSignInButton />
            <GoogleSignInButton />
            <LineSignInButton />
          </div>
          <div className="flex w-full items-center space-x-4">
            <Separator className="flex-1 bg-foreground/40" />
            <p>หรือ</p>
            <Separator className="flex-1 bg-foreground/40" />
          </div>
          <SignInForm />
          <Link
            className="text-center text-indigo-600 hover:text-indigo-400 hover:underline"
            href="/auth/signup"
          >
            สมัครสมาชิก
          </Link>
        </FetchUserOnAuth>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
export const metadata: Metadata = {
  title: "ล็อคอินเข้าสู่ระบบ",
  description: "ล็อคอินพื่อใช้งานระบบ",
};
