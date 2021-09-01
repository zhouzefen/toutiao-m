// 本地存储模块

// 获取token
export const getToken = name => {
    const data = window.localStorage.getItem(name)
    try {
        return JSON.parse(data)
    } catch (err) {
        return data
    }
}

// 添加token
export const setToken = (name, vaule) => {
    if (typeof vaule === 'object') {
        vaule = JSON.stringify(vaule)
    }
    window.localStorage.getItem(name, vaule)
}

// 删除token
export const removeToken = name => {
    window.localStorage.removeItem(name)
}