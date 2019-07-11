#! /usr/bin/env node

const program = require('commander')  // npm i commander -D

program.version('1.0.0')
	.usage('<command> [项目名称]')
	.option('-c, --create [name]', '创建一个目录',(name)=>{console.log('hello ',name)})


program.command('init <项目名称>')
		.description('创建新项目')
		.action((name, cmd) => {
			require('./init')(name)
		})

program.parse(process.argv)
