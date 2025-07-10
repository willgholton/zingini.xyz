document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = new AudioPlayer();
    
    loadBlogData();
    
    const savedTheme = localStorage.getItem('zingini-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        const themeIcons = {
            'default': '🧀',
            'dark': '🌙',
            'cyber': '💚',
            'retro': '🔥'
        };
        themeIcon.textContent = themeIcons[savedTheme] || '🌙';
    }
    
    const savedSection = localStorage.getItem('zingini-current-section');
    if (savedSection && savedSection !== 'home') {
        setTimeout(() => {
            zoomToSection(savedSection);
        }, 100);
    }
    

    initBackground();
}); 

// Theme toggle function
function toggleGlobalTheme() {
    const themes = ['default', 'dark', 'cyber', 'retro'];
    const themeIcons = {
        'default': '🧀',
        'dark': '🌙',
        'cyber': '💚',
        'retro': '🔥'
    };
    
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('zingini-theme', nextTheme);
    
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    themeIcon.textContent = themeIcons[nextTheme];
    
    themeToggle.style.transform = 'scale(1.2)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 200);
} 