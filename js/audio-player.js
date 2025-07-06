class CustomAudioPlayer {
    constructor() {
        this.audio = document.getElementById('audioElement');
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.progressBar = document.getElementById('progressBar');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeSpan = document.getElementById('currentTime');
        this.totalTimeSpan = document.getElementById('totalTime');
        this.volumeBtn = document.getElementById('volumeBtn');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.volumeFill = document.getElementById('volumeFill');
        
        this.isPlaying = false;
        this.isMuted = false;
        this.volume = 1;
        
        this.init();
    }
    
    init() {
        this.audio.volume = this.volume;
        this.updateVolumeDisplay();
        
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.progressBar.addEventListener('click', (e) => this.seek(e));
        this.volumeBtn.addEventListener('click', () => this.toggleMute());
        this.volumeSlider.addEventListener('click', (e) => this.setVolume(e));
        
        this.audio.addEventListener('loadedmetadata', () => this.updateTotalTime());
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.handleEnded());
        this.audio.addEventListener('play', () => this.updatePlayPauseButton());
        this.audio.addEventListener('pause', () => this.updatePlayPauseButton());
        
        const savedVolume = localStorage.getItem('zingini-volume');
        if (savedVolume !== null) {
            this.volume = parseFloat(savedVolume);
            this.audio.volume = this.volume;
            this.updateVolumeDisplay();
        }
    }
    
    togglePlayPause() {
        if (this.isPlaying) {
            this.audio.pause();
        } else {
            this.audio.play().catch(error => {
                console.log('Playback failed:', error);
            });
        }
    }
    
    updatePlayPauseButton() {
        this.isPlaying = !this.audio.paused;
        this.playPauseBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
    }
    
    seek(e) {
        const rect = this.progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = clickX / rect.width;
        this.audio.currentTime = percentage * this.audio.duration;
    }
    
    updateProgress() {
        if (this.audio.duration) {
            const percentage = (this.audio.currentTime / this.audio.duration) * 100;
            this.progressFill.style.width = percentage + '%';
            this.currentTimeSpan.textContent = this.formatTime(this.audio.currentTime);
        }
    }
    
    updateTotalTime() {
        this.totalTimeSpan.textContent = this.formatTime(this.audio.duration);
    }
    
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.audio.muted = this.isMuted;
        this.volumeBtn.textContent = this.isMuted ? '🔇' : '🔊';
    }
    
    setVolume(e) {
        const rect = this.volumeSlider.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, clickX / rect.width));
        
        this.volume = percentage;
        this.audio.volume = this.volume;
        this.audio.muted = false;
        this.isMuted = false;
        
        this.updateVolumeDisplay();
        localStorage.setItem('zingini-volume', this.volume.toString());
    }
    
    updateVolumeDisplay() {
        this.volumeFill.style.width = (this.volume * 100) + '%';
        
        if (this.volume === 0) {
            this.volumeBtn.textContent = '🔇';
        } else if (this.volume < 0.5) {
            this.volumeBtn.textContent = '🔉';
        } else {
            this.volumeBtn.textContent = '🔊';
        }
    }
    
    handleEnded() {
        this.audio.currentTime = 0;
        this.audio.play().catch(() => {
        });
    }
} 