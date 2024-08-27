import { Box, List, ListItem, Flex, Text, Icon } from '@chakra-ui/react';
import { FaUserCheck } from 'react-icons/fa';

const bidList = [1, 2, 3, 4, 5]; // Mock data

const BidList = () => {
  return (
    <Box mt={8} flex={1}>
      <List spacing={4}>
        {bidList.map((bid, idx) => (
          <ListItem key={idx}>
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <Icon as={FaUserCheck} color="green.500" />
                <Text fontSize="md" ml={2}>
                  dlsdid*** - 95,000원 입찰 하셨습니다.
                </Text>
              </Flex>
              <Text fontSize="sm" color="gray.500">
                1시간 전
              </Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default BidList;
