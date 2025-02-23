const request = require('../utils/request');

function pause() {
    if (!process.env.ACCOUNT_TOKEN) {
        throw new Error('环境变量 ACCOUNT_TOKEN 是必需的');
    }

    return request({
        url: '/api/user/pause',
        method: 'post',
        data: {
            os_type: "2",  // iOS 固定为 2
            account_token: process.env.ACCOUNT_TOKEN
        }
    })
}

module.exports = {pause}
