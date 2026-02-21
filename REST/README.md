# 📦 REST Product Service (JavaScript)

Ce projet fournit une **API REST** pour gérer des produits avec **Node.js** et **Express**, utilisant un **fichier JSON** comme source de données. Il inclut également un **client Node.js** pour consommer l’API.

---

## 🚀 Stack Technique

- **Node.js**
- **Express.js**
- **Axios** pour le client HTTP

---

## 📁 Structure du Projet

### 🔹 Serveur

```

serveur/
├── data/
│   └── products.json      # Fichier JSON simulant la base de données
├── routes/
│   └── products.js        # Routes CRUD pour les produits
├── server.js              # Serveur Express
└── package.json           # Dépendances et scripts

```

### 🔹 Client

```

client/
├── client.js              # Client Node.js pour consommer l'API
└── package.json           # Dépendances et scripts

```

---

## ⚙️ Installation & Exécution

### Serveur

```bash
cd ./serveur
npm install
npm run dev
```

### Client

```bash
cd ./client
npm install
npm run dev
```

---

## 🔗 Fonctionnalités du Service

### API REST – Endpoints

| Méthode | Endpoint        | Description                       |
| ------- | --------------- | --------------------------------- |
| GET     | `/products`     | Récupérer tous les produits       |
| GET     | `/products/:id` | Récupérer un produit par ID       |
| POST    | `/products`     | Créer un nouveau produit          |
| PUT     | `/products/:id` | Mettre à jour un produit existant |
| DELETE  | `/products/:id` | Supprimer un produit              |

---

## 📄 Test et Documentation

<p align="center">
  <a href="https://app.getpostman.com/run-collection/31975823-bb8c66b1-dce8-4206-8a8a-fd8ba7599822?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D31975823-bb8c66b1-dce8-4206-8a8a-fd8ba7599822%26entityType%3Dcollection%26workspaceId%3D3bba11da-f14b-486b-bcf3-17227a7cdff0">
    <img src="https://run.pstmn.io/button.svg" alt="Run In Postman"/>
  </a>
</p>
