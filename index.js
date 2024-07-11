// script.js
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const tasksList = document.getElementById('tasks-list');

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    tasksList.addEventListener('click', handleTaskClick);

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }

    function saveTasks() {
        const tasks = [];
        tasksList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('.task-text').textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            taskInput.value = '';
            saveTasks();
        }
    }

    function addTaskToDOM(taskText, completed = false) {
        const li = document.createElement('li');
        li.className = completed ? 'completed' : '';

        const span = document.createElement('span');
        span.className = 'task-text';
        span.textContent = taskText;

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = '✅';

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = '✏️';

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '❌';

        li.appendChild(completeBtn);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        tasksList.appendChild(li);
    }

    function handleTaskClick(e) {
        if (e.target.classList.contains('complete-btn')) {
            toggleCompleteTask(e.target.parentElement);
        } else if (e.target.classList.contains('edit-btn')) {
            editTask(e.target.parentElement);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteTask(e.target.parentElement);
        }
        saveTasks();
    }

    function toggleCompleteTask(taskItem) {
        taskItem.classList.toggle('completed');
    }

    function editTask(taskItem) {
        const taskTextElement = taskItem.querySelector('.task-text');
        const newTaskText = prompt('Edit Task', taskTextElement.textContent);
        if (newTaskText !== null) {
            taskTextElement.textContent = newTaskText.trim();
        }
    }

    function deleteTask(taskItem) {
        taskItem.remove();
    }
});
