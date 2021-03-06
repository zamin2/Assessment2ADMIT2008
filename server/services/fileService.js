/* 
     

          /   = Root directory
   .   = This location
   ..  = Up a directory
   ./  = Current directory
   ../ = Parent of current directory
   ../../ = Two directories backwards
    
*/

const fs = require('fs')
const path = require('path')

// read function and exporting
exports.getFileContents = (filePath)=>{
   let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)))
   return fileContents
     
}
 // write function and exporting
exports.writeFileContents = (filePath, data) =>{
    let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)))
    fileContents.push(data)
    fileContents = JSON.stringify(fileContents)
    fs.writeFileSync(path.join(__dirname, filePath), fileContents)
}


 

 