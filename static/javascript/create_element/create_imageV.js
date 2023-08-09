let imageV_choose_source_url_list = [];
let imageV_url = [];
let imageV_src = [];
const numberOfEmptyLists_imageV = 200;
for (let i = 0; i < numberOfEmptyLists_imageV; i++) {
    imageV_choose_source_url_list.push(1);
    imageV_src.push("");
    imageV_url.push("");
}

var imageV_choose_source_url_list_modified = JSON.stringify(imageV_choose_source_url_list);
localStorage.setItem("imageV_choose_source_url_list", imageV_choose_source_url_list_modified);

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


function Update_imageV_element() {
    const imageV_create_element = document.querySelectorAll('div.video-container');
    let list_imageV_element = [];


    for (let i = 0; i < imageV_create_element.length; i++) {
        const element = imageV_create_element[i];
        const elementId = element.getAttribute('id');

        if (elementId.startsWith('imageV-')) {
            list_imageV_element.push(imageV_create_element[i]);
        }
    }

    list_imageV_element.forEach(element_imageV => {
        imageV_box_creator_id = extractNumberFromString(element_imageV.id)
        var show_src_imageV = document.querySelector(".img-demonstration-imageV-" + imageV_box_creator_id);

        /* imageV Title */
        var inputElement_title_imageV = document.getElementById("title-imageV-" + imageV_box_creator_id);
        var show_titre_imageV = document.getElementById("titre-demonstration-imageV-" + imageV_box_creator_id);


        inputElement_title_imageV.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');
            var inputValue_texte_imageV_2 = document.getElementById("create-input-texte-imageV-" + imageV_box_creator_id).value;
            var inputValue_title_imageV = inputElement_title_imageV.value;

            if (inputValue_title_imageV.trim() === "") {
                show_titre_imageV.textContent = "";
                show_titre_imageV.style.color = primaryColor;


                if (inputValue_texte_imageV_2.trim() === "") {
                    show_titre_imageV.style.display = "none";
                    show_src_imageV.style.height = "90%";
                    document.getElementsByClassName("img_full_container_" + imageV_box_creator_id)[0].style.height = "100%";
                } else {
                    show_titre_imageV.style.display = "none";
                    show_src_imageV.style.height = "100%";
                    document.getElementsByClassName("img_full_container_" + imageV_box_creator_id)[0].style.height = "80%";
                }

            } else {
                show_titre_imageV.textContent = inputValue_title_imageV;

                if (inputValue_texte_imageV_2.trim() === "") {
                    show_titre_imageV.style.display = "flex";
                    show_src_imageV.style.height = "100%";
                    document.getElementsByClassName("img_full_container_" + imageV_box_creator_id)[0].style.height = "80%";
                } else {
                    show_titre_imageV.style.display = "block";
                    show_src_imageV.style.height = "80%";
                    document.getElementsByClassName("img_full_container_" + imageV_box_creator_id)[0].style.height = "80%";
                }

                if (primaryColor == "black") {
                    show_titre_imageV.style.color = "#474747";
                } else {
                    show_titre_imageV.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_title_imageV.addEventListener("blur", function (event) {
            change_text_color()
            updateJsonFile();
        });

        inputElement_title_imageV.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                inputElement_title_imageV.blur();
            }
        });

        /* imageV src */


        if (imageV_choose_source_url_list[imageV_box_creator_id - 1] == 1) {
            /* choice source */

            document.getElementById('custom-file-input-' + imageV_box_creator_id).addEventListener('click', function () {
                document.getElementById('custom-file-input-' + imageV_box_creator_id).display = "none";
                var input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = function (event) {
                    var file_imageV = event.target.files[0];
                    var fileName = file_imageV.name;
                    var imageVURL = URL.createObjectURL(file_imageV);
                    show_src_imageV.src = imageVURL;
                    imageV_src[imageV_box_creator_id - 1] = imageVURL;
                    if (fileName.length > 20) {
                        document.getElementById("text-file-loaded-" + imageV_box_creator_id).textContent = shortenFileName(fileName);
                    } else {
                        document.getElementById("text-file-loaded-" + imageV_box_creator_id).textContent = fileName;
                    }

                };
                updateJsonFile();
                input.click();
            });


        } else {
            /* choice url */

            var inputElement_src_imageV = document.getElementById("create-input-src-imageV-" + imageV_box_creator_id);

            inputElement_src_imageV.addEventListener("input", function (event) {
                rootStyles = getComputedStyle(document.documentElement);
                primaryColor = rootStyles.getPropertyValue('--text-color');

                var inputValue_src_imageV = inputElement_src_imageV.value;
                if (inputValue_src_imageV.trim() === "") {
                    show_src_imageV.src = "";
                } else {
                    show_src_imageV.src = inputValue_src_imageV;
                    imageV_url[imageV_box_creator_id - 1] = inputValue_src_imageV;
                }
            });

            inputElement_src_imageV.addEventListener("keydown", function (event) {
                if (event.keyCode === 13) {
                    show_src_imageV.style.color = "var(--text-color)";
                    inputElement_src_imageV.blur();
                    updateJsonFile();
                }
            });
        }

        /* imageVs texte */

        var inputElement_texte_imageV = document.getElementById("create-input-texte-imageV-" + imageV_box_creator_id);
        var show_texte_imageV = document.getElementById("texte-demonstration-imageV-" + imageV_box_creator_id);

        inputElement_texte_imageV.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_texte_imageV = inputElement_texte_imageV.value;
            var inputValue_title_imageV_2 = document.getElementById("title-imageV-" + imageV_box_creator_id).value;

            if (inputValue_texte_imageV.trim() === "") {
                show_texte_imageV.textContent = "";
                show_texte_imageV.style.display = "none";


                if (inputValue_title_imageV_2.trim() === "") {
                    show_titre_imageV.style.display = "none";
                    show_src_imageV.style.height = "90%";
                    document.getElementsByClassName("img_full_container_" + imageV_box_creator_id)[0].style.height = "100%";
                } else {
                    show_titre_imageV.style.display = "flex";
                    show_src_imageV.style.height = "100%";
                    document.getElementsByClassName("img_full_container_" + imageV_box_creator_id)[0].style.height = "80%";
                }

            } else {
                show_texte_imageV.textContent = inputValue_texte_imageV;
                show_texte_imageV.style.display = "flex";

                if (inputValue_title_imageV_2.trim() === "") {
                    show_titre_imageV.style.display = "none";
                    show_src_imageV.style.height = "100%";
                    document.getElementsByClassName("img_full_container_" + imageV_box_creator_id)[0].style.height = "80%";
                } else {
                    show_titre_imageV.style.display = "block";
                    show_src_imageV.style.height = "80%";
                    document.getElementsByClassName("img_full_container_" + imageV_box_creator_id)[0].style.height = "80%";
                }

                if (primaryColor == "black") {
                    show_texte_imageV.style.color = "#474747";
                } else {
                    show_texte_imageV.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_texte_imageV.addEventListener("blur", function (event) {
            show_texte_imageV.style.color = "var(--text-color)";
            updateJsonFile();
        });

        inputElement_texte_imageV.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                inputElement_texte_imageV.blur();
            }
        });

        /* imageV keywords */
        var inputElement_keyword_imageV = document.getElementById("create-input-keyword-imageV-" + imageV_box_creator_id);

        load_keywords_elements_created(imageV_box_creator_id)

        inputElement_keyword_imageV.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                var keyword_imageV = inputElement_keyword_imageV.value;

                const cleaned_keyword_imageV = keyword_imageV.replace(/[^\w]/gi, '').replace(/\s+/g, '');

                const lower_cleaned_keyword_imageV = cleaned_keyword_imageV.toLowerCase();

                document.getElementById("alert-text-" + imageV_box_creator_id).style.visibility = "visible";

                if (keyword_imageV.trim() != "") {
                    if (!keywords_list_created[imageV_box_creator_id - 1].includes(lower_cleaned_keyword_imageV)) {
                        keywords_list_created[imageV_box_creator_id - 1].push(lower_cleaned_keyword_imageV);
                        var keywords_list_created_modified = JSON.stringify(keywords_list_created);

                        localStorage.setItem("keyword_elements", keywords_list_created_modified);
                        updateJsonFile();
                        load_keywords_elements_created(imageV_box_creator_id)
                    } else {
                        alert("Déjà dans la liste !")
                    }
                }
                inputElement_keyword_imageV.value = "";
            }

        });
    });
}

