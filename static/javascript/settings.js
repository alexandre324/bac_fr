show_settings = false


var settings_box = document.getElementById("settings");
var elements = document.querySelectorAll(".box");
var root = document.documentElement;


var style_color_id = localStorage.getItem("style_color_id");
var style_radius_id = localStorage.getItem("style_radius_id");

if (style_color_id == "1") {
    style1()
} else if (style_color_id == "2") {
    style2()
} else if (style_color_id == "3") {
    style3()
} else if (style_color_id == "4") {
    style4()
} else if (style_color_id == "5") {
    style5()
} else if (style_color_id == "6") {
    style6()
} else if (style_color_id == "7") {
    style7()
} else if (style_color_id == "8") {
    style8()
} else if (style_color_id == "9") {
    style9()
}

if (style_radius_id == "1") {
    radius1()
} else if (style_radius_id == "2") {
    radius2()
} else if (style_radius_id == "3") {
    radius3()
} else if (style_radius_id == "4") {
    radius4()
}

function hide_show(style_color, radius) {
    change_text_color()

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

}

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        show_settings = false;
        settings_box.style.display = "none";
    }
});


function style1() {
    root.style.setProperty('--main-color', "rgb(223, 184, 184)");
    root.style.setProperty('--background-color', "rgb(211, 211, 233)");
    root.style.setProperty('--main-color-light', "rgb(240, 211, 211)");
    root.style.setProperty('--main-color-dark', "rgb(163, 135, 135)");
    root.style.setProperty('--text-color', "black");
    localStorage.setItem("style_color_id", "1");
    hide_show(style_color_id, style_radius_id)
}

function style2() {
    root.style.setProperty('--main-color', "rgb(200, 200, 212)");
    root.style.setProperty('--background-color', "rgb(255, 255, 255)");
    root.style.setProperty('--main-color-light', "rgb(220, 220, 232)");
    root.style.setProperty('--main-color-dark', "#9c9cb5");
    root.style.setProperty('--text-color', "black");
    localStorage.setItem("style_color_id", "2");
    hide_show(style_color_id, style_radius_id)
}

function style3() {
    root.style.setProperty('--main-color', "rgb(230, 161, 116)");
    root.style.setProperty('--background-color', "rgb(242, 239, 213)");
    root.style.setProperty('--main-color-light', "#e8bea2");
    root.style.setProperty('--main-color-dark', "#db7d3d");
    root.style.setProperty('--text-color', "black");
    localStorage.setItem("style_color_id", "3");
    hide_show(style_color_id, style_radius_id)
}

function style4() {
    root.style.setProperty('--main-color', "#a65861");
    root.style.setProperty('--background-color', "rgb(235, 209, 212)");
    root.style.setProperty('--main-color-light', "#c27a82");
    root.style.setProperty('--main-color-dark', "#6e3138");
    root.style.setProperty('--text-color', "white");
    localStorage.setItem("style_color_id", "4");
    hide_show(style_color_id, style_radius_id)
}

function style5() {
    root.style.setProperty('--main-color', "#bed1ed");
    root.style.setProperty('--background-color', "rgb(255, 255, 255)");
    root.style.setProperty('--main-color-light', "#c7d6eb");
    root.style.setProperty('--main-color-dark', "#99afcf");
    root.style.setProperty('--text-color', "black");
    localStorage.setItem("style_color_id", "5");
    hide_show(style_color_id, style_radius_id)
}

function style6() {
    root.style.setProperty('--main-color', "#2b2a2a");
    root.style.setProperty('--background-color', "rgb(18, 17, 17)");
    root.style.setProperty('--main-color-light', "#403d3d");
    root.style.setProperty('--main-color-dark', "#121212");
    root.style.setProperty('--text-color', "white");
    localStorage.setItem("style_color_id", "6");
    hide_show(style_color_id, style_radius_id)
}

function style7() {
    root.style.setProperty('--main-color', "#342b3b");
    root.style.setProperty('--background-color', "rgb(35, 27, 41)");
    root.style.setProperty('--main-color-light', "#483e4f");
    root.style.setProperty('--main-color-dark', "#000000");
    root.style.setProperty('--text-color', "white");
    localStorage.setItem("style_color_id", "7");
    hide_show(style_color_id, style_radius_id)
}

function style8() {
    root.style.setProperty('--main-color', "#10795d");
    root.style.setProperty('--background-color', "rgb(228, 237, 235)");
    root.style.setProperty('--main-color-light', "#31a385");
    root.style.setProperty('--main-color-dark', "#0e4a3a");
    root.style.setProperty('--text-color', "white");
    localStorage.setItem("style_color_id", "8");
    hide_show(style_color_id, style_radius_id)
}

function style9() {
    root.style.setProperty('--main-color', "#f5c9e4");
    root.style.setProperty('--background-color', "rgb(247, 242, 245)");
    root.style.setProperty('--main-color-light', "#f7e1ef");
    root.style.setProperty('--main-color-dark', "#bd86a9");
    root.style.setProperty('--text-color', "black");
    localStorage.setItem("style_color_id", "9");
    hide_show(style_color_id, style_radius_id)
}

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

