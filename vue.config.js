module.exports = {
    devServer: {
        port: 3030,
        // localhostでvueからexpressにAPIリクエストを送信する為の設定
        proxy: 'http://localhost:3030'
    },
}