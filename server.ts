import { createDatabase } from './database/createDatabase';
import { setupTables } from './database/setupTables';
import { betterAuth } from 'better-auth';
import { createPool } from 'mysql2/promise';
import { toNodeHandler } from 'better-auth/node';
import express from 'express';
import viteExpress from 'vite-express';
import multer from 'multer';
import dotenv from 'dotenv';


dotenv.config();

const PORT = Number(process.env.APP_PORT);
const app = express();

function storeVideoData() {
  const uploadVideo = multer({ dest: './public/videos' })
  app.post('/api/upload/video', uploadVideo.single('video'), (req, res) => {
    res.send('✅ Video Uploaded successfully!')
  })
  const uploadThumbnail = multer({ dest: './public/thumbnails/' })
  app.post('/api/upload/thumbnail', uploadThumbnail.single('thumbnail'), (req, res) => {
    res.send('✅ Video Uploaded successfully!')
  })

}

app.use(express.json())

async function initServer() {
  await createDatabase();
  console.log('✅ Database created')
  await setupTables();
  console.log('✅ Tables setup')
  const pool = createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
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
  });
  console.log('✅ Better Auth initialized');

  app.use("/api/auth", toNodeHandler(auth))
  viteExpress.config({ mode: "development" })
  viteExpress.listen(app, PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error('❌ Failed to start server:', err)
})
