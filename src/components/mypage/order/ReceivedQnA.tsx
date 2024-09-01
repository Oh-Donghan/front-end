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
  useToast,
} from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchReceiveQnAData, IAnswer } from '../../../axios/mypage/receiveqna';
import maskUserId from '../../../utils/maskUserId';
import { formatDate } from '../../../utils/dateFormat';
import QnAAnswer from './modal/QnAAnswer';
import { fetchDeleteAnswerQnA } from '../../../axios/mypage/deleteanswerqna';

export default function ReceivedQnA() {
  const qnaAnswerDisclosure = useDisclosure();
  const initialRef = useRef(null);
  const toast = useToast();
  const { ref, inView } = useInView();

  // 선택된 질문 제목, 내용을 모달에 전달하기 위한 state
  const [selectedQuestion, setSelectedQuestion] = useState({
    title: '',
    content: '',
    auctionId: 0,
    id: 0,
    existingAnswer: null, // 기존 답변 정보
  });

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

  const deleteAnswer = () => {
    try {
      fetchDeleteAnswerQnA;
      toast({
        title: '답변이 성공적으로 삭제되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // 답변 삭제 후 목록 갱신 또는 화면 업데이트
      // 예를 들어: setData((prevData) => prevData.filter((item) => item.id !== answerId));
    } catch (error) {
      toast({
        title: '답변 삭제에 실패했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
                      <Text>{maskUserId(qna.writerId)}</Text>
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
                      {qna.answerList && qna.answerList.length > 0 ? (
                        <Button size="sm" ml="10px" onClick={deleteAnswer}>
                          답변 삭제
                        </Button>
                      ) : (
                        ''
                      )}
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
                              <Text>{maskUserId(answer.writerId)}</Text>
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
                                  <Image src={image.imageUrl} alt="Answer Image" />
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
