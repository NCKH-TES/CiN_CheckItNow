import request from '../request';
import { SERVER_API } from '../../constants/config';

const UserApi = {
  login: (info) => {
    const url = `auth`;
    return request.post(url, info);
  },
  register: (info) => {
    const url = `auth/register`;
    console.log({ url, SERVER_API });
    return request.post(url, info);
  },
};

export default UserApi;
