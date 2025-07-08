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