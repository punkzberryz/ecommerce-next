import { GithubIcon, GoogleIcon, LineIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export const GithubSignInButton = () => {
  return (
    <Button asChild>
      <a href="/auth/signin/github">
        <GithubIcon />
        <span className="w-40 pl-2">เข้าสู่ระบบด้วย Github</span>
      </a>
    </Button>
  );
};
export const GoogleSignInButton = () => {
  return (
    <Button asChild>
      <a href="/auth/signin/google">
        <GoogleIcon />
        <span className="w-40 pl-2">เข้าสู่ระบบด้วย Google</span>
      </a>
    </Button>
  );
};
export const LineSignInButton = () => {
  return (
    <Button asChild>
      <a href="/auth/signin/line">
        <LineIcon />
        <span className="w-40 pl-2">เข้าสู่ระบบด้วย Line</span>
      </a>
    </Button>
  );
};
