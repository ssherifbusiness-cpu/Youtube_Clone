import { NavItem, DropdownMenu, DropdownItem } from "@/modules/dropdown";
import UploadVideoModal from "@/modules/uploadVideo";
import { useState } from "react";
import VideoCameraIcon from "@/assets/icons/videoCameraIcon.svg"

export default function YouTubeStudio() {
  const [showUploadVideoModal, setShowUploadVideoModal] = useState(false)

  return (
    <div className="w-full px-4 border-b border-slate-200">
      <nav className="justify-between flex">
        <div>
          <h1>Studio</h1>
        </div>
        <div className="flex gap-4 p-2">
          <button className="hover:bg-stone-100 rounded-full w-7 h-7 p-2 border"></button>
          <button className="hover:bg-stone-100 rounded-full w-7 h-7 p-2 border"></button>
          <button className="hover:bg-stone-100 rounded-full w-7 h-7 p-2 border"></button>
          <NavItem title="create" icon={VideoCameraIcon}>
            <DropdownMenu additionalClasses="">
              <button onClick={() => setShowUploadVideoModal(true)}>
                <DropdownItem title="upload videos" />
              </button>
              <DropdownItem title="go live" />
              <DropdownItem title="new playlsit" />
              <DropdownItem title="new podcast" />
            </DropdownMenu>
          </NavItem>
          <button className="hover:bg-stone-100 rounded-full w-7 h-7 p-2 border"></button>
        </div>
        {showUploadVideoModal &&
          <div className="">
            <div className="fixed inset-0 w-screen h-screen bg-black opacity-50" onClick={() => setShowUploadVideoModal(false)}>
            </div>
            <div className="flex flex-col bg-white rounded-xl fixed w-[80vw] h-[80vh] max-w-3xl drop-shadow-xl left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
              <div className="h-15 p-4 flex justify-between border-b border-stone-100">
                <h1>Upload Videos</h1>
                <button className="hover:bg-stone-100 p-2 flex items-center rounded-full" onClick={() => setShowUploadVideoModal(false)}>✕</button>
              </div>
              <div className="flex flex-1 justify-center items-center h-[80vw-15px]">{<UploadVideoModal />}</div>
            </div>
          </div>
        }
      </nav >
      <h1 className="text-start text-xl py-4">Channel content</h1>
      <div className="flex w-2xl justify-between">
        <button className="border-b balck">Inspiration</button>
        <button>Videos</button>
        <button>Shorts</button>
        <button>Live</button>
        <button>Playlists</button>
        <button>Podcasts</button>
        <button>Promotions</button>
      </div>
    </div >
  )
}
