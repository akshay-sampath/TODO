const todoInput = document.querySelector(".task-input input");
const todoButton = document.querySelector(".task-input button");
const todoList = document.querySelector(".task-list");
const todoClear = document.querySelector(".box-footer button");

todoInput.onkeyup = () => {
    let data = todoInput.value;
    if(data.trim() != 0){
        todoButton.classList.add("active");
    }
    else{
        todoButton.classList.remove("active");
    }
}

todoButton.addEventListener("click",addTodo);

function addTodo(event){
    event.preventDefault();
    let data = todoInput.value;
    let getLocalStorage = localStorage.getItem("newTodo");
    if(getLocalStorage == null){
        listArr = []
    }else{
        listArr = JSON.parse(getLocalStorage);
    } 
    listArr.push(data);
    localStorage.setItem("newTodo", JSON.stringify(listArr));
    showTasks();
}

function showTasks(){
    let getLocalStorage = localStorage.getItem("newTodo");
    if(getLocalStorage == null){
        listArr = []
    }else{
        listArr = JSON.parse(getLocalStorage);
    } 
    const pendingTasks = document.querySelector(".pending");
    pendingTasks.textContent = listArr.length;
    
    if(listArr.length>0){
        todoClear.classList.add("active");
    }else{
        todoClear.classList.remove("active");
    }

    let newLiTag ='';
    listArr.forEach((element,index) => {
        newLiTag += `<li> ${element}<span onclick="deletetodo(${index})" class="fa fa-minus"></span></li>`;
    });
    todoList.innerHTML = newLiTag;
    todoInput.value ="";
    todoButton.classList.remove("active");

}

function deletetodo(index) {
    let getLocalStorage = localStorage.getItem("newTodo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index,1);
    localStorage.setItem("newTodo", JSON.stringify(listArr));
    showTasks();

}

todoClear.onclick = () =>{
    listArr = [];
    localStorage.setItem("newTodo", JSON.stringify(listArr));
    showTasks();
}


showTasks();