import UploadIcon from "@/assets/icons/uploadIcon.svg"
import { useState } from "react"

export default function UploadVideoModal() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState<boolean>(false)
  return (
    <div className="h-full flex flex-col items-center justify-between">
      <div></div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-stone-100 w-25 h-25 rounded-full m-8 p-5">
          <img src={UploadIcon} />
        </div>
        <h1>Drag and drop video files to upload</h1>
        <p>Your videos will be private until you publish them</p>
        <button className="bg-black text-white rounded-full px-2 py-1">Select files</button>
      </div>
      <p className="self-end text-xs p-4">By submitting your videos to YouTube, you acknowledge that you agree to YouTube's Terms of Service and Community Guidelines.
        Please be sure not to violate others' copyright or privacy rights. Learn more</p>
    </div>
  )
}
