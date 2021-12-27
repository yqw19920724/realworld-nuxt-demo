// 当前状态是非登录状态时，拦截editor/settings页面
export default ({ store, redirect }) => {
    if (!store.state.user.user) {
        redirect('/login')
    }
}