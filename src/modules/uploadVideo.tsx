import UploadIcon from "@/assets/icons/uploadIcon.svg"
import LoadingIcon from "@/assets/icons/loadingIcon.svg"
import { useState } from "react"

const UPLOAD_URL = '/upload/videos'

export default function UploadVideoModal() {
  const [uploading, setUploading] = useState<boolean>(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0]
      handleUpload(file)
    }
  }
  const handleUpload = async (file: File) => {
    setUploading(true)
    const formData = new FormData()
    formData.append("video", file)
    try {
      const response = await fetch(UPLOAD_URL, {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        alert('✅ Upload Successful')
      } else {
        alert('❌ Upload failed:No response')
      }
    } catch (error) {
      alert('❌ Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form name="video" method="post" encType="multipart/form-data" className="h-full flex flex-col items-center justify-between">
      <div></div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-stone-100 w-25 h-25 rounded-full m-8 p-5 relative">
          <input type="file"
            className="bg-red-100 absolute inset-0 opacity-0 cursor-pointer rounded-full"
            onChange={handleFileChange}
            name="video"
          />
          {uploading ? (
            <img src={LoadingIcon} />
          ) : (
            <img src={UploadIcon} />
          )}
        </div>
        <h1>Drag and drop video files to upload</h1>
        <p className="text-sm text-stone-600">Your videos will be private until you publish them</p>
        {/* <div className="px-4 m-4 bg-black text-white rounded-full px-2 py-1 relative">
          <input type="file" className="bg-red-100 absolute inset-0 opacity-0 cursor-pointer rounded-full" />
        </div> */}
      </div>
      <p className="self-end text-xs p-4">By submitting your videos to YouTube, you acknowledge that you agree to YouTube's Terms of Service and Community Guidelines.
        Please be sure not to violate others' copyright or privacy rights. Learn more</p>
    </form >
  )
}
