// note : to run you have to type "node app.js <your wanted arguments>"
// if you are in windows operating system you just have to type "./tast-tracker <your wanted arguments>"
const fs = require('fs')

// parsing the important arguments
const arg = process.argv.slice(2);
let id = 0;
let arr = []

// get the data from tasks.json
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
//calling the procedure
getData();
//messaging when the arguments are not defined
if(arg[0] == undefined) {
    console.log("you haven't perform any action");
    return;
}
//here starts the CRUD arguments
switch(arg[0]){
    case "add":
        // check there is an task argument 
            if(arg[1] == undefined){
                console.log("unable to add a new task due to undefined values")
                return;
            }
            // add an id
            id = arr.length + 1;
            // implement the json structure
            const information = {
                id,
                description: arg[1],
                inProgress: false,
                complete: false,
                createdAt: new Date(),
                updateAt: "none"
            }
            try{
                //add in the array
                arr.push(information)
                const arrToString = JSON.stringify(arr)
                // writing the array in the tasks.json
                fs.writeFileSync("tasks.json",arrToString)
                console.log("added successfully");
            }catch(err){
                console.log("Error : " + err)
            }
        break;
    case "list":
            // list all the items
            if(arg[1] == undefined) {
                console.log(arr)
                break;
            }else if(arg[1] == "done"){ // list the done tasks
                arr.map(Element => {
                    if(Element.complete){
                        console.log(`${Element.id} : ${Element.description} since : ${Element.updateAt}`)
                    }
                })
            }else if(arg[1] == "todo"){ // list the no inprogress and no completed
                arr.map(Element => {
                    if((Element.complete == false) && (Element.inProgress == false)){
                        console.log(`${Element.id} : ${Element.description} created since : ${Element.createdAt}`)
                    }
                })
            }else if(arg[1] == "in-progress"){ // list the in progress tasks
                arr.map(Element => {
                    if((Element.inProgress) && !Element.complete ){
                        console.log(`${Element.id} : ${Element.description} since : ${Element.updateAt}`)
                    }
                })
            }
        break;
    case "update":
            const updateId = parseInt(arg[1]); // check the id of the update element
            if(isNaN(updateId)) {
                console.log("the id should be numeric")
                break;
            }
            if(arg[2] == undefined){ // enter the task
                console.log("Hey enter the task")
                break;
            }
            const indextodo = arr.findIndex(Element => Element.id == updateId)
            if(indextodo <= -1){ // check invalid id
                console.log("there no task have this id, check the id and then try")
                break;
            }
            //updating the tasks and adding its date of update
            arr[indextodo].description = arg[2];
            arr[indextodo].updateAt = new Date();
            fs.writeFileSync("tasks.json",JSON.stringify(arr))
            console.log(`id: ${indextodo} updated successfully`)
        break;
        case 'delete': // delete the tasks
            if(arg[1] == undefined){
                console.log("Nope enter the id, its very important step")
                break;
            }
            const deleteId = parseInt(arg[1])
            if(isNaN(deleteId)){ // checks for the id if its numeric
                console.log("the id should be numeric");
                break;
            }
            const indexTask = arr.findIndex(Element => Element.id == deleteId)
            if(indexTask <= -1){ // check the task if invalid
                console.log("there no task have this id, check the id and then try")
                break;
            }

            arr.splice(indexTask,1) // removing the index of the element
            fs.writeFileSync("tasks.json",JSON.stringify(arr))
            console.log(`id: ${indexTask} deleted successfully`)
        break;
        case 'mark-done': // mark done the task
            if(arg[1] == undefined){ // important add the id
                console.log("Nope enter the id, its very important step")
                break;
            }
            const doneId = parseInt(arg[1])
            if(isNaN(doneId)){ // the id mush be numeric
                console.log("the id should be numeric");
                break;
            }
            const indexDone = arr.findIndex(Element => Element.id == doneId)
            if(indexDone <= -1){ // id must be valid
                console.log("there no task have this id, check the id and then try")
                break;
            }
            if(arr[indexDone].inProgress == false){ // to mark it done you have first mark it in progress
                console.log("to remove a task it should be in progress");
                break;
            }
            // set it to completed and adding a new update date
            arr[indexDone].complete = true;
            arr[indexDone].updateAt = new Date();
            // writing the data in tasks.json
            fs.writeFileSync("tasks.json",JSON.stringify(arr))
            console.log("Cool task is done")
        break;
        case 'mark-in-progress': // mark in progress
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
            // mark it in progress and rewriting in tasks.json
            arr[indexProgress].inProgress = true;
            arr[indexProgress].updateAt = new Date()
            fs.writeFileSync("tasks.json",JSON.stringify(arr))
            console.log("marked the task as in progress")
        break;
    default: // if the first argument isn't matched than this message will appear
        console.log("the first argument should be a crud operation or find all")
}

