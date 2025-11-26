import { NavItem, DropdownItem } from "@/modules/dropdown";
import UploadVideoModal from "@/modules/uploadVideo";
import { useState } from "react";
import VideoCameraIcon from "@/assets/icons/videoCameraIcon.svg"
import HamburgerIcon from "@/assets/icons/hamburgerIcon.svg"


export default function YouTubeStudio() {
  const [showUploadVideoModal, setShowUploadVideoModal] = useState(false)
  const [activePage, setActivePage] = useState(1)
  return (
    <div className="w-full border-b border-slate-200">
      <nav className="px-4 py-2 shadow justify-between content-center items-center flex">
        <div className="flex gap-4">
          <div className="w-7 hover:bg-stone-100 rounded-full">
            <img src={HamburgerIcon} />
          </div>
          <div>
            <h1>Studio</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 p-2">
          <button className="hover:bg-stone-100 rounded-full w-7 h-7 p-2 border"></button>
          <button className="hover:bg-stone-100 rounded-full w-7 h-7 p-2 border"></button>
          <button className="hover:bg-stone-100 rounded-full w-7 h-7 p-2 border"></button>
          <NavItem title="create" icon={VideoCameraIcon}>
            <DropdownItem onClick={() => setShowUploadVideoModal(true)} title="upload videos" />
            <DropdownItem title="go live" />
            <DropdownItem title="new playlsit" />
            <DropdownItem title="new podcast" />
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
      <div className="px-4">
        <h1 className="text-start text-xl py-4"><strong>Channel content</strong></h1>
        <div className="flex w-2xl gap-8">
          <button
            className={`pb-2 ${activePage == 1 ? ('border-b-3 balck') : ('text-stone-400 hover:border-b-3')}`}
            onClick={() => setActivePage(1)}>
            <span>Inspiration</span>
          </button>
          <button
            className={`pb-2 ${activePage == 2 ? ('border-b-3 balck') : ('text-stone-400 hover:border-b-3')}`}
            onClick={() => setActivePage(2)}>
            <span>Videos</span>
          </button>
          <button
            className={`pb-2 ${activePage == 3 ? ('border-b-3 balck') : ('text-stone-400 hover:border-b-3')}`}
            onClick={() => setActivePage(3)}>
            <span>Shorts</span>
          </button>
          <button
            className={`pb-2 ${activePage == 4 ? ('border-b-3 balck') : ('text-stone-400 hover:border-b-3')}`}
            onClick={() => setActivePage(4)}>
            <span>Live</span>
          </button>
          <button
            className={`pb-2 ${activePage == 5 ? ('border-b-3 balck') : ('text-stone-400 hover:border-b-3')}`}
            onClick={() => setActivePage(5)}>
            <span>Playlists</span>
          </button>
          <button
            className={`pb-2 ${activePage == 6 ? ('border-b-3 balck') : ('text-stone-400 hover:border-b-3')}`}
            onClick={() => setActivePage(6)}>
            <span>Podcasts</span>
          </button>
          <button
            className={`pb-2 ${activePage == 7 ? ('border-b-3 balck') : ('text-stone-400 hover:border-b-3')}`}
            onClick={() => setActivePage(7)}>
            <span>Promotions</span>
          </button>
        </div>




      </div>
    </div >
  )
}
