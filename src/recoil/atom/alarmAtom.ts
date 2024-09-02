import { atom } from 'recoil';

export const alarmState = atom({
  key: 'alarmState',
  default: [],
});

export const isNewNotificationState = atom({
  key: 'isNewNotificationState',
  default: false,
});
