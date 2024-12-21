import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  const onRedirectToSignIn = () => {
    router.push("/sign-in");
  };

  const onRedirectToSignUp = () => {
    router.push("/sign-up");
  };

  return {
    isLoaded,
    isSignedIn,
    user,
    onRedirectToSignIn,
    onRedirectToSignUp,
  };
};
