import { GridVideo } from "@/modules/videoRecomendation"
import type { Video } from "@/modules/videoRecomendation"
import { useEffect, useState } from "react"
import Navbar from "@/modules/navbar"
import Sidebar from "@/modules/sidebar"

export default function Home() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/videos")
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <Navbar />
      <Sidebar />
      <main className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? <p>Loading videos...</p>
          : videos.map(video => <GridVideo key={video.video_id} video={video} />)
        }
      </main>
    </div>
  )
}
