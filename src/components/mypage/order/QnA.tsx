import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import MyQnA from './MyQnA';
import ReceivedQnA from './ReceivedQnA';

export default function QnA() {
  return (
    <Box w="100%" h="100vh" overflow="hidden">
      {/* 부모 요소에 100vh로 높이 설정 */}
      <Tabs isFitted variant="enclosed" h="100%">
        {/* Tabs 컴포넌트에도 높이 설정 */}
        <TabList fontWeight="bold">
          <Tab>내 질문 조회</Tab>
          <Tab>받은 질문 조회</Tab>
        </TabList>
        <TabPanels h="calc(100% - 3em)">
          {/* TabList 높이를 제외한 나머지 영역을 TabPanels가 차지 */}
          <TabPanel h="100%" overflowY="auto">
            {/* TabPanel도 전체 높이를 차지하고 내부 스크롤 */}
            <MyQnA />
          </TabPanel>
          <TabPanel h="100%" overflowY="auto">
            <ReceivedQnA />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
