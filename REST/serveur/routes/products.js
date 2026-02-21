const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const filePath = "./data/products.json";

// Fonction pour lire le fichier JSON
const readData = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Fonction pour écrire dans le fichier JSON
const writeData = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// GET /products - récupérer tous les produits
router.get("/", (req, res) => {
  const products = readData();
  res.json(products);
});

// GET /products/:id - récupérer un produit par ID
router.get("/:id", (req, res) => {
  const products = readData();
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Produit non trouvé" });
  res.json(product);
});

// POST /products - créer un nouveau produit
router.post("/", (req, res) => {
  const products = readData();
  const { name, price } = req.body;
  if (!name || !price)
    return res.status(400).json({ message: "Nom et prix requis" });

  const newProduct = {
    id: uuidv4(),
    name,
    price,
  };

  products.push(newProduct);
  writeData(products);
  res.status(201).json(newProduct);
});

// PUT /products/:id - mettre à jour un produit
router.put("/:id", (req, res) => {
  const products = readData();
  const { name, price } = req.body;
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index === -1)
    return res.status(404).json({ message: "Produit non trouvé" });

  if (name) products[index].name = name;
  if (price) products[index].price = price;

  writeData(products);
  res.json(products[index]);
});

// DELETE /products/:id - supprimer un produit
router.delete("/:id", (req, res) => {
  let products = readData();
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ message: "Produit non trouvé" });

  products = products.filter((p) => p.id !== req.params.id);
  writeData(products);
  res.json({ message: "Produit supprimé" });
});

module.exports = router;
