import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  useDisclosure,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';
import QnAModal from './modal/QnAModal';
import maskUserId from '../../utils/maskUserId';
import { IAskList } from '../../axios/auctionDetail/auctionDetail';
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/atom/authAtom';

export default function QnaSection({ qna }: { qna: IAskList[] }) {
  const [auth] = useRecoilState(authState);
  const qnaDisclosure = useDisclosure();
  const initialRef = useRef(null);

  if (!qna) {
    return <div>data not fetched...</div>;
  }

  return (
    <>
      <QnAModal
        onClose={qnaDisclosure.onClose}
        isOpen={qnaDisclosure.isOpen}
        initialRef={initialRef}
      />

      <Box flex={1}>
        <Flex justify="space-between" align="center" py={4}>
          <Text fontSize="4xl" fontWeight="bold">
            Q&A
          </Text>
          <Button onClick={qnaDisclosure.onOpen} colorScheme="blue" size="sm" isDisabled={!auth}>
            질문 작성하기
          </Button>
        </Flex>
        <Box h="64" overflowY="scroll">
          <Accordion allowToggle>
            {qna.length > 0
              ? qna.map(ask => (
                  <AccordionItem key={ask.id}>
                    <h2>
                      <AccordionButton>
                        <Flex flex="1" wrap="wrap" gap={1} alignItems="center" textAlign="left">
                          <Text fontSize="lg">{ask.title}</Text>
                          <Text>-</Text>
                          <Text fontSize="sm" textColor="gray.600">
                            {maskUserId(ask.writerId)}
                          </Text>
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel>{ask.content}</AccordionPanel>
                  </AccordionItem>
                ))
              : '질문이 없습니다.'}
          </Accordion>
        </Box>
      </Box>
    </>
  );
}
