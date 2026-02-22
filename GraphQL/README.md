# 📦 GraphQL Product Service (JavaScript)

Ce projet fournit une **API GraphQL** pour gérer des **produits, utilisateurs et commandes** avec Node.js et **Apollo Server**. Les données sont simulées avec des fichiers JS objects.

L’API illustre les avantages de GraphQL : un seul endpoint, requêtes imbriquées, flexibilité sur les champs retournés et CRUD complet.

---

## 🚀 Stack Technique

- Node.js
- :contentReference[oaicite:0]{index=0}
- GraphQL
- UUID pour les IDs uniques
- Apollo Server / Client

---

## 📁 Structure du Projet

### 🔹 Serveur

```
serveur/
│
├── data/
│   ├── users.js       # Données utilisateurs simulées
│   ├── products.js    # Données produits simulées
│   └── orders.js      # Données commandes simulées
│
├── schema/
│   ├── typeDefs.js    # Schéma GraphQL
│   └── resolvers.js   # Resolvers GraphQL
│
├── server.js          # Serveur Apollo
└── package.json       # Dépendances et scripts

```

### 🔹 Client

```
client/
├── client.js          # Client Apollo
└── package.json       # Dépendances et scripts

```

---

## ⚙️ Installation & Exécution

### Serveur

```bash
cd ./serveur
npm install
npm run start
```

### Client

```bash
cd ./client
npm install
npm run start
```

---

## 🔗 Fonctionnalités du Service

### ✅ Queries

| Requête            | Description                                                               |
| ------------------ | ------------------------------------------------------------------------- |
| `users`            | Récupérer tous les utilisateurs avec leurs commandes et produits associés |
| `user(id: ID!)`    | Récupérer un utilisateur par ID                                           |
| `products`         | Récupérer tous les produits                                               |
| `product(id: ID!)` | Récupérer un produit par ID                                               |
| `orders`           | Récupérer toutes les commandes avec les utilisateurs et produits associés |
| `order(id: ID!)`   | Récupérer une commande par ID                                             |

### ✅ Mutations

| Mutation                                | Description                                      |
| --------------------------------------- | ------------------------------------------------ |
| `createUser(name, email)`               | Créer un nouvel utilisateur                      |
| `updateUser(id, name?, email?)`         | Mettre à jour un utilisateur                     |
| `deleteUser(id)`                        | Supprimer un utilisateur et ses commandes        |
| `createProduct(name, price)`            | Créer un nouveau produit                         |
| `updateProduct(id, name?, price?)`      | Mettre à jour un produit                         |
| `deleteProduct(id)`                     | Supprimer un produit et le retirer des commandes |
| `createOrder(userId, productIds)`       | Créer une nouvelle commande                      |
| `updateOrder(id, userId?, productIds?)` | Mettre à jour une commande                       |
| `deleteOrder(id)`                       | Supprimer une commande                           |

---

## 📄 Test et Documentation

Tu peux utiliser **Apollo Explorer**
