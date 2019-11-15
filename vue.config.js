let devServer = {
    proxy: { // 代理
        '/': {
            target: 'http://localhost:4000',//设置你调用的接口域名和端口号 别忘了加http
            ws: false,
            changeOrigin: true,               // needed for virtual hosted sites
            pathRewrite: {},
        }
    }
}