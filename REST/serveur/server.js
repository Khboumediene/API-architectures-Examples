const express = require("express");
const bodyParser = require("body-parser");
const productsRoutes = require("./routes/products");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/products", productsRoutes);

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur REST API démarré sur http://localhost:${PORT}`);
});
