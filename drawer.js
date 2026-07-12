// =====================================================
// Elements
// =====================================================

const drawer = document.getElementById("drawer");
const toggle = document.getElementById("drawerToggle");

const scroller = document.getElementById("tileScroller");
const grid = document.getElementById("tileGrid");

let drawerOpen = false;
let library = [];

let copyHeight = 0;

// =====================================================
// Drawer
// =====================================================

toggle.onclick = () => {

    drawerOpen = !drawerOpen;

    drawer.classList.toggle("open");

    document.body.classList.toggle("drawer-open", drawerOpen);

    toggle.innerHTML = drawerOpen ? "❯" : "❮";

};

// =====================================================
// Load JSON
// =====================================================

fetch("data.json")
.then(r => r.json())
.then(data => {

    library = data;

    buildGrid();

});

// =====================================================
// Build Grid
// =====================================================

function buildGrid(){

    grid.innerHTML = "";

    // Three copies
    for(let c = 0; c < 3; c++){

        library.forEach(item=>{

            const tile = document.createElement("div");
            tile.className = "tile";

            const img = document.createElement("img");
            img.className = "tile-image";
            img.src = item.image;

            const title = document.createElement("div");
            title.className = "tile-title";
            title.textContent = item.title;

            tile.appendChild(img);
            tile.appendChild(title);

            tile.onclick = ()=>{

                const category =
                    encodeURIComponent(
                        item.title
                    );

                window.location.href =
                    `category.html?category=${category}`;

            };

            grid.appendChild(tile);

        });

    }

    waitForImages();

}

// =====================================================
// Wait for all images
// =====================================================

function waitForImages(){

    const images = grid.querySelectorAll("img");

    Promise.all(

        [...images].map(img=>{

            if(img.complete)
                return Promise.resolve();

            return new Promise(resolve=>{

                img.onload = resolve;
                img.onerror = resolve;

            });

        })

    ).then(startLoop);

}

// =====================================================
// Loop
// =====================================================

function startLoop(){

    const rows = Math.ceil(library.length / 3);

    const firstTile = grid.querySelector(".tile");

    const gap = parseFloat(getComputedStyle(grid).gap);

    const rowHeight = firstTile.offsetHeight + gap;

    copyHeight = rows * rowHeight;

    scroller.scrollTop = copyHeight;

}

// =====================================================
// Infinite scrolling
// =====================================================

scroller.addEventListener("scroll",()=>{

    if(copyHeight===0) return;

    if(scroller.scrollTop < copyHeight*0.5){

        scroller.scrollTop += copyHeight;

    }

    else if(scroller.scrollTop > copyHeight*1.5){

        scroller.scrollTop -= copyHeight;

    }

});