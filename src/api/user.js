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