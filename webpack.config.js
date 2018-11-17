const path = require('path');
const CopyWebpackPlugin= require("copy-webpack-plugin");
module.exports = {
	// モード値を production に設定すると最適化された状態で、
	// development に設定するとソースマップ有効でJSファイルが出力される
	mode: 'development',
	// メインとなるJavaScriptファイル（エントリーポイント）
	entry: './src/Main.ts',

	module: {
		rules: [
			{
				// 拡張子 .ts の場合
				test: /\.ts$/,
				// TypeScript をコンパイルする
				use: 'ts-loader'
			}
		]
	},
	devServer: {
    contentBase: __dirname+"/dist/",
    inline: true,
    hot:false,
    port:53000,
    host: 'localhost',
    disableHostCheck:true,
    // public:'8da87902.ngrok.io',
    open:true,
    openPage: ''
  },
	// import 文で .ts ファイルを解決するため
	resolve: {
		extensions: [
			'.ts','.js'
		]
		,
		modules: [
			path.resolve(__dirname, `./src/`), 
			path.resolve(__dirname, `./node_modules/`), 
		]
	}
	,
	plugins: [
	new CopyWebpackPlugin([
		{
			from: "./*.html",
			to:"./"
		},
		]),
	]
};
