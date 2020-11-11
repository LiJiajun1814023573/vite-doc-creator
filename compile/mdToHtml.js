const {
  writeFileSync
} = require('fs');

const markdown = require('marked');
const highlight = require('highlight.js');
// 查阅marked, highlight.js文档

const {
  readFile
} = require('../libs/utils');


const {
  outerPath: {
    mdPath,
    htmlPath
  },
  innerDir: {
    htmlDir
  },
  regexp: {
    reg_mdStr
  }
} = require('../config');

markdown.setOptions({
  // 配置highlight插件
  highlight: function (code) {
    return highlight.highlightAuto(code).value;
  }
})

// return html

// markdown转html方法
function mdToHtml (fileName) {
  // 读取markdown文件
  const _mdStr = readFile(mdPath + '/' + fileName);
  // 读取markdown的模板html文件 -md.html
  let _htmlStr = readFile(htmlDir + '/md.html');
  // 将markdown文件的内容通过markdown插件转换成html字符串
  const newStr = markdown(_mdStr);
  // 将模板md.html里的{{str}}替换成newStr(markdown插件转换出的结果)
  _htmlStr = _htmlStr.replace(reg_mdStr, newStr);

  // 将新的_htmlStr写入html文件并保存到src/html目录下
  writeFileSync(htmlPath + '/' + fileName.replace('.md', '.html'),_htmlStr, function (err) {
    if (err) {
      throw new Error('File is failed to write.', err);
    }
  });
}

module.exports = mdToHtml; 