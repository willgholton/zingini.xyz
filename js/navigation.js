let blogData = [];

function fetchSlurs() {
    console.log("die");
    const messages = [
        "hello",
        "meow",
        "cock",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    typewriterManager.startTypewriter("message", randomMessage, 50);
}

function zoomToSection(sectionId) {
    console.log("FUCK");
    const currentSection = document.querySelector(".active");
    const targetSection = document.getElementById(sectionId);

    if (currentSection !== targetSection) {
        currentSection.classList.remove("active");
        currentSection.classList.add("hidden");
        
        targetSection.classList.remove("hidden");
        targetSection.classList.add("active");
        
        localStorage.setItem('zingini-current-section', sectionId);
    }
}

function meowAction() {
    const meowMessages = [
        "meowoowowowowow",
        "meow",
        "meow meow",
    ];
    
    const randomMeow = meowMessages[Math.floor(Math.random() * meowMessages.length)];
    
    typewriterManager.startTypewriter("meowMessage", randomMeow, 50);
    
    for (let j = 0; j < 5; j++) {
        setTimeout(() => {
            const catParticle = document.createElement('div');
            catParticle.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                font-size: 2rem;
                pointer-events: none;
                animation: catParticle 2s ease-out forwards;
                z-index: 1000;
            `;
            catParticle.textContent = ['😺', '😸', '😹', '😻', '😼', '😽'][Math.floor(Math.random() * 6)];
            document.body.appendChild(catParticle);
            
            setTimeout(() => catParticle.remove(), 2000);
        }, j * 200);
    }
}

async function loadBlogData() {
    try {
        console.log('Attempting to load blog-data.json...');
        const response = await fetch('data/blog-data.json');
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Blog data loaded successfully:', data);
        blogData = data.posts;
        renderBlogPosts();
    } catch (error) {
        console.error('Error loading blog data:', error);
        console.log('Using fallback blog data...');
        
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'data/blog-data.json', false);
            xhr.send();
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                console.log('Blog data loaded via XHR:', data);
                blogData = data.posts;
                renderBlogPosts();
                return;
            }
        } catch (xhrError) {
            console.error('XHR also failed:', xhrError);
        }
        
        blogData = [
            {
                id: "fallback-1",
                title: "📝 Fallback Blog Post",
                excerpt: "This is a fallback blog post that appears when the main blog data fails to load...",
                content: "This is a fallback blog post that appears when the main blog data fails to load. The actual blog posts should be loaded from blog-data.json, but since that file couldn't be loaded, you're seeing this placeholder content instead.",
                date: "2024-01-15",
                tags: ["fallback", "placeholder", "error"],
                readTime: "1 min read"
            }
        ];
        renderBlogPosts();
    }
}

function renderBlogPosts() {
    const blogPostsContainer = document.getElementById('blogPosts');
    if (!blogPostsContainer) return;
    
    blogPostsContainer.innerHTML = '';
    
    blogData.forEach(post => {
        const article = document.createElement('article');
        article.className = 'blog-post';
        article.setAttribute('data-post-id', post.id);
        
        const date = new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        article.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="blog-meta">
                <span class="blog-date">📅 ${date}</span>
                <span class="blog-read-time">⏱️ ${post.readTime}</span>
                <div class="blog-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">#${tag}</span>`).join('')}
                </div>
            </div>
            <div class="blog-actions">
                <button class="blog-button" onclick="readMore(this)">📖 Read More</button>
            </div>
        `;
        
        blogPostsContainer.appendChild(article);
    });
}

function loadRandomPost() {
    if (blogData.length === 0) {
        typewriterManager.startTypewriter("message", "📝 Loading blog posts...", 30);
        setTimeout(() => {
            const messageElement = document.getElementById("message");
            messageElement.classList.remove("visible");
        }, 2000);
        return;
    }
    
    const randomPost = blogData[Math.floor(Math.random() * blogData.length)];
    const blogPostElement = document.querySelector(`[data-post-id="${randomPost.id}"]`);
    
    if (blogPostElement) {
        blogPostElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        blogPostElement.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            blogPostElement.style.animation = '';
        }, 1000);
        
        typewriterManager.startTypewriter("message", `🎲 Random post: ${randomPost.title}`, 30);
        
        setTimeout(() => {
            const messageElement = document.getElementById("message");
            messageElement.classList.remove("visible");
        }, 3000);
    }
}

function toggleBlogTheme() {
    toggleGlobalTheme();
}

function toggleGlobalTheme() {
    const themes = ['default', 'dark', 'cyber', 'retro'];
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const newTheme = themes[nextIndex];
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const themeIcons = {
        'default': '🧀',
        'dark': '🌙',
        'cyber': '💚',
        'retro': '🔥'
    };
    themeIcon.textContent = themeIcons[newTheme];
    
    localStorage.setItem('zingini-theme', newTheme);
}

function shareBlog() {
    const shareText = "Check out this blog at zingini.xyz!";
    
    if (navigator.share) {
        navigator.share({
            title: 'Blog a la zingini.xyz',
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
            typewriterManager.startTypewriter("message", "📤 Blog link copied to clipboard!", 30);
            
            setTimeout(() => {
                const messageElement = document.getElementById("message");
                messageElement.classList.remove("visible");
            }, 3000);
        });
    }
}

function readMore(button) {
    const blogPost = button.closest('.blog-post');
    const isExpanded = blogPost.classList.contains('expanded');
    const postId = blogPost.getAttribute('data-post-id');
    
    if (isExpanded) {
        blogPost.classList.remove('expanded');
        button.textContent = '📖 Read More';
        
        const existingContent = blogPost.querySelector('.expanded-content');
        if (existingContent) {
            existingContent.remove();
        }
    } else {
        blogPost.classList.add('expanded');
        button.textContent = '📖 Show Less';
        
        const existingContent = blogPost.querySelector('.expanded-content');
        if (!existingContent) {
            const post = blogData.find(p => p.id === postId);
            if (post) {
                const expandedContent = document.createElement('div');
                expandedContent.className = 'expanded-content';
                expandedContent.style.cssText = `
                    margin-top: 15px;
                    padding: 15px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    border-left: 3px solid var(--primary-color);
                    line-height: 1.6;
                `;
                
                const formattedContent = post.content.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>');
                expandedContent.innerHTML = `<p>${formattedContent}</p>`;
                
                blogPost.appendChild(expandedContent);
            }
        }
    }
}

function shuffleGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const items = Array.from(galleryGrid.children);
    
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        galleryGrid.appendChild(items[j]);
    }
    
    typewriterManager.startTypewriter("message", "🔀 Gallery shuffled! Fresh perspective!", 30);
    
    setTimeout(() => {
        const messageElement = document.getElementById("message");
        messageElement.classList.remove("visible");
    }, 3000);
}

function toggleGalleryView() {
    const galleryGrid = document.getElementById('galleryGrid');
    const currentView = galleryGrid.getAttribute('data-view') || 'grid';
    const newView = currentView === 'grid' ? 'list' : 'grid';
    
    galleryGrid.setAttribute('data-view', newView);
    
    if (newView === 'list') {
        galleryGrid.style.display = 'block';
        galleryGrid.style.gridTemplateColumns = '1fr';
        galleryGrid.style.gap = '20px';
    } else {
        galleryGrid.style.display = 'grid';
        galleryGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(200px, 1fr))';
        galleryGrid.style.gap = '20px';
    }
    
    typewriterManager.startTypewriter("message", `👁️ Gallery view: ${newView} mode!`, 30);
    
    setTimeout(() => {
        const messageElement = document.getElementById("message");
        messageElement.classList.remove("visible");
    }, 3000);
}

function downloadGallery() {
    typewriterManager.startTypewriter("message", "💾 Gallery download started! (Simulated)", 30);

    setTimeout(() => {
        typewriterManager.startTypewriter("message", "💾 Gallery download completed!", 30);
        setTimeout(() => {
            const messageElement = document.getElementById("message");
            messageElement.classList.remove("visible");
        }, 2000);
    }, 1500);
}

function viewArtwork(item) {
    document.querySelectorAll('.gallery-item').forEach(i => i.classList.remove('viewing'));
    
    item.classList.add('viewing');
    
    const artworkName = item.querySelector('p').textContent;
    typewriterManager.startTypewriter("message", `🎨 Viewing: ${artworkName}`, 30);
    
    setTimeout(() => {
        item.classList.remove('viewing');
        const messageElement = document.getElementById("message");
        messageElement.classList.remove("visible");
    }, 3000);
}

function shareArtwork(button, event) {
    event.stopPropagation();
    
    const artworkName = button.closest('.gallery-item').querySelector('p').textContent;
    const shareText = `Check out this amazing pixel art: ${artworkName} at zingini.xyz! 🎨✨`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Pixel Art Gallery',
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText + ' ' + window.location.href).then(() => {
            typewriterManager.startTypewriter("message", "📤 Artwork link copied to clipboard!", 30);
            
            setTimeout(() => {
                const messageElement = document.getElementById("message");
                messageElement.classList.remove("visible");
            }, 3000);
        });
    }
}

function contactAction() {
    const contactMessages = [
        "zingini52 has successfully ignored your message",
    ];
    
    const randomContact = contactMessages[Math.floor(Math.random() * contactMessages.length)];
    
    typewriterManager.startTypewriter("message", randomContact, 50);
    
    for (let j = 0; j < 3; j++) {
        setTimeout(() => {
            const contactParticle = document.createElement('div');
            contactParticle.style.cssText = `
                position: fixed;
                left: ${Math.random() * window.innerWidth}px;
                top: ${Math.random() * window.innerHeight}px;
                font-size: 2rem;
                pointer-events: none;
                animation: contactParticle 2s ease-out forwards;
                z-index: 1000;
            `;
            contactParticle.textContent = ['📧', '🚀', '✨', '🎮', '🌟'][Math.floor(Math.random() * 5)];
            document.body.appendChild(contactParticle);
            
            setTimeout(() => contactParticle.remove(), 2000);
        }, j * 300);
    }
    
    setTimeout(() => {
        toggleContact();
    }, 1000);
}

function toggleContact() {
    const contactPanel = document.getElementById("contactPanel");
    contactPanel.classList.toggle("active");
}

const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes catParticle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes contactParticle {
        0% {
            transform: scale(0) translateY(0px);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) translateY(-50px);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) translateY(-100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case '1':
            zoomToSection('home');
            break;
        case '2':
            zoomToSection('blog');
            break;
        case '3':
            zoomToSection('meow');
            break;
        case '4':
            zoomToSection('gallery');
            break;
        case ' ':
            e.preventDefault();
            fetchSlurs();
            break;
    }
});

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
}); 