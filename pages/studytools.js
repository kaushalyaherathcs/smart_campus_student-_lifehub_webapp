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

// --- 1. GRADE CALCULATOR ---
function addGradeRow() {
    const container = document.getElementById('gradeRows');
    const row = document.createElement('div');
    row.className = 'grade-row';
    row.innerHTML = `
        <input type="text" placeholder="Subject..." class="post-input grade-subject">
        <input type="number" placeholder="Marks" min="0" max="100" class="post-input grade-marks">
        <input type="number" placeholder="Credits" min="1" max="6" class="post-input grade-credits">
        <button class="del-row-btn" onclick="deleteGradeRow(this)">×</button>
    `;
    container.appendChild(row);
}

function deleteGradeRow(btn) {
    const container = document.getElementById('gradeRows');
    if (container.children.length > 1) {
        btn.parentElement.remove();
    }
}

function getGradePoint(marks) {
    if (marks >= 85) return 4.0;
    if (marks >= 75) return 3.7;
    if (marks >= 70) return 3.3;
    if (marks >= 65) return 3.0;
    if (marks >= 60) return 2.7;
    if (marks >= 55) return 2.3;
    if (marks >= 50) return 2.0;
    if (marks >= 45) return 1.7;
    if (marks >= 40) return 1.3;
    return 0.0;
}

function calGrades() {
    const marksInputs = document.querySelectorAll('.grade-marks');
    const creditsInputs = document.querySelectorAll('.grade-credits');

    let totalPoints = 0;
    let totalCredits = 0;

    marksInputs.forEach((input, index) => {
        const mark = parseFloat(input.value);
        const credit = parseFloat(creditsInputs[index].value);

        if (!isNaN(mark) && !isNaN(credit) && credit > 0) {
            totalPoints += getGradePoint(mark) * credit;
            totalCredits += credit;
        }
    });

    const resultEl = document.getElementById('gradeResult');
    if (totalCredits > 0) {
        const gpa = (totalPoints / totalCredits).toFixed(2);
        resultEl.innerHTML = `Estimated GPA: <strong style="color:var(--accent); margin-left:8px;">${gpa}</strong> (Total Credits: ${totalCredits})`;
    } else {
        resultEl.textContent = 'Please enter valid marks and credits.';
    }
}

// --- 2. QUICK NOTES (VUE.JS INTEGRATION) ---
const { createApp } = Vue;

createApp({
    data() {
        return {
            newSubject: '',
            newContent: '',
            notes: JSON.parse(localStorage.getItem('studyNotes') || '[]')
        }
    },
    methods: {
        addNote() {
            if (!this.newSubject.trim() || !this.newContent.trim()) return;
            const newNote = {
                id: Date.now(),
                subject: this.newSubject.trim(),
                content: this.newContent.trim()
            };
            this.notes.unshift(newNote);
            this.saveNotes();
            this.newSubject = '';
            this.newContent = '';
        },
        deleteNote(id) {
            this.notes = this.notes.filter(n => n.id !== id);
            this.saveNotes();
        },
        saveNotes() {
            localStorage.setItem('studyNotes', JSON.stringify(this.notes));
        }
    }
}).mount('#app');

// --- 3. BUDGET TRACKER ---
let currentType = 'income';
let budgetEntries = JSON.parse(localStorage.getItem('budgetEntries') || '[]');

function setBudgetType(type) {
    currentType = type;
    const incBtn = document.getElementById('incomeBtn');
    const expBtn = document.getElementById('expenseBtn');

    if (type === 'income') {
        incBtn.classList.add('active');
        expBtn.classList.remove('active');
    } else {
        expBtn.classList.add('active');
        incBtn.classList.remove('active');
    }
}

function addBudgetEntry() {
    const desc = document.getElementById('budgetDesc').value.trim();
    const amount = parseFloat(document.getElementById('budgetAmount').value);

    if (!desc || isNaN(amount) || amount <= 0) return;

    budgetEntries.unshift({
        id: Date.now(),
        desc,
        amount,
        type: currentType
    });

    localStorage.setItem('budgetEntries', JSON.stringify(budgetEntries));

    document.getElementById('budgetDesc').value = '';
    document.getElementById('budgetAmount').value = '';

    renderBudget();
}

function renderBudget() {
    let income = 0;
    let expense = 0;

    const listContainer = document.getElementById('budgetEntries');
    listContainer.innerHTML = '';

    budgetEntries.forEach(item => {
        if (item.type === 'income') income += item.amount;
        else expense += item.amount;

        const row = document.createElement('div');
        row.className = `budget-entry-item ${item.type}`;
        row.innerHTML = `
            <span>${item.desc}</span>
            <span>${item.type === 'income' ? '+' : '-'} LKR ${item.amount.toLocaleString()}</span>
        `;
        listContainer.appendChild(row);
    });

    document.getElementById('totalIncome').textContent = `LKR ${income.toLocaleString()}`;
    document.getElementById('totalExpense').textContent = `LKR ${expense.toLocaleString()}`;

    const balance = income - expense;
    const balanceEl = document.getElementById('totalBalance');
    balanceEl.textContent = `LKR ${balance.toLocaleString()}`;
    balanceEl.style.color = balance >= 0 ? 'var(--accent)' : '#f87171';
}

window.addEventListener('DOMContentLoaded', () => {
    renderBudget();
});