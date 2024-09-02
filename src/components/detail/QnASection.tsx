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
  Badge,
  Divider,
  Image,
} from '@chakra-ui/react';
import { useRef } from 'react';
import QnAModal from './modal/QnAModal';
import { IAskList } from '../../axios/auctionDetail/auctionDetail';
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/atom/authAtom';
import { formatDate } from '../../utils/dateFormat';

export default function QnaSection({
  qna,
  sellerId,
  auctionState,
}: {
  qna: IAskList[];
  sellerId: string;
  auctionState: string;
}) {
  const [auth] = useRecoilState(authState);
  const memberId = localStorage.getItem('memberId');
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
          <Button
            onClick={qnaDisclosure.onOpen}
            colorScheme="blue"
            size="sm"
            isDisabled={!auth || sellerId === memberId || auctionState === 'END'}
          >
            질문 작성하기
          </Button>
        </Flex>
        <Box h="64" overflowY="scroll">
          <Accordion allowToggle>
            {qna.length > 0
              ? qna.map(ask => (
                  <AccordionItem key={ask.id}>
                    <h2>
                      <AccordionButton
                        paddingX={{ base: '4px', md: '12px' }}
                        paddingY={{ base: '6px', md: '20px' }}
                      >
                        <Flex gap={4} flex="1" textAlign="left">
                          <Text fontWeight="bold">{ask.auctionTitle}</Text> -{' '}
                          <Text>{ask.writerId}</Text>
                          {ask.answerList && ask.answerList.length > 0 ? (
                            <Flex justifyContent="center" alignItems="center">
                              <Badge colorScheme="blue">답변완료</Badge>
                            </Flex>
                          ) : (
                            <Flex justifyContent="center" alignItems="center">
                              <Badge>답변전</Badge>
                            </Flex>
                          )}
                        </Flex>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} bgColor={'gray.50'}>
                      <Flex direction="column" gap={1}>
                        <Flex gap={2} fontWeight="bold">
                          <Text>제목:</Text>
                          <Text>{ask.title}</Text>
                        </Flex>
                        <Flex gap={2} fontSize="sm">
                          <Text>생성날짜:</Text>
                          <Text>{formatDate(ask.createdAt)}</Text>
                        </Flex>
                        <Divider borderColor="gray.500" />
                        <Box>{ask.content}</Box>

                        {/* 답변 영역 */}
                        {ask.answerList && ask.answerList.length > 0 ? (
                          <Flex
                            direction="column"
                            gap={1}
                            mt={4}
                            p={4}
                            border="1px"
                            borderColor="blue.200"
                            borderRadius="md"
                            bgColor="blue.50"
                          >
                            {ask.answerList.map(answer => (
                              <Box key={answer.id}>
                                <Flex gap={2} fontWeight="bold" color="blue.600">
                                  <Text>답변 제목:</Text>
                                  <Text>{answer.title}</Text>
                                </Flex>
                                <Flex gap={2} fontSize="sm" color="blue.600">
                                  <Text>작성자:</Text>
                                  <Text>{answer.writerId}</Text>
                                </Flex>
                                <Flex gap={2} fontSize="sm" color="blue.600">
                                  <Text>작성일:</Text>
                                  <Text>{formatDate(answer.createdAt)}</Text>
                                </Flex>
                                <Box mt={2} color="blue.800">
                                  {answer.content}
                                </Box>
                                <Divider borderColor="blue.300" mt={2} />
                                {answer.imageList &&
                                  answer.imageList.length > 0 &&
                                  answer.imageList.map(image => (
                                    <Box key={image.id} mt={2}>
                                      <Image
                                        src={image.imageUrl}
                                        alt="Answer Image"
                                        w="200px"
                                        h="full"
                                      />
                                    </Box>
                                  ))}
                              </Box>
                            ))}
                          </Flex>
                        ) : (
                          <Text mt={4} color="gray.600">
                            아직 답변이 없습니다.
                          </Text>
                        )}
                      </Flex>
                    </AccordionPanel>
                  </AccordionItem>
                ))
              : '질문이 없습니다.'}
          </Accordion>
        </Box>
      </Box>
    </>
  );
}
