const { resolve } = require('path');

// 管理默认端口号port 
const port = process.env.npm_config_port;
// 带上http
const domain = 'http://localhost';
const title = 'This is my first Document by Vite-Doc-Creator'

// 项目目录体系
/* 项目的根目录下
 * src ->
 *    css ->
 *    js ->
 *    html (md -> html)
 * workspace -> 编辑markdown文件夹
 * index.html 整个文档的框架
*/

const outerPath = {
  srcPath: resolve(__diranme, '../../../src/'),
  htmlPath: resolve(__dirname, '../../../src/html/'),
  jsPath: resolve(__dirname, '../../../src/js/'),
  cssPath: resolve(__dirname, '../../../src/css/'),
  mdPath: resolve(__dirname, '../../../workspace/')
  rootPath: resolve(__dirname, '../../../'),
}


/** 插件目录体系
 * temp_files =>
 *    css=>
 *    js=>
 *    html=> index.html/md.html/welcome.html
 */



// 工具里内部目录
const innerDir = {
  rootDir: resolve(__dirname,'../temp_files'),
  htmlDir: resolve(__dirname, '../temp_files/html'),
  cssDir: resolve(__dirname, '../temp_files/css'),
  jsDir: resolve(__dirname, '../temp_files/js'),
}

module.exports = {
  title,
  port,
  domain,
  outerPath,
  innerDir,
}