/* eslint-disable react-refresh/only-export-components */
import { extendTheme } from '@chakra-ui/react';

// chakra ui와 tailwind 너비 엔드포인트가 조금 달라서 커스텀으로 설정했습니다.
export const customTheme = extendTheme({
  breakpoints: {
    sm: '30em', // 480px
    sm2: '37.5em', // 600px
    md: '48em', // 768px
    lg: '64em', // 1024px
    xl: '80em', // 1280px
    '2xl': '96em', // 1536px
  },
});

export { ChakraProvider } from '@chakra-ui/react';
