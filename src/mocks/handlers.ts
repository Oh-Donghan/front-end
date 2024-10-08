import { rest } from 'msw';
import purchaseHistory from './json/purchaseHistory.json';
import sellHistory from './json/sellHistory.json';
import rechargeHistory from './json/rechargeHistory.json';
import auctionData from './json/auctionList.json';
import categories from './json/category.json';
import { CreateAuctionType } from 'src/interface/auction/actionInterface';

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

    // 거래 상태로 필터링 (continue, end)
    if (transTypeString) {
      const mappedTransType =
        transTypeString === 'continue' ? 'CONTINUE' : transTypeString === 'end' ? 'SUCCESS' : '';
      if (mappedTransType) {
        filteredData = filteredData.filter(item => item.transType === mappedTransType);
      }
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

    // 검색어로 필터링
    if (word) {
      filteredData = filteredData.filter(item =>
        item.productName.toLowerCase().includes(word.toLowerCase()),
      );
    }

    // 거래 상태로 필터링 (continue, end)
    if (transTypeString) {
      const mappedTransType =
        transTypeString === 'continue' ? 'CONTINUE' : transTypeString === 'end' ? 'SUCCESS' : '';
      if (mappedTransType) {
        filteredData = filteredData.filter(item => item.transType === mappedTransType);
      }
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

  // 보유 포인트 API 모킹
  rest.get('https://fake-server.com/api/members/points', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        point: 1000, // 모킹된 포인트 값
      }),
    );
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
    const categoryName = req.url.searchParams.get('categoryName');

    let response;

    if (categoryName) {
      {
        /* params로 parentId를 받으면 해당하는 대분류의 소분류 카테고리 반환 */
      }
      response = categories.filter(category => {
        return category.categoryName === categoryName;
      })[0];
    } else {
      {
        /* 받지않으면 대분류 카테고리 반환 */
      }
      response = categories;
    }

    return res(ctx.status(200), ctx.json(response));
  }),

  // 주기적으로 가격 데이터 받아오기
  rest.get('https://fake-server.com/api/price-updates', (req, res, ctx) => {
    const currentPrice = Number(req.url.searchParams.get('currentPrice'));

    // currentPrice가 유효한 숫자인지 확인
    if (isNaN(currentPrice)) {
      return res(ctx.status(400), ctx.json({ error: 'Invalid currentPrice value' }));
    }

    // 10,000원에서 100,000원 사이의 랜덤 값 생성 (100원 단위)
    const randomIncrease = Math.floor(Math.random() * 91) * 100 + 10000; // 10,000원 ~ 100,000원 사이
    const updatedPrice = currentPrice + randomIncrease;

    // 랜덤 지연 추가
    const randomDelay = Math.floor(Math.random() * 4000) + 1000;

    // 응답을 클라이언트에 전송
    return res(
      ctx.delay(randomDelay),
      ctx.status(200),
      ctx.json({ currentPrice: updatedPrice }), // 항상 증가된 가격을 반환
    );
  }),

  // 경매 만들기
  rest.post('https://fake-server.com/api/auctions', (req, res, ctx) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = req.body as any;

    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res(ctx.status(401), ctx.json({ message: 'Unauthorized: Invalid or missing token' }));
    }

    const thumbnail = body.thumbnail;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const imageList = body.imageList || [];

    if (!thumbnail) {
      return res(ctx.status(400), ctx.json({ message: 'Bad Request: Thumbnail is required' }));
    }

    const createDtoString = body.createDto;
    if (typeof createDtoString !== 'string') {
      return res(ctx.status(400), ctx.json({ message: 'Bad Request: Invalid createDto' }));
    }

    let createDto: CreateAuctionType;
    try {
      createDto = JSON.parse(createDtoString);
    } catch (error) {
      return res(ctx.status(400), ctx.json({ message: 'Bad Request: Invalid JSON in createDto' }));
    }

    // 타입 가드 함수
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function isValidCreateAuctionDto(obj: any): obj is CreateAuctionType {
      return (
        typeof obj.title === 'string' &&
        typeof obj.receiveType === 'string' &&
        typeof obj.deliveryType === 'string' &&
        typeof obj.startPrice === 'number' &&
        typeof obj.instantPrice === 'number' &&
        typeof obj.endedAt === 'string' &&
        typeof obj.parentCategoryId === 'number' &&
        typeof obj.childCategoryId === 'number' &&
        typeof obj.productName === 'string' &&
        typeof obj.productStatus === 'number'
      );
    }

    if (!isValidCreateAuctionDto(createDto)) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Bad Request: Invalid data types in createDto' }),
      );
    }

    const {
      title,
      receiveType,
      deliveryType,
      startPrice,
      instantPrice,
      endedAt,
      parentCategoryId,
      childCategoryId,
      productName,
      productStatus,
    } = createDto;

    if (
      !title ||
      !receiveType ||
      !deliveryType ||
      !startPrice ||
      !instantPrice ||
      !endedAt ||
      !parentCategoryId ||
      !childCategoryId ||
      !productName ||
      !productStatus
    ) {
      return res(ctx.status(400), ctx.json({ message: 'Bad Request: Missing required fields' }));
    }

    const auctionId = Math.floor(Math.random() * 1000) + 1;

    return res(
      ctx.status(200),
      ctx.json({
        id: auctionId,
        title: title,
      }),
    );
  }),
];
