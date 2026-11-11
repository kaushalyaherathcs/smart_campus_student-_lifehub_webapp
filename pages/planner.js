// --- Mobile Navbar Toggle ---
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
}

// --- Theme Switcher ---
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
    } else {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });
}

// --- Vue App Logic ---
if (document.getElementById('plannerApp')) {
    Vue.createApp({
        data() {
            return {
                tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
                taskName: '',
                taskDate: '',
                taskTag: 'Study',
                currentFilter: 'all'
            }
        },

        computed: {
            filteredTasks() {
                if (this.currentFilter === 'all') return this.tasks;
                return this.tasks.filter(t => t.tag === this.currentFilter);
            },

            completedCount() {
                return this.tasks.filter(t => t.completed).length;
            },

            progressPercent() {
                if (this.tasks.length === 0) return 0;
                return Math.round((this.completedCount / this.tasks.length) * 100);
            }
        },

        methods: {
            addTask() {
                if (this.taskName.trim() === '') {
                    alert('Please enter a task description!');
                    return;
                }
                this.tasks.push({
                    name: this.taskName.trim(),
                    date: this.taskDate,
                    tag: this.taskTag,
                    completed: false
                });
                this.taskName = '';
                this.taskDate = '';
                this.saveTasks();
            },

            toggleTask(index) {
                const targetTask = this.filteredTasks[index];
                const realIndex = this.tasks.indexOf(targetTask);
                if (realIndex !== -1) {
                    this.tasks[realIndex].completed = !this.tasks[realIndex].completed;
                    this.saveTasks();
                }
            },

            deleteTask(index) {
                const targetTask = this.filteredTasks[index];
                const realIndex = this.tasks.indexOf(targetTask);
                if (realIndex !== -1) {
                    this.tasks.splice(realIndex, 1);
                    this.saveTasks();
                }
            },

            saveTasks() {
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            }
        }
    }).mount('#plannerApp');
}