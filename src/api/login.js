import request from './request'

export const LOGIN = parmas => request('post', '/api/user/login', parmas)

export const GETINFO = parmas=>request('get', '/api/user/info', params)

export const LOGOUT = () => request('post', '/api/user/logout')
