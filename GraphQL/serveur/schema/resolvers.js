import { users } from "../data/users.js";
import { products } from "../data/products.js";
import { orders } from "../data/orders.js";
import { v4 as uuidv4 } from "uuid";

export const resolvers = {
  Query: {
    users: () => users,
    products: () => products,
    orders: () => orders,

    user: (_, { id }) => users.find((u) => u.id === id),
    product: (_, { id }) => products.find((p) => p.id === id),
    order: (_, { id }) => orders.find((o) => o.id === id),
  },

  Mutation: {
    // ================= USERS =================

    createUser: (_, { name, email }) => {
      const newUser = { id: uuidv4(), name, email };
      users.push(newUser);
      return newUser;
    },

    updateUser: (_, { id, name, email }) => {
      const user = users.find((u) => u.id === id);
      if (!user) throw new Error("User not found");

      if (name !== undefined) user.name = name;
      if (email !== undefined) user.email = email;

      return user;
    },

    deleteUser: (_, { id }) => {
      const index = users.findIndex((u) => u.id === id);
      if (index === -1) throw new Error("User not found");

      users.splice(index, 1);

      // Supprimer ses commandes
      for (let i = orders.length - 1; i >= 0; i--) {
        if (orders[i].userId === id) {
          orders.splice(i, 1);
        }
      }

      return "User deleted";
    },

    // ================= PRODUCTS =================

    createProduct: (_, { name, price }) => {
      const newProduct = { id: uuidv4(), name, price };
      products.push(newProduct);
      return newProduct;
    },

    updateProduct: (_, { id, name, price }) => {
      const product = products.find((p) => p.id === id);
      if (!product) throw new Error("Product not found");

      if (name !== undefined) product.name = name;
      if (price !== undefined) product.price = price;

      return product;
    },

    deleteProduct: (_, { id }) => {
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) throw new Error("Product not found");

      products.splice(index, 1);

      // Retirer ce produit des commandes
      orders.forEach((order) => {
        order.productIds = order.productIds.filter((pid) => pid !== id);
      });

      return "Product deleted";
    },

    // ================= ORDERS =================

    createOrder: (_, { userId, productIds }) => {
      const userExists = users.some((u) => u.id === userId);
      if (!userExists) throw new Error("User not found");

      const newOrder = { id: uuidv4(), userId, productIds };
      orders.push(newOrder);
      return newOrder;
    },

    updateOrder: (_, { id, userId, productIds }) => {
      const order = orders.find((o) => o.id === id);
      if (!order) throw new Error("Order not found");

      if (userId !== undefined) {
        const userExists = users.some((u) => u.id === userId);
        if (!userExists) throw new Error("User not found");
        order.userId = userId;
      }

      if (productIds !== undefined) {
        order.productIds = productIds;
      }

      return order;
    },

    deleteOrder: (_, { id }) => {
      const index = orders.findIndex((o) => o.id === id);
      if (index === -1) throw new Error("Order not found");

      orders.splice(index, 1);
      return "Order deleted";
    },
  },

  // ================= RELATIONS =================

  Order: {
    user: (parent) => users.find((u) => u.id === parent.userId),
    products: (parent) =>
      products.filter((p) => parent.productIds.includes(p.id)),
  },

  User: {
    orders: (parent) => orders.filter((o) => o.userId === parent.id),
  },
};
