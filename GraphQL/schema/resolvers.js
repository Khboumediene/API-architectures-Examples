import path from "node:path";
import { fileURLToPath } from "node:url";
import { v4 as uuidv4 } from "uuid";
import { readJsonFile, writeJsonFile } from "../utils/file.js";
import { pubsub } from "../utils/pubsub.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.resolve(__dirname, "../data");

const usersPath = path.join(dataDir, "users.json");
const productsPath = path.join(dataDir, "products.json");
const ordersPath = path.join(dataDir, "orders.json");

const PRODUCT_CREATED_EVENT = "PRODUCT_CREATED";

async function getUsers() {
  return readJsonFile(usersPath);
}

async function getProducts() {
  return readJsonFile(productsPath);
}

async function getOrders() {
  return readJsonFile(ordersPath);
}

export const resolvers = {
  Query: {
    users: async () => getUsers(),
    products: async () => getProducts(),
    orders: async () => getOrders(),

    user: async (_, { id }) => {
      const users = await getUsers();
      return users.find((u) => u.id === id) || null;
    },
    product: async (_, { id }) => {
      const products = await getProducts();
      return products.find((p) => p.id === id) || null;
    },
    order: async (_, { id }) => {
      const orders = await getOrders();
      return orders.find((o) => o.id === id) || null;
    }
  },

  Mutation: {
    createUser: async (_, { name, email }) => {
      const users = await getUsers();
      const newUser = { id: uuidv4(), name, email };
      users.push(newUser);
      await writeJsonFile(usersPath, users);
      return newUser;
    },

    updateUser: async (_, { id, name, email }) => {
      const users = await getUsers();
      const index = users.findIndex((u) => u.id === id);

      if (index === -1) {
        throw new Error("User not found");
      }

      users[index] = {
        ...users[index],
        ...(name !== undefined ? { name } : {}),
        ...(email !== undefined ? { email } : {})
      };

      await writeJsonFile(usersPath, users);
      return users[index];
    },

    deleteUser: async (_, { id }) => {
      const users = await getUsers();
      const exists = users.some((u) => u.id === id);

      if (!exists) {
        throw new Error("User not found");
      }

      const filteredUsers = users.filter((u) => u.id !== id);
      const orders = await getOrders();
      const filteredOrders = orders.filter((o) => o.userId !== id);

      await writeJsonFile(usersPath, filteredUsers);
      await writeJsonFile(ordersPath, filteredOrders);

      return `User ${id} deleted`;
    },

    createProduct: async (_, { name, price }) => {
      const products = await getProducts();
      const newProduct = { id: uuidv4(), name, price };
      products.push(newProduct);
      await writeJsonFile(productsPath, products);

      pubsub.publish(PRODUCT_CREATED_EVENT, { productCreated: newProduct });

      return newProduct;
    },

    updateProduct: async (_, { id, name, price }) => {
      const products = await getProducts();
      const index = products.findIndex((p) => p.id === id);

      if (index === -1) {
        throw new Error("Product not found");
      }

      products[index] = {
        ...products[index],
        ...(name !== undefined ? { name } : {}),
        ...(price !== undefined ? { price } : {})
      };

      await writeJsonFile(productsPath, products);
      return products[index];
    },

    deleteProduct: async (_, { id }) => {
      const products = await getProducts();
      const exists = products.some((p) => p.id === id);

      if (!exists) {
        throw new Error("Product not found");
      }

      const filteredProducts = products.filter((p) => p.id !== id);
      const orders = await getOrders();
      const updatedOrders = orders.map((o) => ({
        ...o,
        productIds: o.productIds.filter((pid) => pid !== id)
      }));

      await writeJsonFile(productsPath, filteredProducts);
      await writeJsonFile(ordersPath, updatedOrders);

      return `Product ${id} deleted`;
    },

    createOrder: async (_, { userId, productIds }) => {
      const [users, products, orders] = await Promise.all([
        getUsers(),
        getProducts(),
        getOrders()
      ]);

      const userExists = users.some((u) => u.id === userId);
      if (!userExists) {
        throw new Error("User not found");
      }

      const allProductsExist = productIds.every((pid) => products.some((p) => p.id === pid));
      if (!allProductsExist) {
        throw new Error("One or more products not found");
      }

      const newOrder = { id: uuidv4(), userId, productIds };
      orders.push(newOrder);
      await writeJsonFile(ordersPath, orders);

      return newOrder;
    },

    updateOrder: async (_, { id, userId, productIds }) => {
      const [users, products, orders] = await Promise.all([
        getUsers(),
        getProducts(),
        getOrders()
      ]);

      const index = orders.findIndex((o) => o.id === id);
      if (index === -1) {
        throw new Error("Order not found");
      }

      if (userId !== undefined) {
        const userExists = users.some((u) => u.id === userId);
        if (!userExists) {
          throw new Error("User not found");
        }
      }

      if (productIds !== undefined) {
        const allProductsExist = productIds.every((pid) => products.some((p) => p.id === pid));
        if (!allProductsExist) {
          throw new Error("One or more products not found");
        }
      }

      orders[index] = {
        ...orders[index],
        ...(userId !== undefined ? { userId } : {}),
        ...(productIds !== undefined ? { productIds } : {})
      };

      await writeJsonFile(ordersPath, orders);
      return orders[index];
    },

    deleteOrder: async (_, { id }) => {
      const orders = await getOrders();
      const exists = orders.some((o) => o.id === id);

      if (!exists) {
        throw new Error("Order not found");
      }

      const filteredOrders = orders.filter((o) => o.id !== id);
      await writeJsonFile(ordersPath, filteredOrders);

      return `Order ${id} deleted`;
    }
  },

  Subscription: {
    productCreated: {
      subscribe: () => pubsub.asyncIterator(PRODUCT_CREATED_EVENT)
    }
  },

  User: {
    orders: async (parent) => {
      const orders = await getOrders();
      return orders.filter((o) => o.userId === parent.id);
    }
  },

  Order: {
    user: async (parent) => {
      const users = await getUsers();
      const user = users.find((u) => u.id === parent.userId);
      if (!user) {
        throw new Error("User not found for this order");
      }
      return user;
    },
    products: async (parent) => {
      const products = await getProducts();
      return parent.productIds
        .map((pid) => products.find((p) => p.id === pid))
        .filter(Boolean);
    }
  }
};
