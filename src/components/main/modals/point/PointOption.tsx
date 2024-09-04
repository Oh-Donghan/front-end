import { Box, useRadio } from '@chakra-ui/react';

export default function PointOption(props) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'rgb(49, 130, 206)',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={17.5}
      >
        {props.children}
      </Box>
    </Box>
  );
}
