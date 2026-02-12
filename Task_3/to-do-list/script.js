// Task Manager Class
class TaskManager {
    constructor() {
        this.tasks = this.loadTasks();
        this.editingTaskId = null;
        this.init();
    }

    // Initialize the app
    init() {
        this.setupEventListeners();
        this.renderTasks();
        this.updateStats();
    }

    // Setup event listeners
    setupEventListeners() {
        // Form submission
        const taskForm = document.getElementById('taskForm');
        taskForm.addEventListener('submit', (e) => this.handleAddTask(e));

        // Edit modal
        document.getElementById('closeModal').addEventListener('click', () => this.closeModal());
        document.getElementById('cancelEdit').addEventListener('click', () => this.closeModal());
        document.getElementById('editForm').addEventListener('submit', (e) => this.handleEditTask(e));

        // Clear buttons
        document.getElementById('clearPending').addEventListener('click', () => this.clearAllPending());
        document.getElementById('clearCompleted').addEventListener('click', () => this.clearAllCompleted());

        // Close modal on background click
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') {
                this.closeModal();
            }
        });
    }

    // Add new task
    handleAddTask(e) {
        e.preventDefault();

        const titleInput = document.getElementById('taskTitle');
        const descriptionInput = document.getElementById('taskDescription');
        const dateInput = document.getElementById('taskDate');

        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        const dueDate = dateInput.value;

        // Validation
        const titleError = document.getElementById('titleError');
        if (!title) {
            titleError.textContent = 'Please fill out this field.';
            return;
        }
        titleError.textContent = '';

        // Create task object
        const task = {
            id: Date.now(),
            title: title,
            description: description,
            dueDate: dueDate,
            completed: false,
            createdAt: this.getCurrentDateTime(),
            completedAt: null
        };

        // Add task to array
        this.tasks.push(task);
        this.saveTasks();

        // Clear form
        titleInput.value = '';
        descriptionInput.value = '';
        dateInput.value = '';

        // Re-render and update stats
        this.renderTasks();
        this.updateStats();
    }

    // Render all tasks
    renderTasks() {
        const pendingList = document.getElementById('pendingTasksList');
        const completedList = document.getElementById('completedTasksList');

        // Separate tasks
        const pendingTasks = this.tasks.filter(task => !task.completed);
        const completedTasks = this.tasks.filter(task => task.completed);

        // Clear lists
        pendingList.innerHTML = '';
        completedList.innerHTML = '';

        // Render pending tasks
        if (pendingTasks.length === 0) {
            pendingList.innerHTML = '<div class="empty-state"><p>✓ No pending tasks! You\'re all caught up.</p></div>';
        } else {
            pendingTasks.forEach(task => {
                pendingList.appendChild(this.createTaskElement(task, false));
            });
        }

        // Render completed tasks
        if (completedTasks.length === 0) {
            completedList.innerHTML = '<div class="empty-state"><p>No completed tasks yet.</p></div>';
        } else {
            completedTasks.forEach(task => {
                completedList.appendChild(this.createTaskElement(task, true));
            });
        }

        // Update button visibility
        document.getElementById('clearPending').style.display = pendingTasks.length > 0 ? 'block' : 'none';
        document.getElementById('clearCompleted').style.display = completedTasks.length > 0 ? 'block' : 'none';
    }

    // Create task element
    createTaskElement(task, isCompleted) {
        const taskCard = document.createElement('div');
        taskCard.className = `task-card ${isCompleted ? 'completed-task' : ''}`;
        taskCard.dataset.taskId = task.id;

        const dueDateHTML = task.dueDate 
            ? `<span class="task-due-date">📅 ${this.formatDate(task.dueDate)}</span>` 
            : '';

        const completedDateTime = task.completedAt 
            ? `<span class="meta-item">✓ Completed: ${task.completedAt}</span>` 
            : '';

        taskCard.innerHTML = `
            <div class="task-header">
                <div class="task-title">${this.escapeHtml(task.title)}</div>
            </div>
            <div class="task-meta">
                <span class="meta-item">📝 Added: ${task.createdAt}</span>
                ${completedDateTime}
            </div>
            ${dueDateHTML}
            ${task.description ? `<div class="task-description">${this.escapeHtml(task.description)}</div>` : ''}
            <div class="task-actions">
                ${isCompleted 
                    ? `<button class="btn-small btn-incomplete" onclick="taskManager.toggleComplete(${task.id})">Mark Pending</button>` 
                    : `<button class="btn-small btn-complete" onclick="taskManager.toggleComplete(${task.id})">Mark Complete</button>`
                }
                <button class="btn-small btn-edit" onclick="taskManager.openEditModal(${task.id})">Edit</button>
                <button class="btn-small btn-delete" onclick="taskManager.deleteTask(${task.id})">Delete</button>
            </div>
        `;

        return taskCard;
    }

    // Toggle task completion
    toggleComplete(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            task.completedAt = task.completed ? this.getCurrentDateTime() : null;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Open edit modal
    openEditModal(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (!task) return;

        this.editingTaskId = taskId;

        document.getElementById('editTitle').value = task.title;
        document.getElementById('editDescription').value = task.description;
        document.getElementById('editDate').value = task.dueDate;

        document.getElementById('editModal').classList.add('active');
    }

    // Close edit modal
    closeModal() {
        document.getElementById('editModal').classList.remove('active');
        this.editingTaskId = null;
        document.getElementById('editForm').reset();
    }

    // Handle edit task
    handleEditTask(e) {
        e.preventDefault();

        if (!this.editingTaskId) return;

        const task = this.tasks.find(t => t.id === this.editingTaskId);
        if (!task) return;

        const title = document.getElementById('editTitle').value.trim();
        const description = document.getElementById('editDescription').value.trim();
        const dueDate = document.getElementById('editDate').value;

        if (!title) {
            alert('Please enter a task title');
            return;
        }

        task.title = title;
        task.description = description;
        task.dueDate = dueDate;

        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.closeModal();
    }

    // Delete task
    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== taskId);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Clear all pending tasks
    clearAllPending() {
        if (confirm('Are you sure you want to delete all pending tasks?')) {
            this.tasks = this.tasks.filter(t => t.completed);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Clear all completed tasks
    clearAllCompleted() {
        if (confirm('Are you sure you want to delete all completed tasks?')) {
            this.tasks = this.tasks.filter(t => !t.completed);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Update statistics
    updateStats() {
        const total = this.tasks.length;
        const pending = this.tasks.filter(t => !t.completed).length;
        const completed = this.tasks.filter(t => t.completed).length;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('completedCount').textContent = completed;
        document.getElementById('pendingBadge').textContent = pending;
        document.getElementById('completedBadge').textContent = completed;
    }

    // Get current date and time
    getCurrentDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        return `${date} at ${time}`;
    }

    // Format date for display
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Save tasks to localStorage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Load tasks from localStorage
    loadTasks() {
        const saved = localStorage.getItem('tasks');
        return saved ? JSON.parse(saved) : [];
    }
}

// Initialize task manager when DOM is ready
let taskManager;
document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});
