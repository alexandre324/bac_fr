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
    if (show_settings == false) {
        show_settings = true;
        settings_box.style.opacity = "1";

    } else {
        show_settings = false;
        settings_box.style.opacity = "0";
    }

    try {
        const rootStyles = getComputedStyle(document.documentElement);
        const primaryColor = rootStyles.getPropertyValue('--text-color');
        const fleche_bas = document.getElementById("F_bas");
        const fleche_haut = document.getElementById("F_haut");


        if (primaryColor == "black") {
            fleche_bas.src = "https://cdn-icons-png.flaticon.com/512/55/55008.png";
            fleche_haut.src = "https://cdn-icons-png.flaticon.com/512/55/55008.png";
        } else {
            fleche_haut.src = "https://cdn-icons-png.flaticon.com/512/8213/8213488.png ";
            fleche_bas.src = "https://cdn-icons-png.flaticon.com/512/8213/8213488.png ";
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
    root.style.setProperty('--main-color-light', "#f0d3d3");
    root.style.setProperty('--main-color-dark', "#a38787");
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
    root.style.setProperty('--background-color', "#f2efd5");
    root.style.setProperty('--main-color-light', "#e8bea2");
    root.style.setProperty('--main-color-dark', "#db7d3d");
    root.style.setProperty('--text-color', "black");
    localStorage.setItem("style_color_id", "3");
    hide_show(style_color_id, style_radius_id)
}

function style4() {
    root.style.setProperty('--main-color', "#a65861");
    root.style.setProperty('--background-color', "#ebd1d4");
    root.style.setProperty('--main-color-light', "#c27a82");
    root.style.setProperty('--main-color-dark', "#6e3138");
    root.style.setProperty('--text-color', "white");
    localStorage.setItem("style_color_id", "4");
    hide_show(style_color_id, style_radius_id)
}

function style5() {
    root.style.setProperty('--main-color', "#bed1ed");
    root.style.setProperty('--background-color', "#ffffff");
    root.style.setProperty('--main-color-light', "#c7d6eb");
    root.style.setProperty('--main-color-dark', "#99afcf");
    root.style.setProperty('--text-color', "black");
    localStorage.setItem("style_color_id", "5");
    hide_show(style_color_id, style_radius_id)
}

function style6() {
    root.style.setProperty('--main-color', "#2b2a2a");
    root.style.setProperty('--background-color', "#121111");
    root.style.setProperty('--main-color-light', "#403d3d");
    root.style.setProperty('--main-color-dark', "#121212");
    root.style.setProperty('--text-color', "white");
    localStorage.setItem("style_color_id", "6");
    hide_show(style_color_id, style_radius_id)
}

function style7() {
    root.style.setProperty('--main-color', "#342b3b");
    root.style.setProperty('--background-color', "#231b29");
    root.style.setProperty('--main-color-light', "#483e4f");
    root.style.setProperty('--main-color-dark', "#211b26");
    root.style.setProperty('--text-color', "white");
    localStorage.setItem("style_color_id", "7");
    hide_show(style_color_id, style_radius_id)
}

function style8() {
    root.style.setProperty('--main-color', "#10795d");
    root.style.setProperty('--background-color', "#e4edeb");
    root.style.setProperty('--main-color-light', "#31a385");
    root.style.setProperty('--main-color-dark', "#0e4a3a");
    root.style.setProperty('--text-color', "white");
    localStorage.setItem("style_color_id", "8");
    hide_show(style_color_id, style_radius_id)
}

function style9() {
    root.style.setProperty('--main-color', "#f5c9e4");
    root.style.setProperty('--background-color', "#f7f2f5");
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


