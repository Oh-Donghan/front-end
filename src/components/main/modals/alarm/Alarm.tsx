import { Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import question from '../../../../assets/image/modal/alarm/question.png';
import done from '../../../../assets/image/modal/alarm/done.png';
import change_bid from '../../../../assets/image/modal/alarm/change_bid.png';
import confirm from '../../../../assets/image/modal/alarm/confirm.png';
import answer from '../../../../assets/image/modal/alarm/answer.png';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function Alarm({ type, content, createdAt }) {
  const timeElapsed = dayjs().to(dayjs(createdAt));
  const logo =
    type === 'QUESTION'
      ? question
      : type === 'DONE'
        ? done
        : type === 'CHANGE_BID'
          ? change_bid
          : type === 'CONFIRM'
            ? confirm
            : type === 'ANSWER'
              ? answer
              : undefined;

  return (
    <Flex
      justifyContent={'space-between'}
      alignItems={'center'}
      py={'20px'}
      px={'22px'}
      _hover={{ bgColor: 'rgba(240,240,240,1)' }}
    >
      <Flex alignItems={'center'}>
        <img src={logo} alt="alarm logo" className="w-7 h-6.5 mr-3.5" />
        <Text>{content}</Text>
      </Flex>
      <Text fontSize={14} fontWeight={'normal'} color={'rgba(150,150,150,1)'}>
        {timeElapsed}
      </Text>
    </Flex>
  );
}
