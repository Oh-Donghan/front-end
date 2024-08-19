import { rest } from 'msw';
import purchaseHistory from './json/purchaseHistory.json';
import sellHistory from './json/sellHistory.json';

export const handlers = [
  rest.get('https://fake-server.com/api/transactions/sales', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(sellHistory));
  }),

  rest.get('https://fake-server.com/api/transactions/purchases', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '0', 10);
    const size = parseInt(req.url.searchParams.get('size') || '5', 10);
    const word = req.url.searchParams.get('word') || '';
    const transTypeString = req.url.searchParams.get('transTypeString') || '';
    const sorted = req.url.searchParams.get('sorted') || 'recent'; // 정렬 기준 추가

    let filteredData = purchaseHistory.content;

    if (word) {
      filteredData = filteredData.filter(item =>
        item.productName.toLowerCase().includes(word.toLowerCase()),
      );
    }

    if (transTypeString) {
      filteredData = filteredData.filter(item => item.transType === transTypeString);
    }

    // 정렬 처리
    if (sorted === 'recent') {
      filteredData = filteredData.sort(
        (a, b) => new Date(b.saleDate).getTime() - new Date(a.saleDate).getTime(),
      );
    } else if (sorted === 'old') {
      filteredData = filteredData.sort(
        (a, b) => new Date(a.saleDate).getTime() - new Date(b.saleDate).getTime(),
      );
    } else if (sorted === 'low') {
      filteredData = filteredData.sort((a, b) => Number(a.salePrice) - Number(b.salePrice));
    } else if (sorted === 'high') {
      filteredData = filteredData.sort((a, b) => Number(b.salePrice) - Number(a.salePrice));
    }

    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const response = {
      content: paginatedData,
      totalPages: Math.ceil(filteredData.length / size),
      totalElements: filteredData.length,
      number: page,
      size: size,
      first: page === 0,
      last: endIndex >= filteredData.length,
    };

    return res(ctx.status(200), ctx.json(response));
  }),
];
