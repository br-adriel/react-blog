import { AxiosResponse } from 'axios';
import { api } from '../lib/axios';
import { GetPostsResponse } from '../types/responses';

export function getPosts(
  url: string,
  success: (res: AxiosResponse<GetPostsResponse>) => any,
  error: (err: any) => any
) {
  api
    .get<GetPostsResponse>(url)
    .then((res) => {
      success(res);
    })
    .catch((err) => error(err));
}
