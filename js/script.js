let tasks = [];

// Function to add a task
function addTask(event) {
    event.preventDefault(); // Prevent form from submitting and reloading the page
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');

    // Validate inputs
    if (taskInput.value.trim() === '' || dueDateInput.value === '') {
        alert('Tugas dan tanggalnya benar-benar harus diisi bro!');
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
        // Buat list tugas
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item flex justify-between items-center my-[10px]';

        // Buat span deskripsi tugas
        const taskText = document.createElement('span');
        taskText.textContent = `${task.task} - Due: ${task.dueDate}`;

        // Buat wrapper tombol
        const buttonWrapper = document.createElement('div');

        // Tombol Complete (belum diaktifkan)
        const completeBtn = document.createElement('button');
        completeBtn.className = 'bg-green-500 text-white px-[10px] py-[4px] rounded mr-[8px]';
        if (task.completed) {
            taskText.style.textDecoration = 'line-through'; // Mark as completed
            completeBtn.textContent = 'Undo'; // Change button text
        } else {
            taskText.style.textDecoration = 'none'; // Unmark as completed
            completeBtn.textContent = 'Complete'; // Change button text back
        }

        // Tombol Delete
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'bg-red-500 text-white px-[10px] py-[4px] rounded';
        deleteBtn.textContent = 'Delete';

        // Tambahkan event listener ke tombol Complete
        completeBtn.addEventListener('click', () => {
            // Toggle completion status
            task.completed = !task.completed;
            if (task.completed) {
                taskText.style.textDecoration = 'line-through'; // Mark as completed
                completeBtn.textContent = 'Undo'; // Change button text
            } else {
                taskText.style.textDecoration = 'none'; // Unmark as completed
                completeBtn.textContent = 'Complete'; // Change button text back
            }
        });

        // Tambahkan event listener ke tombol Delete
        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });

        // Tambahkan tombol ke wrapper
        buttonWrapper.appendChild(completeBtn);
        buttonWrapper.appendChild(deleteBtn);

        // Tambahkan elemen ke <li>
        taskItem.appendChild(taskText);
        taskItem.appendChild(buttonWrapper);
        taskList.appendChild(taskItem);
    });

    document.getElementById('filter-select').value = 'all';
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

    tasks = tasks.filter(task => task.id !== id); // Remove the task with the given ID
    displayTasks(); // Refresh the task list display
}

// Funtion to filter tasks
function filterTasks(event) {
    const filterValue = event.target.value;
    if (filterValue === 'all') {
        displayTasks();
    } else if (filterValue === 'completed') {
        displayCompletedTasks();
    } else if (filterValue === 'pending') {
        displayPendingTasks();
    }
}

// Display Completed Task
function displayCompletedTasks() {
    const completedTasks = tasks.filter(task => task.completed);
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    if (completedTasks.length === 0) {
        taskList.innerHTML = '<p>OMG, belum ada tugas yang selesai.</p>';
        return;
    }

    completedTasks.forEach(task => {
        // Buat list tugas
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item flex justify-between items-center my-[10px]';

        // Buat span deskripsi tugas
        const taskText = document.createElement('span');
        taskText.textContent = `${task.task} - Due: ${task.dueDate}`;

        // Buat wrapper tombol
        const buttonWrapper = document.createElement('div');

        // Tombol Complete (belum diaktifkan)
        const completeBtn = document.createElement('button');
        completeBtn.className = 'bg-green-500 text-white px-[10px] py-[4px] rounded mr-[8px]';
        if (task.completed) {
            taskText.style.textDecoration = 'line-through'; // Mark as completed
            completeBtn.textContent = 'Undo'; // Change button text
        } else {
            taskText.style.textDecoration = 'none'; // Unmark as completed
            completeBtn.textContent = 'Complete'; // Change button text back
        }

        // Tombol Delete
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'bg-red-500 text-white px-[10px] py-[4px] rounded';
        deleteBtn.textContent = 'Delete';

        // Tambahkan event listener ke tombol Complete
        completeBtn.addEventListener('click', () => {
            // Toggle completion status
            task.completed = !task.completed;
            if (task.completed) {
                taskText.style.textDecoration = 'line-through'; // Mark as completed
                completeBtn.textContent = 'Undo'; // Change button text
            } else {
                taskText.style.textDecoration = 'none'; // Unmark as completed
                completeBtn.textContent = 'Complete'; // Change button text back
            }
        });

        // Tambahkan event listener ke tombol Delete
        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });

        // Tambahkan tombol ke wrapper
        buttonWrapper.appendChild(completeBtn);
        buttonWrapper.appendChild(deleteBtn);

        // Tambahkan elemen ke <li>
        taskItem.appendChild(taskText);
        taskItem.appendChild(buttonWrapper);
        taskList.appendChild(taskItem);
    });
}

// Display Pending Task
function displayPendingTasks() {
    const pendingTasks = tasks.filter(task => !task.completed);
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    if (pendingTasks.length === 0) {
        taskList.innerHTML = '<p>Wah, kamu gak punya tugas lagi nih :)</p>';
        return;
    }

    pendingTasks.forEach(task => {
        // Buat list tugas
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item flex justify-between items-center my-[10px]';

        // Buat span deskripsi tugas
        const taskText = document.createElement('span');
        taskText.textContent = `${task.task} - Due: ${task.dueDate}`;

        // Buat wrapper tombol
        const buttonWrapper = document.createElement('div');

        // Tombol Complete (belum diaktifkan)
        const completeBtn = document.createElement('button');
        completeBtn.className = 'bg-green-500 text-white px-[10px] py-[4px] rounded mr-[8px]';
        if (task.completed) {
            taskText.style.textDecoration = 'line-through'; // Mark as completed
            completeBtn.textContent = 'Undo'; // Change button text
        } else {
            taskText.style.textDecoration = 'none'; // Unmark as completed
            completeBtn.textContent = 'Complete'; // Change button text back
        }

        // Tombol Delete
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'bg-red-500 text-white px-[10px] py-[4px] rounded';
        deleteBtn.textContent = 'Delete';

        // Tambahkan event listener ke tombol Complete
        completeBtn.addEventListener('click', () => {
            // Toggle completion status
            task.completed = !task.completed;
            if (task.completed) {
                taskText.style.textDecoration = 'line-through'; // Mark as completed
                completeBtn.textContent = 'Undo'; // Change button text
            } else {
                taskText.style.textDecoration = 'none'; // Unmark as completed
                completeBtn.textContent = 'Complete'; // Change button text back
            }
        });

        // Tambahkan event listener ke tombol Delete
        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id);
        });

        // Tambahkan tombol ke wrapper
        buttonWrapper.appendChild(completeBtn);
        buttonWrapper.appendChild(deleteBtn);

        // Tambahkan elemen ke <li>
        taskItem.appendChild(taskText);
        taskItem.appendChild(buttonWrapper);
        taskList.appendChild(taskItem);
    });
}

// Event Listener for the form submission
document.getElementById('task-form').addEventListener('submit', addTask)

// Event Listener for the delete all button
document.getElementById('clear-all-button').addEventListener('click', deleteAllTask)

// Event Listener for the delete specific task button
// document.getElementById('delete-task-${task.id}').addEventListener('click', deleteTask)

// Event Listener for selecting Completed Tasks
document.getElementById('filter-select').addEventListener('change', filterTasks);