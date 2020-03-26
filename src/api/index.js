export const getUserInfo = () => ({
  url: '/api/user',
  method: 'get',
  responseType: 'json',
});

export const getTodo = () => ({
  url: '/api/todo',
  method: 'get',
  responseType: 'json',
});

export const postTodo = (formData) => ({
  url: '/api/todo',
  method: 'post',
  responseType: 'json',
  data: formData,
  headers: { 'Content-Type': 'multipart/form-data' },
});

export const getCard = (id) => ({
  url: `/api/card/${id}`,
  method: 'get',
  responseType: 'json',
});

export const getTodoCount = (id) => ({
  url: `/api/todo/count`,
  method: 'get',
  responseType: 'json',
});
