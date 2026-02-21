const axios = require("axios");

const BASE_URL = "http://localhost:3000/products";

// Fonction pour afficher tous les produits
async function getAllProducts() {
  try {
    const response = await axios.get(BASE_URL);
    console.log("Tous les produits :");
    console.log(response.data);
  } catch (error) {
    console.error("Erreur GET /products :", error.message);
  }
}

// Fonction pour récupérer un produit par ID
async function getProductById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    console.log(`Produit ${id} :`);
    console.log(response.data);
  } catch (error) {
    console.error(
      `Erreur GET /products/${id} :`,
      error.response?.data || error.message,
    );
  }
}

// Fonction pour créer un produit
async function createProduct(name, price) {
  try {
    const response = await axios.post(BASE_URL, { name, price });
    console.log("Produit créé :");
    console.log(response.data);
  } catch (error) {
    console.error(
      "Erreur POST /products :",
      error.response?.data || error.message,
    );
  }
}

// Fonction pour mettre à jour un produit
async function updateProduct(id, name, price) {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, { name, price });
    console.log(`Produit ${id} mis à jour :`);
    console.log(response.data);
  } catch (error) {
    console.error(
      `Erreur PUT /products/${id} :`,
      error.response?.data || error.message,
    );
  }
}

// Fonction pour supprimer un produit
async function deleteProduct(id) {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`);
    console.log(response.data);
  } catch (error) {
    console.error(
      `Erreur DELETE /products/${id} :`,
      error.response?.data || error.message,
    );
  }
}

// Exemple d'utilisation
async function main() {
  await getAllProducts();
  await createProduct("Produit Client", 250);
  await getAllProducts();

  const testId = "1"; // ID à tester
  await getProductById(testId);
  await updateProduct(testId, "Produit Modifié", 300);
  await getProductById(testId);
  await deleteProduct(testId);
  await getAllProducts();
}

main();
