import http from '@/api/httpService';

//TODO: Need to implement generic type here for data type

const updateData = async (url: string, data: unknown) =>
  await http.put(`${url}`, data).then((res) => res.data);

export default updateData;
