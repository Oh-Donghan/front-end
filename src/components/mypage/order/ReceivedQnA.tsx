import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchReceiveQnAData, IAnswer } from '../../../axios/mypage/receiveqna';
import { formatDate } from '../../../utils/dateFormat';
import QnAAnswer from './modal/QnAAnswer';
import DeleteReceiveQnA from './modal/DeleteReceiveQnA';

export default function ReceivedQnA() {
  const qnaAnswerDisclosure = useDisclosure();
  const deleteQnAAnswer = useDisclosure();
  const initialRef = useRef(null);
  const { ref, inView } = useInView();

  // 선택된 질문 제목, 내용을 모달에 전달하기 위한 state
  const [selectedQuestion, setSelectedQuestion] = useState({
    title: '',
    content: '',
    auctionId: 0,
    id: 0,
    existingAnswer: null, // 기존 답변 정보
  });

  // 답변 삭제 모달에 답변 id를 넘기기위한 state
  const [selectedAnswerId, setSelectedAnswerId] = useState(null);

  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['receiveQnA'],
    queryFn: ({ pageParam = 0 }) => fetchReceiveQnAData({ page: pageParam, size: pageSize }),
    getNextPageParam: lastPage => {
      // lastPage를 확인하여 다음 페이지 번호를 결정
      if (lastPage.number + 1 < lastPage.totalPages) {
        return lastPage.number + 1;
      }
      return undefined;
    },
    initialPageParam: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  console.log('Receiveqna:', data);

  if (isLoading && !data) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return <div>Error: {error.toString()}</div>;
  }

  if (!data) {
    return <div>No Data</div>;
  }

  const openAnswerModal = (
    title: string,
    content: string,
    auctionId: number,
    id: number,
    existingAnswer: IAnswer,
  ) => {
    setSelectedQuestion({ title, content, auctionId, id, existingAnswer });
    qnaAnswerDisclosure.onOpen();
  };

  console.log('선택된 답변 아이디', selectedAnswerId);

  return (
    <>
      <QnAAnswer
        onClose={qnaAnswerDisclosure.onClose}
        isOpen={qnaAnswerDisclosure.isOpen}
        initialRef={initialRef}
        questionTitle={selectedQuestion.title}
        questionContent={selectedQuestion.content}
        auctionId={selectedQuestion.auctionId}
        askId={selectedQuestion.id}
        existingAnswer={selectedQuestion.existingAnswer} // 기존 답변 정보 전달
      />
      {selectedAnswerId && (
        <DeleteReceiveQnA
          onClose={deleteQnAAnswer.onClose}
          isOpen={deleteQnAAnswer.isOpen}
          initialRef={initialRef}
          answerId={selectedAnswerId}
        />
      )}
      <Box h="100%" overflowY="auto">
        <Accordion allowToggle paddingY="20px">
          {data.pages.map(qnaPage =>
            qnaPage.content.map(qna => (
              <AccordionItem key={qna.id}>
                <h2>
                  <AccordionButton
                    paddingX={{ base: '4px', md: '12px' }}
                    paddingY={{ base: '6px', md: '20px' }}
                  >
                    <Flex gap={4} flex="1" textAlign="left">
                      <Text fontWeight="bold">{qna.auctionTitle}</Text> -{' '}
                      <Text>{qna.writerId}</Text>
                      {qna.answerList && qna.answerList.length > 0 ? (
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
                      <Text>{qna.title}</Text>
                    </Flex>
                    <Flex gap={2} fontSize="sm">
                      <Text>생성날짜:</Text>
                      <Text>{formatDate(qna.createdAt)}</Text>
                    </Flex>
                    <Divider borderColor="gray.500" />
                    <Box>{qna.content}</Box>
                    <Flex justifyContent="flex-end">
                      <Button
                        onClick={() =>
                          openAnswerModal(
                            qna.title,
                            qna.content,
                            qna.auctionId,
                            qna.id,
                            qna.answerList[0],
                          )
                        }
                        colorScheme="blue"
                        size="sm"
                      >
                        {qna.answerList && qna.answerList.length > 0 ? '답변 수정' : '답변 달기'}
                      </Button>
                    </Flex>
                    {/* 답변 영역 */}
                    {qna.answerList && qna.answerList.length > 0 ? (
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
                        {qna.answerList.map(answer => (
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
                                <Box key={image.id} mt={2} w="200px" h="100%">
                                  <Image src={image.imageUrl} alt="Answer Image" />
                                </Box>
                              ))}

                            <Flex justifyContent="flex-end">
                              <Button
                                size="sm"
                                mt={3}
                                onClick={() => {
                                  setSelectedAnswerId(answer.id);
                                  deleteQnAAnswer.onOpen();
                                }}
                              >
                                답변 삭제
                              </Button>
                            </Flex>
                          </Box>
                        ))}
                      </Flex>
                    ) : (
                      ''
                    )}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            )),
          )}
        </Accordion>
        <Box ref={ref} textAlign="center" py={4}>
          {hasNextPage ? <Spinner size="sm" /> : '마지막 목록 입니다.'}
        </Box>
      </Box>
    </>
  );
}
