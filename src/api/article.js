import request from '@/utils/request'

/**
 * 获取频道的文章列表
 */
export const getArticles = params => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params
    })
}

/**
 * 获取频道的文章详细列表
 */
export const getArticleById = articleId => {
    return request({
        method: 'GET',
        url: `/app/v1_0/articles/${articleId}`,
    })
}

/**
 * 收藏文章
 */
export const addCollectArticle = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/collections',
        data: {
            target
        }

    })
}

/**
 * 取消收藏文章
 */
export const deleCollectArticle = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/collections/${target}`,
    })
}


// 点赞
export const likeArticle = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/article/likings',
        data: {
            target
        }
    })
}

// 取消点赞
export const unlikeArticle = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/article/likings/${target}`
    })
}