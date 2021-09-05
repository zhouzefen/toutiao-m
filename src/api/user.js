import request from "@/utils/request"
// import store from '@/store'
/**
 * 用户登录
 */
export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}

export const getSmsCode = mobile => {
    return request({
        method: 'GET',
        url: `/app/v1_0/sms/codes/${mobile}`
    })
}

// export const getUserInfo = () => {
//     return request({
//         method: 'GET',
//         url: ` /app/v1_0/users/:target`,
//         headers: {
//             Authorization: `Bearer${store.data.user.token}`
//         }
//     })
// }

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user'
            // 发送请求头数据

    })
}

export const getUserChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels'
    })
}

// 关注用户
export const addFollow = target => {
    return request({
        method: 'POST',
        url: '/app/v1_0/user/followings',
        data: {
            target
        }
    })
}

// 取消关注
export const deleFollow = target => {
    return request({
        method: 'DELETE',
        url: `/app/v1_0/user/followings/${target}`
    })
}

// 获取用户资料
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/profile'
    })
}

// 修改用户名
export const chanename = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/profile',
        data
    })
}

//修改头像
export const changePhoto = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/photo',
        data
    })
}