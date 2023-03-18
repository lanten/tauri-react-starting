export async function test(params: any, options?: RequestOptions) {
  return $.api.request<any>('/api/function/list', params, options).then((res) => res.content || {})
}
