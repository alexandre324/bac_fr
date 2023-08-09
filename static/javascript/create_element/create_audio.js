
let audio_choose_source_url_list = [];
let audios_url = [];
let audios_src = [];

const numberOfEmptyLists_audio = 200;
for (let i = 0; i < numberOfEmptyLists_audio; i++) {
    audio_choose_source_url_list.push(1);
}

var audio_choose_source_url_list_modified = JSON.stringify(audio_choose_source_url_list);
localStorage.setItem("audio_choose_source_url_list", audio_choose_source_url_list_modified);

function Update_audio_element() {

    const audio_create_element = document.querySelectorAll('div.video-container');
    let list_audio_element = [];

    for (let i = 0; i < audio_create_element.length; i++) {
        const element = audio_create_element[i];
        const elementId = element.getAttribute('id');

        if (elementId.startsWith('audio-')) {
            list_audio_element.push(audio_create_element[i]);
        }
    }

    list_audio_element.forEach(element_audio => {
        audio_box_creator_id = extractNumberFromString(element_audio.id)

        /* Audio Title */
        var inputElement_title_audio = document.getElementById("title-audio-" + audio_box_creator_id);
        var show_titre_audio = document.getElementById("titre-demonstration-audio-" + audio_box_creator_id);

        inputElement_title_audio.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_title_audio = inputElement_title_audio.value;
            if (inputValue_title_audio.trim() === "") {
                show_titre_audio.textContent = "";
                show_titre_audio.style.color = primaryColor;
            } else {
                show_titre_audio.textContent = inputValue_title_audio;
                if (primaryColor == "black") {
                    show_titre_audio.style.color = "#474747";
                } else {
                    show_titre_audio.style.color = "#c9c9c9";
                }
            }
        });

        inputElement_title_audio.addEventListener("blur", function (event) {
            change_text_color()
            updateJsonFile()
        });

        inputElement_title_audio.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                show_titre_audio.style.color = "var(--text-color)";
                inputElement_title_audio.blur();
            }
        });

        /* video src */

        if (audio_choose_source_url_list[audio_box_creator_id - 1] == 1) {
            /* choice source */

            document.getElementById('custom-file-input-' + audio_box_creator_id).addEventListener('click', function () {
                document.getElementById('custom-file-input-' + audio_box_creator_id).display = "none";
                var input = document.createElement('input');
                input.type = 'file';
                input.accept = 'video/*';
                input.onchange = function (event) {
                    var file_audio = event.target.files[0];
                    var fileName_audio = file_audio.name;
                    var audioURL = URL.createObjectURL(file_audio);
                    audios_src[audio_box_creator_id - 1] = audioURL;
                    document.getElementById("player-demonstration-audio-" + audio_box_creator_id).src = audioURL;
                    if (fileName_audio.length > 20) {
                        document.getElementById("text-file-loaded-" + audio_box_creator_id).textContent = shortenFileName(fileName_audio);
                    } else {
                        document.getElementById("text-file-loaded-" + audio_box_creator_id).textContent = fileName_audio;
                    }

                };
                input.click();
                document.getElementById('custom-file-input-' + audio_box_creator_id).display = "block";
                updateJsonFile()
            });


        } else {
            /* choice url */

            var inputElement_src_audio = document.getElementById("create-input-src-audio-" + audio_box_creator_id);
            var show_src_audio = document.getElementById("player-demonstration-audio-" + audio_box_creator_id);

            inputElement_src_audio.addEventListener("input", function (event) {
                rootStyles = getComputedStyle(document.documentElement);
                primaryColor = rootStyles.getPropertyValue('--text-color');

                var inputValue_src_audio = inputElement_src_audio.value;

                show_src_audio.src = inputValue_src_audio;
                audios_url[audio_box_creator_id - 1] = inputValue_src_audio;

            });

            inputElement_src_audio.addEventListener("keydown", function (event) {
                if (event.keyCode === 13) {
                    show_src_audio.style.color = "var(--text-color)";
                    inputElement_src_audio.blur();
                    updateJsonFile()
                }
            });
        }

        /* Audio texte */

        var inputElement_texte_audio = document.getElementById("create-input-texte-audio-" + audio_box_creator_id);
        var show_texte_audio = document.getElementById("texte-demonstration-audio-" + audio_box_creator_id);

        inputElement_texte_audio.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_texte_audio = inputElement_texte_audio.value;
            if (inputValue_texte_audio.trim() === "") {
                show_texte_audio.style.background = "none";
            } else {
                show_texte_audio.textContent = inputValue_texte_audio;
                show_texte_audio.style.background = "var(--main-color-light)";
                if (primaryColor == "black") {
                    show_texte_audio.style.color = "#474747";
                } else {
                    show_texte_audio.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_texte_audio.addEventListener("blur", function (event) {
            show_texte_audio.style.color = "var(--text-color)";
            updateJsonFile()
        });

        inputElement_texte_audio.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                inputElement_texte_audio.blur();
            }
        });

        /* audio keywords */
        var inputElement_keyword_audio = document.getElementById("create-input-keyword-audio-" + audio_box_creator_id);

        load_keywords_elements_created(audio_box_creator_id)

        inputElement_keyword_audio.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                var keyword_audio = inputElement_keyword_audio.value;

                const cleaned_keyword_audio = keyword_audio.replace(/[^\w]/gi, '').replace(/\s+/g, '');

                const lower_cleaned_keyword_audio = cleaned_keyword_audio.toLowerCase();

                document.getElementById("alert-text-" + audio_box_creator_id).style.visibility = "visible";

                if (keyword_audio.trim() != "") {
                    if (!keywords_list_created[audio_box_creator_id - 1].includes(lower_cleaned_keyword_audio)) {
                        keywords_list_created[audio_box_creator_id - 1].push(lower_cleaned_keyword_audio);
                        var keywords_list_created_modified = JSON.stringify(keywords_list_created);

                        localStorage.setItem("keyword_elements", keywords_list_created_modified);
                        updateJsonFile()
                        load_keywords_elements_created(audio_box_creator_id)
                    } else {
                        alert("Déjà dans la liste !")
                    }
                }
                inputElement_keyword_audio.value = "";
            }

        });
    });

}


