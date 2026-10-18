const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const dummyProducts = [
  {
    name: "Sepatu Sneaker Elegan",
    price: 350000,
    description: "Sepatu casual cocok untuk kegiatan sehari-hari.",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
  },
  {
    name: "Jam Tangan Sport",
    price: 250000,
    description: "Jam tangan tahan air dengan fitur chronograph.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
  },
  {
    name: "Tas Ransel Laptop",
    price: 180000,
    description: "Tas ransel muat laptop hingga 15 inchi.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
  }
];

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/online-shop';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Koneksi MongoDB Berhasil');
    // Hapus data lama agar tidak duplikat
    await Product.deleteMany({});
    // Masukkan data dummy
    await Product.insertMany(dummyProducts);
    console.log('Data sampel berhasil dimasukkan!');
    process.exit();
  })
  .catch((err) => {
    console.error('Error seeding data:', err);
    process.exit(1);
  });