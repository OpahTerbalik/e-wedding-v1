// --- Get Audio Elements ---
const audio = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const iconUnmuted = document.getElementById('icon-unmuted');
const iconMuted = document.getElementById('icon-muted');

// --- 1. Intro Door Animation & Play Music ---
document.getElementById('openBtn').addEventListener('click', function() {
    
    // Fade out button
    this.style.opacity = '0';
    setTimeout(() => { this.style.display = 'none'; }, 500);

    // Open doors
    document.getElementById('leftDoor').classList.add('open');
    document.getElementById('rightDoor').classList.add('open');

    // PLAY THE MUSIC
    audio.play().catch(error => {
        console.log("Browser prevented autoplay:", error);
    });

    // Fade in main wrapper
    const mainWrapper = document.getElementById('main-wrapper');
    
    setTimeout(() => {
        mainWrapper.classList.add('visible');
        
        // Remove doors completely to restore scrolling
        setTimeout(() => {
            document.getElementById('intro-container').style.display = 'none';
            document.body.style.overflow = 'auto'; 
            document.documentElement.style.overflow = 'auto'; 
        }, 2000); 

    }, 800); 
});

// --- 2. Mute / Unmute Logic ---
musicToggle.addEventListener('click', () => {
    if (audio.muted) {
        // If it's muted, unmute it and show the playing icon
        audio.muted = false;
        iconMuted.style.display = 'none';
        iconUnmuted.style.display = 'block';
    } else {
        // If it's playing, mute it and show the muted icon
        audio.muted = true;
        iconUnmuted.style.display = 'none';
        iconMuted.style.display = 'block';
    }
});

// --- 3. Scroll "Rise Up" Animation Logic ---
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-animate');
        } else {
            entry.target.classList.remove('show-animate');
        }
    });
}, { threshold: 0.1 });

const hiddenElements = document.querySelectorAll('.scroll-animate');
hiddenElements.forEach((el) => observer.observe(el));