Update_imageV_element()

function imageVchangeinput(input_imageV_type, imageV_input_id) {

    if (input_imageV_type == 1) {
        imageV_choose_source_url_list[imageV_input_id - 1] = 1;
        document.getElementById("bouton-imageV-src-" + imageV_input_id).style.backgroundColor = "var(--main-color-dark)";
        document.getElementById("bouton-imageV-url-" + imageV_input_id).style.backgroundColor = "var(--main-color)";
        document.getElementById("imageV-src-input-" + imageV_input_id).style.display = "flex";
        document.getElementById("imageV-url-input-" + imageV_input_id).style.display = "none";

        var imageVURL_2 = imageV_src[imageV_input_id - 1]
        document.getElementById("imageV-create-" + imageV_input_id).src = imageVURL_2;
    } else {
        imageV_choose_source_url_list[imageV_input_id - 1] = 2;
        document.getElementById("bouton-imageV-url-" + imageV_input_id).style.backgroundColor = "var(--main-color-dark)";
        document.getElementById("bouton-imageV-src-" + imageV_input_id).style.backgroundColor = "var(--main-color)";
        document.getElementById("imageV-src-input-" + imageV_input_id).style.display = "none";
        document.getElementById("imageV-url-input-" + imageV_input_id).style.display = "flex";

        var inputValue_src_imageV_2 = imageV_url[imageV_input_id - 1]
        document.getElementById("imageV-create-" + imageV_input_id).src = inputValue_src_imageV_2;
    }

    var imageV_choose_source_url_list_modified = JSON.stringify(imageV_choose_source_url_list);
    localStorage.setItem("imageV_choose_source_url_list", imageV_choose_source_url_list_modified);

    Update_imageV_element();
}


