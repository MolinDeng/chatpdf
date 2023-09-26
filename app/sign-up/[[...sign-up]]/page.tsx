import BrandSidebar from '@/components/brand-sidebar'; // TODO
import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200 via-red-200 to-yellow-100">
      {/* <BrandSidebar /> */}
      <div>
        <SignUp />
      </div>
    </div>
  );
}
