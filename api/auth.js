import { request } from '../plugins/request'

/**
 * 
 * @param {*} data email password
 * @returns 
 */
const loginApi = data => request.post('/api/users/login', data)

/**
 * 注册
 * @param {object} data username email password
 * @returns 
 */
const registerApi = data => request.post('/api/users', data)

/**
 * 
 * @param {*} data email username password image bio
 * @returns 
 */
const updateAuth = data => request.put('/api/users', { isToken: true, ...data })

/**
 * 获取一个用户的信息
 * @param {*} username 
 * @returns 
 */
const getProfile = username => request.get(`/api/profiles/${username}`)

/**
 * 关注另一个用户
 * @param {*} username 
 * @returns 
 */
const followUser = username => request.post(`/api/profiles/${username}/follow`, { isToken: true })


/**
 * 取消关注另一个用户
 * @param {*} username 
 * @returns 
 */
 const unfollowUser = username => request.delete(`/api/profiles/${username}/follow`, { isToken: true })

 
export {
    loginApi,
    registerApi,
    updateAuth,
    followUser,
    unfollowUser,
    getProfile
}