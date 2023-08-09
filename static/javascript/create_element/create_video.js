
let video_choose_source_url_list = [];
let videos_url = [];
let videos_src = [];

const numberOfEmptyLists_video = 200;
for (let i = 0; i < numberOfEmptyLists_video; i++) {
    video_choose_source_url_list.push(1);
    videos_src.push("");
    videos_url.push("");
}

var video_choose_source_url_list_modified = JSON.stringify(video_choose_source_url_list);
localStorage.setItem("video_choose_source_url_list", video_choose_source_url_list_modified);


function shortenFileName(fileName) {
    const maxChars = 12;
    const extension = ".mp4";

    if (fileName.length <= maxChars + extension.length) {
        return fileName;
    }

    const nameWithoutExtension = fileName.substring(0, fileName.length - extension.length);
    const shortenedName = nameWithoutExtension.substring(0, 12) + "... " + nameWithoutExtension.slice(-3) + extension;
    return shortenedName;
}


function Update_video_element() {
    const video_create_element = document.querySelectorAll('div.video-container');
    let list_video_element = [];

    for (let i = 0; i < video_create_element.length; i++) {
        const element = video_create_element[i];
        const elementId = element.getAttribute('id');

        if (elementId.startsWith('video-')) {
            list_video_element.push(video_create_element[i]);
        }
    }


    list_video_element.forEach(element_video => {
        video_box_creator_id = extractNumberFromString(element_video.id)

        /* video Title */
        var inputElement_title_video = document.getElementById("title-video-" + video_box_creator_id);
        var show_titre_video = document.getElementById("titre-demonstration-video-" + video_box_creator_id);

        inputElement_title_video.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_title_video = inputElement_title_video.value;
            if (inputValue_title_video.trim() === "") {
                show_titre_video.textContent = "";
                show_titre_video.style.color = primaryColor;
            } else {
                show_titre_video.textContent = inputValue_title_video;
                if (primaryColor == "black") {
                    show_titre_video.style.color = "#474747";
                } else {
                    show_titre_video.style.color = "#9c9c9c";
                }
            }
        });

        inputElement_title_video.addEventListener("blur", function (event) {
            change_text_color();
            updateJsonFile();
        });

        inputElement_title_video.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                inputElement_title_video.blur();
            }
        });

        /* video src */

        var show_src_video = document.getElementById("iframe-demonstration-video-" + video_box_creator_id);

        if (video_choose_source_url_list[video_box_creator_id - 1] == 1) {
            /* choice source */


            document.getElementById('custom-file-input-' + video_box_creator_id).addEventListener('click', function () {
                document.getElementById('custom-file-input-' + video_box_creator_id).display = "none";
                var input = document.createElement('input');
                input.type = 'file';
                input.accept = 'video/*';
                input.onchange = function (event) {
                    var file_video = event.target.files[0];
                    var fileName = file_video.name;
                    var videoURL = URL.createObjectURL(file_video);
                    show_src_video.src = videoURL;
                    videos_src[video_box_creator_id - 1] = videoURL;
                    if (fileName.length > 20) {
                        document.getElementById("text-file-loaded-" + video_box_creator_id).textContent = shortenFileName(fileName);
                    } else {
                        document.getElementById("text-file-loaded-" + video_box_creator_id).textContent = fileName;
                    }

                };
                updateJsonFile();
                input.click();
            });


        } else {
            /* choice url */

            var inputElement_url_video = document.getElementById("create-input-src-video-" + video_box_creator_id);

            inputElement_url_video.addEventListener("input", function (event) {
                rootStyles = getComputedStyle(document.documentElement);
                primaryColor = rootStyles.getPropertyValue('--text-color');

                var inputValue_url_video = inputElement_url_video.value;

                show_src_video.src = inputValue_url_video;
                videos_url[video_box_creator_id - 1] = inputValue_url_video;

            });


            inputElement_url_video.addEventListener("keydown", function (event) {
                if (event.keyCode === 13) {
                    inputElement_url_video.blur();
                    updateJsonFile();
                }
            });
        }

        /* video texte */

        var inputElement_texte_video = document.getElementById("create-input-texte-video-" + video_box_creator_id);
        var show_texte_video = document.getElementById("texte-demonstration-video-" + video_box_creator_id);

        inputElement_texte_video.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_texte_video = inputElement_texte_video.value;
            if (inputValue_texte_video.trim() === "") {
                show_texte_video.textContent = "";
                show_texte_video.style.background = "none";
            } else {
                show_texte_video.textContent = inputValue_texte_video;
                show_texte_video.style.background = "var(--main-color)";
                if (primaryColor == "black") {
                    show_texte_video.style.color = "#474747";
                } else {
                    show_texte_video.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_texte_video.addEventListener("blur", function (event) {
            show_texte_video.style.color = "var(--text-color)";
            updateJsonFile();
        });

        inputElement_texte_video.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                inputElement_texte_video.blur();
            }
        });

        /* video keywords */
        var inputElement_keyword_video = document.getElementById("create-input-keyword-video-" + video_box_creator_id);

        load_keywords_elements_created(video_box_creator_id)

        inputElement_keyword_video.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                var keyword_video = inputElement_keyword_video.value;

                const cleaned_keyword_video = keyword_video.replace(/[^\w]/gi, '').replace(/\s+/g, '');

                const lower_cleaned_keyword_video = cleaned_keyword_video.toLowerCase();

                document.getElementById("alert-text-" + video_box_creator_id).style.visibility = "visible";

                if (keyword_video.trim() != "") {
                    if (!keywords_list_created[video_box_creator_id - 1].includes(lower_cleaned_keyword_video)) {
                        keywords_list_created[video_box_creator_id - 1].push(lower_cleaned_keyword_video);
                        var keywords_list_created_modified = JSON.stringify(keywords_list_created);
                        localStorage.setItem("keyword_elements", keywords_list_created_modified);
                        updateJsonFile();
                        load_keywords_elements_created(video_box_creator_id)
                    } else {
                        alert("Déjà dans la liste !")
                    }
                }
                inputElement_keyword_video.value = "";
            }

        });
    });

}


