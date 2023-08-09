
/* Create element */

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


function change_text_color() {
    const rootStyles = getComputedStyle(document.documentElement);
    const backgroundColor = rootStyles.getPropertyValue('--background-color').trim();

    const text_color_new = getOppositeColor(backgroundColor);

    const elementsWithClass = document.querySelectorAll('.color-opposite');

    for (const element of elementsWithClass) {
        element.style.color = text_color_new;
    }
}

function createElementWithAttributes(tagName, attributes) {
    const element = document.createElement(tagName);
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
}

let list_element_created = []

function create_element(type_element) {
    document.getElementById("list-add-cours").style.visibility = "hidden";
    document.getElementById("button-add-cours").style.borderBottomLeftRadius = "5px";
    document.getElementById("button-add-cours").style.borderBottomRightRadius = "5px";
    list_shown = false;

    element_id = list_element_created.length + 1

    if (type_element == 1) {
        create_youtube_element();
    } else if (type_element == 2) {
        create_video_element();
    } else if (type_element == 3) {
        create_audio_element();
    } else if (type_element == 4) {
        create_texte_element();
    } else if (type_element == 5) {
        create_imageV_element();
    } else if (type_element == 6) {
        create_imageH_element();
    }

    var list_element_created_modified = JSON.stringify(list_element_created);

    localStorage.setItem("list_element_created", list_element_created_modified);
    change_text_color()
}
