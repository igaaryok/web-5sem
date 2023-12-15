document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("todoForm");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value;
    if (taskText.trim() !== "") {
      addTask(taskText);
      taskInput.value = "";
      saveTasks();
    }
  });

  taskList.addEventListener("click", function (event) {
    if (event.target.classList.contains("toggleButton")) {
      toggleTask(event.target.parentNode);
      saveTasks();
    }
  });

  loadTasks();
});

function addTask(text) {
  const taskList = document.getElementById("taskList");
  const taskItem = document.createElement("li");

  const taskText = document.createElement("h3");
  taskText.textContent = text;

  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Зачеркнуть";
  toggleButton.classList.add("toggleButton");

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Удалить";
  deleteButton.classList.add("deleteButton");

  toggleButton.addEventListener("click", function (event) {
    toggleTask(event.target.parentNode);
    saveTasks();
  });

  deleteButton.addEventListener("click", function (event) {
    deleteTask(event.target.parentNode);
    saveTasks();
  });

  taskItem.appendChild(taskText)
  taskItem.appendChild(toggleButton);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
}

function toggleTask(taskItem) {
  taskItem.querySelector("h3").classList.add("completed");
}

function deleteTask(taskItem) {
  taskItem.remove();
}

function saveTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = Array.from(taskList.children).map((task) => ({
    text: task.querySelector("h3").textContent,
    completed: task.querySelector("h3").classList.contains("completed"),
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    tasks.forEach((task) => {
      const taskItem = document.createElement("li");
      const taskText = document.createElement("h3");
      taskText.textContent = task.text;
      if (task.completed) {
        taskText.classList.add("completed");
      }

      const toggleButton = document.createElement("button");
      toggleButton.textContent = "Зачеркнуть";
      toggleButton.classList.add("toggleButton");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Удалить";
      deleteButton.classList.add("deleteButton");

      toggleButton.addEventListener("click", function () {
        toggleTask(taskItem);
        saveTasks();
      });

      deleteButton.addEventListener("click", function () {
        deleteTask(taskItem);
        saveTasks();
      });

      taskItem.appendChild(taskText)
      taskItem.appendChild(toggleButton);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    });
  }
}
