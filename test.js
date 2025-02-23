// 设置环境变量
process.env.DEVICE_ID = "9A8DDF18-0066-4BF7-934F-C7E0A3B650EF";
process.env.TOKEN = "182e95028e664d72891429113310dd07";
process.env.ACCOUNT_TOKEN = "vZa8iVFtvUj8KUnfAkUSPIYlkwmJ7mYPRJLts7AcQiETCEIWo90oP0QCow2zc41w";

const { pause } = require('./api/auth');

console.log('开始测试暂停接口...');
console.log('环境变量:', {
    DEVICE_ID: process.env.DEVICE_ID,
    TOKEN: process.env.TOKEN,
    ACCOUNT_TOKEN: process.env.ACCOUNT_TOKEN
});

pause()
    .then(response => {
        console.log('暂停成功:', response.data);
    })
    .catch(error => {
        console.error('暂停失败:', error.response ? error.response.data : error.message);
    });
