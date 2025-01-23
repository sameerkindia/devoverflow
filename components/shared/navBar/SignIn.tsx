import { auth } from '@/auth'
import Link from 'next/link'
import React from 'react'

const SignIn = async () => {
  const session = await auth()
  return (
    <>
    { session?.user?.image ? (<Link
      href="/"
      className="hover:text-accent-400 transition-colors flex items-center gap-4"
    >
      <img className="h-8 rounded-full" src={session?.user?.image} alt={"image"} referrerPolicy="no-referrer" />
    </Link>) : null }
    </>
  )
}

export default SignIn