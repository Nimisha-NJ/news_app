// src/mocks/server.js
import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const server = setupServer(
  // Define request handlers for your tests
  rest.get('https://newsapi.org/v2/everything', (req, res, ctx) => {
    return res(
      ctx.json({
        articles: [
          { title: 'Test News', description: 'Test Description', urlToImage: '', url: '#' },
        ],
      })
    );
  })
);