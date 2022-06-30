import fs from 'fs'
const Logger = (e)=>{
    fs.writeFile('./errors.txt', e, err => {
        if (err) console.error(err);  
    });
}
export default Logger