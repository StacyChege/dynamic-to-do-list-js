// Setup Event Listener for Page Load:
// Use document.addEventListener to listen for the 'DOMContentLoaded' event.
// This ensures your JavaScript code runs after the HTML document has fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM Elements:
    // Use document.getElementById to select the “Add Task” button
    // and store it in a constant named addButton.
    const addButton = document.getElementById('add-task-btn');

    // Similarly, select the input field where users enter tasks (id="task-input")
    // and the unordered list (id="task-list") that will display the tasks.
    // Store these references in constants named taskInput and taskList, respectively.
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Create the addTask Function:
    // Define a function named addTask. This function will be responsible for adding new tasks to the list.
    function addTask() {
        // Inside addTask, retrieve and trim the value from the task input field.
        // Store this value in a variable named taskText.
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty ("").
        // If it is empty, use alert to prompt the user to enter a task.
        if (taskText === "") {
            // IMPORTANT: In a real application, consider using a custom modal
            // or a more subtle on-page message instead of `alert()`,
            // as `alert()` can be disruptive and is blocked in some environments.
            alert("Please enter a task.");
            return; // Exit the function if the input is empty
        }

        // Task Creation and Removal:
        // If taskText is not empty:
        // Create a new li element.
        const listItem = document.createElement('li');
        // Set its textContent to taskText.
        listItem.textContent = taskText;

        // Create a new button element for removing the task.
        const removeButton = document.createElement('button');
        // Set its textContent to "Remove".
        removeButton.textContent = "Remove";
        // Give it a class name of 'remove-btn' using classList.add().
        removeButton.classList.add('remove-btn'); // Changed from .className = 'remove-btn'

        // Assign an onclick event to the remove button that, when triggered,
        // removes the li element from taskList.
        removeButton.onclick = function() {
            // When the remove button is clicked, remove its parent li element from the task list.
            taskList.removeChild(listItem);
        };

        // Append the remove button to the li element,
        listItem.appendChild(removeButton);
        // then append the li to taskList.
        taskList.appendChild(listItem);

        // Clear the task input field by setting taskInput.value to an empty string.
        taskInput.value = '';
    }

    // Attach Event Listeners:
    // Add an event listener to addButton that calls addTask when the button is clicked.
    addButton.addEventListener('click', addTask);

    // Add an event listener to taskInput for the 'keypress' event
    // to allow tasks to be added by pressing the “Enter” key.
    // Inside this event listener, check if event.key is equal to 'Enter'
    // before calling addTask.
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Note: The instruction "Invoke the addTask function on DOMContentLoaded."
    // was interpreted to mean setting up event listeners within DOMContentLoaded.
    // An explicit call to addTask() here would add an empty task on page load
    // if the input is initially empty. If an initial task is desired, it should be
    // explicitly passed, e.g., addTask("Learn DOM manipulation");
});
