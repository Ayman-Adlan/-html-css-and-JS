// Settting the variables
let enterTask = document.querySelector('.input');
let addTaskBtn = document.querySelector('.add');
let tasks = document.querySelector('.tasks');

// Make Empty Arr
let arr = [];

getData();
// Set the add task button function
addTaskBtn.onclick = function() {
  if (enterTask.value !== '') {
    addTask(enterTask.value);
    enterTask.value = '';
  }
}

tasks.addEventListener('click', (e) => {
  if (e.target.classList.contains('del')) {
    e.target.parentElement.remove(); // Remove the task from page
    // Remove task from local Storage
    deleteTask(e.target.parentElement.getAttribute('data-id'));
  }

  // Task Element
  if (e.target.classList.contains('task')) {
    e.target.classList.toggle('done') // Toggle Done
    toggleStatus(e.target.getAttribute('data-id')); // Toggle Completed
  }
})

function addTask(arrData) {
  const task = {
    id: Date.now(),
    title: arrData,
    completed: false,
  };
  arr.push(task);
  // console.log(arr);
  addArrToPage(arr);
  // Add arr tasks to Local Storage
  addData(arr)
}

function addArrToPage(arr) {
  tasks.innerHTML = '';
  arr.forEach((task) => {
    // Create div to contain task
    let div = document.createElement('div');
    div.className = 'task';
    // Check if task completed
    if (task.completed) {
      div.className = 'done'
    }
    div.setAttribute('data-id', task.id);
    div.appendChild(document.createTextNode(task.title));
    // create span
    let span = document.createElement('span');
    span.className = 'del';
    span.appendChild(document.createTextNode('X'));
    // Append button to page
    div.appendChild(span);
    tasks.appendChild(div);
  });
}

function addData(arr) {
  window.localStorage.setItem('todos', JSON.stringify(arr))
}

function getData() {
  let data = window.localStorage.getItem('todos')
  if (data) {
    let todos = JSON.parse(data)
    addArrToPage(todos); 
  }
}

function deleteTask(taskId) {
  arr = arr.filter((task) => task.id != taskId)
  addData(arr)
}

function toggleStatus(taskId) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id == taskId) {
      arr[i].completed == false ? (arr[i].completed = true) : (arr[i].completed = false)
    }
  }
  addData(arr);
}