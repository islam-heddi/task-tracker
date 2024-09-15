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

if(arg[0] == undefined) {
    console.log("you havent perform any action");
    return;
}

switch(arg[0]){
    case "add":
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
        break;
    case "list":
        console.log(arr)
        break;
    case "update":
        const updateId = parseInt(arg[1]);
        if(isNaN(updateId)) {
            console.log("the id should be numeric")
            break;
        }
        if(arg[2] == undefined){
            console.log("Hey enter the task")
            break;
        }
        const indextodo = arr.findIndex(Element => Element.id == updateId)
        if(indextodo <= -1){
            console.log("there no task have this id, check the id and then try")
            break;
        }
        arr[indextodo].description = arg[2];
        arr[indextodo].updateAt = new Date();
        fs.writeFileSync("tasks.json",JSON.stringify(arr))
        break;
    default: 
        console.log("the first argument should be a crud operation or find all")
}