function videochangeinput(input_video_type, video_input_id) {
    document.getElementById("iframe-demonstration-video-" + video_input_id).src = "";
    if (input_video_type == 1) {
        video_choose_source_url_list[video_input_id - 1] = 1;
        document.getElementById("bouton-video-src-" + video_input_id).style.backgroundColor = "var(--main-color-dark)";
        document.getElementById("bouton-video-url-" + video_input_id).style.backgroundColor = "var(--main-color)";
        document.getElementById("video-src-input-" + video_input_id).style.display = "flex";
        document.getElementById("video-url-input-" + video_input_id).style.display = "none";

        var videoURL_2 = videos_src[video_input_id - 1]
        document.getElementById("iframe-demonstration-video-" + video_input_id).src = videoURL_2;


    } else {
        video_choose_source_url_list[video_input_id - 1] = 2;
        document.getElementById("bouton-video-url-" + video_input_id).style.backgroundColor = "var(--main-color-dark)";
        document.getElementById("bouton-video-src-" + video_input_id).style.backgroundColor = "var(--main-color)";
        document.getElementById("video-src-input-" + video_input_id).style.display = "none";
        document.getElementById("video-url-input-" + video_input_id).style.display = "flex";

        var inputValue_src_video_2 = videos_url[video_input_id - 1]
        document.getElementById("iframe-demonstration-video-" + video_input_id).src = inputValue_src_video_2;
    }

    var video_choose_source_url_list_modified = JSON.stringify(video_choose_source_url_list);
    localStorage.setItem("video_choose_source_url_list", video_choose_source_url_list_modified);
    updateJsonFile();
    Update_video_element();
}

