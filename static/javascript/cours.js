/* cours types: 
1: Youtube 
2: Video 
3: Audio with/(out) texte
4: Image Horiz
5: Image Vert
6: Text */


const urlParams = new URLSearchParams(window.location.search);
const matiere = urlParams.get('matiere');
const link_search = document.getElementById("link_search");
link_search.href = "/matiere?matiere=" + matiere;

const rootStyles = getComputedStyle(document.documentElement);
const primaryColor = rootStyles.getPropertyValue('--text-color');
const fleche_bas = document.getElementById("F_bas");
const fleche_haut = document.getElementById("F_haut");

if (primaryColor == "white") {
    fleche_bas.src = "../static/image/fleche_B_B.png";
    fleche_haut.src = "../static/image/fleche_B_H.png";

} else {
    fleche_bas.src = "../static/image/fleche_N_B.png";
    fleche_haut.src = "../static/image/fleche_N_H.png";
}

let max_scroll;
let divHeight;

fetch('../static/json/cours/cours_exemple.json')
    .then(response => response.json())
    .then(data => {
        max_scroll = data.length;

        data.forEach((item, index) => {
            load_element(item, index)
        });

        change_text_color()

    })
    .catch(error => {
        // Gérez les erreurs de chargement du fichier
        console.error('Une erreur s\'est produite:', error);
    });


const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show_cours');
        }
    });
});

const observeElements = () => {
    const testCollection = document.getElementsByClassName('box-cours-elements');
    Array.from(testCollection).forEach((element) => {
        observer.observe(element);
    });
};

observeElements();

const mutationObserver = new MutationObserver(() => {
    observer.disconnect();

    observeElements();
});

mutationObserver.observe(document.body, { childList: true, subtree: true });


var page_element = 1;
fleche_haut.style.display = "none";

function bas() {
    if (page_element < max_scroll) {
        page_element += 1
        scrollToAnchor(page_element);
    }
}

function haut() {
    if (page_element > 1) {
        page_element -= 1
        scrollToAnchor(page_element);
    }
}

function scrollToAnchor(position_id) {
    const id_convertor = "#page_position_" + position_id;
    const element = document.querySelector(id_convertor);

    if (element) {
        const offset = -window.innerHeight * 0.1; // Calculate the offset as 10% of the viewport height
        const scrollDestination = element.getBoundingClientRect().top + window.pageYOffset + offset;

        window.scrollTo({ top: scrollDestination, behavior: 'smooth' });
    }
}

//Key detection
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 40) {
        event.preventDefault();
        bas();
    } else if (event.keyCode === 38) {
        event.preventDefault();
        haut();
    }
});


window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
    page_element = 1;
});


window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;
    var position_id_found = scrollPosition / divHeight;
    var actual_div_position = Math.round(position_id_found) + 1;
    page_element = actual_div_position;
    if (actual_div_position <= max_scroll) {
        document.getElementById('id-info').style.visibility = "visible";
        document.getElementById('id-info-text').textContent = actual_div_position + "/" + max_scroll;
    }

    if (page_element == 1) {
        fleche_haut.style.display = "none";
    } else {
        fleche_haut.style.display = "block";
    }

    if (page_element == max_scroll) {
        fleche_bas.style.display = "none";
        fleche_haut.style.marginBottom = "3vw";

    } else {
        fleche_haut.style.marginBottom = "0vw";
        fleche_bas.style.display = "Block";
    }

});

function getOppositeTextColor(rgb) {
    const colorValues = rgb.slice(4, -1).split(',');

    const red = parseInt(colorValues[0].trim());
    const green = parseInt(colorValues[1].trim());
    const blue = parseInt(colorValues[2].trim());

    const oppositeRed = 255 - red;
    const oppositeGreen = 255 - green;
    const oppositeBlue = 255 - blue;

    return `rgb(${oppositeRed}, ${oppositeGreen}, ${oppositeBlue})`;
}

