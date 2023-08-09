
function Update_texte_element() {

    const texte_create_element = document.querySelectorAll('div.video-container');
    let list_texte_element = [];

    for (let i = 0; i < texte_create_element.length; i++) {
        const element = texte_create_element[i];
        const elementId = element.getAttribute('id');

        if (elementId.startsWith('texte-')) {
            list_texte_element.push(texte_create_element[i]);
        }
    }

    list_texte_element.forEach(element_texte => {
        texte_box_creator_id = extractNumberFromString(element_texte.id)

        /* Texte Title */
        var inputElement_title_texte = document.getElementById("title-texte-" + texte_box_creator_id);
        var show_titre_texte = document.getElementById("titre-demonstration-texte-" + texte_box_creator_id);

        inputElement_title_texte.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_title_texte = inputElement_title_texte.value;
            if (inputValue_title_texte.trim() === "") {
                show_titre_texte.textContent = "";
                show_titre_texte.style.color = primaryColor;
            } else {
                show_titre_texte.textContent = inputValue_title_texte;
                if (primaryColor == "black") {
                    show_titre_texte.style.color = "#474747";
                } else {
                    show_titre_texte.style.color = "#c9c9c9";
                }
            }
        });

        inputElement_title_texte.addEventListener("blur", function (event) {
            change_text_color()
        });

        inputElement_title_texte.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                show_titre_texte.style.color = "var(--text-color)";
                inputElement_title_texte.blur();
                change_text_color()
            }
        });

        /* Texte 1 */

        var inputElement_texte_first = document.getElementById("create-input-texte-first-" + texte_box_creator_id);
        var show_texte_first = document.getElementById("first-texte-demonstration-" + texte_box_creator_id);

        inputElement_texte_first.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_texte_texte = inputElement_texte_first.value;
            if (inputValue_texte_texte.trim() === "") {
                show_texte_first.style.display = "none";
            } else {
                show_texte_first.textContent = inputValue_texte_texte;
                show_texte_first.style.display = "flex";
                if (primaryColor == "black") {
                    show_texte_first.style.color = "#474747";
                } else {
                    show_texte_first.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_texte_first.addEventListener("blur", function (event) {
            show_texte_first.style.color = "var(--text-color)";
        });

        inputElement_texte_first.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                show_texte_first.style.color = "var(--text-color)";
                inputElement_texte_first.blur();
            }
        });

        /* Texte 2 */

        var inputElement_texte_second = document.getElementById("create-input-texte-second-" + texte_box_creator_id);
        var show_texte_second = document.getElementById("second-texte-demonstration-" + texte_box_creator_id);

        inputElement_texte_second.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_texte_second = inputElement_texte_second.value;
            if (inputValue_texte_second.trim() === "") {
                show_texte_second.style.display = "none";
            } else {
                show_texte_second.textContent = inputValue_texte_second;
                show_texte_second.style.display = "flex";
                if (primaryColor == "black") {
                    show_texte_second.style.color = "#474747";
                } else {
                    show_texte_second.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_texte_second.addEventListener("blur", function (event) {
            show_texte_second.style.color = "var(--text-color)";
        });

        inputElement_texte_second.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                show_texte_second.style.color = "var(--text-color)";
                inputElement_texte_second.blur();
            }
        });

        /* Texte 3 */

        var inputElement_texte_third = document.getElementById("create-input-texte-third-" + texte_box_creator_id);
        var show_texte_third = document.getElementById("third-texte-demonstration-" + texte_box_creator_id);

        inputElement_texte_third.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_texte_third = inputElement_texte_third.value;
            if (inputValue_texte_third.trim() === "") {
                show_texte_third.style.display = "none";
            } else {
                show_texte_third.textContent = inputValue_texte_third;
                show_texte_third.style.display = "flex";
                if (primaryColor == "black") {
                    show_texte_third.style.color = "#474747";
                } else {
                    show_texte_third.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_texte_third.addEventListener("blur", function (event) {
            show_texte_third.style.color = "var(--text-color)";
        });

        inputElement_texte_third.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                show_texte_third.style.color = "var(--text-color)";
                inputElement_texte_third.blur();
            }
        });

        /* Texte 4 */

        var inputElement_texte_fourth = document.getElementById("create-input-texte-fourth-" + texte_box_creator_id);
        var show_texte_fourth = document.getElementById("fourth-texte-demonstration-" + texte_box_creator_id);

        inputElement_texte_fourth.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_texte_fourth = inputElement_texte_fourth.value;
            if (inputValue_texte_fourth.trim() === "") {
                show_texte_fourth.style.display = "none";
            } else {
                show_texte_fourth.textContent = inputValue_texte_fourth;
                show_texte_fourth.style.display = "flex";
                if (primaryColor == "black") {
                    show_texte_fourth.style.color = "#474747";
                } else {
                    show_texte_fourth.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_texte_fourth.addEventListener("blur", function (event) {
            show_texte_fourth.style.color = "var(--text-color)";
        });

        inputElement_texte_fourth.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                show_texte_fourth.style.color = "var(--text-color)";
                inputElement_texte_fourth.blur();
            }
        });

        /* Texte 5 */

        var inputElement_texte_fifth = document.getElementById("create-input-texte-fifth-" + texte_box_creator_id);
        var show_texte_fifth = document.getElementById("fifth-texte-demonstration-" + texte_box_creator_id);

        inputElement_texte_fifth.addEventListener("input", function (event) {
            rootStyles = getComputedStyle(document.documentElement);
            primaryColor = rootStyles.getPropertyValue('--text-color');

            var inputValue_texte_fifth = inputElement_texte_fifth.value;
            if (inputValue_texte_fifth.trim() === "") {
                show_texte_fifth.textContent = "";
                show_texte_fifth.style.background = "none";
                show_texte_fifth.style.display = "none";
            } else {
                show_texte_fifth.textContent = inputValue_texte_fifth;
                show_texte_fifth.style.background = "var(--main-color)";
                show_texte_fifth.style.display = "flex";
                if (primaryColor == "black") {
                    show_texte_fifth.style.color = "#474747";
                } else {
                    show_texte_fifth.style.color = "#c9c9c9";
                }

            }
        });

        inputElement_texte_fifth.addEventListener("blur", function (event) {
            show_texte_fifth.style.color = "var(--text-color)";
        });

        inputElement_texte_fifth.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                show_texte_fifth.style.color = "var(--text-color)";
                inputElement_texte_fifth.blur();
            }
        });

        /* texte keywords */
        var inputElement_keyword_texte = document.getElementById("create-input-keyword-texte-" + texte_box_creator_id);

        load_keywords_elements_created(texte_box_creator_id)

        inputElement_keyword_texte.addEventListener("keydown", function (event) {
            if (event.keyCode === 13) {
                var keyword_texte = inputElement_keyword_texte.value;

                const cleaned_keyword_texte = keyword_texte.replace(/[^\w]/gi, '').replace(/\s+/g, '');

                const lower_cleaned_keyword_texte = cleaned_keyword_texte.toLowerCase();

                document.getElementById("alert-text-" + texte_box_creator_id).style.visibility = "visible";

                if (keyword_texte.trim() != "") {
                    if (!keywords_list_created[texte_box_creator_id - 1].includes(lower_cleaned_keyword_texte)) {
                        keywords_list_created[texte_box_creator_id - 1].push(lower_cleaned_keyword_texte);
                        var keywords_list_created_modified = JSON.stringify(keywords_list_created);
                        localStorage.setItem("keyword_elements", keywords_list_created_modified);

                        load_keywords_elements_created(texte_box_creator_id)
                    } else {
                        alert("Déjà dans la liste !")
                    }
                }
                inputElement_keyword_texte.value = "";
            }

        });
    });
}


