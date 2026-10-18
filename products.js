const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. Ambil Semua Produk (GET)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data produk', error: error.message });
  }
});

// 2. Ambil Detail Satu Produk (GET by ID)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil detail produk', error: error.message });
  }
});

// 3. Tambah Produk Baru (POST)
router.post('/', async (req, res) => {
  const { name, price, description, image } = req.body;

  try {
    const newProduct = new Product({ name, price, description, image });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Gagal menambahkan produk', error: error.message });
  }
});

// 4. Update Produk (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Gagal memperbarui produk', error: error.message });
  }
});

// 5. Hapus Produk (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }

    res.json({
      message: 'Product deleted successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete product',
      error: error.message
    });
  }
});

module.exports = router;