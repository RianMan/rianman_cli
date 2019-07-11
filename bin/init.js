#!/usr/bin/env node
const path = require('path')
const fs = require('fs')
const download = require('../lib/download');
const chalk = require('chalk');
const questionForUser = require('../lib/inquirer');
const generate = require('../lib/generate');
const inquirer = require('inquirer')  // npm i inquirer -D
const shell = require("shelljs");




module.exports = async function(projectName){
    const cwd = process.cwd();
    const downloadPath = path.join(cwd,projectName);
    if(projectName === '.'){
      console.log(chalk.red('你输入的项目名称不合法'));
      return;
    }
    if(fs.existsSync(projectName)){
      console.log(chalk.red('该目录已经存在，请更换一个名称或者删除'));
      let res =  await inquirer.prompt([{name:"isRemove",message: '你确认删除这个文件夹么',type:'confirm'}]);
      if(res.isRemove){
        shell.rm('-rf', downloadPath);
        console.log(chalk.green('删除成功'));
      }else{
        return;
      }
    }
    let answer = await questionForUser(projectName);
    await download(downloadPath);
    const packagejsonPath = path.join(downloadPath,'package.json');
    generate(packagejsonPath,downloadPath,answer,projectName);
}