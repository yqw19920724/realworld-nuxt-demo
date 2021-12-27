// 当前状态是登录状态时，拦截login/register页面
export default ({ store, redirect }) => {
    if (store.state.user.user) {
        redirect('/')
    }
}