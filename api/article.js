import { request } from '../plugins/request'

/**
 * 获取文章列表
 * @param {object} params ?tag ?author ?favorited ?limit ?offset
 * @returns 
 */
const getArticles = (params) => request.get('/api/articles', { params })

/**
 * 获取私人文章列表
 * @param {*} params 
 * @returns 
 */
const getFeedArticles = (params) => request.get('/api/articles/feed', { params, data: { isToken: true } })

/**
 * 创建文章
 * @param {*} params 
 * @returns 
 */
const createArticle = (params) => request.post('/api/articles', { isToken: true, ...params })

/**
 * 更新文章
 * @param {*} params 
 * @returns 
 */
const updateArticle = (slug, params) => request.put(`/api/articles/${slug}`, { isToken: true, ...params })

/**
 * 获取单个文章
 * @param {*} slug 
 * @returns 
 */
const getArticle = slug => request.get(`/api/articles/${slug}`)

/**
 * 删除单个文章
 * @param {*} slug 
 * @returns 
 */
const removeArticle = slug => request.delete(`/api/articles/${slug}`, { data: { isToken: true } })

/**
 * 添加评论
 * @param {*} slug 
 * @param {*} comment 
 * @returns 
 */
const addComment = (slug, comment) => {
    return request.post(`/api/articles/${slug}/comments`, {
        isToken: true,
        comment: {
            body: comment
        }
    })
}

/**
 * 获取文章的评论
 * @param {*} slug 
 * @returns 
 */
const getComments = slug => request.get(`/api/articles/${slug}/comments`)

/**
 * 删除评论
 * @param {*} slug 
 * @param {*} id 
 * @returns 
 */
const deleteComment = (slug, id) => request.delete(`/api/articles/${slug}/comments/${id}`, { data: { isToken: true } })

/**
 * 点赞文章
 * @param {*} slug 
 * @returns 
 */
const favoriteArticle = slug => request.post(`/api/articles/${slug}/favorite`, { isToken: true })

/**
 * 取消点赞文章
 * @param {*} slug 
 * @returns 
 */
const unfavoriteArticle = slug => request.delete(`/api/articles/${slug}/favorite`, { data: { isToken: true } })

/**
 * 获取tags
 * @returns 
 */
const getTags = () => request.get('/api/tags', { data: { isToken: true } })

export {
    getArticles,
    createArticle,
    updateArticle,
    removeArticle,
    getArticle,
    getComments,
    addComment,
    deleteComment,
    getFeedArticles,
    favoriteArticle,
    unfavoriteArticle,
    getTags
}