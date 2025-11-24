
export interface Video {
  video_id: string
  channel_id: string
  tag_id: string
  video_author: string
  date_uploaded: string
  video_views: string
  is_short: string
  thumbnail_url?: string
}

export interface VideoProps {
  video: Video
}

export function GridVideo({ video }: VideoProps) {
  return (
    <div className="border rounded p-2">
      {video.thumbnail_url && (
        <img
          src={video.thumbnail_url}
          alt={`${video.video_author}'s video`}
          className="w-full h-auto rounded"
        />
      )}
      <p className="font-bold">{video.video_author}</p>
      <p>Views: {video.video_views}</p>
      <p>Uploaded: {video.date_uploaded}</p>
    </div>
  )
}

export function ColumnVideo({ video }: VideoProps) {
  return (
    <div className="flex items-start gap-2 p-2 border-b">
      {video.thumbnail_url && (
        <img
          src={video.thumbnail_url}
          alt={`${video.video_author}'s video`}
          className="w-32 h-auto rounded"
        />
      )}
      <div>
        <p className="font-bold">{video.video_author}</p>
        <p>Views: {video.video_views}</p>
        <p>Uploaded: {video.date_uploaded}</p>
      </div>
    </div>
  )
}
