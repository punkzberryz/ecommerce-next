import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { SignUpForm } from "./components/form/signup-form";
import { Metadata } from "next";
import { FetchUserOnAuth } from "../components/fetch-user";

const SignUpPage = () => {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-center">
        <span className="text-xl capitalize">Papai</span>
        <span className="text-2xl font-bold uppercase text-primary">
          clinic
        </span>
      </h1>
      <Card className="md:w-[500px]">
        <CardHeader className="text-center">
          <CardTitle>สมัครสมาชิก</CardTitle>
          <CardDescription>
            สมัครสมาชิกเพื่อใช้งานระบบจัดการคลินิก
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <FetchUserOnAuth>
            <SignUpForm />
            <Link
              className="text-center text-indigo-600 hover:text-indigo-400 hover:underline"
              href="/auth/signin"
            >
              ล็อคอินเข้าสู่ระบบ
            </Link>
          </FetchUserOnAuth>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;

export const metadata: Metadata = {
  title: "สมัครสมาชิก",
  description: "สมัครสมาชิกเพื่อใช้งานระบบจัดการคลินิก",
};
