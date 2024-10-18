import express from "express";
import upload from "./routes/index";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;

app.use("/api/storage", upload);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
