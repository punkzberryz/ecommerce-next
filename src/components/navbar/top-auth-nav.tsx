"use client";

import { LayoutDashboard, LogInIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { useAuthStore } from "@/hooks/use-auth-store";
import { fetchMeAction } from "./fetch-me-action";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucia";
import { SignOutButton } from "./signout-button";

export const TopAuthNav = () => {
  const { setUser, user } = useAuthStore();
  const { isLoading } = useQuery({
    queryKey: ["fetchMeAction"],
    queryFn: async () => {
      const { user } = await fetchMeAction();
      setUser(user);
      return null;
    },
    refetchInterval: 1000 * 60 * 60, // 1 hour
  });
  if (isLoading) return <div></div>;
  if (!user) return <SignInAndSignUp />;
  return <UserUi user={user} />;
};

const UserUi = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center space-x-2">
      {/* TODO: add dropdown action */}
      <div className="flex items-center space-x-2">
        <UserIcon className="h-4 w-4 rounded-full border border-white" />
        <span>ยินดีต้อนรับ</span>
        <span>{user.displayName}</span>
      </div>
      {user.role === "ADMIN" && (
        <>
          <Separator orientation="vertical" className="h-4 bg-gray-300" />
          <Link href="/admin" className="flex items-center space-x-1">
            <LayoutDashboard className="h-4 w-4" />
            <span>Admin Dashboard</span>
          </Link>
        </>
      )}
      <Separator orientation="vertical" className="h-4 bg-gray-300" />
      <SignOutButton />
    </div>
  );
};

const SignInAndSignUp = () => {
  return (
    <div className="flex items-center space-x-2">
      <Link href="/auth/signin" className="flex items-center space-x-1">
        <LogInIcon className="h-4 w-4" />
        <span>เข้าสู่ระบบ</span>
      </Link>
      <Separator orientation="vertical" className="h-4" />
      <Link href="/auth/signup" className="flex items-center space-x-1">
        <UserIcon className="h-4 w-4" />
        <span>สมัครสมาชิก</span>
      </Link>
    </div>
  );
};
