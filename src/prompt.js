import inquirer from "inquirer"
import { tmpdir } from "os";
import path from 'path'
import { fileURLToPath } from "url";
import { readFileDir } from "./operation.js"
import { capitalize,threadLoading } from './util.js'

const __filename = fileURLToPath(import.meta.url);
const templatesPath = path.resolve(__filename, '../../', 'templates');

const overWrite = async() => inquirer.prompt({
    name: "action",
    type: "list",
    message: "Target directory exists, Please choose an action",
    choices: [
      { name: "Overwrite", value: true },
      { name: "Cancel", value: false },
    ],
})

const chooseTemplate = async ()=> {
    let templates
    try {
        templates = await threadLoading(readFileDir,{
            success:'Waiting fetch templates',
        },templatesPath)
        if(!Array.isArray(templates)){
            return Error('Get templates fail')
        }else if(templates.length === 0){
            return Error('The number of templates is empty')
        }
    } catch (error) {
        return console.error(error)
    }

    const templateMap = templates.map(templates=>{
        return {
            name:capitalize(templates),
            value:templates
        }
    }).filter(tmp=>tmp.value!=='.DS_Store')
   
    return inquirer.prompt({
        name: "template",
        type: "list",
        message: "Please choose a template to create project",
        choices:templateMap
    })
}

export {
    overWrite,
    chooseTemplate
}