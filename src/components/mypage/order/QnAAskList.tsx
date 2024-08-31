import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Spinner,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchQnAAskData } from '../../../axios/mypage/qnaAsk';

export default function QnAAskList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['asks'],
    queryFn: fetchQnAAskData,
  });

  console.log('asks:', data);

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100%" width="100%">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (isError) {
    return <div>Error loading data</div>;
  }

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Section 1 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
