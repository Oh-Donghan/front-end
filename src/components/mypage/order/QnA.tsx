import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import MyQnA from './MyQnA';
import ReceivedQnA from './ReceivedQnA';

export default function QnA() {
  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em" fontWeight="bold">
        <Tab>내 질문 조회</Tab>
        <Tab>받은 질문 조회</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MyQnA />
        </TabPanel>
        <TabPanel>
          <ReceivedQnA />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
