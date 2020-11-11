const {
  watch,
  existsSync,
  unlinkSync,
  unlink
} = require('fs');
// 开发情况下可能不会太稳定，但可以用

const {
  outerPath: {
    htmlPath,
    mdPath
  }
} = require('../config'); 

const {
  createIndexHtml,
  mdToHtml
} = require('../compile');

// watch: 监听文件/文件夹的变化　-> once change : watche's callback
// watch(path, callback);

/** 
 * param path 需要监听的文件夹/文件路径
 * param callback 执行当文件/文件夹变化的时候执行的回调函数
 */

/** callback
 * param event: 什么类型的事件,change
 * param filename: 变化的文件
 */



 //watchers初始化函数
function initWatchers (options) {
  watchHtml(options);
  watchMarkdown();
}


// 监听html文件夹以及文件变化
function watchHtml (options) {
  watch(htmlPath, function (event, filename) {
    // 如果文件变化
    if ( filename ) {
      // event === change 文件更改
      // 重新生成index.html
      // 如果:event === change 传入filename
      // see createHtml -> createIndexHtml: line50
      createIndexHtml(options, event === 'change' && filename );
    }
  })
}

// 监听workspace文件夹及文件的变化
function watchMarkdown () {
  watch(mdPath, function (event, filename) {
    // 如果文件变化了
    if (filename) {
      // 找文件在workspace是否存在
      // 如果不存在证明是删除操作
      if (!existsSync(mdPath + '/' + filename)) {
        // 不存在时，移除html文件夹对应的文件
        const removingFile = htmlPath + '/' + filename.replace('.md','.html');
        existsSync(removingFile) && unlinkSync(removingFile);
        return;
      }
      // 如果filename存在于workspace中
      // 将md文件转化为html转化为文件夹对应的html
      mdToHtml(filename);
    }
  });
}

module.exports = initWatchers;