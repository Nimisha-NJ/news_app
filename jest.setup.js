// jest.setup.js
import '@testing-library/jest-dom';

// Polyfill TextEncoder and TextDecoder
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill Response
global.Response = class Response {
  constructor(body, options) {
    this.body = body;
    this.options = options;
  }
};

// Polyfill BroadcastChannel
global.BroadcastChannel = class {
  constructor() {
    this.listeners = [];
  }

  postMessage(message) {
    this.listeners.forEach((listener) => listener({ data: message }));
  }

  addEventListener(type, listener) {
    if (type === 'message') {
      this.listeners.push(listener);
    }
  }

  removeEventListener(type, listener) {
    if (type === 'message') {
      this.listeners = this.listeners.filter((l) => l !== listener);
    }
  }
};