import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("attendance.db");

// Init DB
db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    avatar_url TEXT
  );
  CREATE TABLE IF NOT EXISTS attendance (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    date TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY(student_id) REFERENCES students(id)
  );
`);

// Seed data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM students").get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare("INSERT INTO students (name, avatar_url) VALUES (?, ?)");
  insert.run("Budi Santoso", "");
  insert.run("Siti Aminah", "");
  insert.run("Andi Wijaya", "");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '50mb' }));

  // API Routes
  app.get("/api/students", (req, res) => {
    const students = db.prepare("SELECT * FROM students").all();
    res.json(students);
  });

  app.post("/api/students", (req, res) => {
    const { name, avatar_url } = req.body;
    const info = db.prepare("INSERT INTO students (name, avatar_url) VALUES (?, ?)").run(name, avatar_url || "");
    res.json({ id: info.lastInsertRowid, name, avatar_url });
  });

  app.put("/api/students/:id", (req, res) => {
    const { name, avatar_url } = req.body;
    db.prepare("UPDATE students SET name = ?, avatar_url = ? WHERE id = ?").run(name, avatar_url, req.params.id);
    res.json({ success: true });
  });

  app.get("/api/attendance", (req, res) => {
    const { date } = req.query;
    if (date) {
      const records = db.prepare("SELECT * FROM attendance WHERE date = ?").all(date);
      res.json(records);
    } else {
      const records = db.prepare("SELECT * FROM attendance").all();
      res.json(records);
    }
  });

  app.post("/api/attendance", (req, res) => {
    const { student_id, date, status } = req.body;
    // Upsert
    const existing = db.prepare("SELECT id FROM attendance WHERE student_id = ? AND date = ?").get(student_id, date) as { id: number } | undefined;
    if (existing) {
      db.prepare("UPDATE attendance SET status = ? WHERE id = ?").run(status, existing.id);
    } else {
      db.prepare("INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)").run(student_id, date, status);
    }
    res.json({ success: true });
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
