const pause = require("./api/auth").pause;

async function start() {
    console.log('🌀雷神加速器暂停助手 开始运行-------')

    try {
        const res = await pause();

        // 400803 表示已经暂停，这是正常情况
        if (res.data.code === 400803) {
            console.log(`🟡 雷神加速器暂停成功: ${res.data.msg}`);
            return;
        }

        // 其他情况，根据返回的 msg 判断是成功还是失败
        if (res.data.msg.includes('成功') || res.data.msg.includes('已经停止')) {
            console.log(`🟢 雷神加速器暂停成功: ${res.data.msg}`);
        } else {
            console.error(`🔴 雷神加速器暂停失败: ${res.data.code} - ${res.data.msg}`);
            process.exit(1);
        }
    } catch (error) {
        console.error('🔴 雷神加速器暂停失败:', error.message);
        process.exit(1);
    }

    console.log('🌀雷神加速器暂停助手 结束运行-------')
}

start();
