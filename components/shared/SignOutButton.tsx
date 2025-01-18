
import { signOutAction } from "@/lib/actions/user.action";

async function SignOutButton() {

  return (
    <form className="mt-4" action={signOutAction}>
       <button className={`w-full rounded-lg text-light-900 flex items-center justify-center gap-4 p-4 bg-foreground`}>
      <span>Sign out</span>
    </button>
    </form>
  );
}

export default SignOutButton;
