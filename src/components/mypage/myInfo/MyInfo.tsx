import {
  Box,
  Button,
  Flex,
  Text,
  Spinner,
  Heading,
  useDisclosure,
  Tooltip,
} from '@chakra-ui/react';
import MyInfoTable from './MyInfoTable';
import { useQuery } from '@tanstack/react-query';
import { fetchMemberInquiry } from '../../../axios/mypage/memberinquiry';
import { formatDate } from '../../../utils/dateFormat';
import { formatPrice } from '../../../utils/formatPrice';
import { useRef } from 'react';
import ChangeEmail from './modal/ChangeEmail';
import { cleanEmail } from '../../../utils/cleanEmail';

export default function MyInfo() {
  const changeEmailDisclosure = useDisclosure();
  const initialRef = useRef(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['memberInquiry'],
    queryFn: fetchMemberInquiry,
  });

  console.log('회원 조회:', data);

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return <div>data fetching error...</div>;
  }

  return (
    <>
      <ChangeEmail
        onClose={changeEmailDisclosure.onClose}
        isOpen={changeEmailDisclosure.isOpen}
        initialRef={initialRef}
        memberEmail={data?.email}
      />
      {data && (
        <Box
          className="flex flex-col"
          w="100%"
          h="100vh"
          overflow="hidden"
          textColor={'rgba(70,70,70,1)'}
        >
          <Box>
            <Heading mb={6}>내 정보</Heading>
            <Flex direction="column" mb="30px" fontSize="lg">
              <Flex gap={1}>
                <Text fontWeight="bold">아이디:</Text>
                <Text>{data.memberId}</Text>
              </Flex>
              <Flex gap={1} alignItems="center">
                <Text fontWeight="bold">이메일:</Text>
                <Text>{cleanEmail(data.email)}</Text>
                <Tooltip
                  label="소셜로그인은 비밀번호 변경이 불가합니다."
                  aria-label="A tooltip"
                  isDisabled={!data.social}
                >
                  <Button
                    size="sm"
                    colorScheme="blue"
                    ml={1}
                    onClick={changeEmailDisclosure.onOpen}
                    isDisabled={!!data.social}
                  >
                    변경
                  </Button>
                </Tooltip>
              </Flex>
              <Flex gap={1}>
                <Text fontWeight="bold">가입날짜:</Text>
                <Text>{formatDate(data.createdAt)}</Text>
              </Flex>
            </Flex>
            <Flex alignItems="center" justifyContent="flex-end" gap={2}>
              <Text fontSize="xl" fontWeight="bold">
                보유 포인트:
              </Text>
              <Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold" color="#3182ce">
                {formatPrice(data.point)}P
              </Text>
            </Flex>
          </Box>

          <Flex direction="column" gap="2">
            <Text fontSize="lg" fontWeight="bold">
              입찰 내역
            </Text>
          </Flex>
          {/* 테이블 */}
          <MyInfoTable />
        </Box>
      )}
    </>
  );
}
