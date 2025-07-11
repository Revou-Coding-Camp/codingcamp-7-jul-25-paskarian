let tasks = [];

// Function to add a task
function addTask(event) {
    event.preventDefault(); // Prevent form from submitting and reloading the page
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');

    // Validate inputs
    if (taskInput.value.trim() === '' || dueDateInput.value === '') {
        alert('Isinya benar-benar harus diisi bro!');
        return;
    }
    else {
        // Create a new task object
        const newTask = {
            id: Date.now(), // Unique ID based on timestamp
            task: taskInput.value.trim(),
            dueDate: dueDateInput.value,
            completed: false // Default to not completed
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Clear the input fields
        taskInput.value = '';
        dueDateInput.value = '';

        console.log("New Task Added:", newTask);
    }

    // Display the updated task list
    displayTasks();
}

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    if (tasks.length === 0) {
        taskList.innerHTML = '<p>Tugas kamu belum ada nih, santai dulu gak sih :D</p>';
        return;
    }

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item flex justify-between items-center my-[10px]';
        taskItem.innerHTML = `
            <span>${task.task} - Due: ${task.dueDate}</span>
            <div>
                <button class="bg-green-500 text-white px-[10px] py-[4px] rounded">Complete</button>
                <button id="delete-task-${task.id}" type="button" class="bg-red-500 text-white px-[10px] py-[4px] rounded">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

// Function to delete all tasks
function deleteAllTask() {
    if (tasks.length === 0) {
        alert('Kamu belum punya tugas apapun untuk dihapus sahabat! ^.^');
    }
    else if (confirm('Yakin kamu mau menghapus semua tugas? O.O')) {
        tasks = []; // Clear the tasks array
        displayTasks(); // Refresh the task list display
    }
}

// Function to delete a specific task
function deleteTask(id) {

    // tasks = tasks.filter(task => task.id !== id); // Remove the task with the given ID
    // displayTasks(); // Refresh the task list display
}

// Funtion to filter tasks
function filterTasks() {

}

// Event Listener for the form submission
document.getElementById('task-form').addEventListener('submit', addTask)

// Event Listener for the delete all button
document.getElementById('clear-all-button').addEventListener('click', deleteAllTask)

// Event Listener for the delete specific task button
document.getElementById('delete-task-${task.id}').addEventListener('click', deleteTask)