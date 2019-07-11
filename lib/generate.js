const fs = require('fs');
const ora = require('ora');
const shell = require("shelljs");
const chalk = require("chalk");



module.exports = function (packagejsonPath,downloadPath,answer,projectName) {
    // 判断这个路径的文件是否存在
    fs.exists(packagejsonPath,()=>{
        let pkgJsonStr = fs.readFileSync(packagejsonPath,'utf-8');
        // 读出原始的package.json的文件配置
        let pkgJson = JSON.parse(pkgJsonStr);
        // 取出依赖和脚本的信息
        let { main,scripts,devDependencies,dependencies } = pkgJson;
        // 将用户的输入和这个组合成一个新的对象，并重新写一个package.json的文件
        const newPkg = Object.assign(answer,{main,scripts,devDependencies,dependencies });
        //先删除之前的，在生成一份新的
        fs.unlink(packagejsonPath, function(err){
          if(err){
               throw err;
          }
          fs.writeFileSync(packagejsonPath,JSON.stringify(newPkg,null,2));
          // 执行脚本命令 安装依赖
          const spinner = ora(`🔧   正在初始化项目插件，请等待...`);
          spinner.start()
          shell.cd(downloadPath);
          shell.exec('npm i',()=>{
            spinner.stop()
            console.log(chalk.green( `👍 项目安装完毕`))
            console.log();
            console.log(chalk.green( `cd ${projectName}`))
            console.log();
            console.log(chalk.green( `npm run dev`))
            console.log();
            console.log(chalk.green( `project start http://loclhost:9009`))
            console.log();
            console.log(chalk.yellow(`more infomation to read README.md`))
          })
        })
    })
}

