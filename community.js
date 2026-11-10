// --- Mobile Navbar Toggle ---
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// --- Theme Switcher ---
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

// --- Feed Data ---
let posts = [
    {
        id: 1,
        author: 'Kasun P',
        content: 'Hey everyone! Working on the EEI3346 project architecture. Anyone interested in discussing best practices for state management?',
        category: 'General',
        time: '2 hours ago',
        likes: 12,
        liked: false,
        comments: [
            { author: 'Amali S', text: 'Thanks for bringing this up! Would love to compare notes.' },
            { author: 'Nuwan R', text: 'Count me in!' }
        ],
        showComments: false
    },
    {
        id: 2,
        author: 'Sachini M',
        content: 'Does anyone have reliable practice papers or clear lecture summary notes for EEI3346?',
        category: 'Study',
        time: '5 hours ago',
        likes: 8,
        liked: false,
        comments: [
            { author: 'Dilshan K', text: 'I have compiled a few PDFs. DM me!' }
        ],
        showComments: false
    },
    {
        id: 3,
        author: 'Ravindu T',
        content: 'Reminder: The main library hall remains open until 9 PM throughout exam week.',
        category: 'Events',
        time: '1 day ago',
        likes: 24,
        liked: false,
        comments: [],
        showComments: false
    }
];

let postFilter = 'All';
let nextPostId = 4;

function renderPosts() {
    const postsList = document.getElementById('postsList');
    if (!postsList) return;

    const filtered = postFilter === 'All'
        ? posts
        : posts.filter(p => p.category === postFilter);

    if (filtered.length === 0) {
        postsList.innerHTML = `
            <div class="empty-posts">
                <p>! NO DISCUSSIONS FOUND IN CATEGORY: ${postFilter.toUpperCase()}</p>
            </div>
        `;
        return;
    }

    postsList.innerHTML = '';
    filtered.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post-card';
        div.innerHTML = `
            <div class="post-top">
                <div class="post-avatar">${escapeHTML(post.author.charAt(0))}</div>
                <div>
                    <p class="post-author">${escapeHTML(post.author)}</p>
                    <p class="post-time">${escapeHTML(post.time)}</p>
                </div>
                <span class="post-category">${escapeHTML(post.category)}</span>
            </div>
            <p class="post-content">${escapeHTML(post.content)}</p>
            <div class="post-actions">
                <button class="action-btn ${post.liked ? 'liked' : ''}" onclick="likePost(${post.id})">
                    <span>▲ LIKE</span>
                    <span>(${post.likes})</span>
                </button>
                <button class="action-btn" onclick="toggleComments(${post.id})">
                    <span>💬 COMMENTS</span>
                    <span>(${post.comments.length})</span>
                </button>
            </div>
            <div class="comments-section ${post.showComments ? 'open' : ''}" id="comments-${post.id}">
                ${post.comments.map(c => `
                    <div class="comment-item">
                        <div class="comment-avatar">${escapeHTML(c.author.charAt(0))}</div>
                        <div class="comment-bubble">
                            <p class="comment-author">${escapeHTML(c.author)}</p>
                            <p class="comment-text">${escapeHTML(c.text)}</p>
                        </div>
                    </div>
                `).join('')}
                <div class="add-comment-row">
                    <input type="text" placeholder="Add a comment..." id="commentInput-${post.id}">
                    <button onclick="addComment(${post.id})">Send →</button>
                </div>
            </div>
        `;
        postsList.appendChild(div);
    });
}

function likePost(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    renderPosts();
}

function toggleComments(id) {
    const post = posts.find(p => p.id === id);
    if (!post) return;
    post.showComments = !post.showComments;
    renderPosts();
}

function addComment(id) {
    const input = document.getElementById(`commentInput-${id}`);
    if (!input || input.value.trim() === '') return;
    const post = posts.find(p => p.id === id);
    if (!post) return;
    post.comments.push({
        author: 'You',
        text: input.value.trim()
    });
    post.showComments = true;
    renderPosts();
}

function filterPosts(filter) {
    postFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.trim() === filter) {
            btn.classList.add('active');
        }
    });
    renderPosts();
}

const addPostBtn = document.getElementById('addPostBtn');
if (addPostBtn) {
    addPostBtn.addEventListener('click', () => {
        const author = document.getElementById('postAuthor').value.trim();
        const content = document.getElementById('postContent').value.trim();
        const category = document.getElementById('postCategory').value;

        if (!author || !content) {
            alert('Please provide both your name and content!');
            return;
        }

        posts.unshift({
            id: nextPostId++,
            author,
            content,
            category,
            time: 'Just now',
            likes: 0,
            liked: false,
            comments: [],
            showComments: false
        });

        document.getElementById('postAuthor').value = '';
        document.getElementById('postContent').value = '';
        renderPosts();
    });
}

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

renderPosts();