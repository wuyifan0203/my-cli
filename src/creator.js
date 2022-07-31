import path from 'path'
import { fileURLToPath } from 'url';
import { copyFiles } from './operation.js';
import { chooseTemplate } from './prompt.js';
import { threadLoading } from './util.js';
import chalk from 'chalk'

const __filename = fileURLToPath(import.meta.url);
const templatePath = path.resolve(__filename,'../../','templates');

class Generator {
    constructor(projectName,target){
        this.name = projectName;
        this.target = target;
    }

    async create(){
        const {template} = await chooseTemplate();
        if(!template) return
        
        const selectPath = path.resolve(templatePath,template);
        this.generat(selectPath)
    }

    async generat(path){
        try {
            await threadLoading(
                copyFiles,
                {load:'Generat template'},
                path,this.target
            )
        } catch (error) {
            console.log(error);
        }
        console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`);
        console.log(`\r\n  cd ${chalk.cyan(this.name)}\r\n`);
        console.log('  yarn \r\n');
        console.log('  yarn run dev\n');
    }
}

export default Generator