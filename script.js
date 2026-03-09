// script.js

// --- Envelope / Cover & Music Logic ---
const openBtn = document.getElementById('open-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
let isMusicPlaying = false;

openBtn.addEventListener('click', () => {
    // Hide cover screen
    welcomeScreen.classList.add('hidden');
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
    
    // Play music
    bgMusic.play().then(() => {
        isMusicPlaying = true;
    }).catch((e) => console.log("Audio autoplay prevented by browser"));
    
    // Start floating flower animation
    createFlowers();
});

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.innerText = '🔇';
    } else {
        bgMusic.play();
        musicToggle.innerText = '🎵';
    }
    isMusicPlaying = !isMusicPlaying;
});

// --- Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// --- Countdown Timer Logic ---
const weddingDate = new Date("Apr 26, 2026 12:00:00").getTime();
const timerInterval = setInterval(() => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("days").innerText = "00";
        document.getElementById("hours").innerText = "00";
        document.getElementById("minutes").innerText = "00";
        document.getElementById("seconds").innerText = "00";
        return;
    }

    document.getElementById("days").innerText = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
    document.getElementById("hours").innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
    document.getElementById("minutes").innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    document.getElementById("seconds").innerText = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, '0');
}, 1000);

// --- Floating Flowers Generator ---
function createFlowers() {
    const container = document.getElementById('flower-container');
    const flowerEmojis = ['🌸', '🤍', '🍃'];
    
    setInterval(() => {
        const flower = document.createElement('div');
        flower.classList.add('floating-flower');
        flower.innerText = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.fontSize = (Math.random() * 1 + 1) + 'rem';
        flower.style.animationDuration = (Math.random() * 5 + 8) + 's';
        
        container.appendChild(flower);
        
        // Remove flower after animation finishes
        setTimeout(() => flower.remove(), 13000);
    }, 800);
}

// --- Copy Bank Account Logic ---
const copyBtn = document.getElementById('copy-btn');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        // Get the pure number from data-clipboard attribute (no spaces)
        const accNumber = copyBtn.getAttribute('data-clipboard');
        
        // Copy to clipboard
        navigator.clipboard.writeText(accNumber).then(() => {
            // Visual feedback on button
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '✓ Berjaya Disalin!';
            copyBtn.classList.add('success');
            
            // Revert back after 2.5 seconds
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
                copyBtn.classList.remove('success');
            }, 2500);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert("Gagal menyalin nombor akaun. Sila salin secara manual.");
        });
    });
}

// --- Prevent Form Submission Reload ---
document.getElementById('wishes-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Terima kasih atas doa dan ucapan anda!');
    e.target.reset();
});