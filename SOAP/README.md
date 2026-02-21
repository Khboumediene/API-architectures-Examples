# 📦 SOAP Product Service (Java)

Implémentation complète d’un **service SOAP en Java** permettant d’effectuer des opérations **CRUD sur des produits**, avec une persistance simulée via un fichier JSON.

---

## 🚀 Stack Technique

- **Java (JDK 8+)**
- **JAX-WS** — API SOAP standard Java
- **JAXB** — Mapping XML ↔ objets Java
- **Jackson** — Gestion du JSON
- **Apache Maven** — Gestion des dépendances

---

## 📁 Structure du Projet

### 🔹 Serveur SOAP

```text
serveur/
│
├── src/main/java/com/example/
│   ├── model/
│   │   └── Product.java
│   ├── service/
│   │   ├── ProductService.java
│   │   └── ProductServiceImpl.java
│   ├── repository/
│   │   └── ProductRepository.java
│   └── server/
│       └── Server.java
│
├── src/main/resources/
│   └── products.json
│
└── pom.xml
```

---

### 🔹 Client SOAP

```text
client/
│
├── src/main/java/com/example/client/
│   └── ProductClient.java
│
└── pom.xml
```

---

## ⚙️ Installation & Exécution

### 1️⃣ Lancer le serveur SOAP

```bash
cd .\serveur\
mvn clean compile
mvn exec:java
```

📌 Une fois démarré, le service est accessible à :

```
http://localhost:8080/ws/products?wsdl
```

---

### 2️⃣ Générer et exécuter le client SOAP

⚠️ Assure-toi que le serveur est déjà en cours d’exécution.

```bash
cd .\client\
mvn clean compile
mvn clean generate-sources
mvn exec:java
```

📌 La commande `generate-sources` utilise **wsimport** pour générer automatiquement les classes client à partir du WSDL.

---

## 🔗 Fonctionnalités du Service

| Méthode                          | Description                |
| -------------------------------- | -------------------------- |
| `getAllProducts()`               | Retourne tous les produits |
| `getProductById(int id)`         | Retourne un produit par ID |
| `addProduct(Product product)`    | Ajoute un produit          |
| `updateProduct(Product product)` | Met à jour un produit      |
| `deleteProduct(int id)`          | Supprime un produit        |

---

## 🧱 Architecture

```text
Client SOAP
     │
     ▼
WSDL (contrat XML)
     │
     ▼
Service SOAP (JAX-WS)
     │
     ▼
Repository (JSON)
     │
     ▼
products.json
```

## 📄 Test et Documentation

<p align="center">
  <a href="https://app.getpostman.com/run-collection/31975823-ef9990b0-5cd0-460e-8fd7-a8bf69eabaa0?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D31975823-ef9990b0-5cd0-460e-8fd7-a8bf69eabaa0%26entityType%3Dcollection%26workspaceId%3D3bba11da-f14b-486b-bcf3-17227a7cdff0">
    <img src="https://run.pstmn.io/button.svg" alt="Run In Postman" width="128" height="32">
  </a>
</p>
