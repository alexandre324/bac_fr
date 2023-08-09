function Update_youtube_element() {
    const youtube_create_element = document.querySelectorAll('div.video-container');
    let list_youtube_element = [];

    for (let i = 0; i < youtube_create_element.length; i++) {
        const element = youtube_create_element[i];
        const elementId = element.getAttribute('id');

        if (elementId.startsWith('youtube-')) {
            list_youtube_element.push(youtube_create_element[i]);
        }
    }


    list_youtube_element.forEach(element_youtube => {
        youtube_box_creator_id = extractNumberFromString(element_youtube.id)

        /* Youtube Title */
        var inputElement_title_youtube = document.getElementById("title-youtube-" + youtube_box_creator_id);
        var show_titre_youtube = document.getElementById("titre-demonstration-youtube-" + youtube_box_creator_id);

        inputElement_title_youtube.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_title_youtube = inputElement_title_youtube.value;
            if (inputValue_title_youtube.trim() === "") {
                show_titre_youtube.textContent = "";
                show_titre_youtube.style.color = primaryColor;
            } else {
                show_titre_youtube.textContent = inputValue_title_youtube;
                if (primaryColor == "black") {
                    show_titre_youtube.style.color = "#474747";
                } else {
                    show_titre_youtube.style.color = "#9c9c9c";
                }

            }
        });

        inputElement_title_youtube.addEventListener("blur", function (event) {
            change_text_color();
            updateJsonFile();
        });

        inputElement_title_youtube.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                inputElement_title_youtube.blur();
            }
        });

        /* Youtube src */

        var inputElement_src_youtube = document.getElementById("create-input-src-youtube-" + youtube_box_creator_id);
        var show_src_youtube = document.getElementById("iframe-demonstration-youtube-" + youtube_box_creator_id);

        function getYouTubeVideoId(url) {
            const videoIdParam = url.split('?')[1].split('&')
                .find(param => param.startsWith('v='));

            if (videoIdParam) {
                const videoId = videoIdParam.split('=')[1];
                return videoId;
            } else {
                return null;
            }
        }

        inputElement_src_youtube.addEventListener("input", function (event) {
            var inputValue_src_youtube = inputElement_src_youtube.value;
            try {
                const videoID = getYouTubeVideoId(inputValue_src_youtube);
                show_src_youtube.src = "https://www.youtube.com/embed/" + videoID;
            } catch {
                show_src_youtube.src = "https://www.youtube.com/embed/5dMlMRggnI";
            }
        });

        inputElement_src_youtube.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                inputElement_src_youtube.blur();
                updateJsonFile();
            }
        });

        /* Youtube texte */

        var inputElement_texte_youtube = document.getElementById("create-input-texte-youtube-" + youtube_box_creator_id);
        var show_texte_youtube = document.getElementById("texte-demonstration-youtube-" + youtube_box_creator_id);

        inputElement_texte_youtube.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_texte_youtube = inputElement_texte_youtube.value;
            if (inputValue_texte_youtube.trim() === "") {
                show_texte_youtube.textContent = "";
                show_texte_youtube.style.background = "none";
            } else {
                show_texte_youtube.textContent = inputValue_texte_youtube;
                show_texte_youtube.style.background = "var(--main-color)";
                if (primaryColor == "black") {
                    show_texte_youtube.style.color = "#474747";
                } else {
                    show_texte_youtube.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_texte_youtube.addEventListener("blur", function (event) {
            show_texte_youtube.style.color = "var(--text-color)";
            updateJsonFile();
        });

        inputElement_texte_youtube.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                inputElement_texte_youtube.blur();

            }
        });

        /* youtube keywords */
        var inputElement_keyword_youtube = document.getElementById("create-input-keyword-youtube-" + youtube_box_creator_id);

        load_keywords_elements_created(youtube_box_creator_id)

        inputElement_keyword_youtube.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                var keyword_youtube = inputElement_keyword_youtube.value;

                const cleaned_keyword_youtube = keyword_youtube.replace(/[^\w]/gi, '').replace(/\s+/g, '');

                const lower_cleaned_keyword_youtube = cleaned_keyword_youtube.toLowerCase();

                document.getElementById("alert-text-" + youtube_box_creator_id).style.visibility = "visible";

                if (keyword_youtube.trim() != "") {
                    if (!keywords_list_created[youtube_box_creator_id - 1].includes(lower_cleaned_keyword_youtube)) {
                        keywords_list_created[youtube_box_creator_id - 1].push(lower_cleaned_keyword_youtube);
                        var keywords_list_created_modified = JSON.stringify(keywords_list_created);
                        localStorage.setItem("keyword_elements", keywords_list_created_modified);

                        updateJsonFile();
                        load_keywords_elements_created(youtube_box_creator_id)
                    } else {
                        alert("Déjà dans la liste !")
                    }
                }
                inputElement_keyword_youtube.value = "";
            }

        });
    });
}



