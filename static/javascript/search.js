var input = document.getElementById("search-input");
var search_word = "";
const urlParams = new URLSearchParams(window.location.search);
const matiere = urlParams.get('matiere');
var json_url = '../static/json/interro_cour_' + matiere + '.json';
load_cour(search_word)



function load_cour(search_word, original_word) {
    fetch(json_url)
        .then(response => response.json())
        .then(data => {

            const container_interro = document.getElementById("box-interro");
            const container_cours = document.getElementById("box-cours");
            const recherche_texte = document.getElementById("recherche_word");

            if (search_word == "" || search_word === null) {
                container_interro.innerHTML = "";
                container_cours.innerHTML = "";

                recherche_texte.style.display = "none";

                data.forEach(item => {
                    const a = document.createElement("a");
                    a.classList.add("box-single");


                    const boxNum = document.createElement("div");
                    boxNum.classList.add("box-num");
                    boxNum.textContent = item.id_interro;

                    const h4 = document.createElement("h4");
                    h4.textContent = item.interro_name;

                    const icon = document.createElement("div");
                    icon.className = "box-icon-container";
                    const img_icon = document.createElement("img");
                    img_icon.src = item.icon_url;
                    img_icon.className = "box-icon";
                    icon.appendChild(img_icon);

                    a.appendChild(boxNum);
                    a.appendChild(h4);
                    a.appendChild(icon);

                    if (item.cathegorie_cour == false) {
                        a.href = "/interro?matiere=" + matiere + "&id=" + item.id_interro;
                        container_interro.appendChild(a);
                    } else {

                        a.href = "/cours?matiere=" + matiere + "&id=" + item.id_interro;
                        container_cours.appendChild(a);
                    }
                });
            } else {
                var on_search_cours = []
                var on_search_interro = []
                var off_search_cours = []
                var off_search_interro = []

                container_interro.innerHTML = "";
                container_cours.innerHTML = "";

                data.forEach(item => {
                    key_words = item.mot_cle;
                    if (key_words.includes(search_word)) {
                        if (item.cathegorie_cour == false) {
                            on_search_interro.push(item.id_interro);
                        } else {
                            on_search_cours.push(item.id_interro);
                        }
                    } else {
                        if (item.cathegorie_cour == false) {
                            off_search_interro.push(item.id_interro);
                        } else {
                            off_search_cours.push(item.id_interro);
                        }
                    }
                })

                var total_results = on_search_interro.length + on_search_cours.length;

                recherche_texte.style.display = "block";
                recherche_texte.textContent = "Recherche: \"" + original_word + "\" (" + total_results + " résultats)";

                if (on_search_cours.length == 0) {
                    const rien_title = document.createElement("p");
                    rien_title.classList.add("rien_title");
                    rien_title.textContent = "Aucun résultats...";
                    container_cours.appendChild(rien_title);
                }
                if (on_search_interro.length == 0) {
                    const rien_title2 = document.createElement("p");
                    rien_title2.classList.add("rien_title");
                    rien_title2.textContent = "Aucun résultats...";
                    container_interro.appendChild(rien_title2);
                }

                data.forEach(item => {
                    if (on_search_cours.includes(item.id_interro)) {
                        const a = document.createElement("a");
                        a.classList.add("box-single");

                        const boxNum = document.createElement("div");
                        boxNum.classList.add("box-num");
                        boxNum.textContent = item.id_interro;

                        const h4 = document.createElement("h4");
                        h4.textContent = item.interro_name;

                        const icon = document.createElement("div");
                        icon.className = "box-icon-container";
                        const img_icon = document.createElement("img");
                        img_icon.src = item.icon_url;
                        img_icon.className = "box-icon";
                        icon.appendChild(img_icon);

                        a.appendChild(boxNum);
                        a.appendChild(h4);
                        a.appendChild(icon);

                        a.href = "/cours?matiere=" + matiere + "&id=" + item.id_interro;
                        container_cours.appendChild(a);


                    }
                    if (on_search_interro.includes(item.id_interro)) {
                        const a = document.createElement("a");
                        a.classList.add("box-single");

                        const boxNum = document.createElement("div");
                        boxNum.classList.add("box-num");
                        boxNum.textContent = item.id_interro;

                        const h4 = document.createElement("h4");
                        h4.textContent = item.interro_name;

                        const icon = document.createElement("div");
                        icon.className = "box-icon-container";
                        const img_icon = document.createElement("img");
                        img_icon.src = item.icon_url;
                        img_icon.className = "box-icon";
                        icon.appendChild(img_icon);

                        a.appendChild(boxNum);
                        a.appendChild(h4);
                        a.appendChild(icon);

                        a.href = "/interro?matiere=" + matiere + "&id=" + item.id_interro;
                        container_interro.appendChild(a);

                    }

                })

                if (off_search_cours.length != 0) {
                    const autre_title = document.createElement("h5");
                    autre_title.classList.add("autre_title");
                    autre_title.textContent = "Autres";
                    container_cours.appendChild(autre_title);
                }
                if (off_search_interro.length != 0) {
                    const autre_title2 = document.createElement("h5");
                    autre_title2.classList.add("autre_title");
                    autre_title2.textContent = "Autres";
                    container_interro.appendChild(autre_title2);
                }

                data.forEach(item => {
                    if (off_search_cours.includes(item.id_interro)) {
                        const a = document.createElement("a");
                        a.classList.add("box-single");
                        a.classList.add("box-off");

                        const boxNum = document.createElement("div");
                        boxNum.classList.add("box-num");
                        boxNum.textContent = item.id_interro;

                        const h4 = document.createElement("h4");
                        h4.textContent = item.interro_name;

                        const icon = document.createElement("div");
                        icon.className = "box-icon-container";
                        const img_icon = document.createElement("img");
                        img_icon.src = item.icon_url;
                        img_icon.className = "box-icon";
                        icon.appendChild(img_icon);

                        a.appendChild(boxNum);
                        a.appendChild(h4);
                        a.appendChild(icon);

                        a.href = "/cours?matiere=" + matiere + "&id=" + item.id_interro;
                        container_cours.appendChild(a);

                    }
                    if (off_search_interro.includes(item.id_interro)) {
                        const a = document.createElement("a");
                        a.classList.add("box-single");
                        a.classList.add("box-off");

                        const boxNum = document.createElement("div");
                        boxNum.classList.add("box-num");
                        boxNum.textContent = item.id_interro;

                        const h4 = document.createElement("h4");
                        h4.textContent = item.interro_name;

                        const icon = document.createElement("div");
                        icon.className = "box-icon-container";
                        const img_icon = document.createElement("img");
                        img_icon.src = item.icon_url;
                        img_icon.className = "box-icon";
                        icon.appendChild(img_icon);

                        a.appendChild(boxNum);
                        a.appendChild(h4);
                        a.appendChild(icon);

                        a.href = "/interro?matiere=" + matiere + "&id=" + item.id_interro;
                        container_interro.appendChild(a);

                    }
                })

            }
        }).catch(error => {
            console.error('Error:', error);
        });



}


function search() {
    var search_word = input.value;
    const cleaned_search_word = search_word.replace(/[^\w]/gi, '').replace(/\s+/g, '');

    // Convertir en minuscules
    const lower_cleaned_search_word = cleaned_search_word.toLowerCase();


    console.log("word serached: " + lower_cleaned_search_word)
    load_cour(lower_cleaned_search_word, search_word)
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const observeElements = () => {
    const testCollection = document.getElementsByClassName('box-single');
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


input.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        search()
    }
});