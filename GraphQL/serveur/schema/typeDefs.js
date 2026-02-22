export const typeDefs = `#graphql

type User {
  id: ID!
  name: String!
  email: String!
  orders: [Order]
}

type Product {
  id: ID!
  name: String!
  price: Float!
}

type Order {
  id: ID!
  user: User!
  products: [Product]
}

type Query {
  users: [User]
  products: [Product]
  orders: [Order]

  user(id: ID!): User
  product(id: ID!): Product
  order(id: ID!): Order
}

type Mutation {

  # USERS
  createUser(name: String!, email: String!): User
  updateUser(id: ID!, name: String, email: String): User
  deleteUser(id: ID!): String

  # PRODUCTS
  createProduct(name: String!, price: Float!): Product
  updateProduct(id: ID!, name: String, price: Float): Product
  deleteProduct(id: ID!): String

  # ORDERS
  createOrder(userId: ID!, productIds: [ID!]!): Order
  updateOrder(id: ID!, userId: ID, productIds: [ID!]): Order
  deleteOrder(id: ID!): String
}
`;
