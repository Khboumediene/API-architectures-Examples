import { createClient } from "graphql-ws";
import WebSocket from "ws";

const HTTP_URL = "http://localhost:4000/graphql";
const WS_URL = "ws://localhost:4000/graphql";

const OPERATIONS = {
  GET_ALL: `
    query GetAll {
      users {
        id
        name
        email
      }
      products {
        id
        name
        price
      }
      orders {
        id
        user {
          id
          name
        }
        products {
          id
          name
          price
        }
      }
    }
  `,
  CREATE_PRODUCT: `
    mutation CreateProduct($name: String!, $price: Float!) {
      createProduct(name: $name, price: $price) {
        id
        name
        price
      }
    }
  `,
  PRODUCT_CREATED: `
    subscription OnProductCreated {
      productCreated {
        id
        name
        price
      }
    }
  `
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function graphqlRequest(query, variables = {}) {
  const response = await fetch(HTTP_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({ query, variables })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`HTTP ${response.status}: ${body}`);
  }

  const json = await response.json();

  if (json.errors?.length) {
    throw new Error(JSON.stringify(json.errors, null, 2));
  }

  return json.data;
}

function createWsClient() {
  return createClient({
    url: WS_URL,
    webSocketImpl: WebSocket,
    on: {
      connected: () => {
        console.log("Connected to WS");
      },
      error: (error) => {
        console.error("WS client error:", error);
      }
    }
  });
}

function subscribeToProductCreated(client) {
  let dispose = () => {};

  const firstEvent = new Promise((resolve, reject) => {
    dispose = client.subscribe(
      {
        query: OPERATIONS.PRODUCT_CREATED
      },
      {
        next: (payload) => {
          if (payload.errors?.length) {
            console.error("Subscription payload errors:", payload.errors);
            return;
          }

          console.log("Product created event received");
          console.log(JSON.stringify(payload.data, null, 2));
          resolve(payload.data);
        },
        error: (error) => {
          console.error("Subscription error:", error);
          reject(error);
        },
        complete: () => {
          console.log("Subscription completed");
        }
      }
    );
  });

  console.log("Subscribed");

  return {
    firstEvent,
    stop: () => dispose()
  };
}

async function test() {
  const wsClient = createWsClient();
  const subscription = subscribeToProductCreated(wsClient);

  try {
    console.log("Fetching initial data...");
    const initialData = await graphqlRequest(OPERATIONS.GET_ALL);
    console.log(JSON.stringify(initialData, null, 2));

    await sleep(2000);

    const productName = `Product-${Date.now()}`;
    const productPrice = 999.99;

    console.log("Sending createProduct mutation...");
    const mutationResult = await graphqlRequest(OPERATIONS.CREATE_PRODUCT, {
      name: productName,
      price: productPrice
    });
    console.log("Mutation result:");
    console.log(JSON.stringify(mutationResult, null, 2));

    await Promise.race([
      subscription.firstEvent,
      sleep(5000).then(() => {
        throw new Error("Timed out waiting for productCreated event");
      })
    ]);

    console.log("Fetching final data...");
    const finalData = await graphqlRequest(OPERATIONS.GET_ALL);
    console.log(JSON.stringify(finalData, null, 2));
  } finally {
    subscription.stop();
    await sleep(100);
  }
}

test().catch((error) => {
  console.error("Test failed:", error);
  process.exitCode = 1;
});
