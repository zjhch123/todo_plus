export const get = (params) => ({
  url: 'http://httpbin.org/get',
  method: 'get',
  responseType: 'json',
  params,
})
