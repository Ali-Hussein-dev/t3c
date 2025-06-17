"use client";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { LuGithub } from "react-icons/lu";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./auth/auth-provider";
import { urls } from "../constants/urls";
import { toast } from "sonner";
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { session, signInWithGithub } = useAuth();

  const router = useRouter();
  // if (session?.user) {
  //   router.push(urls.chat);
  // }
  React.useEffect(() => {
    if (session?.user) {
      router.push(urls.chat);
    }
  }, [session, router]);

  const handleGithubLogin = async () => {
    try {
      const { error } = await signInWithGithub();
      if (error) throw error;
    } catch (error: any) {
      console.error("Github sign in error:", error);
      toast.error(
        <div>
          <div className="font-bold">Github sign in failed</div>
          <p>{error.message || "Failed to sign in with Github."}</p>
        </div>
      );
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="py-10 w-full border-dashed">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-extrabold">
            Login To T3C
          </CardTitle>
          <CardDescription>
            Login with your Github account to start using T3C
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleGithubLogin}
                >
                  <LuGithub />
                  Login with GitHub
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
