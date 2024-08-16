import { rest } from 'msw';
import purchaseHistory from './json/purchaseHistory.json';
import sellHistory from './json/sellHistory.json';

export const handlers = [
  rest.get('/api/transactions/sales', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sellHistory));
  }),

  rest.get('/api/transactions/purchases', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(purchaseHistory));
  }),
];
