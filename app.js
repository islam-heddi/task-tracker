const fs = require('fs')
const path = require('path')

const pathfile = path.join(__dirname,"tasks.json")

const arg = process.argv.slice(2);
let id = 0;
let arr = []

const getData = () => {
    if(fs.existsSync("tasks.json")){
        arr = fs.readFileSync("tasks.json")
        if(arr == "") {
            arr = [];
            return;
        }else{
            arr = JSON.parse(arr)
        }
    }
}

getData();

if(arg[0] !== "add") console.log("the first argument should be a crud operation or find all")
if(arg[0] == "add"){
    if(arg[1] == undefined){
        console.log("unable to add a new task due to undefined values")
        return;
    }
    id = arr.length + 1;
    const information = {
        id,
        description: arg[1],
        inProgress: false,
        complete: false,
        createdAt: new Date(),
        updateAt: "none"
    }
    try{
        arr.push(information)
        const arrToString = JSON.stringify(arr)
        fs.writeFileSync("tasks.json",arrToString)
    }catch(err){
        console.log("Error : " + err)
    }


}
