# 📦 GraphQL Product Service (JavaScript)

Ce projet fournit une **API GraphQL** pour gérer des utilisateurs, produits et commandes avec **Node.js**, **Express** et **Apollo Server**, en utilisant des **fichiers JSON** comme source de données.

Il inclut aussi un **client Node.js** pour tester :

- **Query**
- **Mutation**
- **Subscription en temps réel** (`productCreated`) via **graphql-ws**.

---

## 🚀 Stack Technique

- **Node.js** (ES Modules)
- **Express.js**
- **Apollo Server**
- **GraphQL**
- **graphql-ws** + **ws** (WebSocket subscriptions)
- **@graphql-tools/schema**
- **uuid**

---

## 📁 Structure du Projet

```text
project/
+-- data/
│       +-- users.json
│       +-- products.json
│       +-- orders.json
+-- schema/
│       +-- typeDefs.js
│       +-- resolvers.js
+-- utils/
│       +-- file.js
│       +-- pubsub.js
+-- server.js
+-- client.js
+-- package.json
```

---

## ⚙️ Installation & Exécution

### 1. Installer les dépendances

```bash
npm install
```

### 2. Lancer le serveur GraphQL

```bash
npm start
```

Le serveur expose :

- **HTTP**: `http://localhost:4000/graphql`
- **WS**: `ws://localhost:4000/graphql`

### 3. Tester avec le client Node.js

Dans un autre terminal :

```bash
node client.js
```

Le client :

1. Se connecte au WebSocket
2. Lance la subscription `productCreated`
3. Attend 2 secondes
4. Exécute la mutation `createProduct`
5. Affiche l'événement recu en temps réel

---

## 🔗 Fonctionnalités

### Queries

| Opération     | Description                     |
| ------------- | ------------------------------- |
| `users`       | Récupérer tous les utilisateurs |
| `products`    | Récupérer tous les produits     |
| `orders`      | Récupérer toutes les commandes  |
| `user(id)`    | Récupérer un utilisateur par ID |
| `product(id)` | Récupérer un produit par ID     |
| `order(id)`   | Récupérer une commande par ID   |

### Mutations

| Opération                                           | Description      |
| --------------------------------------------------- | ---------------- |
| `createUser` / `updateUser` / `deleteUser`          | CRUD utilisateur |
| `createProduct` / `updateProduct` / `deleteProduct` | CRUD produit     |
| `createOrder` / `updateOrder` / `deleteOrder`       | CRUD commande    |

### Subscription

| Opération        | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `productCreated` | événement temps réel déclenché a chaque `createProduct` |

---

## Relations GraphQL

- `User.orders` ? liste des commandes d'un utilisateur
- `Order.user` ? utilisateur propriétaire de la commande
- `Order.products` ? produits inclus dans la commande

---
