import { useEffect, useState } from "react"
import HamburgerIcon from "@/assets/icons/hamburgerIcon.svg"
import { NavItem, DropdownItem } from './dropdown.tsx'
import { authClient } from '@/lib/auth-client'
import type { UserSession } from '@/lib/auth-client'
import userIcon from "@/assets/icons/userIcon.svg"
import notificationIcon from "@/assets/icons/notificationIcon.svg"
import plusIcon from "@/assets/icons/plusIcon.svg"
import YouTubeTextIcon from "@/assets/icons/youTubeTextIcon.svg"

export default function Navbar() {
  const [session, setSession] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)
  const [user, setUser] = useState<UserSession | null>(null)

  const handleGoogleSignIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      })
    } catch (err) {
      console.error("Google sign-in error:", err)
    }
  }


  useEffect(() => {
    authClient.getSession()
      .then(res => setSession(res.data))
      .catch(err => setError(err))
  }, [])

  return (
    <div className="fixed">
      <div className="border-b flex w-screen items-center justify-between gap-5 py-2 px-2">
        <div className="flex items-center gap-4">
          <button className="w-7 rounded-full hover:bg-stone-100">
            <img src={HamburgerIcon} />
          </button>
          <a href="/" className="flex items-center w-25 h-10">
            <img src={YouTubeTextIcon} />
          </a>
        </div>
        <form className="flex gap-1">
          <input type="search" className="outline rounded-full px-4 py-2" />
          <a type="submit" className="outline rounded-full p-2 hover:bg-slate-100">🔍</a>
        </form>
        <div>
          {session ? (
            <div className="flex gap-2">
              <NavItem icon={plusIcon} title="Create">
                <DropdownItem title="Upload video" link="youtubestudio" />
                <DropdownItem title="Go live" />
              </NavItem>
              <NavItem icon={notificationIcon}>
                <DropdownItem title="Notifications" />
              </NavItem>
              <NavItem icon={user?.image || userIcon}>
                <DropdownItem title="Account" />
                <DropdownItem title="Switch Account" />
                <DropdownItem title="Sign Out" />
                <hr className='border-stone-300' />
                <DropdownItem title="Youtube Studio" />
                <DropdownItem title="Purchases and memberships" />
                <hr className='border-stone-300' />
                <DropdownItem title="Your data in YouTube" />
                <DropdownItem title="Appearance:" />
                <DropdownItem title="Display language:" />
                <DropdownItem title="Restricted Mode:" />
                <DropdownItem title="Location:" />
                <DropdownItem title="Keyboard shortcuts:" />
                <hr className='border-stone-300' />
                <DropdownItem title="Settings" />
                <hr className='border-stone-300' />
                <DropdownItem title="Help" />
                <DropdownItem title="Send Feedback" />
              </NavItem>
            </div>
          ) : (
            <button onClick={handleGoogleSignIn} className="outline rounded-full text-xs p-2 hover:bg-blue-100 text-blue-500">Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}

