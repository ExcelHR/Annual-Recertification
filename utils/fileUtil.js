const  fs = require("fs")
const {join} = require('path')


// Utility function to delete the files. Used to delete old files.
module.exports.deleteFiles = async (paths) => {
    if(paths){
        if(Array.isArray(paths)){
            for(const path of paths){
                await unlink(path)
            }
        }else{
            await unlink(paths)
        }

        async function unlink (path){
            if (path){
                try{
                    await fs.promises.unlink(join(path))
                    return true
                } catch (e){
                    console.log("Failed to delete file ",e.message)
                    return false
                }
            }
        }
    }
}