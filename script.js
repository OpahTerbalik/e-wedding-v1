document.addEventListener("DOMContentLoaded", () => {
    const openBtn = document.getElementById("open-btn");
    const curtainLeft = document.querySelector(".curtain-left");
    const curtainRight = document.querySelector(".curtain-right");
    const introContent = document.querySelector(".intro-content");
    const mainPage = document.getElementById("main-page");
    const bgMusic = document.getElementById("bg-music");
    const coverPage = document.getElementById("cover-page");

    openBtn.addEventListener("click", () => {
        // 1. Play the background music
        bgMusic.play().catch(error => {
            console.log("Audio autoplay prevented. Interaction needed.", error);
        });

        // 2. Open the curtains
        curtainLeft.classList.add("open");
        curtainRight.classList.add("open");

        // 3. Fade out the center content
        introContent.classList.add("fade-out");

        // 4. Reveal the main page to start the slow zoom and fade
        mainPage.classList.remove("hidden");
        
        // Slight delay to ensure the CSS transition registers
        setTimeout(() => {
            mainPage.classList.add("visible");
            // Allow scrolling again once the intro is gone
            document.body.style.overflowY = "auto"; 
        }, 50);

        // 5. Remove cover page fully after animation
        setTimeout(() => {
            coverPage.style.display = 'none';
        }, 2500);
    });
});