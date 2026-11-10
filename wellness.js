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

// --- Wellness Stores & Features ---
let moodHistory = JSON.parse(localStorage.getItem('moodHistory') || '[]');
let sleepHistory = JSON.parse(localStorage.getItem('sleepHistory') || '[]');
let sessions = parseInt(localStorage.getItem('sessions') || '0');

let timerInterval = null;
let timerRunning = false;
let timerSeconds = 25 * 60;
let timerTotal = 25 * 60;
let timerMode = 'Focus';

const moodColors = {
    happy: '#34d399',
    okay: '#60a5fa',
    sad: '#a78bfa',
    stressed: '#f87171',
    tired: '#fbbf24'
};

// Mood Functions
function setMood(mood, label) {
    const today = new Date().toDateString();
    moodHistory = moodHistory.filter(m => m.date !== today);
    moodHistory.push({ date: today, mood, label });
    if (moodHistory.length > 30) moodHistory.shift();
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));

    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('selected');
    }

    const saved = document.getElementById('moodSaved');
    if (saved) saved.textContent = 'Mood saved! Feeling ' + label + ' today.';

    renderMoodChart();
}

function renderMoodChart() {
    const chart = document.getElementById('moodChart');
    if (!chart) return;
    chart.innerHTML = '';

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(today.getDate() - i);
        const dateStr = d.toDateString();
        const entry = moodHistory.find(m => m.date === dateStr);

        const dayCol = document.createElement('div');
        dayCol.className = 'chart-day';

        if (entry) {
            const dot = document.createElement('div');
            dot.className = 'chart-mood-dot';
            dot.style.backgroundColor = moodColors[entry.mood] || '#FF5500';
            dot.title = `${entry.label} (${d.toLocaleDateString()})`;
            dayCol.appendChild(dot);
        } else {
            const empty = document.createElement('div');
            empty.className = 'chart-empty';
            dayCol.appendChild(empty);
        }

        const label = document.createElement('span');
        label.className = 'chart-label';
        label.textContent = days[d.getDay()];
        dayCol.appendChild(label);

        chart.appendChild(dayCol);
    }
}

// Sleep Tracker
function calcSleep() {
    const bedtime = document.getElementById('bedtime').value;
    const wakeup = document.getElementById('wakeup').value;
    if (!bedtime || !wakeup) return;

    const [bH, bM] = bedtime.split(':').map(Number);
    const [wH, wM] = wakeup.split(':').map(Number);

    let start = bH * 60 + bM;
    let end = wH * 60 + wM;
    if (end <= start) end += 24 * 60;

    const diffMins = end - start;
    const hrs = Math.floor(diffMins / 60);
    const mins = diffMins % 60;

    const resultEl = document.getElementById('sleepResult');
    if (resultEl) {
        resultEl.textContent = `You slept for ${hrs}h ${mins}m`;
    }

    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    sleepHistory.unshift({ date: todayStr, duration: `${hrs}h ${mins}m` });
    if (sleepHistory.length > 5) sleepHistory.pop();
    localStorage.setItem('sleepHistory', JSON.stringify(sleepHistory));

    renderSleepHistory();
}

function renderSleepHistory() {
    const historyEl = document.getElementById('sleepHistory');
    if (!historyEl) return;
    historyEl.innerHTML = '';

    sleepHistory.forEach(entry => {
        const row = document.createElement('div');
        row.className = 'sleep-entry';
        row.innerHTML = `<span>${entry.date}</span><span>${entry.duration}</span>`;
        historyEl.appendChild(row);
    });
}

// Timer Functions
function setMode(mins, mode, btn) {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timerStartBtn').textContent = '▶ Start';

    timerSeconds = mins * 60;
    timerTotal = mins * 60;
    timerMode = mode;

    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    document.getElementById('timerModeLabel').textContent = `${mode} Time`;
    updateTimerDisplay();
}

function toggleTimer() {
    const startBtn = document.getElementById('timerStartBtn');
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
        startBtn.textContent = '▶ Start';
    } else {
        timerRunning = true;
        startBtn.textContent = '⏸ Pause';
        timerInterval = setInterval(() => {
            if (timerSeconds > 0) {
                timerSeconds--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerRunning = false;
                startBtn.textContent = '▶ Start';
                if (timerMode === 'Focus') {
                    sessions++;
                    localStorage.setItem('sessions', sessions);
                    renderSessions();
                }
                alert(`${timerMode} session completed!`);
            }
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('timerStartBtn').textContent = '▶ Start';
    timerSeconds = timerTotal;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const m = Math.floor(timerSeconds / 60).toString().padStart(2, '0');
    const s = (timerSeconds % 60).toString().padStart(2, '0');
    document.getElementById('timerDisplay').textContent = `${m}:${s}`;

    const ring = document.getElementById('timerRing');
    if (ring) {
        const offset = 339.3 * (1 - timerSeconds / timerTotal);
        ring.style.strokeDashoffset = offset;
    }
}

function renderSessions() {
    const dotsEl = document.getElementById('sessionDots');
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    for (let i = 0; i < sessions; i++) {
        const dot = document.createElement('div');
        dot.className = 'session-dot';
        dotsEl.appendChild(dot);
    }
}

// Initializations
window.addEventListener('DOMContentLoaded', () => {
    renderMoodChart();
    renderSleepHistory();
    renderSessions();
    updateTimerDisplay();
});