import { createDatabase } from './database/createDatabase'
import { setupTables } from './database/setupTables'
import { betterAuth } from 'better-auth'
import { createPool } from 'mysql2/promise'
import { toNodeHandler } from 'better-auth/node'
import express from 'express'
import viteExpress from 'vite-express'
import multer from 'multer'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config()


const PORT = Number(process.env.APP_PORT)
const app = express()
// --------------------------DEBUG------------------------------//
app.use((req, res, next) => {
  console.log(`❗Incoming request: ${req.method} ${req.url}`)
  next()  // Pass the request to the next handler
})
// -------------------------------------------------------------//



const VIDEO_UPLOAD_URL = "/upload/videos"
function videoFileFilter(req, file, cb) {
  const fileTypes = /.mp4|.avi|.mkv/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  if (extname) {
    return cb(null, true)
  } else {
    return cb(new Error('❌ Error: Videos Only'), false)
  }
}
const uploadVideo = multer({ dest: `.${VIDEO_UPLOAD_URL}`, fileFilter: videoFileFilter })

app.post(VIDEO_UPLOAD_URL, uploadVideo.single('video'), (req, res) => {
  if (!req.file) {
    console.log('❌ No video file uploaded')
    return res.status(400).json({ message: '❌ No video file uploaded' })
  } else {
    console.log(`Video uploaded: ${req.file.path}`)
    return res.status(200).json({ message: '✅ Video uploaded successfully' })
  }

})

const THUMBNAIL_UPLOAD_URL = "/upload/thumbnails"

function thumbnailFileFilter(req, file, cb) {
  const fileTypes = /.png|.jpg|.jpeg/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  if (extname) {
    return cb(null, true)
  } else {
    return cb(new Error('❌ Error: Images Only'), false)
  }
}
const uploadThumbnail = multer({ dest: `.${THUMBNAIL_UPLOAD_URL}`, fileFilter: thumbnailFileFilter })

app.post(THUMBNAIL_UPLOAD_URL, uploadThumbnail.single('thumbnail'), (req, res) => {
  if (!req.file) {
    console.log('❌ No video file uploaded')
    return res.status(400).json({ message: '❌ No video file uploaded' })
  } else {

    console.log(`Thumbnail uploaded: ${req.file.path}`)
    return res.status(200).json({ message: '✅ Video uploaded successfully' })
  }

})

app.use(express.json())

async function initServer() {
  await createDatabase()
  console.log('✅ Database created')
  await setupTables()
  console.log('✅ Tables setup')
  const pool = createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  })
  console.log('✅ Pool created')
  const auth = betterAuth({
    url: process.env.APP_URL!,
    database: pool,
    jwtSecret: process.env.JWT_SECRET!,
    trustedOrigins: [process.env.APP_URL!],
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      },
    },
  })
  console.log('✅ Better Auth initialized')

  app.use("/api/auth", toNodeHandler(auth))
  viteExpress.config({ mode: "development" })
  viteExpress.listen(app, PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
  })
}

initServer().catch((err) => {
  console.error('❌ Failed to start server:', err)
})
