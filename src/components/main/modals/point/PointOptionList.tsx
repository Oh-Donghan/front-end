import { useRadioGroup, Grid, Box } from '@chakra-ui/react';
import PointOption from './PointOption';

export default function PointOptionList({ setChargePoint, inputError, setDirectInputMode }) {
  const options = ['5000P', '10,000P', '30,000P', '50,000P', '100,000P', '직접입력'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: '5000P',
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <Grid {...group} templateColumns="repeat(3, 1fr)" gap={5} marginBottom={'18px'}>
      {options.map(value => {
        const radio = getRadioProps({ value });
        return (
          <Box
            key={value}
            onClick={() => {
              if (inputError) return;
              if (value === '직접입력') {
                setDirectInputMode(true);
                setChargePoint(0);

                return;
              } else {
                setDirectInputMode(false);
              }
              setChargePoint(Number(value.replace(/[^0-9]/g, '')));
            }}
          >
            <PointOption {...radio}>{value}</PointOption>
          </Box>
        );
      })}
    </Grid>
  );
}
