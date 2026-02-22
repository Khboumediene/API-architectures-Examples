import {
  ApolloClient,
  InMemoryCache,
  gql,
  HttpLink,
} from "@apollo/client/core";
import fetch from "cross-fetch";

// 1️⃣ Configurer le client Apollo
const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql", fetch }),
  cache: new InMemoryCache(),
});

// 2️⃣ Définir une requête GraphQL (exemple : récupérer user avec orders et products)
const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      orders {
        id
        products {
          name
          price
        }
      }
    }
  }
`;

// 3️⃣ Variables de la requête
const variables = { id: "1" };

// 4️⃣ Exécuter la requête
client
  .query({ query: GET_USER, variables })
  .then((result) => {
    console.log("=== Résultat GraphQL ===");
    console.dir(result.data, { depth: null });
  })
  .catch((error) => {
    console.error("Erreur GraphQL:", error);
  });

// 5️⃣ Exemple d'une mutation
const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

const userVariables = { name: "Bob", email: "bob@example.com" };

client
  .mutate({ mutation: CREATE_USER, variables: userVariables })
  .then((result) => {
    console.log("=== Création Utilisateur ===");
    console.dir(result.data, { depth: null });
  })
  .catch((error) => {
    console.error("Erreur Mutation:", error);
  });
