import SignInButton from "@/components/shared/SignInButton";

export const metadata = {
  title: 'Login'
}

export default function Page() {
  return (
    <div className="flex flex-col gap-10 mt-10 items-center">
      <SignInButton />
    </div>
  );
}