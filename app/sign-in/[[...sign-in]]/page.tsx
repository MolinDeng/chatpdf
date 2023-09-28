import SignInComp from '@/components/sign-in-comp';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignInComp>
      <SignIn />
    </SignInComp>
  );
}
