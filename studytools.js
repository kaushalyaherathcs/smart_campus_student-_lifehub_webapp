//-----------------------------------For responsive nav bar
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const themeToggle = document.getElementById('themeToggle');

const sunIcon = document.getElementById('light');
const moonIcon = document.getElementById('dark');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});


function setTheme(theme) {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme); 

  if (theme === 'dark') {
    sunIcon.style.setProperty('display', 'block', 'important');
    moonIcon.style.setProperty('display', 'none', 'important');
  } else {
    moonIcon.style.setProperty('display', 'block', 'important');
    sunIcon.style.setProperty('display', 'none', 'important');
  }
}


const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

//----------------------------------Switch theme on click
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
});


// grade cal--------------------------------------
function addGradeRow() {
    const rows = document.getElementById('gradeRows')
    if (!rows) return
    const div = document.createElement('div')
    div.className = 'grade-row'
    div.innerHTML = `
        <input type="text"
            placeholder="Subject..."
            class="post-input grade-subject">
        <input type="number"
            placeholder="Marks"
            min="0" max="100"
            class="post-input grade-marks">
        <input type="number"
            placeholder="Credits"
            min="1" max="6"
            class="post-input grade-credits">
        <button class="del-row-btn"
            onclick="deleteGradeRow(this)">×</button>
    `
    rows.appendChild(div)
}

function deleteGradeRow(btn) {
    const rows = document.getElementById('gradeRows')
    if (!rows) return
    if (rows.children.length > 1) {
        btn.parentElement.remove()
    } else {
        alert('Need at least one subject!')
    }
}

function calGrades() {
    const rows = document.querySelectorAll('.grade-row')
    const result = document.getElementById('gradeResult')
    if (!result) return

    let totalWeighted = 0
    let totalCredits = 0
    let breakdown = []
    let valid = true

    rows.forEach(row => {
        const subject = row.querySelector('.grade-subject').value.trim()
        const marks = parseFloat(row.querySelector('.grade-marks').value)
        const credits = parseFloat(row.querySelector('.grade-credits').value)

        if (!subject || isNaN(marks) || isNaN(credits)) {
            valid = false
            return
        }

        totalWeighted += marks * credits
        totalCredits += credits
        breakdown.push({ subject, marks, credits })
    })

    if (!valid || totalCredits === 0) {
        alert('Please fill all subject fields correctly!')
        return
    }

    const avg = (totalWeighted / totalCredits).toFixed(2)

    let letter = ''
    let letterClass = ''
    if (avg >= 75) { letter = 'A'; letterClass = 'grade-a' }
    else if (avg >= 65) { letter = 'B'; letterClass = 'grade-b' }
    else if (avg >= 55) { letter = 'C'; letterClass = 'grade-c' }
    else if (avg >= 40) { letter = 'S'; letterClass = 'grade-s' }
    else { letter = 'F'; letterClass = 'grade-f' }

    result.classList.add('show')
    result.innerHTML = `
        <p class="grade-avg">${avg}%</p>
        <p class="grade-letter ${letterClass}">Grade ${letter}</p>
        <div class="grade-breakdown">
            ${breakdown.map(b => `
                <div class="grade-item">
                    <p>${b.subject}</p>
                    <span>${b.marks}% × ${b.credits} credits</span>
                </div>
            `).join('')}
        </div>
    `
}

// ---- note--------------------------------------

const { createApp } = Vue

createApp({
  data() {
    return {
      notes: JSON.parse(localStorage.getItem('notes') || '[]'),
      newSubject: '',
      newContent: ''
    }
  },
  methods: {
    addNote() {
      const subject = this.newSubject.trim()
      const content = this.newContent.trim()

      if (!content) {
        alert('Please write something!')
        return
      }
      this.notes.unshift({
        id: Date.now(),
        subject: subject || 'General',
        content: content,
        date: new Date().toLocaleDateString()
      })
      this.newSubject = ''
      this.newContent = ''
      this.saveToStorage()
    },

    deleteNote(id) {
      this.notes = this.notes.filter(n => n.id !== id)
      this.saveToStorage()
    },

    saveToStorage() {
      localStorage.setItem('notes', JSON.stringify(this.notes))
    }
  }
}).mount('#app')