function create_video_element(containerElement) {
    const containerElement_video = document.getElementById('main-container');

    list_element_created.push("video")

    const youtubeContainerTitle = document.createElement('div');

    const titleHeading = document.createElement('h3');
    titleHeading.className = 'color-opposite';
    titleHeading.textContent = element_id + ') Vidéo ';

    const titleIconImg = document.createElement('img');
    titleIconImg.src =
        '   https://cdn-icons-png.flaticon.com/512/3074/3074767.png ';

    titleHeading.appendChild(titleIconImg);
    youtubeContainerTitle.appendChild(titleHeading);
    containerElement_video.appendChild(youtubeContainerTitle);

    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-container element-create-part';
    videoContainer.id = 'video-' + element_id;

    const boxCoursElements = document.createElement('div');
    boxCoursElements.className = 'box-cours-elements video-player show_cours';

    const videoPlayerTitle = document.createElement('h2');
    videoPlayerTitle.classList = 'cours-element color-opposite';
    videoPlayerTitle.id = 'titre-demonstration-video-' + element_id;
    videoPlayerTitle.style.color = 'var(--text-color)';
    videoPlayerTitle.textContent = '';

    const contentContainer = document.createElement('div');
    contentContainer.className = 'content-full-screen';
    contentContainer.id = "content-container";
    contentContainer.style.height = '90%';

    const videoElement = document.createElement('video');
    videoElement.id = 'iframe-demonstration-video-' + element_id;
    videoElement.className = 'cours-element';
    videoElement.controls = true;
    const sourceElement = document.createElement('source');
    sourceElement.src = '';
    sourceElement.type = 'video/mp4';
    videoElement.appendChild(sourceElement);

    const videoText = document.createElement('p');
    videoText.className = 'cours-element';
    videoText.id = 'texte-demonstration-video-' + element_id;
    videoText.style.background = 'none';
    videoText.style.color = 'var(--text-color)';
    videoText.style.width = '80%';
    videoText.textContent = '';

    contentContainer.appendChild(videoElement);
    contentContainer.appendChild(videoText);
    boxCoursElements.appendChild(videoPlayerTitle);
    boxCoursElements.appendChild(contentContainer);
    videoContainer.appendChild(boxCoursElements);
    containerElement_video.appendChild(videoContainer);

    const videoCreateRight = document.createElement('div');
    videoCreateRight.className = 'video-create-right';

    function createInputContainer(labelText, inputId, placeholder) {
        const inputCreateContainer = document.createElement('div');
        inputCreateContainer.className = 'input-create-container';

        const textInputContainer = document.createElement('div');
        textInputContainer.className = 'text-input-container';
        const labelTextElement = document.createElement('h4');
        labelTextElement.className = 'color-opposite';
        labelTextElement.textContent = labelText + ' :';
        textInputContainer.appendChild(labelTextElement);
        inputCreateContainer.appendChild(textInputContainer);

        const inputContainer = document.createElement('div');
        inputContainer.className = 'input-container';
        const inputElement = document.createElement('input');
        inputElement.id = inputId;
        inputElement.className = 'input color-opposite';
        inputElement.name = 'text';
        inputElement.type = 'text';
        inputElement.placeholder = placeholder;
        inputContainer.appendChild(inputElement);
        inputCreateContainer.appendChild(inputContainer);

        return inputCreateContainer;
    }

    const titleInputContainer = createInputContainer(
        'Titre',
        'title-video-' + element_id,
        'ex: Vidéo chats'
    );
    videoCreateRight.appendChild(titleInputContainer);


    /* input video source choice */


    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'input-create-container';
    buttonContainer.style.justifyContent = 'center';

    const sourceButton = document.createElement('button');
    sourceButton.id = 'bouton-video-src-' + element_id;
    sourceButton.className = 'button-choose-src-url';
    sourceButton.style.backgroundColor = 'var(--main-color-dark)';
    sourceButton.textContent = 'Source';
    sourceButton.addEventListener('click', function () {
        videochangeinput(1, element_id);
    });
    buttonContainer.appendChild(sourceButton);

    const urlButton = document.createElement('button');
    urlButton.id = 'bouton-video-url-' + element_id;
    urlButton.className = 'button-choose-src-url';
    urlButton.textContent = 'Url';
    urlButton.addEventListener('click', function () {
        videochangeinput(2, element_id);
    });
    buttonContainer.appendChild(urlButton);

    videoCreateRight.appendChild(titleInputContainer);
    videoCreateRight.appendChild(buttonContainer);

    const videoSrcInput = createElementWithAttributes('div', {
        class: 'input-create-container input-create-video',
        style: 'justify-content: left; margin-left: 1vw;',
        id: 'video-src-input-' + element_id,
    });

    const textInputContainer_1 = createElementWithAttributes('div', {
        class: 'text-input-container',
    });

    const labelTextElement_1 = document.createElement('h4');
    labelTextElement_1.className = 'color-opposite';
    labelTextElement_1.textContent = 'Video source :';
    textInputContainer_1.appendChild(labelTextElement_1);
    videoSrcInput.appendChild(textInputContainer_1);

    const buttonLoadElement = document.createElement('button');
    buttonLoadElement.setAttribute('for', 'video-input');
    buttonLoadElement.id = 'custom-file-input-' + element_id;
    buttonLoadElement.className = 'button-source-input';

    const imageElement = document.createElement('img');
    imageElement.className = 'image-file-input';
    imageElement.src = 'https://cdn-icons-png.flaticon.com/512/81/81081.png';
    buttonLoadElement.appendChild(imageElement);
    videoSrcInput.appendChild(buttonLoadElement);

    const texteFileLoaded = document.createElement('p');
    texteFileLoaded.id = "text-file-loaded-" + element_id;
    texteFileLoaded.classList = "text-file-loaded color-opposite";
    texteFileLoaded.textContent = "vide";


    videoSrcInput.appendChild(texteFileLoaded);

    videoCreateRight.appendChild(videoSrcInput);


    const videoUrlInput = createElementWithAttributes('div', {
        class: 'input-create-container',
        id: 'video-url-input-' + element_id,
        style: 'display: none',
    });

    const textInputContainer_2 = createElementWithAttributes('div', {
        class: 'text-input-container',
    });

    const labelTextElement_2 = document.createElement('h4');
    labelTextElement_2.className = 'color-opposite';
    labelTextElement_2.textContent = 'Video url :';
    textInputContainer_2.appendChild(labelTextElement_2);
    videoUrlInput.appendChild(textInputContainer_2);

    const inputContainer = createElementWithAttributes('div', {
        class: 'input-container',
    });

    const urlInput = createElementWithAttributes('input', {
        id: 'create-input-src-video-' + element_id,
        class: 'input color-opposite',
        name: 'text',
        type: 'text',
        placeholder: "ex: URL de la vidéo",
    });
    inputContainer.appendChild(urlInput);
    videoUrlInput.appendChild(inputContainer);

    videoCreateRight.appendChild(videoUrlInput);


    const textInputContainer = createInputContainer(
        'Texte',
        'create-input-texte-video-' + element_id,
        "ex: Texte d'une vidéo"
    );
    const keywordInputContainer = createInputContainer(
        'Mot clé',
        'create-input-keyword-video-' + element_id,
        'ex: Math, Derive'
    );

    videoCreateRight.appendChild(textInputContainer);
    videoCreateRight.appendChild(keywordInputContainer);

    const keywordListContainer = document.createElement('ul');
    keywordListContainer.className = 'key_word_container key_word_container_created';
    keywordListContainer.id = 'key_word_container_created_' + element_id;;

    const emptyKeywords = document.createElement('p');
    emptyKeywords.className = 'color-opposite';
    emptyKeywords.style.visibility = 'visible';
    emptyKeywords.id = 'empty-keywords-' + element_id;;
    emptyKeywords.textContent = 'Aucun mot clé';
    keywordListContainer.appendChild(emptyKeywords);
    videoCreateRight.appendChild(keywordListContainer);

    const alertText = document.createElement('p');
    alertText.className = 'color-opposite';
    alertText.style.visibility = 'visible';
    alertText.style.color = 'var(--text-color)';
    alertText.style.fontStyle = 'italic';
    alertText.style.width = '80%';
    alertText.style.marginLeft = '10%';
    alertText.id = 'alert-text-' + element_id;
    alertText.textContent =
        '⚠ Certain mots peuvent être modifiés pour faciliter la recherche plus tard (si vous les tapez comme précédement ils seront trouvé)';
    videoCreateRight.appendChild(alertText);

    videoContainer.appendChild(videoCreateRight);
    containerElement_video.appendChild(videoContainer);

    Update_video_element()
}

