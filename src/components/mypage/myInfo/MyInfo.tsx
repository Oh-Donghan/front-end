import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  ListItem,
  UnorderedList,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
} from '@chakra-ui/react';
// import Calendar from '../calendar/Calendar';

export default function MyInfo() {
  return (
    <Box
      className="flex justify-center flex-col"
      w="100%"
      h="100vh"
      overflow="hidden"
      textColor={'rgba(70,70,70,1)'}
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={10}
        justifyContent="center"
        alignItems={{ base: 'center', md: 'flex-start' }}
      >
        <Avatar width={{ base: '80px', md: '120px' }} height={{ base: '80px', md: '120px' }} />
        <Flex
          direction="column"
          gap={4}
          w={{ base: '100%', md: 'auto' }}
          flex="1" // 남은 공간을 차지하도록 설정
        >
          <Flex direction={{ base: 'column', md: 'row' }} gap={8} flex="1">
            <Flex direction="column" gap={2} w="100%">
              <Flex justifyContent="space-between">
                <div>아이디</div>
                <div>수정</div>
              </Flex>
              <InputGroup>
                <Input w="100%" />
              </InputGroup>
            </Flex>
            <Flex direction="column" gap={2} w="100%">
              <Flex justifyContent="space-between">
                <div>이메일</div>
                <div>수정</div>
              </Flex>
              <InputGroup>
                <Input w="100%" />
                <InputRightElement width="5rem">
                  <Button fontSize="small">인증번호 받기</Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </Flex>
          <UnorderedList className="text-sm mb-6" w="100%" flex="1">
            <ListItem>
              닉네임 또는 이메일은 최초 설정 또는 변경 후 30일이 지나야 바꿀 수 있습니다.
            </ListItem>
            <ListItem>소셜로그인 계정은 정보를 수정할 수 없습니다.</ListItem>
            <ListItem>이메일과 동일한 아이디는 사용이 불가능합니다.</ListItem>
          </UnorderedList>
        </Flex>
      </Flex>
      <Flex direction="column" gap="2">
        <Text>포인트 사용 내역</Text>
        {/* <Calendar /> */}
      </Flex>
      {/* 테이블 */}
      <div className="overflow-y-scroll no-scrollbar h-full">
        <Table variant="simple" width="full" sx={{ tableLayout: 'fixed' }}>
          <Tbody>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>2012000P</Box>
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>아이템이름</Td>
              <Td>
                <Box display="flex" justifyContent="end" gap="6">
                  <Box className="block">2024-08-14</Box>
                  <Box>20000P</Box>
                </Box>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </div>
    </Box>
  );
}
