import SignInComp from '@/components/SignInComp';
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignInComp>
      <SignUp />
    </SignInComp>
  );
}
