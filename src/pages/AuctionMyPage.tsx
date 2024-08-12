import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Spacer,
  UnorderedList,
} from '@chakra-ui/react';
import Calendar from '../components/mypage/calendar/Calendar';

export default function AuctionMyPage() {
  return (
    <Flex className="max-w-screen-xl mx-auto h-h-screen-minus-nav">
      <Flex width={'250px'} direction={'column'} className="p-4 bg-slate-100 border border-r-black">
        <List spacing={3}>
          <ListItem>내 정보</ListItem>
          <ListItem>구매 내역</ListItem>
          <ListItem>판매 내역</ListItem>
          <ListItem>충전 내역</ListItem>
        </List>
        <Spacer />
        <List spacing={3} className="py-4">
          <ListItem>비밀번호 변경</ListItem>
          <ListItem>회원탈퇴</ListItem>
        </List>
      </Flex>
      <Box bgColor={'lightgray'} className="py-12 w-full flex justify-center">
        <Flex gap={10}>
          <Avatar width={'120px'} height={'120px'} />
          <Flex direction={'column'} bgColor={'skyblue'} gap={4}>
            <Flex gap={16}>
              <Flex direction={'column'} gap={2}>
                <Flex>
                  <div>아이디</div>
                  <Spacer />
                  <div>수정</div>
                </Flex>
                <InputGroup>
                  <Input width={'300px'} />
                </InputGroup>
              </Flex>
              <Flex direction={'column'} gap={2}>
                <Flex>
                  <div>이메일</div>
                  <Spacer />
                  <div>수정</div>
                </Flex>
                <InputGroup>
                  <Input width={'350px'} />
                  <InputRightElement width={'5rem'}>
                    <Button fontSize={'small'}>인증번호 받기</Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>
            </Flex>
            <UnorderedList className="text-sm mb-6">
              <ListItem>
                닉네임 또는 이메일은 최초 설정 또는 변경 후 30일이 지나야 바꿀 수 있습니다.
              </ListItem>
              <ListItem>소셜로그인 계정은 정보를 수정할 수 없습니다.</ListItem>
              <ListItem>이메일과 동일한 아이디는 사용이 불가능합니다.</ListItem>
            </UnorderedList>
            <Calendar />
            <List spacing={1}>
              <ListItem className="p-3 border border-black">메시 국대 유니폼 입찰</ListItem>
              <ListItem className="p-3 border border-black">메시 국대 유니폼 입찰</ListItem>
              <ListItem className="p-3 border border-black">메시 국대 유니폼 입찰</ListItem>
              <ListItem className="p-3 border border-black">메시 국대 유니폼 입찰</ListItem>
            </List>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}
