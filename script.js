// --- 1. Intro Door Animation Logic ---
document.getElementById('openBtn').addEventListener('click', function() {
    
    // Fade out button
    this.style.opacity = '0';
    setTimeout(() => { this.style.display = 'none'; }, 500);

    // Open doors
    document.getElementById('leftDoor').classList.add('open');
    document.getElementById('rightDoor').classList.add('open');

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

// --- 2. Scroll "Rise Up" Animation Logic ---
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