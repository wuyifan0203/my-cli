
import fs from 'fs-extra';

const copyFiles = (from, to, options={}, callback = ()=>{},...args) => {
    return fs.copy(from, to, options, (error) => {
        if(error) return console.error(error);
        callback(...args)
    })
}

const readFile = (url) => fs.readFileSync(
    new URL(url,
    import.meta.url), 
    {encoding: "utf-8"}
)

const deleteFile = (url) => fs.remove(url);

const readFileDir = (url) => fs.readdir(url);

const pathExist = (url) => fs.existsSync(url);

export {
    copyFiles,
    readFile,
    deleteFile,
    readFileDir,
    pathExist
}