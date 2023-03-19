export async function getIconfontJson(options?: RequestOptions) {
  return $.api.request<any>('iconfont/iconfont.json', undefined, {
    baseURL: '/',
    method: 'GET',
    checkStatus: false,
    ...options,
  })
}
