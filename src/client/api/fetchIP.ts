import axios, { AxiosResponse } from 'axios';

export const fetchIpData = async () => {
  const response: AxiosResponse<any, any> = await axios.get(
    'https://ip-fast.com/api/ip/?format=json&location=True'
  );
  return response;
};
