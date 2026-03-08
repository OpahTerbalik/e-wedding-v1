// --- Envelope / Cover Logic ---
        const openBtn = document.getElementById('open-btn');
        const welcomeScreen = document.getElementById('welcome-screen');
        const bgMusic = document.getElementById('bg-music');
        const musicToggle = document.getElementById('music-toggle');
        let isMusicPlaying = false;

        openBtn.addEventListener('click', () => {
            // Hide Cover
            welcomeScreen.classList.add('hidden');
            // Enable Scrolling
            document.body.style.overflow = 'auto';
            // Play Music
            bgMusic.play().then(() => {
                isMusicPlaying = true;
            }).catch((e) => console.log("Audio autoplay prevented"));
            
            // Generate Floating Flowers once opened
            createFlowers();
        });

        // --- Music Toggle Logic ---
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
                    observer.unobserve(entry.target); // Reveal only once
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));

        // --- Countdown Timer Logic ---
        // Set your wedding date here (Format: Month DD, YYYY HH:MM:SS)
        const weddingDate = new Date("Apr 26, 2026 12:30:00").getTime();

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

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById("days").innerText = days.toString().padStart(2, '0');
            document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
            document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
            document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
        }, 1000);

        // --- Floating Flowers Generator ---
        function createFlowers() {
            const container = document.getElementById('flower-container');
            const flowerEmojis = ['🌸', '✨', '🤍', '🍃'];
            
            setInterval(() => {
                const flower = document.createElement('div');
                flower.classList.add('floating-flower');
                flower.innerText = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
                
                // Random position and size
                flower.style.left = Math.random() * 100 + 'vw';
                flower.style.fontSize = (Math.random() * 1 + 1) + 'rem';
                
                // Random animation duration
                flower.style.animationDuration = (Math.random() * 5 + 8) + 's';
                
                container.appendChild(flower);
                
                // Remove from DOM after animation completes
                setTimeout(() => {
                    flower.remove();
                }, 13000);
            }, 800); // Generate a new element every 800ms
        }

        // --- Prevent Form Submission Reload ---
        document.getElementById('wishes-form').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih atas ucapan anda!');
            e.target.reset();
        });