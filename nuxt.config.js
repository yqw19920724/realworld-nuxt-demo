module.exports = {
    // server: {
    //     port: 2233, // default: 3000
    //     host: '0.0.0.0' // default: localhost,
    // },
    router: {
        linkActiveClass: 'active',
        extendRoutes(routes, resolve) {
            const login = {
                name: 'login',
                path: '/login',
                component: resolve(__dirname, 'pages/auth.vue'),
                chunkName: 'pages/login'
            }
            const register = {
                name: 'register',
                path: '/register',
                component: resolve(__dirname, 'pages/auth.vue'),
                chunkName: 'pages/register'
            }
            const profileArticleType = {
                name: 'profileArticleType',
                path: '/:profile/:articleType',
                component: resolve(__dirname, 'pages/_profile/index.vue'),
                chunkName: 'pages/_profile/_articleType'
            }
            // 删除多余的路由，他将被login,register取代
            const index = routes.findIndex(route => route.name === 'auth')
            if (index !== -1) routes.splice(index, 1)
            // 添加自定义路由
            routes.push(login, register, profileArticleType)
            // 调换profile模糊匹配的顺序，如果他在前面，login,register这些路由都会被profile匹配到
            const profileIndex = routes.findIndex(route => route.name === 'profile')
            const profile = routes[profileIndex]
            routes.splice(profileIndex, 1)
            routes.push(profile)
        },
    },
    plugins: [
        '~/plugins/request.js',
        '~/plugins/dayjs.js'
    ]
}