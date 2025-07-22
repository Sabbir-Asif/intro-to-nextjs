import http from '@/api/httpService';

//TODO: Need to implement generic type here for data type

const postData = async (url: string, data?: unknown) => {
    return  await http.post(`${url}`, data).then((res) => res.data);
}

export default postData;
