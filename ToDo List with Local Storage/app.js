
// Setting Variables
let input = document.querySelector('.input');
let submit = document.querySelector('.add');
let tasks = document.querySelector('.tasks');

// Maks an empty array to store tasks
let arrayOfTasks = [];

// Check if the local storage is full
if (localStorage.getItem('tasks')) {
  arrayOfTasks = JSON.parse(localStorage.getItem('tasks'));
}
// Trigger get data from local storage 
getData();

submit.onclick = function () {
  if (input.value !== '') {
    setArrayOfTasks(input.value);
    input.value = '';
  }
}
// Click on elements
tasks.addEventListener('click', (e) => {
  // Select delete button
  if (e.target.classList.contains('del')) {
    // Delete tasks from local storage
    deleteTaskWith(e.target.parentElement.getAttribute('data-id'));
    // Take an action to remove the element
    e.target.parentElement.remove()
    // Toggle the task
  }
  if (e.target.classList.contains('task')) {
    // Toggle completed task
    toggleTask(e.target.getAttribute('data-id'));
    e.target.classList.toggle('done'); // Toggle done
  }
});

function setArrayOfTasks(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  // Push task to array
  arrayOfTasks.push(task);

  addElementsToPageFrom(arrayOfTasks);
  // add tasks to LocalStorage
  addData(arrayOfTasks)
}

function addElementsToPageFrom(arrayOfTasks) {
  // Empty the tasks
  tasks.innerHTML = '';
  // Looping the array
  arrayOfTasks.forEach((task) => {
    let div = document.createElement('div'); // Creating main Dev
    div.className = 'task';
    // 
    if(task.completed) {
      div.className = 'task done';
    }
    div.setAttribute('data-id', task.id)
    div.appendChild(document.createTextNode(task.title))
    // Creating delete button
    let span = document.createElement('span');
    span.className = 'del';
    span.appendChild(document.createTextNode('delete'));
    // Appending span (button) to div
    div.appendChild(span);
    // console.log(div); //For testing
    // Adding the task div to tasks
    tasks.appendChild(div);
  });
}

function addData(arrayOfTasks) {
  window.localStorage.setItem('tasks', JSON.stringify(arrayOfTasks));
}

function getData() {
  let data = localStorage.getItem('tasks');
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  // Testing and Explain
  // for (let i = 0; i > arrayOfTasks.length; i++) {
  //   console.log(`${arrayOfTasks[i].id} === ${taskId}`)
  // }
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addData(arrayOfTasks);
}

function toggleTask(taskId) {
   // Testing and Explain
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false)
    }
  }
  addData(arrayOfTasks);
}
