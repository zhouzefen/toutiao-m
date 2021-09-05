import request from '@/utils/request'

export const getComments = params => {
    return request({
        methods: 'GET',
        url: '/app/v1_0/comments',
        params
    })
}

//对评论点赞
export const addCommentLiking = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comment/likings',
        data: {
            target
        }
    })
}

//取消对评论点赞
export const deleCommentLiking = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/comment/likings/${target}`
    })
}

//发表评论
export const addComment = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/comments',
        data
    })
}