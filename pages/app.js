// --- Navbar Toggle Mobile ---
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});


const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    if (theme === 'dark') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});


function animateCounter(elementID, target, duration) {
    const element = document.getElementById(elementID);
    if (!element) return;
    let start = 0;
    const increment = target / (duration / 30);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString();
        }
    }, 30);
}

const createCounterObserver = (id, target, time) => {
    const el = document.getElementById(id);
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(id, target, time);
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    observer.observe(el);
};

createCounterObserver('Counter', 2700, 1800);
createCounterObserver('FeatureCounter', 6, 1200);
createCounterObserver('spanCounter', 100, 1500);


let notices = JSON.parse(localStorage.getItem('notices') || '[]');
let editingNoticeId = null;

if (notices.length === 0) {
    notices = [
        {
            id: 1,
            title: 'EEI3346 Mini Project Submission',
            content: 'Mini project submission deadline is 27/07/2026 at 05:00 PM. Submit all files zipped to the LMS. Late submissions will receive 0 marks.'
        },
        {
            id: 2,
            title: 'Viva Examination Schedule',
            content: 'Students will be called for viva to demonstrate their project. The date will be announced in the LMS. Please be prepared to explain all technical decisions.'
        },
        {
            id: 3,
            title: 'Campus Library Extended Hours',
            content: 'The campus library will remain open until 9PM during exam season. Make use of the additional study space.'
        }
    ];
    localStorage.setItem('notices', JSON.stringify(notices));
}

function renderNotices() {
    const list = document.getElementById('noticesList');
    if (!list) return;

    if (notices.length === 0) {
        list.innerHTML = `
                    <div class="notice-empty">
                        <p>! NO ACTIVE NOTICES IN DATABASE</p>
                    </div>
                `;
        return;
    }

    list.innerHTML = '';
    notices.forEach(notice => {
        const div = document.createElement('div');
        div.className = 'notice-card';
        div.innerHTML = `
                    <div class="notice-card-header">
                        <p class="notice-card-title">${escapeHTML(notice.title)}</p>
                        <div class="notice-card-actions">
                            <button class="notice-edit-btn" onclick="editNotice(${notice.id})" title="Edit">✎</button>
                            <button class="notice-del-btn" onclick="deleteNotice(${notice.id})" title="Delete">✕</button>
                        </div>
                    </div>
                    <p class="notice-card-content">${escapeHTML(notice.content)}</p>
                `;
        list.appendChild(div);
    });
}

function submitNotice() {
    const titleInput = document.getElementById('noticeTitle');
    const contentInput = document.getElementById('noticeContent');
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert('Please fill in both title and description!');
        return;
    }

    if (editingNoticeId !== null) {
        const index = notices.findIndex(n => n.id === editingNoticeId);
        if (index !== -1) {
            notices[index].title = title;
            notices[index].content = content;
        }
        editingNoticeId = null;
        document.getElementById('formTitle').textContent = '[ Post a Notice ]';
        document.getElementById('noticeSubmitBtn').textContent = 'Post Announcement →';
        document.getElementById('noticeCancelBtn').style.display = 'none';
    } else {
        notices.unshift({
            id: Date.now(),
            title,
            content
        });
    }

    localStorage.setItem('notices', JSON.stringify(notices));
    titleInput.value = '';
    contentInput.value = '';
    renderNotices();
}

function editNotice(id) {
    const notice = notices.find(n => n.id === id);
    if (!notice) return;

    editingNoticeId = id;
    document.getElementById('noticeTitle').value = notice.title;
    document.getElementById('noticeContent').value = notice.content;
    document.getElementById('formTitle').textContent = '[ Edit Notice ]';
    document.getElementById('noticeSubmitBtn').textContent = 'Save Changes →';
    document.getElementById('noticeCancelBtn').style.display = 'block';

    document.querySelector('.notice-form-card').scrollIntoView({ behavior: 'smooth' });
}

function deleteNotice(id) {
    if (!confirm('Delete this notice announcement?')) return;
    notices = notices.filter(n => n.id !== id);
    localStorage.setItem('notices', JSON.stringify(notices));
    renderNotices();
}

function cancelEdit() {
    editingNoticeId = null;
    document.getElementById('noticeTitle').value = '';
    document.getElementById('noticeContent').value = '';
    document.getElementById('formTitle').textContent = '[ Post a Notice ]';
    document.getElementById('noticeSubmitBtn').textContent = 'Post Announcement →';
    document.getElementById('noticeCancelBtn').style.display = 'none';
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

renderNotices();

window.addEventListener('load', () => {
    const loader = document.getElementById('loadingOverlay');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }
});