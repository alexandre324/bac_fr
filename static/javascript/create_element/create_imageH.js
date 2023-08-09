let imageH_choose_source_url_list = [];
let imageH_url = [];
let imageH_src = [];
const numberOfEmptyLists_imageH = 200;
for (let i = 0; i < numberOfEmptyLists_imageH; i++) {
    imageH_choose_source_url_list.push(1);
}

var imageH_choose_source_url_list_modified = JSON.stringify(imageH_choose_source_url_list);
localStorage.setItem("imageH_choose_source_url_list", imageH_choose_source_url_list_modified);


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


function Update_imageH_element() {
    const imageH_create_element = document.querySelectorAll('div.video-container');
    let list_imageH_element = [];


    for (let i = 0; i < imageH_create_element.length; i++) {
        const element = imageH_create_element[i];
        const elementId = element.getAttribute('id');

        if (elementId.startsWith('imageH-')) {
            list_imageH_element.push(imageH_create_element[i]);
        }
    }

    list_imageH_element.forEach(element_imageH => {
        imageH_box_creator_id = extractNumberFromString(element_imageH.id)
        var show_src_imageH = document.querySelector(".img-demonstration-imageH-" + imageH_box_creator_id);

        /* imageH Title */
        var inputElement_title_imageH = document.getElementById("title-imageH-" + imageH_box_creator_id);
        var show_titre_imageH = document.getElementById("titre-demonstration-imageH-" + imageH_box_creator_id);


        inputElement_title_imageH.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');
            var inputValue_texte_imageH_2 = document.getElementById("create-input-texte-imageH-" + imageH_box_creator_id).value;
            var inputValue_title_imageH = inputElement_title_imageH.value;

            if (inputValue_title_imageH.trim() === "") {
                show_titre_imageH.textContent = "";
                show_titre_imageH.style.color = primaryColor;
                show_titre_imageH.style.display = "none";

                if (inputValue_texte_imageH_2.trim() === "") {
                    show_src_imageH.style.width = "100%";
                } else {
                    show_src_imageH.style.width = "80%";
                }

            } else {
                show_titre_imageH.style.display = "flex";
                show_titre_imageH.textContent = inputValue_title_imageH;


                if (inputValue_texte_imageH_2.trim() === "") {
                    show_src_imageH.style.width = "100%";
                } else {
                    show_src_imageH.style.width = "80%";
                }

                if (primaryColor == "black") {
                    show_titre_imageH.style.color = "#474747";
                } else {
                    show_titre_imageH.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_title_imageH.addEventListener("blur", function (event) {
            change_text_color()
        });

        inputElement_title_imageH.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                show_titre_imageH.style.color = "var(--text-color)";
                inputElement_title_imageH.blur();
                change_text_color()
            }
        });

        /* imageH src */


        if (imageH_choose_source_url_list[imageH_box_creator_id - 1] == 1) {
            /* choice source */

            document.getElementById('custom-file-input-' + imageH_box_creator_id).addEventListener('click', function () {
                document.getElementById('custom-file-input-' + imageH_box_creator_id).display = "none";
                var input = document.createElement('input');
                input.type = 'file';
                input.accept = 'image/*';
                input.onchange = function (event) {
                    var file_input = event.target;
                    var file_imageH = file_input.files[0];
                    var fileName = file_imageH.name;


                    var imageHURL = URL.createObjectURL(file_imageH);
                    show_src_imageH.src = imageHURL;
                    if (fileName.length > 20) {
                        document.getElementById("text-file-loaded-" + imageH_box_creator_id).textContent = shortenFileName(fileName);
                    } else {
                        document.getElementById("text-file-loaded-" + imageH_box_creator_id).textContent = fileName;
                    }
                };
                updateJsonFile();
                input.click();
            });


        } else {
            /* choice url */

            var inputElement_src_imageH = document.getElementById("create-input-src-imageH-" + imageH_box_creator_id);

            inputElement_src_imageH.addEventListener("input", function (event) {
                rootStyles = getComputedStyle(document.documentElement);
                primaryColor = rootStyles.getPropertyValue('--text-color');

                var inputValue_src_imageH = inputElement_src_imageH.value;
                if (inputValue_src_imageH.trim() === "") {
                    show_src_imageH.src = "";
                } else {
                    show_src_imageH.src = inputValue_src_imageH;
                }
            });

            inputElement_src_imageH.addEventListener("keydown", function (event) {
                if (event.keyCode === 13) {
                    show_src_imageH.style.color = "var(--text-color)";
                    inputElement_src_imageH.blur();
                    updateJsonFile();
                }
            });
        }

        /* imageH texte */

        var inputElement_texte_imageH = document.getElementById("create-input-texte-imageH-" + imageH_box_creator_id);
        var show_texte_imageH = document.getElementById("texte-demonstration-imageH-" + imageH_box_creator_id);

        inputElement_texte_imageH.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_texte_imageH = inputElement_texte_imageH.value;
            var inputValue_title_imageH_2 = document.getElementById("title-imageH-" + imageH_box_creator_id).value;

            if (inputValue_texte_imageH.trim() === "") {
                show_texte_imageH.textContent = "";
                show_texte_imageH.style.display = "none";

                show_src_imageH.style.width = "100%";
                if (inputValue_title_imageH_2.trim() === "") {
                    show_src_imageH.style.marginTop = "0px";

                } else {
                    show_src_imageH.style.marginTop = "-10%";
                }

            } else {
                show_texte_imageH.textContent = inputValue_texte_imageH;
                show_texte_imageH.style.display = "flex";

                if (inputValue_title_imageH_2.trim() === "") {
                    show_src_imageH.style.marginTop = "0px";
                    show_src_imageH.style.width = "80%";
                } else {
                    show_src_imageH.style.marginTop = "Opx";
                    show_src_imageH.style.width = "80%";
                }

                if (primaryColor == "black") {
                    show_texte_imageH.style.color = "#474747";
                } else {
                    show_texte_imageH.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_texte_imageH.addEventListener("blur", function (event) {
            show_texte_imageH.style.color = "var(--text-color)";
            updateJsonFile();
        });

        inputElement_texte_imageH.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                inputElement_texte_imageH.blur();
            }
        });

        /* imageH keywords */
        var inputElement_keyword_imageH = document.getElementById("create-input-keyword-imageH-" + imageH_box_creator_id);

        load_keywords_elements_created(imageH_box_creator_id)

        inputElement_keyword_imageH.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                var keyword_imageH = inputElement_keyword_imageH.value;

                const cleaned_keyword_imageH = keyword_imageH.replace(/[^\w]/gi, '').replace(/\s+/g, '');

                const lower_cleaned_keyword_imageH = cleaned_keyword_imageH.toLowerCase();

                document.getElementById("alert-text-" + imageH_box_creator_id).style.visibility = "visible";

                if (keyword_imageH.trim() != "") {
                    if (!keywords_list_created[imageH_box_creator_id - 1].includes(lower_cleaned_keyword_imageH)) {
                        keywords_list_created[imageH_box_creator_id - 1].push(lower_cleaned_keyword_imageH);
                        var keywords_list_created_modified = JSON.stringify(keywords_list_created);

                        localStorage.setItem("keyword_elements", keywords_list_created_modified);
                        updateJsonFile();
                        load_keywords_elements_created(imageH_box_creator_id)
                    } else {
                        alert("Déjà dans la liste !")
                    }
                }
                inputElement_keyword_imageH.value = "";
            }

        });
    });
}

