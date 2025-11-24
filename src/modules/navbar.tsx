import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import { NavItem, DropdownItem, DropdownMenu } from './dropdown.tsx'
import { authClient } from '@/lib/auth-client'
import type { UserSession } from '@/lib/auth-client'
import userIcon from "@/assets/icons/userIcon.svg"
import notificationIcon from "@/assets/icons/notificationIcon.svg"
import plusIcon from "@/assets/icons/plusIcon.svg"
import UploadVideo from "@/modules/uploadVideo.tsx"
import UploadVideoModal from "@/modules/uploadVideo.tsx"


export default function Navbar() {

  const [showUpload, setShowUpload] = useState(false);
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
      <div className="flex w-screen items-center justify-between gap-5 py-2 px-2">
        <div className="flex items-center gap-4">
          <button className="items-center flex flex-col rounded-full gap-1 p-4 hover:bg-stone-100">
            <svg className=" w-6 h-6"><path d="M20 5H4a1 1 0 000 2h16a1 1 0 100-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Z"></path></svg>
          </button>
          <a href="#" className="logo">Youtube</a>
        </div>
        <form className="flex gap-1">
          <input type="search" className="outline rounded-full px-4 py-2" />
          <a type="submit" className="outline rounded-full p-2 hover:bg-slate-100">🔍</a>
        </form>
        <div>
          {session ? (
            <div className="flex gap-2">
              <NavItem icon={plusIcon} title="Create">
                <DropdownMenu>
                  <DropdownItem title="Upload video" link="youtubestudio" />
                  <DropdownItem title="Go live" />
                </DropdownMenu>
              </NavItem>
              <NavItem icon={notificationIcon}>
                <DropdownMenu>
                  <DropdownItem title="Notifications" />
                </DropdownMenu>
              </NavItem>
              <NavItem icon={user?.image || userIcon}>
                <DropdownMenu>
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
                </DropdownMenu>
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

