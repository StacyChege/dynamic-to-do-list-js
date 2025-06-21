// script.js

// Setup Event Listener for Page Load:
// At the beginning of your script, use document.addEventListener to listen for the 'DOMContentLoaded' event.
// This ensures your JavaScript code runs after the HTML document has fully loaded.
// Place all your subsequent code inside the callback function of this event listener.
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements:
    // Use document.getElementById to select the “Add Task” button and store it in a constant named addButton.
    const addButton = document.getElementById('add-task-btn');
    // Similarly, select the input field where users enter tasks (id="task-input")
    // and the unordered list (id="task-list") that will display the tasks.
    // Store these references in constants named taskInput and taskList, respectively.
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task to the DOM and optionally save to Local Storage.
    // 'save' parameter defaults to true, meaning new tasks are saved.
    // When loading from Local Storage, 'save' will be set to false to avoid duplication.
    function addTask(taskText, save = true) {
        // Create a new li element for the task.
        const listItem = document.createElement('li');
        // Set its textContent to the provided taskText.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        // Set its textContent to "Remove".
        removeButton.textContent = "Remove";
        // Give it a class name of 'remove-btn' for styling.
        removeButton.classList.add('remove-btn');

        // Assign an onclick event to the remove button.
        // When triggered, this function removes the li element from the DOM
        // and updates Local Storage.
        removeButton.onclick = function() {
            // Remove the li element (the task item) from the task list in the DOM.
            taskList.removeChild(listItem);

            // Update Local Storage:
            // Retrieve the current tasks from Local Storage.
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            // Filter out the specific taskText that was just removed.
            // Note: This assumes taskText is unique. If duplicate tasks are allowed,
            // a more robust method (e.g., using a unique ID for each task) would be needed.
            storedTasks = storedTasks.filter(task => task !== taskText);
            // Save the updated (filtered) array back to Local Storage.
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        };

        // Append the remove button to the li element.
        listItem.appendChild(removeButton);
        // Append the newly created li element (with its remove button) to the task list (ul) in the DOM.
        taskList.appendChild(listItem);

        // Update Task Addition Functionality:
        // Save tasks to Local Storage whenever a new task is added (if 'save' is true).
        if (save) {
            // Retrieve existing tasks from Local Storage or initialize an empty array if none exist.
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            // Add the new taskText to the array.
            storedTasks.push(taskText);
            // Serialize the updated array to JSON and save it back to Local Storage.
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Code for Loading Tasks from Local Storage:
    // Write a function that loads tasks from Local Storage when the page loads.
    // This function should create task elements in the DOM for each task found in Local Storage,
    // ensuring the list reflects saved data.
    function loadTasks() {
        // Retrieve stored tasks from Local Storage. Default to an empty array if no tasks are found.
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        // For each stored task, call addTask.
        // Pass 'false' for the 'save' parameter to prevent these tasks from being saved again to Local Storage
        // immediately upon loading.
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Attach Event Listeners to the "Add Task" button:
    // Add an event listener to addButton that calls addTask logic when the button is clicked.
    addButton.addEventListener('click', () => {
        // Retrieve and trim the value from the task input field.
        const text = taskInput.value.trim();
        // Check if taskText is not empty. If it is empty, use alert to prompt the user.
        if (text === "") {
            alert("Please enter a task."); // IMPORTANT: Consider custom UI for alerts in production.
            return; // Exit the function if the input is empty.
        }
        // Call addTask to add the task to the DOM and save to Local Storage.
        addTask(text);
        // Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = '';
    });

    // Attach Event Listener to the task input field for the 'keypress' event:
    // This allows tasks to be added by pressing the “Enter” key.
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            // Retrieve and trim the value from the task input field.
            const text = taskInput.value.trim();
            // Check if taskText is not empty. If it is empty, use alert to prompt the user.
            if (text === "") {
                alert("Please enter a task."); // IMPORTANT: Consider custom UI for alerts in production.
                return; // Exit the function if the input is empty.
            }
            // Call addTask to add the task to the DOM and save to Local Storage.
            addTask(text);
            // Clear the task input field by setting taskInput.value to an empty string.
            taskInput.value = '';
        }
    });

    // Invoke Load Function:
    // Call loadTasks when the DOM is fully loaded to populate the list from Local Storage.
    loadTasks();
});