let budgetEntries = JSON.parse(localStorage.getItem('budgetEntries') || '[]')
let budgetType = 'income'

function setBudgetType(type) {
    budgetType = type
    const incomeBtn = document.getElementById('incomeBtn')
    const expenseBtn = document.getElementById('expenseBtn')
    if (!incomeBtn || !expenseBtn) return

    if (type === 'income') {
        incomeBtn.classList.add('active')
        expenseBtn.classList.remove('active')
    } else {
        expenseBtn.classList.add('active')
        incomeBtn.classList.remove('active')
    }
}

function addBudgetEntry() {
    const desc = document.getElementById('budgetDesc').value.trim()
    const amount = parseFloat(document.getElementById('budgetAmount').value)

    if (!desc || isNaN(amount) || amount <= 0) {
        alert('Please fill in description and amount!')
        return
    }

    budgetEntries.unshift({
        id: Date.now(),
        desc,
        amount,
        type: budgetType,
        date: new Date().toLocaleDateString()
    })

    localStorage.setItem('budgetEntries', JSON.stringify(budgetEntries))
    document.getElementById('budgetDesc').value = ''
    document.getElementById('budgetAmount').value = ''
    renderBudget()
}

function deleteBudgetEntry(id) {
    budgetEntries = budgetEntries.filter(e => e.id !== id)
    localStorage.setItem('budgetEntries', JSON.stringify(budgetEntries))
    renderBudget()
}

function renderBudget() {
    const entriesEl = document.getElementById('budgetEntries')
    if (!entriesEl) return

    const income = budgetEntries
        .filter(e => e.type === 'income')
        .reduce((sum, e) => sum + e.amount, 0)

    const expense = budgetEntries
        .filter(e => e.type === 'expense')
        .reduce((sum, e) => sum + e.amount, 0)

    const balance = income - expense
    const percent = income > 0
        ? Math.min(Math.round((expense / income) * 100), 100)
        : 0

    const totalIncome = document.getElementById('totalIncome')
    const totalExpense = document.getElementById('totalExpense')
    const totalBalance = document.getElementById('totalBalance')
    const budgetFill = document.getElementById('budgetFill')
    const spentPercent = document.getElementById('spentPercent')

    if (totalIncome) totalIncome.textContent = `LKR ${income.toLocaleString()}`
    if (totalExpense) totalExpense.textContent = `LKR ${expense.toLocaleString()}`
    if (totalBalance) {
        totalBalance.textContent = `LKR ${balance.toLocaleString()}`
        totalBalance.style.color = balance >= 0 ? '#34d399' : '#ef4444'
    }
    if (budgetFill) budgetFill.style.width = percent + '%'
    if (spentPercent) spentPercent.textContent = percent + '%'

    if (budgetEntries.length === 0) {
        entriesEl.innerHTML = `
            <div class="budget-empty">
                 No entries yet. Add income or expense above!
            </div>
        `
        return
    }

    entriesEl.innerHTML = ''
    budgetEntries.forEach(entry => {
        const div = document.createElement('div')
        div.className = 'budget-entry'
        div.innerHTML = `
            <div class="entry-dot ${entry.type}"></div>
            <p class="entry-desc">${entry.desc}
                <small style="color:var(--text-muted);font-size:11px;">
                    — ${entry.date}
                </small>
            </p>
            <p class="entry-amount ${entry.type}">
                ${entry.type === 'income' ? '+' : '-'}
                LKR ${entry.amount.toLocaleString()}
            </p>
            <button class="entry-del"
                onclick="deleteBudgetEntry(${entry.id})">×</button>
        `
        entriesEl.appendChild(div)
    })
}
renderNotes()
renderBudget()