Update_imageH_element()

function imageHchangeinput(input_imageH_type, imageH_input_id) {
    document.getElementById("imageH-create-" + imageH_input_id).src = ""; if (input_imageH_type == 1) {
        imageH_choose_source_url_list[imageH_input_id - 1] = 1;
        document.getElementById("bouton-imageH-src-" + imageH_input_id).style.backgroundColor = "var(--main-color-dark)";
        document.getElementById("bouton-imageH-url-" + imageH_input_id).style.backgroundColor = "var(--main-color)";
        document.getElementById("imageH-src-input-" + imageH_input_id).style.display = "flex";
        document.getElementById("imageH-url-input-" + imageH_input_id).style.display = "none";
    } else {
        imageH_choose_source_url_list[imageH_input_id - 1] = 2;
        document.getElementById("bouton-imageH-url-" + imageH_input_id).style.backgroundColor = "var(--main-color-dark)";
        document.getElementById("bouton-imageH-src-" + imageH_input_id).style.backgroundColor = "var(--main-color)";
        document.getElementById("imageH-src-input-" + imageH_input_id).style.display = "none";
        document.getElementById("imageH-url-input-" + imageH_input_id).style.display = "flex";
    }

    var imageH_choose_source_url_list_modified = JSON.stringify(imageH_choose_source_url_list);
    localStorage.setItem("imageH_choose_source_url_list", imageH_choose_source_url_list_modified);

    Update_imageH_element();
}


