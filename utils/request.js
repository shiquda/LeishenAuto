const axios = require('axios');

// 必需的环境变量检查
const requiredEnvVars = ['DEVICE_ID', 'TOKEN', 'ACCOUNT_TOKEN'];

// 检查必需的环境变量
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        throw new Error(`环境变量 ${varName} 是必需的`);
    }
});

// 从环境变量获取配置
const getConfig = () => ({
    deviceId: process.env.DEVICE_ID,
    version: process.env.APP_VERSION || '20104',
    osVersion: process.env.OS_VERSION || '2.1.4',
    latitude: process.env.LATITUDE || '0.0',
    longitude: process.env.LONGITUDE || '0.0',
    userAgent: process.env.USER_AGENT || 'NNHost/2.1.4 (com.aolafu.leishen; build:20014006; iOS 18.1.0) Alamofire/5.10.2'
});

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API || "https://webapi.xxghh.biz", // 新的移动端 API 地址
    timeout: 5000, // request timeout
    headers: {
        'busi_type': 'nn_aksjfdasoifnkls',
        'appId': 'nnMobile_d0k3duup',
        'registerCanal': 'App Store',
        'reqChannel': '1',
        'appName': 'nn_accelerator',
        'platform': '1',
        'Accept-Language': 'zh-Hans-CN;q=1.0, en-CN;q=0.9',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        'Content-Type': 'application/json;charset=UTF-8'
    }
})

// 请求拦截器添加动态配置
service.interceptors.request.use(
    config => {
        // 获取当前配置
        const currentConfig = getConfig();
        
        // 添加动态 headers
        config.headers['deviceId'] = currentConfig.deviceId;
        config.headers['version'] = currentConfig.version;
        config.headers['osVersion'] = currentConfig.osVersion;
        config.headers['latitude'] = currentConfig.latitude;
        config.headers['longitude'] = currentConfig.longitude;
        config.headers['User-Agent'] = currentConfig.userAgent;
        
        // 添加时间戳
        config.headers['timeStamp'] = Math.floor(Date.now() / 1000);
        
        // 添加 token 到请求头
        config.headers['token'] = process.env.TOKEN;
        
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

module.exports = service
