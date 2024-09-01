import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Divider,
  Flex,
  Spinner,
  Text,
  Image,
  Badge,
  useDisclosure,
} from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { fetchMyQnAData, IQnA } from '../../../axios/mypage/myqna';
import maskUserId from '../../../utils/maskUserId';
import { formatDate } from '../../../utils/dateFormat';
import MyQnAFix from './modal/MyQnAFix';

export default function MyQnA() {
  const myQnAFixDisclosure = useDisclosure();
  const initialRef = useRef(null);
  const { ref, inView } = useInView();
  const pageSize = 10;
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery({
    queryKey: ['myQnA'],
    queryFn: ({ pageParam = 0 }) => fetchMyQnAData({ page: pageParam, size: pageSize }),
    getNextPageParam: lastPage => {
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

  const handleEditClick = (qna: IQnA) => {
    setSelectedQuestion({
      title: qna.title,
      content: qna.content,
      auctionId: qna.auctionId,
      id: qna.id,
      existingAnswer: qna.answerList,
    });
    myQnAFixDisclosure.onOpen();
  };

  console.log('qna:', data);

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

  return (
    <>
      {selectedQuestion && (
        <MyQnAFix
          onClose={myQnAFixDisclosure.onClose}
          isOpen={myQnAFixDisclosure.isOpen}
          initialRef={initialRef}
          questionTitle={selectedQuestion.title}
          questionContent={selectedQuestion.content}
          askId={selectedQuestion.id}
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
                      <Button colorScheme="blue" size="sm" onClick={() => handleEditClick(qna)}>
                        질문 수정
                      </Button>
                      <Button size="sm" ml="10px">
                        질문 삭제
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
