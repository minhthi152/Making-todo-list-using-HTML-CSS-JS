// Start coding on todo list 
let arrList;
let dataTodo = localStorage.getItem("todo");
if (dataTodo) {
    arrList = JSON.parse(dataTodo);
} else {
    arrList = [];
}

class TaskInfo{
    constructor(name, status, deadline){
        this.name = name,
        this.status = status,
        this.deadline = deadline
    }
}
startProgram();
let editIndex;
let isEditedTask = false;
document.querySelector(".btn-add").addEventListener("click", function addTodo() {
    let taskInputValue = document.querySelector("#task-input-content").value.trim();
    let taskInputDate = document.querySelector("#task-input-date").value;

    if (taskInputValue) {
        if (isEditedTask) {
            arrList[editIndex].name = taskInputValue;
            arrList[editIndex].deadline = taskInputDate;
            isEditedTask = false;
        } else {
            let taskInfo = new TaskInfo(taskInputValue, "pending", taskInputDate)
            arrList.push(taskInfo);
        }
        document.querySelector("#task-input-content").value = "";
        document.querySelector("#task-input-date").value = "";
        localStorage.setItem("todo", JSON.stringify(arrList));
        showTodo("all");
    } else {

        alert("Please enter task name!")
    }


});



function showTodo(filter) {
    document.querySelector("#task-input-date").type = "text";
    let htmls = "";
    if(arrList){
        arrList.forEach((item, index) => {
            // If todo status is completed, set the isCompleted value to checked
            let isCompleted = item.status == "completed" ? "checked": "";
            if(filter == item.status || filter == "all"){
                htmls +=  `<li class="task">
                <label for="${index}">
                    <input onclick = "updateStatus(this)" type="checkbox" index="${index}" ${isCompleted}>
                    <div>
                        <span class ="taskContent">${item.name}</span> 
                        <span id = "deadline">${item.deadline}</span>
                    </div>
                    
                </label>
                <div class="settings">
                    <i onclick="showMenu(this)" class="fa fa-gear"></i>
                    <ul class="task-menu">
                        <li onclick="editTask(${index},'${item.name}','${item.deadline}')"><i class="fa fa-pencil"></i>Edit</li>
                        <li onclick="deleteTask(${index})"><i class="fa fa-remove"></i>Delete</li>
                    </ul>
                </div>
                </li>`
            }
         
        });
        
    } 

    let taskBox = document.querySelector(".task-box");
    taskBox.innerHTML = htmls || `You don't have any tasks here`;  
    taskBox.offsetHeight >= 300 ? taskBox.classList.add("overflow") : taskBox.classList.remove("overflow"); 
        };
        
function startProgram() {
    showTodo("all");
}


function updateStatus(selectedTask){
// console.log(selectedTask);
// getting line that contains task name
let taskName = selectedTask.parentElement.lastElementChild;
let index=selectedTask.getAttribute("index");
console.log(index);
if(selectedTask.checked){
    
    
    // update the status of selected task to completed
    
    arrList[index].status = "completed";
}else{
   
    // update the status of unselected task to pending
    arrList[index].status = "pending";
}
localStorage.setItem("todo", JSON.stringify(arrList));
}

function showMenu(selectedTask){
// console.log(selectedTask);
// e.target.tagName != "I" || e.target != selectedTask
// getting task menu div:
    let taskMenu = selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click", e => {
        if(e.target != selectedTask){ 
            taskMenu.classList.remove("show");
        }
    })
}
function deleteTask(deleteIndex){
    let filter = document.querySelector(".filters span.active").id;
    // console.log(deleteIndex);
    arrList.splice(deleteIndex,1);
    localStorage.setItem("todo", JSON.stringify(arrList));
    showTodo(filter);

}
 
function editTask(taskIndex, taskName,taskDeadline){
    let filter = document.querySelector(".filters span.active").id;
    editIndex = taskIndex;
    isEditedTask = true;
       document.querySelector("#task-input-content").value = taskName;
       document.querySelector("#task-input-date").value = taskDeadline;
    // console.log(taskIndex, taskName, taskDeadline);
    localStorage.setItem("todo", JSON.stringify(arrList));
    showTodo(filter);

}
// Filters
filters = document.querySelectorAll(".filters span");
filters.forEach(spanBtn =>{
    spanBtn.addEventListener("click", function(){
        // console.log(spanBtn);
        document.querySelector("span.active").classList.remove("active");
        spanBtn.classList.add("active");
        showTodo(this.id);
    })
})
// Clear all
clearAll = document.querySelector(".btn-clear");
clearAll.addEventListener("click", function(){
   let conf = confirm("Are you sure you want to delete all?");
   if(conf){
    let filter = document.querySelector(".filters span.active").id;
    if (filter == "all") {
        arrList.splice(0, arrList.length);
    } else {
        let newArr = arrList.filter(function (item) {
            return item.status != filter;
        })
        arrList = [...newArr]
    }
   
   
    localStorage.setItem("todo", JSON.stringify(arrList));
    showTodo();
   }
      
})
// End todo list
// js for the button set mode
const setMode = document.getElementById('setMode');

setMode.addEventListener('change', () => {
	document.body.classList.toggle('light');
    document.querySelector(".wrapper").classList.toggle('light');
    // document.querySelector(".controls").classList.toggle('light');
    // document.querySelectorAll('span').classList.add('light');
    // let spans = document.querySelectorAll("span");
    // for (const span of spans) {
    //     span.classList.toggle("light");
    // }
});
