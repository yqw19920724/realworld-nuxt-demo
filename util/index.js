let cookie = ''

const importCookie =  async () => {
    if (process.client) {
        cookie = await import('js-cookie')
    }
    return cookie;
}

importCookie();

export {
    cookie
}