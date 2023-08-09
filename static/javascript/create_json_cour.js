/* Id du cours */
fetch('../static/json/matiere.json')
    .then(response => response.json())
    .then(data => {
        localStorage.setItem("nombre_matiere", data.length);
    })
    .catch(error => {
    });

const nombre_matiere = localStorage.getItem("nombre_matiere");



localStorage.setItem("total_cours", 0);

const fetchPromises = []; // Pour stocker les promesses des appels fetch

for (let i = 1; i <= nombre_matiere; i++) {
    const fichier_name = '../static/json/cours/cour_matiere_' + i + '.json';

    const fetchPromise = fetch(fichier_name)
        .then(response => response.json())
        .then(data => {
            const total_cours = parseInt(localStorage.getItem("total_cours")); // Convertir en nombre
            localStorage.setItem("total_cours", total_cours + data.length);
        })
        .catch(error => {
            console.error("Erreur lors du chargement du fichier", fichier_name);
        });

    fetchPromises.push(fetchPromise);
}

nombre_cours_total = localStorage.getItem("total_cours");
const new_cour_id = nombre_cours_total + 1;

/* Matière du cours */
var currentURL = window.location.href;
var url = new URL(currentURL);
var params = new URLSearchParams(url.search);
var matiere = params.get('matiere');


function getCoursBox() {
    /* Box du cours */

    Box_title = document.getElementById("create-input-title-box").value;
    Box_icon = document.getElementById("create-input-icon-box").value;
    Box_keyword = localStorage.getItem("Keyword_box");

    return { val1: Box_title, val2: Box_icon, val3: Box_keyword };
}


