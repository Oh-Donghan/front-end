import { rest } from 'msw';
import purchaseHistory from './json/purchaseHistory.json';
import sellHistory from './json/sellHistory.json';
import rechargeHistory from './json/rechargeHistory.json';
import auctionData from './json/auctionList.json';
import categories from './json/category.json';

export const handlers = [
  // 판매 목록 조회
  rest.get('https://fake-server.com/api/transactions/sales', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '0', 10);
    const size = parseInt(req.url.searchParams.get('size') || '5', 10);
    const word = req.url.searchParams.get('word') || '';
    const transTypeString = req.url.searchParams.get('transTypeString') || '';
    const sorted = req.url.searchParams.get('sorted') || 'recent'; // 정렬 기준 추가
    const startDate = req.url.searchParams.get('startDate') || '';
    const endDate = req.url.searchParams.get('endDate') || '';

    let filteredData = sellHistory.content;

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

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredData = filteredData.filter(item => {
        const saleDate = new Date(item.saleDate);
        return saleDate >= start && saleDate <= end;
      });
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

  // 구매 목록 조회
  rest.get('https://fake-server.com/api/transactions/purchases', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '0', 10);
    const size = parseInt(req.url.searchParams.get('size') || '5', 10);
    const word = req.url.searchParams.get('word') || '';
    const transTypeString = req.url.searchParams.get('transTypeString') || '';
    const sorted = req.url.searchParams.get('sorted') || 'recent'; // 정렬 기준 추가
    const startDate = req.url.searchParams.get('startDate') || '';
    const endDate = req.url.searchParams.get('endDate') || '';

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

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredData = filteredData.filter(item => {
        const saleDate = new Date(item.saleDate);
        return saleDate >= start && saleDate <= end;
      });
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

  // 포인트 사용 목록 조회
  rest.get('https://fake-server.com/api/members/points/history', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '0', 10);
    const size = parseInt(req.url.searchParams.get('size') || '5', 10);
    const sorted = req.url.searchParams.get('sorted') || 'recent'; // 정렬 기준 추가
    const startDate = req.url.searchParams.get('startDate') || '';
    const endDate = req.url.searchParams.get('endDate') || '';

    let filteredData = rechargeHistory.content;

    // 정렬 처리
    if (sorted === 'recent') {
      filteredData = filteredData.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sorted === 'old') {
      filteredData = filteredData.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filteredData = filteredData.filter(item => {
        const saleDate = new Date(item.createdAt);
        return saleDate >= start && saleDate <= end;
      });
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

  // 경매 목록 조회
  rest.get('https://fake-server.com/api/auctions', (req, res, ctx) => {
    const page = parseInt(req.url.searchParams.get('page') || '0', 10);
    const size = parseInt(req.url.searchParams.get('size') || '10', 10);
    const type = req.url.searchParams.get('type') || '';
    const word = req.url.searchParams.get('word') || '';
    const category = req.url.searchParams.get('category') || '';
    const sorted = req.url.searchParams.get('sorted') || 'recent'; // 정렬 기준

    let filteredData = auctionData.content;

    // 검색어 필터링
    if (word) {
      filteredData = filteredData.filter(item =>
        item.productName.toLowerCase().includes(word.toLowerCase()),
      );
    }

    // 카테고리 필터링
    if (category) {
      filteredData = filteredData.filter(
        item =>
          item.parentCategory.categoryName.toLowerCase() === category.toLowerCase() ||
          item.childCategory.categoryName.toLowerCase() === category.toLowerCase(),
      );
    }

    // 'hot' 타입 처리: 해당 카테고리에서 memberCount가 높은 상위 5개 아이템만 반환
    if (type === 'hot') {
      filteredData = filteredData.sort((a, b) => b.memberCount - a.memberCount).slice(0, 5);
    } else {
      // 일반 정렬 처리
      if (sorted === 'recent') {
        filteredData = filteredData.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
      } else if (sorted === 'date') {
        filteredData = filteredData.sort(
          (a, b) => new Date(a.endedAt).getTime() - new Date(b.endedAt).getTime(),
        );
      } else if (sorted === 'view') {
        filteredData = filteredData.sort((a, b) => b.memberCount - a.memberCount);
      } else if (sorted === 'low') {
        filteredData = filteredData.sort((a, b) => Number(a.currentPrice) - Number(b.currentPrice));
      } else if (sorted === 'high') {
        filteredData = filteredData.sort((a, b) => Number(b.currentPrice) - Number(a.currentPrice));
      }
    }

    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    const response = {
      totalElements: filteredData.length,
      totalPages: Math.ceil(filteredData.length / size),
      size: size,
      content: paginatedData,
      number: page,
      first: page === 0,
      last: endIndex >= filteredData.length,
      sort: {
        empty: sorted === '',
        sorted: sorted !== '',
        unsorted: sorted === '',
      },
      numberOfElements: paginatedData.length,
      pageable: {
        pageNumber: page,
        pageSize: size,
        offset: startIndex,
        paged: true,
        unpaged: false,
      },
      empty: paginatedData.length === 0,
    };

    return res(ctx.status(200), ctx.json(response));
  }),

  // 대분류 카테고리 조회
  rest.get('https://fake-server.com/api/categories', (req, res, ctx) => {
    const response = categories;

    return res(ctx.status(200), ctx.json(response));
  }),
];
