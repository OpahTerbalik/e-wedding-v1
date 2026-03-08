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
            console.log("Audio autoplay was prevented by browser. User interaction should fix this.", error);
        });

        // 2. Open the curtains
        curtainLeft.classList.add("open");
        curtainRight.classList.add("open");

        // 3. Fade out the "press me" button and intro content
        introContent.classList.add("fade-out");

        // 4. Remove 'hidden' from main page to allow DOM rendering, then trigger the animation
        mainPage.classList.remove("hidden");
        
        // Small delay to ensure the browser registers the display change before animating
        setTimeout(() => {
            mainPage.classList.add("visible");
        }, 50);

        // Optional: remove cover page from DOM entirely after animation finishes (approx 2s)
        setTimeout(() => {
            coverPage.style.display = 'none';
        }, 2000);
    });
});