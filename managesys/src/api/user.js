import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export function getGoods() {
  return request({
    url: 'http://192.168.43.201:8081/allGoods',
    method: 'get'
  })
}

export function deleteGoods(goodsID) {
  return request({
    url: 'http://192.168.43.201:8081/deleteGoods',
    method: 'get',
    params:{"gid":goodsID},
    // baseURL: 'http://192.168.43.201:8081'
  })
}
