
let rootStyles = getComputedStyle(document.documentElement);
let primaryColor = rootStyles.getPropertyValue('--text-color');


/* box title */
var inputElement_title_box = document.getElementById("create-input-title-box");
var show_titre = document.getElementById("titre-demonstration-box");

function create_box_title() {
    rootStyles = getComputedStyle(document.documentElement);
    primaryColor = rootStyles.getPropertyValue('--text-color');

    var inputValue_title = inputElement_title_box.value;
    if (inputValue_title.trim() === "") {
        show_titre.textContent = "Titre";
        show_titre.style.color = primaryColor;
    } else {
        show_titre.textContent = inputValue_title;
        if (primaryColor == "black") {
            show_titre.style.color = "#474747";
        } else {
            show_titre.style.color = "#c9c9c9";
        }
    }
}

inputElement_title_box.addEventListener("input", function (event) {
    create_box_title()
    updateJsonFile()
});

inputElement_title_box.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        show_titre.style.color = "var(--text-color)";
        inputElement_title_box.blur();
    }
});

/* box icon */
var inputElement_icon_box = document.getElementById("create-input-icon-box");
var show_icon = document.getElementById("icon-demonstration-box");

function create_box_icon() {
    var inputValue_icon = inputElement_icon_box.value;
    if (inputValue_icon.trim() === "") {
        show_icon.src = "https://cdn-icons-png.flaticon.com/512/5181/5181979.png";
    } else {
        show_icon.src = inputValue_icon;
    }

}

inputElement_icon_box.addEventListener("input", function (event) {
    create_box_icon()
    updateJsonFile()
});

inputElement_icon_box.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        inputElement_icon_box.blur();
    }
});

const buttons_icon = document.querySelectorAll(".icon-proposale-button");

buttons_icon.forEach(button_icon => {
    button_icon.addEventListener("click", function () {
        const imageSource = button_icon.querySelector("img").src;
        show_icon.src = imageSource;
        inputElement_icon_box.value = imageSource;
        updateJsonFile()
    });
});


function getOppositeColor(rgb) {
    const colorValues = rgb.slice(4, -1).split(',');

    const red = parseInt(colorValues[0].trim());
    const green = parseInt(colorValues[1].trim());
    const blue = parseInt(colorValues[2].trim());

    const oppositeRed = 255 - red;
    const oppositeGreen = 255 - green;
    const oppositeBlue = 255 - blue;

    return `rgb(${oppositeRed}, ${oppositeGreen}, ${oppositeBlue})`;
}

/* Key word */
var inputElement_keyword = document.getElementById("create-input-keyword");
let keywords_list = []
localStorage.setItem("Keyword_box", []);
load_keywords()

function load_keywords() {
    document.getElementById("key_word_container").innerHTML = "";

    if (keywords_list.length == 0) {
        document.getElementById("empty-keywords").style.visibility = "visible";
        document.getElementById("alert-text").style.visibility = "hidden";

    } else {
        document.getElementById("empty-keywords").style.visibility = "hidden";
    }

    for (let i = 0; i < keywords_list.length; i++) {
        const liElement = document.createElement("li");
        liElement.id = "container-" + i;
        const buttonElement = document.createElement("button");
        buttonElement.id = keywords_list.length;
        buttonElement.addEventListener("click", function () {
            keywords_list.splice(i, 1);
            localStorage.setItem("Keyword_box", keywords_list);
            load_keywords()
            updateJsonFile()
        });
        const imgElement = document.createElement("img");
        const pElement = document.createElement("p");

        imgElement.src = "https://cdn-icons-png.flaticon.com/512/54/54973.png";

        pElement.textContent = keywords_list[i];

        buttonElement.appendChild(imgElement);

        liElement.appendChild(buttonElement);
        liElement.appendChild(pElement);

        const ulElement = document.getElementById("key_word_container");
        ulElement.appendChild(liElement);
    }



}

function create_keyword() {
    var keyword = inputElement_keyword.value;
    const cleaned_keyword = keyword.replace(/[^\w]/gi, '').replace(/\s+/g, '');

    // Convertir en minuscules
    const lower_cleaned_keyword = cleaned_keyword.toLowerCase();
    document.getElementById("alert-text").style.visibility = "visible";

    if (keyword.trim() != "") {
        if (!keywords_list.includes(lower_cleaned_keyword)) {
            keywords_list.push(lower_cleaned_keyword);
            localStorage.setItem("Keyword_box", keywords_list);
            updateJsonFile()
            load_keywords()
        } else {
            alert("Déjà dans la liste !")
        }
    }
}

inputElement_keyword.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        create_keyword()
        inputElement_keyword.value = "";

    }
});


/* boxes */

function extractNumberFromString(inputString) {
    const numberRegex = /\d+/;
    const matches = inputString.match(numberRegex);
    if (matches) {
        return parseInt(matches[0], 10);
    }
    return NaN;
}

let keywords_list_created = [];
const numberOfEmptyLists = 200;
for (let i = 0; i < numberOfEmptyLists; i++) {
    keywords_list_created.push([]); // Ajoute un sous-tableau vide au tableau principal
}

function load_keywords_elements_created(element_id_keywords) {

    document.getElementById("key_word_container_created_" + element_id_keywords).innerHTML = "";
    const paragraphElement = document.createElement('p');
    paragraphElement.setAttribute('style', 'display: none;');
    paragraphElement.setAttribute('id', 'empty-keywords-' + element_id_keywords);
    paragraphElement.setAttribute('class', 'color-opposite');
    paragraphElement.textContent = 'Aucun mot clé';
    document.getElementById("key_word_container_created_" + element_id_keywords).appendChild(paragraphElement);

    if (keywords_list_created[element_id_keywords - 1].length == 0) {
        document.getElementById("empty-keywords-" + element_id_keywords).style.display = "block";
        document.getElementById("alert-text-" + element_id_keywords).style.visibility = "hidden";

    } else {
        document.getElementById("empty-keywords-" + element_id_keywords).style.display = "none";
    }

    for (let i = 0; i < keywords_list_created[element_id_keywords - 1].length; i++) {
        const liElement = document.createElement("li");
        liElement.id = "container-" + i;
        const buttonElement = document.createElement("button");
        buttonElement.id = keywords_list_created[element_id_keywords - 1].length;
        buttonElement.addEventListener("click", function () {
            keywords_list_created[element_id_keywords - 1].splice(i, 1);
            load_keywords_elements_created(element_id_keywords)


            var keywords_list_created_modified = JSON.stringify(keywords_list_created);
            localStorage.setItem("keyword_elements", keywords_list_created_modified);
            updateJsonFile()
            const rootStyles = getComputedStyle(document.documentElement);
            const backgroundColor = rootStyles.getPropertyValue('--background-color').trim();
            const text_color_new = getOppositeColor(backgroundColor);
            const elementsWithClass = document.querySelectorAll('.color-opposite');
            document.getElementById("empty-keywords-" + element_id_keywords).style.color = text_color_new;
        });

        const imgElement = document.createElement("img");
        const pElement = document.createElement("p");

        imgElement.src = "https://cdn-icons-png.flaticon.com/512/54/54973.png";

        pElement.textContent = keywords_list_created[element_id_keywords - 1][i];

        buttonElement.appendChild(imgElement);

        liElement.appendChild(buttonElement);
        liElement.appendChild(pElement);

        const ulElement = document.getElementById("key_word_container_created_" + element_id_keywords);
        ulElement.appendChild(liElement);
    }
}