function audiochangeinput(input_audio_type, audio_input_id) {
    document.getElementById("player-demonstration-audio-" + audio_input_id).src = "";
    if (input_audio_type == 1) {
        audio_choose_source_url_list[audio_input_id - 1] = 1;
        document.getElementById("boutton-audio-src-" + audio_input_id).style.backgroundColor = "var(--main-color-dark)";
        document.getElementById("boutton-audio-url-" + audio_input_id).style.backgroundColor = "var(--main-color)";
        document.getElementById("audio-src-input-" + audio_input_id).style.display = "flex";
        document.getElementById("audio-url-input-" + audio_input_id).style.display = "none";

        var audioURL_2 = audios_src[audio_input_id - 1]
        document.getElementById("player-demonstration-audio-" + audio_input_id).src = audioURL_2;
    } else {
        audio_choose_source_url_list[audio_input_id - 1] = 2;
        document.getElementById("boutton-audio-url-" + audio_input_id).style.backgroundColor = "var(--main-color-dark)";
        document.getElementById("boutton-audio-src-" + audio_input_id).style.backgroundColor = "var(--main-color)";
        document.getElementById("audio-src-input-" + audio_input_id).style.display = "none";
        document.getElementById("audio-url-input-" + audio_input_id).style.display = "flex";

        var inputValue_src_audio_2 = audios_url[audio_input_id - 1]
        document.getElementById("player-demonstration-audio-" + audio_input_id).src = inputValue_src_audio_2;
    }

    var audio_choose_source_url_list_modified = JSON.stringify(audio_choose_source_url_list);
    localStorage.setItem("audio_choose_source_url_list", audio_choose_source_url_list_modified);
    Update_audio_element();
}



