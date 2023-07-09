const urlParams = new URLSearchParams(window.location.search);
const matiere = urlParams.get('matiere');
const link_search = document.getElementById("link_search");
link_search.href = "/matiere?matiere=" + matiere;

const rootStyles = getComputedStyle(document.documentElement);
const primaryColor = rootStyles.getPropertyValue('--text-color');
const fleche_bas = document.getElementById("F_bas");
const fleche_haut = document.getElementById("F_haut");

if (primaryColor == "black") {
    fleche_bas.src = "../static/image/fleche_B_B.png";
    fleche_haut.src = "../static/image/fleche_B_H.png";

} else {
    fleche_bas.src = "../static/image/fleche_N_B.png";
    fleche_haut.src = "../static/image/fleche_N_H.png";
}

var page_element = 1;
var max_scroll = 4;
fleche_haut.style.display = "none";
var last_element_id = "box-cours-elements-" + max_scroll;
document.getElementById(last_element_id).style.marginBottom = "10vh";

function bas() {
    if (page_element != max_scroll) {
        fleche_haut.style.display = "block";
        page_element += 1
        if (page_element == max_scroll) {
            fleche_haut.style.marginBottom = "3vw";
            fleche_bas.style.display = "none";
        }

        scrollToAnchor(page_element)
    }

}

function haut() {
    if (page_element != 1) {
        fleche_bas.style.display = "block";
        fleche_haut.style.marginBottom = "0";
        page_element -= 1
        if (page_element == 1) {
            fleche_haut.style.display = "none";
        }

        scrollToAnchor(page_element)
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

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 40) {
        event.preventDefault(); // Prevent the default scroll behavior
        bas(); // Call the "bas()" function when the down arrow key is pressed
    } else if (event.keyCode === 38) {
        event.preventDefault(); // Prevent the default scroll behavior
        haut(); // Call the "haut()" function when the up arrow key is pressed
    }
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

window.addEventListener('beforeunload', function () {
    window.scrollTo(0, 0);
    page_element = 1;
});

var divElement = document.getElementById('box-cours-elements-1');
var divHeight = divElement.clientHeight;


window.addEventListener('scroll', function () {
    var scrollPosition = window.scrollY;
    var position_id_found = scrollPosition / divHeight;
    var actual_div_position = Math.round(position_id_found) + 1;
    page_element = actual_div_position;
    document.getElementById('id-info-text').textContent = actual_div_position;
});




