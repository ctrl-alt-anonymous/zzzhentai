// ======================================================
// Category Loader
// ======================================================


const params = new URLSearchParams(window.location.search);

const category =
    params.get("category");


const categoryTitle =
    document.getElementById("categoryTitle");


const mediaGrid =
    document.getElementById("categoryGrid");



if(category){

    categoryTitle.textContent = category;

}
else{

    categoryTitle.textContent = "All Media";

}



// ======================================================
// Load Media
// ======================================================


fetch("media.json")

.then(response => response.json())

.then(media => {


    let filtered;


    if(category){

        filtered = media.filter(item =>

            item.categories.includes(category)

        );

    }

    else{

        filtered = media;

    }



    buildMedia(filtered);


})

.catch(error => {

    console.error(
        "Failed loading media.json",
        error
    );

});



// ======================================================
// Create Tiles
// ======================================================


function buildMedia(items){


    mediaGrid.innerHTML = "";



    items.forEach(item => {


        const tile =
            document.createElement("div");


        tile.className =
            "tile";



        const image =
            document.createElement("img");


        image.className =
            "tile-image";


        image.src =
            item.thumbnail;



        const title =
            document.createElement("div");


        title.className =
            "tile-title";


        title.textContent =
            item.title;



        tile.appendChild(image);

        tile.appendChild(title);



        tile.onclick = () => {

            window.location.href =
                `watch.html?id=${encodeURIComponent(item.id)}`;

        };



        mediaGrid.appendChild(tile);


    });


}