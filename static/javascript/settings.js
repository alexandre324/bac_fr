var show_settings = false

var settings_box = document.getElementById("settings");
var elements = document.querySelectorAll(".box");
var root = document.documentElement;

settings_box.style.opacity = "0";
settings_box.style.display = "none";

var style_color_id = localStorage.getItem("style_color_id");
var style_radius_id = localStorage.getItem("style_radius_id");

style_change(style_color_id)

if (style_radius_id == "1") {
    radius1()
} else if (style_radius_id == "2") {
    radius2()
} else if (style_radius_id == "3") {
    radius3()
} else if (style_radius_id == "4") {
    radius4()
}

document.addEventListener("click", function (event) {
    const clickedElement = event.target;
    const buttonElement = document.getElementById("button-settings");
    const settings_box_2 = document.getElementById("settings");


    if (clickedElement !== buttonElement && !settings_box_2.contains(clickedElement)) {
        show_settings = false;
        document.getElementById("settings").style.display = "none";
    }
});

function hide_show(style_color, radius) {
    if (show_settings == false) {
        show_settings = true;
        settings_box.style.opacity = "1";
        settings_box.style.display = "block";

    } else {
        show_settings = false;
        settings_box.style.opacity = "0";
        settings_box.style.display = "none";
    }

    try {
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--text-color');
        const fleche_bas = document.getElementById("F_bas");
        const fleche_haut = document.getElementById("F_haut");


        if (primaryColor == "white") {
            fleche_bas.src = "../static/image/fleche_B_B.png";
            fleche_haut.src = "../static/image/fleche_B_H.png";
            fleche_bas_settings[0].src = "../static/image/fleche_B_B.png";
            fleche_haut_settings[0].src = "../static/image/fleche_B_H.png";

        } else {
            fleche_bas.src = "../static/image/fleche_N_B.png";
            fleche_haut.src = "../static/image/fleche_N_H.png";
            fleche_bas_settings[0].src = "../static/image/fleche_N_B.png";
            fleche_haut_settings[0].src = "../static/image/fleche_N_H.png";
        }
    } catch {
        console.log("Wrong page !")
    }

    try {
        change_text_color()
    } catch {
        console.log("no");
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        show_settings = false;
        settings_box.style.display = "none";
    }
});




function change_setting_button_color() {
    fetch('../static/json/settings_color.json')
        .then(response => response.json())
        .then(data => {
            // Parcourir les données
            data.forEach(item => {
                // Extraire l'ID et les valeurs de couleurs
                const color_main = item.color_main;
                const color_light = item.color_light;
                const color_dark = item.color_dark;
                const color_background = item.color_background;
                const color_text = item.color_text;

                const element_class = '.style' + item.color_id;
                const elementWithClassStyle = document.querySelector(element_class);
                const background_style = "linear-gradient(to bottom right, " + color_main + " 50%, " + color_background + " 50%)";
                elementWithClassStyle.style.background = background_style;
                elementWithClassStyle.classList.remove("diagonal-button-border");
            });
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la lecture du fichier JSON :', error);
        });
}


function change_text_color_settings(bfColor) {
    const text_color_new_2 = getOppositeColor(bfColor);

    const elementsWithClass_2 = document.querySelectorAll('.color-opposite');

    for (const element of elementsWithClass_2) {
        element.style.color = text_color_new_2;
    }
}

function style_change(style_type) {
    change_setting_button_color()
    fetch('../static/json/settings_color.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const element_id = item.color_id;
                const style_type_int = parseInt(style_type, 10);
                const color_main = item.color_main;
                const color_light = item.color_light;
                const color_dark = item.color_dark;
                const color_background = item.color_background;
                const color_text = item.color_text;

                if (style_type_int == element_id) {
                    const element_class = '.style' + item.color_id;
                    const elementWithClassStyle = document.querySelector(element_class);
                    elementWithClassStyle.classList.add("diagonal-button-border");
                    root.style.setProperty('--main-color', color_main);
                    root.style.setProperty('--background-color', color_background);
                    root.style.setProperty('--main-color-light', color_light);
                    root.style.setProperty('--main-color-dark', color_dark);
                    root.style.setProperty('--text-color', color_text);

                    change_text_color_settings(color_background)

                }

            });
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la lecture du fichier JSON :', error);
        });


    localStorage.setItem("style_color_id", style_type);
    hide_show(style_color_id, style_radius_id)
}

change_setting_button_color()

function radius1() {
    root.style.setProperty('--main-border-radius', "5px");
    localStorage.setItem("style_radius_id", "1");
    hide_show(style_color_id, style_radius_id)
}

function radius2() {
    root.style.setProperty('--main-border-radius', "20px");
    localStorage.setItem("style_radius_id", "2");
    hide_show(style_color_id, style_radius_id)
}

function radius3() {
    root.style.setProperty('--main-border-radius', "35px");
    localStorage.setItem("style_radius_id", "3");
    hide_show(style_color_id, style_radius_id)
}

function radius4() {
    root.style.setProperty('--main-border-radius', "45px");
    localStorage.setItem("style_radius_id", "4");
    hide_show(style_color_id, style_radius_id)
}

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

try {
    // Line element
    var toggleSwitch = document.getElementById('toggle-switch');

    toggleSwitch.addEventListener('change', function () {
        if (this.checked) {
            var background_color = rootStyles.getPropertyValue('--background-color');
            var background_color_opposite = getOppositeColor(background_color)

            createdElements.forEach(function (element) {
                element.style.borderBottom = "1px solid " + background_color_opposite;
            });
        } else {
            createdElements.forEach(function (element) {
                element.style.borderBottom = "1px solid transparent";
            });
        }
        hide_show(style_color_id, style_radius_id)
    });


    // Fleche settings
    const rootStyles_fleche = getComputedStyle(document.documentElement);
    const texte_color_var = rootStyles_fleche.getPropertyValue('--text-color');
    const fleche_haut_settings = document.getElementsByClassName("fleche_haut_settings");
    const fleche_bas_settings = document.getElementsByClassName("fleche_bas_settings");



    if (texte_color_var == "white") {
        fleche_bas_settings[0].src = "../static/image/fleche_B_B.png";
        fleche_haut_settings[0].src = "../static/image/fleche_B_H.png";

    } else {
        fleche_bas_settings[0].src = "../static/image/fleche_N_B.png";
        fleche_haut_settings[0].src = "../static/image/fleche_N_H.png";
    }

    var toggleSwitch = document.getElementById('toggle-switch-fleche');
    var fleche_box = document.getElementById('reverse_none');
    toggleSwitch.checked = true;

    toggleSwitch.addEventListener('change', function () {
        if (this.checked) {
            fleche_box.style.visibility = "visible";
        } else {
            fleche_box.style.visibility = "hidden";
        }
        hide_show(style_color_id, style_radius_id)
    });
} catch {
    console.log("not right page");
}

