import { Flex, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import question from '../../../../assets/image/modal/alarm/question.png';
import done from '../../../../assets/image/modal/alarm/done.png';
import confirm from '../../../../assets/image/modal/alarm/confirm.png';
import answer from '../../../../assets/image/modal/alarm/answer.png';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export default function Alarm({ type, content, createdAt, auctionId }) {
  const timeElapsed = dayjs().to(dayjs(createdAt));
  const logo =
    type === 'QUESTION'
      ? question
      : type === 'DONE'
        ? done
        : type === 'DONE_INSTANT'
          ? done
          : type === 'CONFIRM'
            ? confirm
            : type === 'ANSWER'
              ? answer
              : undefined;

  return (
    <Link to={`/detail/${auctionId}`}>
      <Flex
        justifyContent={'space-between'}
        alignItems={'center'}
        py={'20px'}
        px={'22px'}
        _hover={{ bgColor: 'rgba(240,240,240,1)' }}
      >
        <Flex alignItems={'center'}>
          <LazyLoadImage
            src={logo}
            alt="alarm logo"
            className="w-6 h-5.5 mr-3.5"
            effect="blur" // 로딩 시 블러 효과
          />
          <Text fontSize={'16px'} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
            {content}
          </Text>
        </Flex>
        <Text minW={'40px'} fontSize={'14px'} fontWeight={'normal'} color={'rgba(150,150,150,1)'}>
          {timeElapsed}
        </Text>
      </Flex>
    </Link>
  );
}
