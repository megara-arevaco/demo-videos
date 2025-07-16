import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import path from "path";
import fs from "fs";

let db: Database | null = null;

export async function getDatabase(): Promise<Database> {
  if (db) return db;

  const dbPath =
    process.env.NODE_ENV === "production"
      ? "./database.db"
      : path.join(process.cwd(), "database.db");

  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await initializeDatabase();
  return db;
}

async function initializeDatabase() {
  if (!db) return;

  await db.exec(`
    CREATE TABLE IF NOT EXISTS videos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      tags TEXT,
      thumbnail_url TEXT,
      duration INTEGER DEFAULT 0,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  const count = await db.get("SELECT COUNT(*) as count FROM videos");
  if (count.count === 0) {
    try {
      const videosPath = path.join(process.cwd(), "videos.json");
      console.log("Loading initial data from:", videosPath);
      
      if (fs.existsSync(videosPath)) {
        const videosData = JSON.parse(fs.readFileSync(videosPath, "utf8"));

        for (const video of videosData.videos) {
          await db.run(
            `
            INSERT INTO videos (title, tags, thumbnail_url, duration, views, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
          `,
            [
              video.title,
              JSON.stringify(video.tags),
              video.thumbnail_url,
              video.duration,
              video.views,
              video.created_at,
            ]
          );
        }
        console.log(`Loaded ${videosData.videos.length} videos into database`);
      } else {
        console.log("No videos.json file found, skipping initial data load");
      }
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  }
}
