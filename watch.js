// ======================================================
// Watch Loader
// ======================================================

const params = new URLSearchParams(window.location.search);

const mediaID = params.get("id");

const title = document.getElementById("mediaTitle");
const player = document.getElementById("playerContainer");

// ======================================================
// Load Media
// ======================================================

fetch("media.json")
.then(response => response.json())
.then(media => {

    const item = media.find(m => m.id === mediaID);

    if (!item) {

        title.textContent = "Media not found";
        return;

    }

    title.textContent = item.title;

    loadMedia(item);

})
.catch(console.error);

// ======================================================
// Media Loader
// ======================================================

function loadMedia(item) {

    player.innerHTML = "";

    switch (item.type) {

        case "video":
            createVideo(item);
            break;

        case "image":
            createImage(item);
            break;

    }

}

// ======================================================
// Video
// ======================================================

function createVideo(item) {

    const video = document.createElement("video");

    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;

    player.appendChild(video);

    playVideoSource(video, item.sources, 0);

}

function playVideoSource(video, sources, index) {

    if (index >= sources.length) {

        console.error("No working video sources.");
        return;

    }

    console.log("Trying:", sources[index]);

    video.src = sources[index];
    video.load();

    video.onloadeddata = () => {

        console.log("Loaded:", sources[index]);

        video.play().catch(() => {});

    };

    video.onerror = () => {

        console.warn("Failed:", sources[index]);

        playVideoSource(video, sources, index + 1);

    };

}

// ======================================================
// Image
// ======================================================

function createImage(item) {

    const image = document.createElement("img");

    player.appendChild(image);

    loadImageSource(image, item.sources, 0);

}

function loadImageSource(image, sources, index) {

    if (index >= sources.length) {

        console.error("No working image sources.");
        return;

    }

    image.onload = () => {

        console.log("Loaded:", sources[index]);

    };

    image.onerror = () => {

        console.warn("Failed:", sources[index]);

        loadImageSource(image, sources, index + 1);

    };

    image.src = sources[index];

}