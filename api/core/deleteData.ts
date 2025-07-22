import http from '@/api/httpService';

const deleteData = async (url: string) =>
  await http.delete(`${url}`).then((res) => res.data);

export default deleteData;