Update_texte_element();

function create_texte_element(containerElement) {
    const containerElement_text = document.getElementById('main-container');

    list_element_created.push("text")

    const textContainerTitle = document.createElement('div');

    const titleHeading = document.createElement('h3');
    titleHeading.className = 'color-opposite';
    titleHeading.textContent = element_id + ') Texte ';

    const titleIconImg = document.createElement('img');
    titleIconImg.src =
        '   https://cdn-icons-png.flaticon.com/512/4021/4021726.png ';

    titleHeading.appendChild(titleIconImg);
    textContainerTitle.appendChild(titleHeading);
    containerElement_text.appendChild(textContainerTitle);

    const textContainer = document.createElement('div');
    textContainer.className = 'video-container element-create-part';
    textContainer.id = 'texte-' + element_id;;

    const boxCoursElements = document.createElement('div');
    boxCoursElements.className = 'box-cours-elements video-player show_cours';



    const textPlayerTitle = document.createElement('h2');
    textPlayerTitle.classList = 'cours-element color-opposite';
    textPlayerTitle.id = 'titre-demonstration-texte-' + element_id;
    textPlayerTitle.style.color = 'var(--text-color)';
    textPlayerTitle.textContent = '';

    const contentContainer = document.createElement('div');
    contentContainer.className = 'content-full-screen';
    contentContainer.id = "content-container";
    contentContainer.style.height = '90%';
    contentContainer.style.overflowY = "scroll";
    contentContainer.style.display = "block";

    const firstTextElement = document.createElement('p');
    firstTextElement.classList = 'cours-element ';
    firstTextElement.id = 'first-texte-demonstration-' + element_id;
    firstTextElement.style.display = 'none';
    firstTextElement.style.background = 'var(--main-color)';
    firstTextElement.style.color = 'rgb(201, 201, 201)';
    firstTextElement.style.width = '80%';
    firstTextElement.style.justifyContent = "center";
    firstTextElement.textContent = '';

    const secondTextElement = document.createElement('p');
    secondTextElement.classList = 'cours-element';
    secondTextElement.id = 'second-texte-demonstration-' + element_id;
    secondTextElement.style.display = 'none';
    secondTextElement.style.background = 'var(--main-color)';
    secondTextElement.style.color = 'rgb(201, 201, 201)';
    secondTextElement.style.width = '80%';
    secondTextElement.style.justifyContent = "center";
    secondTextElement.textContent = '';

    const thirdTextElement = document.createElement('p');
    thirdTextElement.classList = 'cours-element ';
    thirdTextElement.id = 'third-texte-demonstration-' + element_id;
    thirdTextElement.style.display = 'none';
    thirdTextElement.style.background = 'var(--main-color)';
    thirdTextElement.style.color = 'rgb(201, 201, 201)';
    thirdTextElement.style.width = '80%';
    thirdTextElement.style.justifyContent = "center";
    thirdTextElement.textContent = '';

    const fourthTextElement = document.createElement('p');
    fourthTextElement.classList = 'cours-element ';
    fourthTextElement.id = 'fourth-texte-demonstration-' + element_id;
    fourthTextElement.style.display = 'none';
    fourthTextElement.style.background = 'var(--main-color)';
    fourthTextElement.style.color = 'rgb(201, 201, 201)';
    fourthTextElement.style.width = '80%';
    fourthTextElement.style.justifyContent = "center";
    fourthTextElement.textContent = '';

    const fifthTextElement = document.createElement('p');
    fifthTextElement.classList = 'cours-element ';
    fifthTextElement.id = 'fifth-texte-demonstration-' + element_id;
    fifthTextElement.style.display = 'none';
    fifthTextElement.style.background = 'var(--main-color)';
    fifthTextElement.style.color = 'rgb(201, 201, 201)';
    fifthTextElement.style.width = '80%';
    fifthTextElement.style.justifyContent = "center";
    fifthTextElement.textContent = '';

    contentContainer.appendChild(firstTextElement);
    contentContainer.appendChild(secondTextElement);
    contentContainer.appendChild(thirdTextElement);
    contentContainer.appendChild(fourthTextElement);
    contentContainer.appendChild(fifthTextElement);
    contentContainer.appendChild(document.createElement('br'));
    contentContainer.appendChild(document.createElement('br'));
    contentContainer.appendChild(document.createElement('br'));
    contentContainer.appendChild(document.createElement('br'));

    boxCoursElements.appendChild(textPlayerTitle);
    boxCoursElements.appendChild(contentContainer);
    textContainer.appendChild(boxCoursElements);
    containerElement_text.appendChild(textContainer);

    const textCreateRight = document.createElement('div');
    textCreateRight.className = 'video-create-right';
    textCreateRight.style.display = "block";
    textCreateRight.style.paddingBlock = "5vh";


    function createInputContainer(labelText, inputId, placeholder) {
        const inputCreateContainer = document.createElement('div');
        inputCreateContainer.className = 'input-create-container-texte';

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
        'title-texte-' + element_id,
        'ex: Titre du texte'
    );
    textCreateRight.appendChild(titleInputContainer);

    const textInputContainer1 = createInputContainer(
        'Texte 1',
        'create-input-texte-first-' + element_id,
        "ex: Texte 1"
    );
    textCreateRight.appendChild(textInputContainer1);

    const textInputContainer2 = createInputContainer(
        'Texte 2',
        'create-input-texte-second-' + element_id,
        "ex: Texte 2"
    );
    textCreateRight.appendChild(textInputContainer2);

    const textInputContainer3 = createInputContainer(
        'Texte 3',
        'create-input-texte-third-' + element_id,
        "ex: Texte 3"
    );
    textCreateRight.appendChild(textInputContainer3);

    const textInputContainer4 = createInputContainer(
        'Texte 4',
        'create-input-texte-fourth-' + element_id,
        "ex: Texte 4"
    );
    textCreateRight.appendChild(textInputContainer4);

    const textInputContainer5 = createInputContainer(
        'Texte 5',
        'create-input-texte-fifth-' + element_id,
        "ex: Texte 5"
    );
    textCreateRight.appendChild(textInputContainer5);

    const keywordInputContainer = createInputContainer(
        'Mot clé',
        'create-input-keyword-texte-' + element_id,
        'ex: Mot clé'
    );
    textCreateRight.appendChild(keywordInputContainer);

    const keywordListContainer = document.createElement('ul');
    keywordListContainer.className = 'key_word_container key_word_container_created';
    keywordListContainer.id = 'key_word_container_created_' + element_id;;

    const emptyKeywords = document.createElement('p');
    emptyKeywords.className = 'color-opposite';
    emptyKeywords.style.visibility = 'visible';
    emptyKeywords.id = 'empty-keywords-' + element_id;;
    emptyKeywords.textContent = 'Aucun mot clé';
    keywordListContainer.appendChild(emptyKeywords);
    textCreateRight.appendChild(keywordListContainer);

    const alertText = document.createElement('p');
    alertText.className = 'color-opposite';
    alertText.style.visibility = 'visible';
    alertText.style.color = 'var(--text-color)';
    alertText.style.fontStyle = 'italic';
    alertText.style.width = '80%';
    alertText.style.marginLeft = '10%';
    alertText.id = 'alert-text-' + element_id;
    alertText.textContent =
        '⚠ Certains mots peuvent être modifiés pour faciliter la recherche plus tard (si vous les tapez comme précédemment, ils seront trouvés)';
    textCreateRight.appendChild(alertText);

    textContainer.appendChild(textCreateRight);
    containerElement_text.appendChild(textContainer);

    Update_texte_element()
}
