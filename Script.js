
const tasks = [
  { name: "Revise Python quiz", subject: "Python", priority: "High", done: false },
  { name: "Complete T&IA assignment", subject: "T&IA", priority: "Medium", done: false },
  { name: "Practice Maths problems", subject: "Maths", priority: "Low", done: false }
];

const $ = (id) => document.getElementById(id);

function showToast(message) {
  const toast = $("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function renderTasks() {
  const html = tasks.map((task, index) => `
    <div class="task">
      <button class="check ${task.done ? "done" : ""}" data-check="${index}">
        ${task.done ? "✓" : ""}
      </button>
      <div class="task-main">
        <b style="${task.done ? "text-decoration:line-through" : ""}">${task.name}</b>
        <small>${task.subject}</small>
      </div>
      <span class="priority ${task.priority}">${task.priority}</span>
    </div>
  `).join("");

  if ($("priorityList")) $("priorityList").innerHTML = html;
  if ($("allTasks")) $("allTasks").innerHTML = html;

  document.querySelectorAll("[data-check]").forEach(button => {
    button.addEventListener("click", () => {
      tasks[Number(button.dataset.check)].done =
        !tasks[Number(button.dataset.check)].done;
      renderTasks();
      showToast("Task updated!");
    });
  });

  if ($("doneCount")) {
    $("doneCount").textContent = tasks.filter(t => t.done).length;
  }
}

function openTaskModal() {
  if ($("taskModal")) $("taskModal").classList.add("show");
}

function closeTaskModal() {
  if ($("taskModal")) $("taskModal").classList.remove("show");
}

document.querySelectorAll("[data-view]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".view").forEach(view =>
      view.classList.remove("active-view")
    );
    document.querySelectorAll(".nav").forEach(nav =>
      nav.classList.remove("active")
    );
    const view = $(button.dataset.view);
    if (view) view.classList.add("active-view");
    button.classList.add("active");
  });
});

document.querySelectorAll("[data-view-target]").forEach(button => {
  button.addEventListener("click", () => {
    const target = $(button.dataset.viewTarget);
    document.querySelectorAll(".view").forEach(view =>
      view.classList.remove("active-view")
    );
    if (target) target.classList.add("active-view");
    document.querySelectorAll(".nav").forEach(nav =>
      nav.classList.toggle("active", nav.dataset.view === button.dataset.viewTarget)
    );
  });
});

if ($("addBtn")) $("addBtn").addEventListener("click", openTaskModal);
if ($("addBtn2")) $("addBtn2").addEventListener("click", openTaskModal);
if ($("closeModal")) $("closeModal").addEventListener("click", closeTaskModal);

if ($("saveTask")) {
  $("saveTask").addEventListener("click", () => {
    const name = $("taskName").value.trim();
    if (!name) {
      showToast("Please enter a task name.");
      return;
    }
    tasks.push({
      name,
      subject: $("taskSubject").value.trim() || "General",
      priority: $("taskPriority").value,
      done: false
    });
    renderTasks();
    closeTaskModal();
    $("taskName").value = "";
    $("taskSubject").value = "";
    showToast("Task added successfully!");
  });
}

if ($("hours") && $("hoursValue")) {
  $("hours").addEventListener("input", () => {
    $("hoursValue").textContent = $("hours").value;
  });
}

function generatePlan() {
  const goal = $("goal")?.value.trim();
  const hours = Number($("hours")?.value || 3);
  const output = $("generatedPlan");
  if (!output) return;

  const blocks = Math.max(1, Math.min(6, hours));
  output.className = "generated-plan";
  output.innerHTML = Array.from({ length: blocks }, (_, i) => `
    <div class="plan-item">
      <span class="plan-time">${i + 1}:00</span>
      <div>
        <b>${i === 0 && goal ? goal.replace(/</g, "&lt;").replace(/>/g, "&gt;") : ["Focused study", "Practice questions", "Short break", "Review notes", "Complete pending work", "Quick revision"][i]}</b>
        <small>${i === 2 ? "Rest and recharge" : "Work steadily, then take a short break"}</small>
      </div>
    </div>
  `).join("");
  if ($("planStatus")) $("planStatus").textContent = "Your study plan is ready.";
  showToast("Study plan created!");
}

if ($("generatePlan")) $("generatePlan").addEventListener("click", generatePlan);
if ($("planBtn")) {
  $("planBtn").addEventListener("click", () => {
    document.querySelectorAll(".view").forEach(view =>
      view.classList.remove("active-view")
    );
    if ($("planner")) $("planner").classList.add("active-view");
    generatePlan();
  });
}

renderTasks();
