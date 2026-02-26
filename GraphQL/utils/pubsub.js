import { EventEmitter } from "node:events";

class PubSub {
  constructor() {
    this.ee = new EventEmitter();
  }

  publish(triggerName, payload) {
    this.ee.emit(triggerName, payload);
  }

  asyncIterator(triggerName) {
    const ee = this.ee;

    return {
      [Symbol.asyncIterator]() {
        const queue = [];
        const pullQueue = [];
        let listening = true;

        const pushValue = (event) => {
          if (!listening) {
            return;
          }

          if (pullQueue.length > 0) {
            const resolve = pullQueue.shift();
            resolve({ value: event, done: false });
          } else {
            queue.push(event);
          }
        };

        ee.on(triggerName, pushValue);

        const removeListener = () => {
          listening = false;
          ee.off(triggerName, pushValue);
        };

        return {
          next() {
            if (!listening) {
              return Promise.resolve({ value: undefined, done: true });
            }

            if (queue.length > 0) {
              const value = queue.shift();
              return Promise.resolve({ value, done: false });
            }

            return new Promise((resolve) => {
              pullQueue.push(resolve);
            });
          },
          return() {
            removeListener();
            return Promise.resolve({ value: undefined, done: true });
          },
          throw(error) {
            removeListener();
            return Promise.reject(error);
          }
        };
      }
    };
  }
}

export const pubsub = new PubSub();
