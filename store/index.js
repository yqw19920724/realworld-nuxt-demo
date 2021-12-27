const cookieParser = process.server ? require('cookieparser') : '';

export const state = () => ({
    
})

export const mutations = {
    
}


export const actions = {
    // 当首屏刷新时，应用的是服务端渲染，这个函数会调用一次，当本地存储的有cookie时，会带着cookie进行发送请求，这时候可以把cookie给存储到vuex中
    // 因为这个函数是在服务端执行的，所以不能从本地cookie中去拿数据
    // 做这个的目的是为了后续的操作是客户端渲染
    nuxtServerInit ({ commit }, { req }) {
        if (req.headers && req.headers.cookie && cookieParser) {
            // 解析headers中的字符串
            try{
                if (!req.headers.cookie) return;
                const data = cookieParser.parse(req.headers.cookie);
                if (!(data && data.user)) return;
                commit('user/setUser', JSON.parse(data.user))
            } catch(err) {
                
            }
            
        }
    }
}