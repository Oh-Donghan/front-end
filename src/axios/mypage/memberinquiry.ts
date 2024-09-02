import axiosInstance from '../instance';

interface IMemberInquiry {
  id: number;
  memberId: string;
  email: string;
  siteAlarm: boolean;
  point: number;
  social: string | null;
  socialProviderId: null;
  createdAt: string;
}

export const fetchMemberInquiry = async (): Promise<IMemberInquiry> => {
  try {
    const response = await axiosInstance.get<IMemberInquiry>('api/auth/members');
    return response.data;
  } catch (error) {
    console.error('Failed to member inquiry:', error);
    return null;
  }
};