function change_text_color() {

    const elementsWithClass = document.querySelectorAll('.color-opposite');

    for (const element of elementsWithClass) {
        const elementStyles = getComputedStyle(element);
        const backgroundColor = elementStyles.getPropertyValue('background-color').trim();
        const text_color_new = getOppositeTextColor(backgroundColor);
        element.style.color = text_color_new;
    }
}



// Full Screen Image
var isFullScreen = false; // Variable to track full-screen state
var scrollPosition; // Variable to store scroll position

function toggleFullScreen(element) {
    if (!isFullScreen) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        isFullScreen = true; // Update full-screen state

    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        isFullScreen = false; // Update full-screen state
    }
}




// Écouteur d'événements pour la touche "F"
window.addEventListener('keydown', function (event) {
    // Vérifier si la touche "F" est pressée
    if (event.keyCode === 70 || event.key === "f") {
        try {
            var imageElement2 = document.getElementById('fullscreen-image-' + page_element);
            toggleFullScreen(imageElement2);
        } catch (error) {
            console.log("Élément de page introuvable");
        }
    }
});

var createdElements = [];


function load_element(element_cour, id_element_cour) {
    const main_cour_container = document.querySelector('.main-cours-container');

    position_element_cours = id_element_cour + 1;

    if (element_cour.cours_type == 1) {
        // Youtube 
        const div_1 = document.createElement("div");
        div_1.id = "page_position_" + position_element_cours;


        const div_2 = document.createElement("div");
        div_2.classList.add("box-cours-elements");
        div_2.classList.add("video-player");
        div_2.id = "box-cours-elements-" + position_element_cours;
        createdElements.push(div_2);

        const div_3 = document.createElement("div");
        div_3.id = "content-container";

        if (element_cour.title != "") {
            const title_1 = document.createElement("h2");
            title_1.classList.add("cours-element");
            title_1.textContent = element_cour.title;
            div_2.appendChild(title_1);
            createdElements.push(div_2);

            div_3.style.height = "90%";
        } else {
            div_3.classList.add("content-full-screen");
        }

        const iframe_1 = document.createElement('iframe');
        iframe_1.className = 'cours-element';
        iframe_1.src = element_cour.video_url;
        iframe_1.title = 'YouTube video player';
        iframe_1.frameBorder = '0';
        iframe_1.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
        iframe_1.allowFullscreen = true;
        div_3.appendChild(iframe_1);

        if (element_cour.texte != "") {
            const texte_1 = document.createElement('p');
            texte_1.className = 'cours-element text-shadow';
            texte_1.textContent = element_cour.texte;
            div_3.appendChild(texte_1);
        }



        div_2.appendChild(div_3);

        main_cour_container.appendChild(div_1);
        main_cour_container.appendChild(div_2);

        var divElement = document.getElementById('box-cours-elements-1');
        divHeight = divElement.clientHeight;

    } else if (element_cour.cours_type == 2) {
        // Video 

        const div_1 = document.createElement("div");
        div_1.id = "page_position_" + position_element_cours;

        const div_2 = document.createElement("div");
        div_2.classList.add("box-cours-elements");
        div_2.classList.add("video-player");
        div_2.id = "box-cours-elements-" + position_element_cours;
        createdElements.push(div_2);

        try {
            const title_1 = document.createElement("h2");
            title_1.classList.add("cours-element");
            title_1.textContent = element_cour.title;
            div_2.appendChild(title_1);
            createdElements.push(div_2);

            title = True;
        } catch {
            title = false;
            console.log("no title")
        }

        const div_3 = document.createElement("div");
        div_3.id = "content-container";
        div_3.classList.add("content-full-screen");
        div_3.style.height = "90%";


        const video_1 = document.createElement('video');
        video_1.className = 'cours-element';
        video_1.controls = true;
        const source_1 = document.createElement('source');
        source_1.src = element_cour.video_src;
        source_1.type = 'video/mp4';
        video_1.appendChild(source_1);

        const message = document.createElement('p');
        message.textContent = 'Your browser does not support the video tag.';
        video_1.appendChild(message);

        div_3.appendChild(video_1);

        if (element_cour.texte != "") {
            const texte_1 = document.createElement('p');
            texte_1.className = 'cours-element text-shadow';
            texte_1.textContent = element_cour.texte;
            div_3.appendChild(texte_1);
        }

        div_2.appendChild(div_3);

        main_cour_container.appendChild(div_1);
        main_cour_container.appendChild(div_2);

    } else if (element_cour.cours_type == 3) {
        // Audio 

        const div_1 = document.createElement("div");
        div_1.id = "page_position_" + position_element_cours;

        const div_2 = document.createElement("div");
        div_2.classList.add("box-cours-elements");
        div_2.classList.add("video-player");
        div_2.id = "box-cours-elements-6";
        createdElements.push(div_2);

        if (element_cour.title != "") {
            const title_1 = document.createElement("h2");
            title_1.classList.add("cours-element");
            title_1.textContent = element_cour.title;
            div_2.appendChild(title_1);
            createdElements.push(div_2);

            title = true;
        }

        const div_3 = document.createElement("div");
        div_3.id = "content-container";
        div_3.style.justifyContent = "center";
        div_3.classList.add("content-full-screen");


        const audio = document.createElement("audio");
        audio.className = "cours-element";
        audio.controls = true;
        const source = document.createElement("source");
        source.src = element_cour.audio_src;
        source.type = "audio/mpeg";
        audio.appendChild(source);

        const audioFallback = document.createTextNode("Your browser does not support the audio tag.");
        audio.appendChild(audioFallback);

        div_3.appendChild(audio);

        if (element_cour.texte != "") {
            const texte = document.createElement("p");
            texte.className = "cours-element text-shadow";
            texte.textContent = element_cour.texte;
            texte.style.alignSelft = "bottom";
            div_3.appendChild(texte);
        }

        div_2.appendChild(div_3);

        main_cour_container.appendChild(div_1);
        main_cour_container.appendChild(div_2);

    } else if (element_cour.cours_type == 4) {
        //Image horiz
        const div_1 = document.createElement("div");
        div_1.id = "page_position_" + position_element_cours;

        const div_2 = document.createElement("div");
        div_2.classList.add("box-cours-elements");
        div_2.classList.add("video-player");
        div_2.classList.add("img_full");
        div_2.id = "box-cours-elements-" + position_element_cours;
        createdElements.push(div_2);

        const div_3 = document.createElement("div");
        div_3.id = "content-container";
        div_3.classList.add("img_full_container_" + position_element_cours);
        div_3.classList.add("content-full-screen");

        if (element_cour.title != "") {
            const title_1 = document.createElement("h2");
            title_1.classList.add("cours-element");
            title_1.textContent = element_cour.title;
            div_2.appendChild(title_1);
            createdElements.push(div_2);

            div_3.style.height = " 90%";

        } else {
            div_3.classList.add("content-full-screen");
        }

        const img_1 = document.createElement('img');
        img_1.classList.add("cours-element");
        img_1.classList.add("img-button");
        img_1.addEventListener('click', function () {
            toggleFullScreen(img_1);
        });
        img_1.id = "fullscreen-image-" + position_element_cours;
        img_1.src = element_cour.image_src;
        div_3.appendChild(img_1);

        if (element_cour.texte != "") {
            const texte = document.createElement("p");
            texte.className = "cours-element text-shadow";
            texte.textContent = element_cour.texte;
            div_3.appendChild(texte);
        }


        div_2.appendChild(div_3);

        main_cour_container.appendChild(div_1);
        main_cour_container.appendChild(div_2);
    } else if (element_cour.cours_type == 5) {
        //Image vert 

        const div_1 = document.createElement("div");
        div_1.id = "page_position_" + position_element_cours;

        const div_2 = document.createElement("div");
        div_2.classList.add("box-cours-elements");
        div_2.classList.add("video-player");
        div_2.classList.add("img_full");
        div_2.id = "box-cours-elements-" + position_element_cours;
        createdElements.push(div_2);

        const div_3 = document.createElement("div");
        div_3.id = "content-container";
        div_3.classList.add("img_full_container_" + position_element_cours);
        div_3.classList.add("content-full-screen");




        const img1 = document.createElement('img');
        img1.classList.add("cours-element");
        img1.classList.add("img-button");
        img1.addEventListener('click', function () {
            toggleFullScreen(img1);
        });
        img1.id = "fullscreen-image-" + position_element_cours;
        img1.src = element_cour.image_src;

        if (element_cour.title != "") {
            const title_1 = document.createElement("h2");
            title_1.classList.add("cours-element");
            title_1.textContent = element_cour.title;
            div_2.appendChild(title_1);
            createdElements.push(div_2);

            div_3.style.height = "90%";
        } else {
            img1.style.height = "90%";
        }

        div_3.appendChild(img1);

        if (element_cour.texte != "") {
            const texte = document.createElement("p");
            texte.className = "cours-element text-shadow";
            texte.textContent = element_cour.texte;
            div_3.appendChild(texte);
        }

        div_2.appendChild(div_3);

        main_cour_container.appendChild(div_1);
        main_cour_container.appendChild(div_2);

    } else if (element_cour.cours_type == 6) {
        // Texte

        const div_1 = document.createElement("div");
        div_1.id = "page_position_" + position_element_cours;

        const div_2 = document.createElement("div");
        div_2.classList.add("box-cours-elements");
        div_2.id = "box-cours-elements-10";
        createdElements.push(div_2);

        const div_3 = document.createElement("div");
        div_3.id = "content-container";
        div_3.classList.add("content-full-screen");

        if (element_cour.title != "") {
            const title = document.createElement("h2");
            title.classList.add("cours-element");
            title.textContent = element_cour.title;
            div_2.appendChild(title);
            createdElements.push(div_2);

            div_3.style.height = "90%";
        }

        if (element_cour.texte != "") {
            const p_1 = document.createElement('p');
            p_1.classList.add("cours-element");
            p_1.classList.add("text-shadow");
            p_1.classList.add("text-element-cours");
            p_1.textContent = element_cour.texte;

            div_3.appendChild(p_1);
        }

        if (element_cour.texte1 != "") {
            const p_2 = document.createElement('p');
            p_2.classList.add("cours-element");
            p_2.classList.add("text-shadow");
            p_2.classList.add("text-element-cours");
            p_2.textContent = element_cour.texte1;
            div_3.appendChild(p_2);
        }

        if (element_cour.texte2 != "") {
            const p_3 = document.createElement('p');
            p_3.classList.add("cours-element");
            p_3.classList.add("text-shadow");
            p_3.classList.add("text-element-cours");
            p_3.textContent = element_cour.texte2;
            div_3.appendChild(p_3);
        }

        if (element_cour.texte3 != "") {
            const p_4 = document.createElement('p');
            p_4.classList.add("cours-element");
            p_4.classList.add("text-shadow");
            p_4.classList.add("text-element-cours");
            p_4.textContent = element_cour.texte3;
            div_3.appendChild(p_4);
        }

        if (element_cour.texte4 != "") {
            const p_5 = document.createElement('p');
            p_5.classList.add("cours-element");
            p_5.classList.add("text-shadow");
            p_5.classList.add("text-element-cours");
            p_5.textContent = element_cour.texte4;
            div_3.appendChild(p_5);
        }

        div_2.appendChild(div_3);

        main_cour_container.appendChild(div_1);
        main_cour_container.appendChild(div_2);
    }

}

