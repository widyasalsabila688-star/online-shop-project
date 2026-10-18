
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

app.get("/", (req, res) => {
  res.send("Online Shop Backend berjalan!");
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Konfigurasi server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET belum diatur di file .env");
}

if (!MONGO_URI) {
  throw new Error("MONGO_URI belum diatur di file .env");
}

// Koneksi MongoDB dan jalankan server
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Terhubung ke MongoDB");

    app.listen(PORT, () => {
      console.log(`Server berjalan di port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Gagal koneksi ke MongoDB:", error.message);
  });
