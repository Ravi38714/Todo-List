document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector("input");
    const button = document.querySelector("button");
    const list = document.querySelector(".list");

    // Load tasks from localStorage on page load
    loadTasks();

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".list li span:first-child").forEach(span => {
            tasks.push(span.innerText);
        });
        localStorage.setItem("todoList", JSON.stringify(tasks));
    }

    function addTask(taskText) {
        const newList = document.createElement("li");

        const span = document.createElement("span");
        span.innerText = taskText;

        const deleteButton = document.createElement("span");
        deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteButton.className = "delete-Btn";

        deleteButton.addEventListener("click", function () {
            list.removeChild(newList);
            saveTasks(); // Update localStorage after deletion
        });

        newList.appendChild(span);
        newList.appendChild(deleteButton);
        list.appendChild(newList);
    }

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("todoList")) || [];
        storedTasks.forEach(task => addTask(task));
    }

    function handleAdd() {
        const task = input.value.trim();
        if (task !== "") {
            addTask(task);
            saveTasks(); // Save new task to localStorage
            input.value = "";
        }
    }

    button.addEventListener("click", handleAdd);

    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            handleAdd();
        }
    });
});
