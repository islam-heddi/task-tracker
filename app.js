const fs = require('fs')

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
                console.log("added successfully");
            }catch(err){
                console.log("Error : " + err)
            }
        break;
    case "list":
            if(arg[1] == undefined) {
                console.log(arr)
                break;
            }else if(arg[1] == "done"){
                arr.map(Element => {
                    if(Element.complete){
                        console.log(`${Element.id} : ${Element.description} since : ${Element.updateAt}`)
                    }
                })
            }else if(arg[1] == "todo"){
                arr.map(Element => {
                    if((Element.complete == false) && (Element.inProgress == false)){
                        console.log(`${Element.id} : ${Element.description} created since : ${Element.createdAt}`)
                    }
                })
            }else if(arg[1] == "in-progress"){
                arr.map(Element => {
                    if((Element.inProgress) && !Element.complete ){
                        console.log(`${Element.id} : ${Element.description} since : ${Element.updateAt}`)
                    }
                })
            }
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
            console.log(`id: ${indextodo} updated successfully`)
        break;
        case 'delete':
            if(arg[1] == undefined){
                console.log("Nope enter the id, its very important step")
                break;
            }
            const deleteId = parseInt(arg[1])
            if(isNaN(deleteId)){
                console.log("the id should be numeric");
                break;
            }
            const indexTask = arr.findIndex(Element => Element.id == deleteId)
            if(indexTask <= -1){
                console.log("there no task have this id, check the id and then try")
                break;
            }

            arr.splice(indexTask,1)
            fs.writeFileSync("tasks.json",JSON.stringify(arr))
            console.log(`id: ${indexTask} deleted successfully`)
        break;
        case 'mark-done':
            if(arg[1] == undefined){
                console.log("Nope enter the id, its very important step")
                break;
            }
            const doneId = parseInt(arg[1])
            if(isNaN(doneId)){
                console.log("the id should be numeric");
                break;
            }
            const indexDone = arr.findIndex(Element => Element.id == doneId)
            if(indexDone <= -1){
                console.log("there no task have this id, check the id and then try")
                break;
            }
            if(arr[indexDone].inProgress == false){
                console.log("to remove a task it should be in progress");
                break;
            }
            arr[indexDone].complete = true;
            arr[indexDone].updateAt = new Date();
            fs.writeFileSync("tasks.json",JSON.stringify(arr))
            console.log("Cool task is done")
        break;
        case 'mark-in-progress':
            if(arg[1] == undefined){
                console.log("Nope enter the id, its very important step")
                break;
            }
            const progressId = parseInt(arg[1])
            if(isNaN(progressId)){
                console.log("the id should be numeric");
                break;
            }
            const indexProgress = arr.findIndex(Element => Element.id == progressId)
            if(indexProgress <= -1){
                console.log("there no task have this id, check the id and then try")
                break;
            }
            arr[indexProgress].inProgress = true;
            arr[indexProgress].updateAt = new Date()
            fs.writeFileSync("tasks.json",JSON.stringify(arr))
            console.log("marked the task as in progress")
        break;
    default: 
        console.log("the first argument should be a crud operation or find all")
}

