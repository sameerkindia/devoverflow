import { auth } from '@/auth';
import Profile from '@/components/forms/Profile';
import { getUserById } from '@/lib/actions/user.action';
import { ParamsProps } from '@/types';
// import { auth } from '@clerk/nextjs'

const Page = async ({ params }: ParamsProps) => {
  const session = await auth();

  // @ts-ignore
  const userId = session?.user.id

  if(!userId) return null;

  const mongoUser = await getUserById({ userId })

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      
      <div className="mt-9">
        <Profile 
          userId={userId}
          user={JSON.stringify(mongoUser)}
        />
      </div>
    </>
  )
}

export default Page