function create_imageH_element() {
    const containerElement = document.getElementById('main-container');

    list_element_created.push("imageH");

    const imageBox = document.createElement('div');
    imageBox.className = 'imageH-container-titre';

    const heading = document.createElement('h3');
    heading.className = 'color-opposite';
    heading.textContent = element_id + ') Image Horizontale';

    const iconImg = document.createElement('img');
    iconImg.src = 'https://cdn-icons-png.flaticon.com/512/1829/1829586.png';

    heading.appendChild(iconImg);
    imageBox.appendChild(heading);
    containerElement.appendChild(imageBox);

    const imageContainer = createElementWithAttributes('div', {
        class: 'video-container element-create-part',
        id: 'imageH-' + element_id,
    });

    const boxCoursElements = createElementWithAttributes('div', {
        class: 'box-cours-elements video-player img_full show_cours',
        id: 'box-cours-elements-' + element_id,
        style: 'display: flex; justify- content: center; align-items: center; flex-direction: column;',
    });

    const h2Element = createElementWithAttributes('h2', {
        class: 'cours-element color-opposite',
        id: 'titre-demonstration-imageH-' + element_id,
        style: 'display: none',
    });
    boxCoursElements.appendChild(h2Element);

    const contentContainer = createElementWithAttributes('div', {
        class: 'img_full_container_' + element_id + ' content-full-screen',
        style: 'height: 100%; width: 100%; overflow-y: scroll;'

    });

    const imageElement = createElementWithAttributes('img', {
        style: 'background: none; width: 100%; max-height: 100%',
        class: 'cours-element img-button img-demonstration-imageH-' + element_id,
        id: 'imageH-create-' + element_id,
        src: '',
    });

    const pElement = createElementWithAttributes('p', {
        class: 'cours-element',
        id: 'texte-demonstration-imageH-' + element_id,
        style: 'background: var(--main-color-light); display: none; width: 80%;'
    });

    contentContainer.appendChild(imageElement);
    contentContainer.appendChild(pElement);
    boxCoursElements.appendChild(contentContainer);
    imageContainer.appendChild(boxCoursElements);
    containerElement.appendChild(imageContainer);

    const imageHCreateRight = createElementWithAttributes('div', {
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

    const titleInputContainer = createInputContainer('Titre', 'title-imageH-' + element_id, 'ex: Vidéo chats');
    const textInputContainer = createInputContainer('Texte', 'create-input-texte-imageH-' + element_id, "ex: Texte d'une vidéo");
    const keywordInputContainer = createInputContainer('Mot clé', 'create-input-keyword-imageH-' + element_id, 'ex: Math, Derive');

    imageHCreateRight.appendChild(titleInputContainer);


    /* start imageH input */

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'input-create-container';
    buttonContainer.style.justifyContent = 'center';

    const sourceButton = document.createElement('button');
    sourceButton.id = 'bouton-imageH-src-' + element_id;
    sourceButton.className = 'button-choose-src-url';
    sourceButton.style.backgroundColor = 'var(--main-color-dark)';
    sourceButton.textContent = 'Source';
    sourceButton.addEventListener('click', function () {
        imageHchangeinput(1, element_id);

    });
    buttonContainer.appendChild(sourceButton);

    const urlButton = document.createElement('button');
    urlButton.id = 'bouton-imageH-url-' + element_id;
    urlButton.className = 'button-choose-src-url';
    urlButton.textContent = 'Url';
    urlButton.addEventListener('click', function () {
        imageHchangeinput(2, element_id);
    });
    buttonContainer.appendChild(urlButton);

    imageHCreateRight.appendChild(titleInputContainer);
    imageHCreateRight.appendChild(buttonContainer);

    const imageHSrcInput = createElementWithAttributes('div', {
        class: 'input-create-container input-create-imageH',
        style: 'justify-content: left; margin-left: 1vw;',
        id: 'imageH-src-input-' + element_id,
    });

    const textInputContainer_1 = createElementWithAttributes('div', {
        class: 'text-input-container',
    });

    const labelTextElement_1 = document.createElement('h4');
    labelTextElement_1.className = 'color-opposite';
    labelTextElement_1.textContent = 'Image source :';
    textInputContainer_1.appendChild(labelTextElement_1);
    imageHSrcInput.appendChild(textInputContainer_1);

    const buttonLoadElement = document.createElement('button');
    buttonLoadElement.setAttribute('for', 'imageH-input');
    buttonLoadElement.setAttribute('class', 'button-source-input');
    buttonLoadElement.id = 'custom-file-input-' + element_id;

    const imageElement2 = document.createElement('img');
    imageElement2.className = 'image-file-input';
    imageElement2.src = 'https://cdn-icons-png.flaticon.com/512/81/81081.png';
    buttonLoadElement.appendChild(imageElement2);
    imageHSrcInput.appendChild(buttonLoadElement);

    const texteFileLoaded = document.createElement('p');
    texteFileLoaded.id = "text-file-loaded-" + element_id;
    texteFileLoaded.classList = "text-file-loaded color-opposite";
    texteFileLoaded.textContent = "vide";


    imageHSrcInput.appendChild(texteFileLoaded);

    imageHCreateRight.appendChild(imageHSrcInput);



    const imageHUrlInput = createElementWithAttributes('div', {
        class: 'input-create-container',
        id: 'imageH-url-input-' + element_id,
        style: 'display: none',
    });

    const textInputContainer_2 = createElementWithAttributes('div', {
        class: 'text-input-container',
    });

    const labelTextElement_2 = document.createElement('h4');
    labelTextElement_2.className = 'color-opposite';
    labelTextElement_2.textContent = 'Image url :';
    textInputContainer_2.appendChild(labelTextElement_2);
    imageHUrlInput.appendChild(textInputContainer_2);

    const inputContainer = createElementWithAttributes('div', {
        class: 'input-container',
    });

    const urlInput = createElementWithAttributes('input', {
        id: 'create-input-src-imageH-' + element_id,
        class: 'input color-opposite',
        name: 'text',
        type: 'text',
        placeholder: "ex: URL de la vidéo",
    });
    inputContainer.appendChild(urlInput);
    imageHUrlInput.appendChild(inputContainer);

    imageHCreateRight.appendChild(imageHUrlInput);

    /* end imageH input */


    imageHCreateRight.appendChild(textInputContainer);
    imageHCreateRight.appendChild(keywordInputContainer);

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
    imageHCreateRight.appendChild(keywordListContainer);

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
    imageHCreateRight.appendChild(alertText);

    imageContainer.appendChild(imageHCreateRight);
    containerElement.appendChild(imageContainer);

    Update_imageH_element();
}



