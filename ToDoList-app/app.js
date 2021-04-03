//Variables
const todoInput = document.querySelector('.t-input');
const todoButton = document.querySelector('.t-button');
const todoList = document.querySelector('.t-list');

//Functions
function addTodo(event)
{
    //Prevent form from Submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('t-item');
    todoDiv.appendChild(newTodo);
    saveToLocalStorage(todoInput.value);
    //CHECK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('com-btn');
    todoDiv.appendChild(completedButton);
    //DELETE BUTTON
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('del-btn');
    todoDiv.appendChild(deleteButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear Todo INPUT VALUE
    todoInput.value = "";
}

function del(event) 
{
    const item =event.target;
    //DELETE TODO
    if(item.classList[0] === "del-btn")
    {
        const todo = item.parentElement;
        //ANIMATION
        todo.classList.add('fall');
        removeFromLocalStorage(todo);
        todo.addEventListener('transitionend', function()
        {
            todo.remove();
        });
        
    }
    //CHECK TODO
    if(item.classList[0] === "com-btn")
    {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function renderTime(){
    //Date
    var mydate = new Date();
    var year = mydate.getFullYear();
        if (year < 1000)
        {
            year += 1900;
        }
    var day = mydate.getDay();
    var month = mydate.getMonth();
    var daym = mydate.getDate();
    var d_array = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
    var m_array = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');

    //Time 
    var curr_t = new Date();
    var h = curr_t.getHours();   
    var m = curr_t.getMinutes();  
    var s = curr_t.getSeconds();
        if (h == 24){
            h = 0;
        }else if (h > 12){
            h = h - 0;
        }if(h < 10){
            h = "0" + h;
        }if(m < 10){
            m = "0" + m;
        }if(s < 10){
            s = "0" + s;
        }

        var myClock = document.getElementById("date");
        myClock.textContent = "" +d_array[day]+ " " +daym+ " " +m_array[month]+ " " +year+ " | " +h+ ":" +m+ ":" +s;
        myClock.innerText = "" +d_array[day]+ " " +daym+ " " +m_array[month]+ " " +year+ " | " +h+ ":" +m+ ":" +s;

        setTimeout("renderTime()", 1000);
}

function saveToLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('t-item');
        todoDiv.appendChild(newTodo);
        //CHECK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('com-btn');
        todoDiv.appendChild(completedButton);
        //DELETE BUTTON
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add('del-btn');
        todoDiv.appendChild(deleteButton);
        //APPEND TO LIST
        todoList.appendChild(todoDiv);
    });
}

function removeFromLocalStorage(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoindex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoindex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

renderTime();

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', del);