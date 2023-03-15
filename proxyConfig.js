// 配置本地跨域代理
module.exports = {
	'/api': {
		target: 'http://test.123.cn/', // 接口域名
		changeOrigin: true, //是否跨域
		pathRewrite: {}
	},
}