function create_audio_element() {
    const containerElement_audio = document.getElementById('main-container');

    list_element_created.push('audio');

    const audioBox = document.createElement('div');
    audioBox.className = 'video-container-titre';

    const heading = document.createElement('h3');
    heading.className = 'color-opposite';
    heading.textContent = element_id + ') Audio ';

    const iconImg = document.createElement('img');
    iconImg.src = '   https://cdn-icons-png.flaticon.com/512/4349/4349708.png ';

    heading.appendChild(iconImg);

    audioBox.appendChild(heading);

    containerElement_audio.appendChild(audioBox);

    const audioContainer = createElementWithAttributes('div', {
        class: 'video-container element-create-part',
        id: 'audio-' + element_id,
    });

    const boxCoursElements = createElementWithAttributes('div', {
        class: 'box-cours-elements video-player show_cours',
    });

    const audioTitle = createElementWithAttributes('h2', {
        class: 'cours-element color-opposite',
        id: 'titre-demonstration-audio-' + element_id,
    });
    audioTitle.textContent = '';
    boxCoursElements.appendChild(audioTitle);

    const contentContainer = createElementWithAttributes('div', {
        class: 'content-full-screen',
        id: 'content-container',
        style: 'justify-content: center;',
    });

    const audioElement = createElementWithAttributes('audio', {
        class: 'cours-element',
        controls: '',
        style: 'width: 60%;',
        id: "player-demonstration-audio-" + element_id,
    });
    const audioSource = createElementWithAttributes('source', {
        src: '',
        type: 'audio/mpeg',
    });
    audioElement.appendChild(audioSource);
    audioElement.textContent = 'Your browser does not support the audio tag.';
    contentContainer.appendChild(audioElement);

    const audioText = document.createElement('p');
    audioText.className = 'cours-element';
    audioText.id = 'texte-demonstration-audio-' + element_id;
    audioText.style.background = 'none';
    audioText.style.color = 'var(--text-color)';
    audioText.textContent = '';
    audioText.style.width = '80%';
    contentContainer.appendChild(audioText);

    boxCoursElements.appendChild(contentContainer);
    audioContainer.appendChild(boxCoursElements);

    const audioCreateRight = createElementWithAttributes('div', {
        class: 'video-create-right',
    });

    function createInputContainer(labelText, inputId, placeholder) {
        const inputCreateContainer = createElementWithAttributes('div', {
            class: 'input-create-container',
        });

        const textInputContainer = createElementWithAttributes('div', {
            class: 'text-input-container',
        });
        const labelTextElement = document.createElement('h4');
        labelTextElement.className = 'color-opposite';
        labelTextElement.textContent = labelText + ' :';
        textInputContainer.appendChild(labelTextElement);
        inputCreateContainer.appendChild(textInputContainer);

        const inputContainer = createElementWithAttributes('div', {
            class: 'input-container',
        });
        const inputElement = createElementWithAttributes('input', {
            id: inputId,
            class: 'input color-opposite',
            name: 'text',
            type: 'text',
            placeholder: placeholder,
        });
        inputContainer.appendChild(inputElement);
        inputCreateContainer.appendChild(inputContainer);

        return inputCreateContainer;
    }

    const titleInputContainer = createInputContainer(
        'Titre',
        'title-audio-' + element_id,
        'ex: Audio n°1'
    );

    /* Choice audio source */

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'input-create-container';
    buttonContainer.style.justifyContent = 'center';

    const sourceButton = document.createElement('button');
    sourceButton.id = 'boutton-audio-src-' + element_id;
    sourceButton.className = 'button-choose-src-url';
    sourceButton.style.backgroundColor = 'var(--main-color-dark)';
    sourceButton.textContent = 'Source';
    sourceButton.addEventListener('click', function () {
        audiochangeinput(1, element_id);

    });
    buttonContainer.appendChild(sourceButton);

    const urlButton = document.createElement('button');
    urlButton.id = 'boutton-audio-url-' + element_id;
    urlButton.className = 'button-choose-src-url';
    urlButton.textContent = 'Url';
    urlButton.addEventListener('click', function () {
        audiochangeinput(2, element_id);
    });
    buttonContainer.appendChild(urlButton);

    audioCreateRight.appendChild(titleInputContainer);
    audioCreateRight.appendChild(buttonContainer);

    const audioSrcInput = createElementWithAttributes('div', {
        class: 'input-create-container input-create-audio',
        style: 'justify-content: left; margin-left: 1vw;',
        id: 'audio-src-input-' + element_id,
    });

    const textInputContainer_1 = createElementWithAttributes('div', {
        class: 'text-input-container',
    });

    const labelTextElement_1 = document.createElement('h4');
    labelTextElement_1.className = 'color-opposite';
    labelTextElement_1.textContent = 'Audio source :';
    textInputContainer_1.appendChild(labelTextElement_1);
    audioSrcInput.appendChild(textInputContainer_1);

    const buttonLoadElement = document.createElement('button');
    buttonLoadElement.setAttribute('for', 'audio-input');
    buttonLoadElement.id = 'custom-file-input-' + element_id;
    buttonLoadElement.classList = 'button-source-input';

    const imageElement = document.createElement('img');
    imageElement.className = 'image-file-input';
    imageElement.src = 'https://cdn-icons-png.flaticon.com/512/81/81081.png';
    buttonLoadElement.appendChild(imageElement);
    audioSrcInput.appendChild(buttonLoadElement);

    const texteFileLoaded = document.createElement('p');
    texteFileLoaded.id = "text-file-loaded-" + element_id;
    texteFileLoaded.classList = "text-file-loaded";
    texteFileLoaded.textContent = "vide";


    audioSrcInput.appendChild(texteFileLoaded);

    audioCreateRight.appendChild(audioSrcInput);

    const audioUrlInput = createElementWithAttributes('div', {
        class: 'input-create-container',
        id: 'audio-url-input-' + element_id,
        style: 'display: none',
    });

    const textInputContainer_3 = createElementWithAttributes('div', {
        class: 'text-input-container',
    });

    const labelTextElement_3 = document.createElement('h4');
    labelTextElement_3.className = 'color-opposite';
    labelTextElement_3.textContent = 'Audio url :';
    textInputContainer_3.appendChild(labelTextElement_3);
    audioUrlInput.appendChild(textInputContainer_3);

    const inputContainer = createElementWithAttributes('div', {
        class: 'input-container',
    });

    const urlInput = createElementWithAttributes('input', {
        id: 'create-input-src-audio-' + element_id,
        class: 'input color-opposite',
        name: 'text',
        type: 'text',
        placeholder: "ex: URL de l'audio",
    });
    inputContainer.appendChild(urlInput);
    audioUrlInput.appendChild(inputContainer);

    audioCreateRight.appendChild(audioUrlInput);




    const textInputContainer = createInputContainer(
        'Texte',
        'create-input-texte-audio-' + element_id,
        "ex: Texte d'un audio"
    );
    const keywordInputContainer = createInputContainer(
        'Mot clé',
        'create-input-keyword-audio-' + element_id,
        'ex: Math, Derive'
    );

    audioCreateRight.appendChild(textInputContainer);
    audioCreateRight.appendChild(keywordInputContainer);

    const keywordListContainer = createElementWithAttributes('ul', {
        class: 'key_word_container key_word_container_created',
        id: 'key_word_container_created_' + element_id,
        style: 'max-height: 15vh;',
    });

    const emptyKeywords = createElementWithAttributes('p', {
        class: 'color-opposite',
        style: 'display: block;',
        id: 'empty-keywords-' + element_id,
    });
    emptyKeywords.textContent = 'Aucun mot clé';
    keywordListContainer.appendChild(emptyKeywords);
    audioCreateRight.appendChild(keywordListContainer);

    const alertText = createElementWithAttributes('p', {
        class: 'color-opposite',
        style:
            'display: block; color: rgb(237, 238, 238); font-style: italic; width: 80%; margin-left: 10%;',
        id: 'alert-text-' + element_id,
    });
    alertText.textContent =
        '⚠ Certain mots peuvent être modifiés pour faciliter la recherche plus tard (si vous les tapez comme précédemment ils seront trouvés)';
    audioCreateRight.appendChild(alertText);

    audioContainer.appendChild(audioCreateRight);
    containerElement_audio.appendChild(audioContainer);

    Update_audio_element()
}
