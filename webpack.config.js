module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }
        ]
    },
    externals: {
        URL: "http://",
        HEROKU_NO_CORS: "https://orcadefi.herokuapp.com/",
    }
};