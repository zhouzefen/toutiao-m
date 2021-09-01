import request from "@/utils/request"


export const getChannelList = () => {
    return request({
        url: '/app/v1_0/user/channels',
        method: 'GET'
    })
}


/**
 * 添加用户频道
 */
export const addUserChannel = channels => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/channels',
        data: {
            channels
        }
    })
}