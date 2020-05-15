import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://hn.algolia.com/api/v1/search_by_date',
});

export const getPosts = async (page = 0) => {
  return instance.get(``, { params: { page, tags: 'story' } });
};
