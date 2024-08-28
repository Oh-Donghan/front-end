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
} from '@chakra-ui/react';
import { useRef } from 'react';
import QnAModal from './modal/QnAModal';
import QnAAnswer from './modal/QnAAnswer';
import QnAAnswerFix from './modal/QnAAnswerFix';

export default function QnaSection() {
  const qnaDisclosure = useDisclosure();
  const qnaAnswer = useDisclosure();
  const qnaAnswerFix = useDisclosure();
  const initialRef = useRef(null);

  return (
    <>
      <QnAModal
        onClose={qnaDisclosure.onClose}
        isOpen={qnaDisclosure.isOpen}
        initialRef={initialRef}
      />
      <QnAAnswer onClose={qnaAnswer.onClose} isOpen={qnaAnswer.isOpen} initialRef={initialRef} />
      <QnAAnswerFix
        onClose={qnaAnswerFix.onClose}
        isOpen={qnaAnswerFix.isOpen}
        initialRef={initialRef}
      />

      <Box flex={1}>
        <Flex justify="space-between" align="center" py={4}>
          <Text fontSize="4xl">Q&A</Text>
          <Text onClick={qnaDisclosure.onOpen} cursor="pointer" color="blue.500">
            질문 작성하기
          </Text>
        </Flex>
        <Box
          h="64"
          overflowY="scroll"
          sx={{
            '::-webkit-scrollbar': { display: 'none' }, // 크롬, 사파리에서 스크롤바 숨기기
            '-ms-overflow-style': 'none', // IE, Edge에서 스크롤바 숨기기
            'scrollbar-width': 'none', // 파이어폭스에서 스크롤바 숨기기
          }}
        >
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 1 title - 아이디1**
                    <Text
                      as="span"
                      onClick={e => {
                        e.stopPropagation();
                        qnaAnswer.onOpen();
                      }}
                      fontSize="sm"
                      border="1px solid"
                      borderColor="black"
                      borderRadius="4px"
                      px="2"
                      py="1"
                      cursor="pointer"
                      ml="6px"
                    >
                      답글 달기
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 2 title - 아이디2**
                    <Text
                      as="span"
                      onClick={e => {
                        e.stopPropagation();
                        qnaAnswerFix.onOpen();
                      }}
                      fontSize="sm"
                      border="1px solid"
                      borderColor="black"
                      borderRadius="4px"
                      px="2"
                      py="1"
                      cursor="pointer"
                      ml="6"
                    >
                      답글 수정
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 3 title - 아이디3**
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 3 title - 아이디3**
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 3 title - 아이디3**
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Section 3 title - 아이디3**
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Box>
    </>
  );
}
