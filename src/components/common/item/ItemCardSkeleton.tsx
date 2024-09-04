import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

export default function ItemCardSkeleton() {
  return (
    <Card borderWidth="1px" borderColor="gray.200" position={'relative'} zIndex={40}>
      <CardBody>
        <Box position={'relative'}>
          <Box width={'100%'} height={'210px'} borderRadius="lg" bgColor={'rgba(230,230,230,1)'} />
        </Box>
        <Stack mt="6" spacing="3">
          <Stack direction="row">
            <Box bgColor={'rgba(230,230,230,1)'} w={'26px'} h={'15px'}></Box>
            <Box bgColor={'rgba(230,230,230,1)'} w={'26px'} h={'15px'}></Box>
          </Stack>
          <Heading bgColor={'rgba(230,230,230,1)'} w={'80%'} h={'22px'}></Heading>
          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text bgColor={'rgba(230,230,230,1)'} w={'100%'} h={'22px'}></Text>
          </Flex>
          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text bgColor={'rgba(230,230,230,1)'} w={'100%'} h={'22px'}></Text>
          </Flex>
          <Flex justifyContent={'space-between'} alignItems={'center'} height={'25px'}>
            <Text bgColor={'rgba(230,230,230,1)'} w={'100%'} h={'22px'}></Text>
          </Flex>
        </Stack>
      </CardBody>
      <Divider bgColor={'rgba(230,230,230,1)'} />
      <CardFooter>
        <Button variant="solid" bgColor={'rgba(230,230,230,1)'} width={'full'}></Button>
      </CardFooter>
    </Card>
  );
}
