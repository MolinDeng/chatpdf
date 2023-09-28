import SignInComp from '@/components/sign-in-comp';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignInComp>
      <SignUp />
    </SignInComp>
  );
}
