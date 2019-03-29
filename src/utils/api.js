let API = {};

// 全局使用的
API.uploadImg = "rest/2.0/file/file/upload"; // 上传图片
API.downLoad = "rest/2.0/enterprise/enterprise/download_add";// 文件下载
API.adContorl = "rest/2.0/other/other/advertising_list"; // 广告列表
API.agreement = "rest/2.0/other/other/agreement"; // 协议信息
API.sendVcode = "rest/2.0/user/user/send_sms"; // 发送短信验证码
API.bannerList = "rest/2.0/banner/banner/list"; // 首页轮播图

export default API;