
const navbarToggle = document.querySelector('.navbar-toggle')
const navbarMenu = document.querySelector('.navbar-menu')
const themeToggle = document.getElementById('themeToggle')
const sunIcon = document.getElementById('light')
const moonIcon = document.getElementById('dark')

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active')
    navbarMenu.classList.toggle('active')
})


function setTheme(theme) {
    const html = document.documentElement
    html.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)

    if (theme === 'dark') {
        sunIcon.style.setProperty('display', 'block', 'important')
        moonIcon.style.setProperty('display', 'none', 'important')
    } else {
        moonIcon.style.setProperty('display', 'block', 'important')
        sunIcon.style.setProperty('display', 'none', 'important')
    }
}

const savedTheme = localStorage.getItem('theme') || 'light'
setTheme(savedTheme)

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
})

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
                if (this.currentFilter === 'all') return this.tasks
                return this.tasks.filter(t => t.tag === this.currentFilter)
            },

            completedCount() {
                return this.tasks.filter(t => t.completed).length
            },

            progressPercent() {
                if (this.tasks.length === 0) return 0
                return Math.round((this.completedCount / this.tasks.length) * 100)
            }
        },

        methods: {
            addTask() {
                if (this.taskName.trim() === '') {
                    alert('Please enter a task name!')
                    return
                }
                this.tasks.push({
                    name: this.taskName.trim(),
                    date: this.taskDate,
                    tag: this.taskTag,
                    completed: false
                })
                this.taskName = ''
                this.taskDate = ''
                this.saveTasks()
            },

            toggleTask(index) {
                const realIndex = this.tasks.indexOf(this.filteredTasks[index])
                this.tasks[realIndex].completed = !this.tasks[realIndex].completed
                this.saveTasks()
            },

            deleteTask(index) {
                const realIndex = this.tasks.indexOf(this.filteredTasks[index])
                this.tasks.splice(realIndex, 1)
                this.saveTasks()
            },

            saveTasks() {
                localStorage.setItem('tasks', JSON.stringify(this.tasks))
            }
        }
    }).mount('#plannerApp')
}