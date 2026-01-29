const userName = "Dédrick";

document.getElementById("welcomeMessage").innerText = `Hey, ${userName}!`;

alert("Bien Venido Dédick!!! Small wins add up. One Task At A Time.");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Renderizar tarefas ao abrir a app
renderTasks();

function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value) return;

    tasks.push({
        text: input.value,
        status: "Pending"
    });

    input.value ="";
    saveAndRender();

}

function changeStatus(index, newStatus) {
    tasks[index].status = newStatus;
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
}

function renderTasks() {
    document.getElementById("pending").innerHTML = "";
    document.getElementById("progress").innerHTML = "";
    document.getElementById("completed").innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = getClass(task.status);

        li.innerHTML = `
    <span>${task.text}</span>

    <select onchange="changeStatus(${index}, this.value)">
        <option ${task.status === "Pending" ? "selected" : ""}>Pending</option>
        <option ${task.status === "In Progress" ? "selected" : ""}>In Progress</option>
        <option ${task.status === "Completed" ? "selected" : ""}>Completed</option>
    </select>

    <button onclick="editTask(${index})">✏️</button>
    <button onclick="deleteTask(${index})">🗑️</button>
`;


        document.getElementById(getColumn(task.status)).appendChild(li);
    });
}


function getColumn(status) {
    if (status == "Pending") return "pending";
    if (status == "In Progress") return "progress";
    return "completed";
}

function getClass(status) {
    if (status == "Pending") return "pending";
    if (status == "In Progress") return "progress";
    return "completed";
}

// Apagar Tarefa
function deleteTask(index) {
    if (!confirm("Tem certeza que queres apagar esta tarefa?")) return;
    tasks.splice(index, 1);
    saveAndRender();
}

//Editar Tarefa
function editTask(index) {
    const newText = prompt("Editar tarefa:", tasks[index].text);
    if (newText === null || newText.trim() === "") return;

    tasks[index].text = newText.trim();
    saveAndRender();
}

   
