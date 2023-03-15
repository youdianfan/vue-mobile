const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const proxyConfig = require("./proxyConfig.js")
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

const fs = require('fs')
const postcss = require('postcss')

function getLessVaribles(fileUrl, list = {}) {
	if (!fs.existsSync(fileUrl)) return {};
	let lessFile = fs.readFileSync(fileUrl, 'utf8');
	return postcss.parse(lessFile).nodes.reduce((acc, curr) => {
		acc[`${curr.name.replace(/\:/, '')}`] = `${curr.params}`;
		return acc;
	}, list);
}

const modifyVars = getLessVaribles(resolve('./src/assets/less/variables.less'));


module.exports = {
	publicPath: process.env.VUE_APP_PUBLIC_PATH,
	lintOnSave: false,
	runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
	productionSourceMap: !IS_PROD, // 生产环境的 source map
	parallel: require("os").cpus().length > 1,
	css: {
		extract: IS_PROD,
		// sourceMap: false,
		loaderOptions: {
			less: {
				modifyVars,
				javascriptEnabled: true,
			}
		}
	},
	devServer: {
		open: true, // 是否打开浏览器
		port: 8088,
		compress: true, // 一切服务都启用 gzip 压缩
		proxy: proxyConfig
	},
	chainWebpack: config => {
		// 添加别名
		config.resolve.alias
			.set("@", resolve("src"))
	},
	configureWebpack: config => {
		const plugins = [];
		if (IS_PROD) {
			plugins.push(
				new CompressionWebpackPlugin({
					filename: "[path].gz[query]",
					algorithm: "gzip",
					test: productionGzipExtensions,
					threshold: 10240,
					minRatio: 0.8
				})
 
			);
		}
		config.plugins = [...config.plugins, ...plugins];
	}
};
