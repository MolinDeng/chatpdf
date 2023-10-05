import SignInComp from '@/components/SignInComp';
import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <SignInComp>
      <SignIn />
    </SignInComp>
  );
}
