import axios from "axios";
const isProd = process.env.NODE_ENV === "production";
// 新创建 axios 实例配置
const $axios = axios.create({
    timeout: 5000, //现在，在超时前，所有请求都会等待 5秒
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});
// 在实例已创建后修改默认值
$axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 线上环境配置
// 添加请求拦截器,fix:/api
if (isProd) {
    $axios.interceptors.request.use(
        config => {
            // 在发送请求之前做某件事
            if (config.method === "post") {
                let urlStr = config.url;
                config.url = urlStr.replace(/^\/api/g, '')
            }
            return config;
        }

    );
}

$axios.defaults.transformRequest = function (obj) {
    let _rs = [];
    for (let p in obj) {
        if (obj[p] != null && obj[p] != '') {
            _rs.push(p + '=' + obj[p])
        }
    }
    return _rs.join('&');
}

export default $axios;