// ======================================================
// Intro Video
// ======================================================

const intro = document.getElementById("intro");
const introVideo = document.getElementById("introVideo");

// Only play once per browser session
if (sessionStorage.getItem("introPlayed")) {

    if (intro) {
        intro.remove();
    }

    document.body.style.overflow = "auto";

} else {

    introVideo.play().catch(() => {
        console.log("Autoplay prevented.");
    });

    introVideo.addEventListener("ended", () => {

        sessionStorage.setItem("introPlayed", "true");

        intro.style.transition = "opacity 0.75s ease";
        intro.style.opacity = "0";

        setTimeout(() => {

            intro.remove();
            document.body.style.overflow = "auto";

        }, 750);

    });

}

// ======================================================
// Site Initialisation
// ======================================================

window.addEventListener("DOMContentLoaded", () => {

    console.log("Website Loaded");

});