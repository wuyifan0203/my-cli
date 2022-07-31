import path from "path";
import fs from "fs-extra";
import inquirer from 'inquirer';

import Generator from './creator.js';
import {pathExist,deleteFile} from './operation.js'
import {overWrite} from './prompt.js'



export async function createProject (projectName, options) {
  // 获取当前工作目录
  const cwd = process.cwd();
  // 拼接得到项目目录
  const targetDirectory = path.join(cwd, projectName);
  // 判断目录是否存在
  const exist = pathExist(targetDirectory)
  if (exist) {
    // 判断是否使用 --force 参数
    if (options.foFrce) {
      // 删除重名目录(remove是个异步方法)
      await deleteFile(targetDirectory);
    } else {
      let { action } = await overWrite()
      // 选择 Cancel
      if (!action) {
        console.log("Cancel");
        return;
      } else {
        // 选择 Overwirte ，先删除掉原有重名目录
        console.log("\r\nRemoving");
        await deleteFile(targetDirectory);
      }
    }
  }
  const creat = new Generator(projectName,targetDirectory);
  creat.create()
};