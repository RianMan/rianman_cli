const inquirer = require('inquirer')  // npm i inquirer -D

module.exports = (projectName) => {
  return new Promise((resolve) => {
    inquirer.prompt([{
      name: 'projectName',
      message: '请输入你的项目名称',
      default: projectName,
    },{
      name: 'projectVersion',
      message: '请输入你的项目的版本号',
      default: '1.0.0',
    },{
      name: 'projectdescription',
      message: '请输入你的项目的描述',
      default: 'react项目',
    },{
      name: 'author',
      message: '请输入你的姓名',
      default: 'atuhor_null',
    }]).then( answers=> {
      resolve(answers)
    })
  })
}