function create_imageV_element() {
    const containerElement = document.getElementById('main-container');

    list_element_created.push("imageV");

    const imageBox = document.createElement('div');
    imageBox.className = 'imageV-container-titre';

    const heading = document.createElement('h3');
    heading.className = 'color-opposite';
    heading.textContent = element_id + ') Image Verticale';

    const iconImg = document.createElement('img');
    iconImg.src = 'https://cdn-icons-png.flaticon.com/512/3342/3342203.png';

    heading.appendChild(iconImg);
    imageBox.appendChild(heading);
    containerElement.appendChild(imageBox);

    const imageContainer = createElementWithAttributes('div', {
        class: 'video-container element-create-part',
        id: 'imageV-' + element_id,
    });

    const boxCoursElements = createElementWithAttributes('div', {
        class: 'box-cours-elements video-player img_full show_cours',
        id: 'box-cours-elements-' + element_id,
        style: 'display: flex; justify-content: center; align-items: center; flex-direction: column; padding: 0px;',
    });

    const h2Element = createElementWithAttributes('h2', {
        class: 'cours-element color-opposite',
        id: 'titre-demonstration-imageV-' + element_id,
        style: 'display: none',
    });
    boxCoursElements.appendChild(h2Element);

    const contentContainer = createElementWithAttributes('div', {
        class: 'img_full_container_' + element_id + ' content-full-screen',
        style: 'height: 100%;'
    });

    const imageElement = createElementWithAttributes('img', {
        style: 'height: fit-content; height: 90%; margin-top: 5%; background: none; max-width: 100%',
        class: 'cours-element img-button img-demonstration-imageV-' + element_id,
        id: 'imageV-create-' + element_id,
        src: '',
    });

    const pElement = createElementWithAttributes('p', {
        class: 'cours-element',
        id: 'texte-demonstration-imageV-' + element_id,
        style: 'background: var(--main-color-light); display: none; width: 80%;'
    });

    contentContainer.appendChild(imageElement);
    contentContainer.appendChild(pElement);
    boxCoursElements.appendChild(contentContainer);
    imageContainer.appendChild(boxCoursElements);
    containerElement.appendChild(imageContainer);

    const imageVCreateRight = createElementWithAttributes('div', {
        class: 'video-create-right'
    });

    function createInputContainer(labelText, inputId, placeholder) {
        const inputCreateContainer = createElementWithAttributes('div', {
            class: 'input-create-container'
        });

        const textInputContainer = createElementWithAttributes('div', {
            class: 'text-input-container'
        });
        const labelTextElement = document.createElement('h4');
        labelTextElement.className = 'color-opposite';
        labelTextElement.textContent = labelText + ' :';
        textInputContainer.appendChild(labelTextElement);
        inputCreateContainer.appendChild(textInputContainer);

        const inputContainer = createElementWithAttributes('div', {
            class: 'input-container'
        });
        const inputElement = createElementWithAttributes('input', {
            id: inputId,
            class: 'input color-opposite',
            name: 'text',
            type: 'text',
            placeholder: placeholder
        });
        inputContainer.appendChild(inputElement);
        inputCreateContainer.appendChild(inputContainer);

        return inputCreateContainer;
    }

    const titleInputContainer = createInputContainer('Titre', 'title-imageV-' + element_id, 'ex: Vidéo chats');
    const textInputContainer = createInputContainer('Texte', 'create-input-texte-imageV-' + element_id, "ex: Texte d'une vidéo");
    const keywordInputContainer = createInputContainer('Mot clé', 'create-input-keyword-imageV-' + element_id, 'ex: Math, Derive');

    imageVCreateRight.appendChild(titleInputContainer);


    /* start imageV input */

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'input-create-container';
    buttonContainer.style.justifyContent = 'center';

    const sourceButton = document.createElement('button');
    sourceButton.id = 'bouton-imageV-src-' + element_id;
    sourceButton.className = 'button-choose-src-url';
    sourceButton.style.backgroundColor = 'var(--main-color-dark)';
    sourceButton.textContent = 'Source';
    sourceButton.addEventListener('click', function () {
        imageVchangeinput(1, element_id);

    });
    buttonContainer.appendChild(sourceButton);

    const urlButton = document.createElement('button');
    urlButton.id = 'bouton-imageV-url-' + element_id;
    urlButton.className = 'button-choose-src-url';
    urlButton.textContent = 'Url';
    urlButton.addEventListener('click', function () {
        imageVchangeinput(2, element_id);
    });
    buttonContainer.appendChild(urlButton);

    imageVCreateRight.appendChild(titleInputContainer);
    imageVCreateRight.appendChild(buttonContainer);

    const imageVSrcInput = createElementWithAttributes('div', {
        class: 'input-create-container input-create-imageV',
        style: 'justify-content: left; margin-left: 1vw;',
        id: 'imageV-src-input-' + element_id,
    });

    const textInputContainer_1 = createElementWithAttributes('div', {
        class: 'text-input-container',
    });

    const labelTextElement_1 = document.createElement('h4');
    labelTextElement_1.className = 'color-opposite';
    labelTextElement_1.textContent = 'Image source :';
    textInputContainer_1.appendChild(labelTextElement_1);
    imageVSrcInput.appendChild(textInputContainer_1);

    const buttonLoadElement = document.createElement('button');
    buttonLoadElement.setAttribute('for', 'imageV-input');
    buttonLoadElement.setAttribute('class', 'button-source-input');
    buttonLoadElement.id = 'custom-file-input-' + element_id;

    const imageElement2 = document.createElement('img');
    imageElement2.className = 'image-file-input';
    imageElement2.src = 'https://cdn-icons-png.flaticon.com/512/81/81081.png';
    buttonLoadElement.appendChild(imageElement2);
    imageVSrcInput.appendChild(buttonLoadElement);

    const texteFileLoaded = document.createElement('p');
    texteFileLoaded.id = "text-file-loaded-" + element_id;
    texteFileLoaded.classList = "text-file-loaded";
    texteFileLoaded.textContent = "vide";


    imageVSrcInput.appendChild(texteFileLoaded);

    imageVCreateRight.appendChild(imageVSrcInput);



    const imageVUrlInput = createElementWithAttributes('div', {
        class: 'input-create-container',
        id: 'imageV-url-input-' + element_id,
        style: 'display: none',
    });

    const textInputContainer_2 = createElementWithAttributes('div', {
        class: 'text-input-container',
    });

    const labelTextElement_2 = document.createElement('h4');
    labelTextElement_2.className = 'color-opposite';
    labelTextElement_2.textContent = 'Image url :';
    textInputContainer_2.appendChild(labelTextElement_2);
    imageVUrlInput.appendChild(textInputContainer_2);

    const inputContainer = createElementWithAttributes('div', {
        class: 'input-container',
    });

    const urlInput = createElementWithAttributes('input', {
        id: 'create-input-src-imageV-' + element_id,
        class: 'input color-opposite',
        name: 'text',
        type: 'text',
        placeholder: "ex: URL de la vidéo",
    });
    inputContainer.appendChild(urlInput);
    imageVUrlInput.appendChild(inputContainer);

    imageVCreateRight.appendChild(imageVUrlInput);

    /* end imageV input */


    imageVCreateRight.appendChild(textInputContainer);
    imageVCreateRight.appendChild(keywordInputContainer);

    const keywordListContainer = createElementWithAttributes('ul', {
        class: 'key_word_container key_word_container_created',
        id: 'key_word_container_created_' + element_id,
    });

    const emptyKeywords = createElementWithAttributes('p', {
        class: 'color-opposite',
        id: 'empty-keywords-' + element_id,
    });
    emptyKeywords.style.display = 'block';
    emptyKeywords.textContent = 'Aucun mot clé';
    keywordListContainer.appendChild(emptyKeywords);
    imageVCreateRight.appendChild(keywordListContainer);

    const alertText = createElementWithAttributes('p', {
        class: 'color-opposite',
        id: 'alert-text-' + element_id,
    });
    alertText.style.display = 'block';
    alertText.style.color = 'var(--text-color)';
    alertText.style.fontStyle = 'italic';
    alertText.style.width = '80%';
    alertText.style.marginLeft = '10%';
    alertText.textContent =
        '⚠ Certain mots peuvent être modifiés pour faciliter la recherche plus tard (si vous les tapez comme précédemment ils seront trouvés)';
    imageVCreateRight.appendChild(alertText);

    imageContainer.appendChild(imageVCreateRight);
    containerElement.appendChild(imageContainer);

    Update_imageV_element();
}


window.addEventListener("beforeunload", function (event) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("imageV-url-")) {
            localStorage.removeItem(key);
        }
    }

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("imageV-src-")) {
            localStorage.removeItem(key);
        }
    }
});