function create_json_variable() {
    var list_element_created_unmodified = localStorage.getItem("list_element_created");
    var list_element_created = JSON.parse(list_element_created_unmodified);

    var keyword_elements_unmodified = localStorage.getItem("keyword_elements");
    var keyword_elements = JSON.parse(keyword_elements_unmodified);

    var cours_json = []

    for (var i = 0; i < list_element_created.length; i++) {
        const element_id_list = i + 1;
        console.log(list_element_created[i]);

        if (list_element_created[i] == "youtube") {
            var youtube_titre = document.getElementById("title-youtube-" + element_id_list);
            var youtube_url = document.getElementById("create-input-src-youtube-" + element_id_list);
            var youtube_texte = document.getElementById("create-input-texte-youtube-" + element_id_list);
            var youtube_keyword = keyword_elements[i];

            var jsonObject_youtube = {
                "cours_type": 1,
                "title": youtube_titre.value,
                "video_url": youtube_url.value,
                "texte": youtube_texte.value,
                "keyword": youtube_keyword
            };

            cours_json.push(jsonObject_youtube);

        } else if (list_element_created[i] == "video") {
            var video_titre = document.getElementById("title-video-" + element_id_list);
            var video_url = document.getElementById("create-input-src-video-" + element_id_list);
            var video_texte = document.getElementById("create-input-texte-video-" + element_id_list);
            var video_keyword = keyword_elements[i];

            var video_choose_source_url_list_unmodified = localStorage.getItem("video_choose_source_url_list");
            var video_choose_source_url_list = JSON.parse(video_choose_source_url_list_unmodified);

            if (video_choose_source_url_list[i] == 1) {
                var jsonObject_video = {
                    "cours_type": 2,
                    "title": video_titre.value,
                    "video_src": "no",
                    "texte": video_texte.value,
                    "keyword": video_keyword
                };
            } else {
                var jsonObject_video = {
                    "cours_type": 2,
                    "title": video_titre.value,
                    "video_src": video_url.value,
                    "texte": video_texte.value,
                    "keyword": video_keyword
                };
            }
            cours_json.push(jsonObject_video);
        } else if (list_element_created[i] == "audio") {
            var audio_titre = document.getElementById("title-audio-" + element_id_list);
            var audio_url = document.getElementById("create-input-src-audio-" + element_id_list);
            var audio_texte = document.getElementById("create-input-texte-audio-" + element_id_list);
            var audio_keyword = keyword_elements[i];

            var audio_choose_source_url_list_unmodified = localStorage.getItem("audio_choose_source_url_list");
            var audio_choose_source_url_list = JSON.parse(audio_choose_source_url_list_unmodified);

            if (audio_choose_source_url_list[i] == 1) {
                var jsonObject_audio = {
                    "cours_type": 3,
                    "title": audio_titre.value,
                    "video_src": "no",
                    "texte": audio_texte.value,
                    "keyword": audio_keyword
                };
            } else {
                var jsonObject_audio = {
                    "cours_type": 3,
                    "title": audio_titre.value,
                    "video_src": audio_url.value,
                    "texte": audio_texte.value,
                    "keyword": audio_keyword
                };
            }
            cours_json.push(jsonObject_audio);
        } else if (list_element_created[i] == "texte") {
            var texte_titre = document.getElementById("title-texte-" + element_id_list);
            var texte_1 = document.getElementById("create-input-texte-first-" + element_id_list);
            var texte_2 = document.getElementById("create-input-texte-second-" + element_id_list);
            var texte_3 = document.getElementById("create-input-texte-third-" + element_id_list);
            var texte_4 = document.getElementById("create-input-texte-fourth-" + element_id_list);
            var texte_5 = document.getElementById("create-input-texte-fifth-" + element_id_list);
            var texte_keyword = keyword_elements[i];

            var jsonObject_texte = {
                "cours_type": 6,
                "title": texte_titre.value,
                "texte": texte_1.value,
                "texte1": texte_2.value,
                "texte2": texte_3.value,
                "texte3": texte_4.value,
                "texte4": texte_5.value,
                "keyword": texte_keyword
            };

            cours_json.push(jsonObject_texte);
        } else if (list_element_created[i] == "imageV") {
            var imageV_titre = document.getElementById("title-imageV-" + element_id_list);
            var imageV_url = document.getElementById("create-input-src-imageV-" + element_id_list);
            var imageV_texte = document.getElementById("create-input-texte-imageV-" + element_id_list);
            var imageV_keyword = keyword_elements[i];

            var imageV_choose_source_url_list_unmodified = localStorage.getItem("imageV_choose_source_url_list");
            var imageV_choose_source_url_list = JSON.parse(imageV_choose_source_url_list_unmodified);

            if (imageV_choose_source_url_list[i] == 1) {
                var jsonObject_imageV = {
                    "cours_type": 4,
                    "title": imageV_titre.value,
                    "image_src": "no",
                    "texte": imageV_texte.value,
                    "keyword": imageV_keyword
                };
            } else {
                var jsonObject_imageV = {
                    "cours_type": 4,
                    "title": imageV_titre.value,
                    "image_src": imageV_url.value,
                    "texte": imageV_texte.value,
                    "keyword": imageV_keyword
                };
            }
            cours_json.push(jsonObject_imageV);
        } else if (list_element_created[i] == "imageH") {
            var imageH_titre = document.getElementById("title-imageH-" + element_id_list);
            var imageH_url = document.getElementById("create-input-src-imageH-" + element_id_list);
            var imageH_texte = document.getElementById("create-input-texte-imageH-" + element_id_list);
            var imageH_keyword = keyword_elements[i];

            var imageH_choose_source_url_list_unmodified = localStorage.getItem("imageH_choose_source_url_list");
            var imageH_choose_source_url_list = JSON.parse(imageH_choose_source_url_list_unmodified);

            if (imageH_choose_source_url_list[i] == 1) {
                var jsonObject_imageH = {
                    "title": imageH_titre.value,
                    "cours_type": 5,
                    "image_src": "no",
                    "texte": imageH_texte.value,
                    "keyword": imageH_keyword
                };
            } else {
                var jsonObject_imageH = {
                    "cours_type": 5,
                    "title": imageH_titre.value,
                    "image_src": imageH_url.value,
                    "texte": imageH_texte.value,
                    "keyword": imageH_keyword
                };
            }
            cours_json.push(jsonObject_imageH);
        }
    }

    return cours_json;
}

function updateJsonFile() {
    /* Cours box values */
    var Result_cour_box = getCoursBox();

    var Box_title = Result_cour_box.val1;
    var Box_icon = Result_cour_box.val2;
    var Box_keyword = Result_cour_box.val3;

    var json_variable = create_json_variable();
    console.log(json_variable);
}

