const download = require('download-git-repo')
const path = require('path');
const ora = require('ora')

module.exports  = function (target) {
  target = path.join(target || '.');
  const spinner = ora(`📚   正在下载项目模板，请等待...`);
  spinner.start()
  return new Promise((resolve, reject)=>{
    download('https://github.com:RianMan/react-falsework#master',
    target, { clone: true }, (err) => {
    if (err) {
        reject(err);
        spinner.fail()
    } else {
        resolve(target)
        spinner.succeed()
    }
    })
  })
}

