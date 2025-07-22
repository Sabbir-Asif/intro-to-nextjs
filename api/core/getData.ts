import http from '@/api/httpService';

const getData = async (url: string) => {
    return await http.get(`${url}`).then((res) => res.data);
}

export default getData;