function create_youtube_element() {

    const containerElement_youtube = document.getElementById('main-container');

    list_element_created.push("youtube")

    const youtubeBox = document.createElement('div');
    youtubeBox.className = 'video-container-titre';

    const heading = document.createElement('h3');
    heading.className = 'color-opposite';
    heading.textContent = element_id + ') Youtube ';

    const iconImg = document.createElement('img');
    iconImg.src = 'https://cdn-icons-png.flaticon.com/512/3670/3670147.png';

    heading.appendChild(iconImg);

    youtubeBox.appendChild(heading);

    containerElement_youtube.appendChild(youtubeBox);

    const youtubeContainer = createElementWithAttributes('div', {
        class: 'video-container element-create-part',
        id: 'youtube-' + element_id
    });

    const videoPlayerContainer = createElementWithAttributes('div', {
        class: 'box-cours-elements video-player show_cours'
    });

    const videoPlayerTitle = createElementWithAttributes('h2', {
        class: 'cours-element color-opposite',
        id: 'titre-demonstration-youtube-' + element_id
    });
    videoPlayerContainer.appendChild(videoPlayerTitle);

    const videoIframe = createElementWithAttributes('iframe', {
        class: 'cours-element iframe-created',
        id: 'iframe-demonstration-youtube-' + element_id,
        src: 'https://www.youtube.com/embed/5dwMlMRgnI',
        title: 'YouTube video player',
        frameborder: '0',
        allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
        allowfullscreen: ''
    });
    videoPlayerContainer.appendChild(videoIframe);

    const videoPlayerText = createElementWithAttributes('p', {
        class: 'cours-element input-texte-video',
        id: 'texte-demonstration-youtube-' + element_id,
        style: 'background: none; min-width: 95%'
    });
    videoPlayerContainer.appendChild(videoPlayerText);

    youtubeContainer.appendChild(videoPlayerContainer);

    const youtubeCreateRight = createElementWithAttributes('div', {
        class: 'video-create-right'
    });

    function createInputContainer(labelText, inputId, placeholder) {
        const inputCreateContainer = createElementWithAttributes('div', {
            class: 'input-create-container'
        });

        const textInputContainer = createElementWithAttributes('div', {
            class: 'text-input-container'
        });
        textInputContainer.innerHTML = `<h4 class="color-opposite">${labelText} :</h4>`;
        inputCreateContainer.appendChild(textInputContainer);

        const inputContainer = createElementWithAttributes('div', {
            class: 'input-container'
        });
        const input = createElementWithAttributes('input', {
            id: inputId,
            class: 'input color-opposite',
            name: 'text',
            type: 'text',
            placeholder: placeholder
        });
        inputContainer.appendChild(input);
        inputCreateContainer.appendChild(inputContainer);

        return inputCreateContainer;
    }

    const titleInputContainer = createInputContainer('Titre', 'title-youtube-' + element_id, 'ex: Vidéo chats');
    const srcInputContainer = createInputContainer('Vidéo url', 'create-input-src-youtube-' + element_id, 'ex: https://www.youtube.com/watch?v=mqBn7jJ_p08&t=1s');
    const textInputContainer = createInputContainer('Texte', 'create-input-texte-youtube-' + element_id, 'ex: Texte d\'une vidéo');
    const keywordInputContainer = createInputContainer('Mot clé', 'create-input-keyword-youtube-' + element_id, 'ex: Math ,Derive');

    youtubeCreateRight.appendChild(titleInputContainer);
    youtubeCreateRight.appendChild(srcInputContainer);
    youtubeCreateRight.appendChild(textInputContainer);
    youtubeCreateRight.appendChild(keywordInputContainer);

    const keywordListContainer = createElementWithAttributes('ul', {
        class: 'key_word_container key_word_container_created',
        id: 'key_word_container_created_' + element_id
    });

    const emptyKeywords = createElementWithAttributes('p', {
        class: 'color-opposite',
        style: 'display: block;',
        id: 'empty-keywords-' + element_id
    });
    emptyKeywords.textContent = 'Aucun mot clé';
    keywordListContainer.appendChild(emptyKeywords);
    youtubeCreateRight.appendChild(keywordListContainer);

    const alertText = createElementWithAttributes('p', {
        class: 'color-opposite',
        style: 'display: block; color: var(--text-color); font-style: italic; width: 80%; margin-left: 10%;',
        id: 'alert-text-' + element_id
    });
    alertText.textContent = '⚠ Certain mots peuvent être modifiés pour faciliter la recherche plus tard (si vous les tapez comme précédement ils seront trouvé)';
    youtubeCreateRight.appendChild(alertText);

    youtubeContainer.appendChild(youtubeCreateRight);
    containerElement_youtube.appendChild(youtubeContainer);

    Update_youtube_element()
}