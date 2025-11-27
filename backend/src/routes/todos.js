import express from "express";
import { initDB } from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const db = await initDB();
  const todos = await db.all("SELECT * FROM todos");
  res.json(todos);
});

router.post("/", async (req, res) => {
  const { title } = req.body;
  const db = await initDB();
  const result = await db.run("INSERT INTO todos (title) VALUES (?)", [title]);
  res.json({ id: result.lastID, title });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const db = await initDB();
  await db.run("DELETE FROM todos WHERE id = ?", [id]);
  res.json({ message: "Deleted" });
});

export default router;
