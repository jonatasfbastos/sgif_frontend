/**
 * Um objeto utilitário para manipulação de elementos HTML.
 * @namespace
 * @description Este objeto fornece métodos para interagir com elementos HTML de forma simplificada.
 */
const html = {
  get(selector) {
    return document.querySelector(selector);
  },
  getAll(selector) {
    return document.querySelectorAll(selector);
  },
  create(element) {
    return document.createElement(element);
  },
  createElementWithClasses(element, ...classes) {
    if (!element) return null;

    const elementWithClasses = document.createElement(element);
    if (classes.length > 0) {
      elementWithClasses.classList.add(...classes);
    }

    return elementWithClasses;
  },
};

let form = [];

/**
 * Um objeto que mantém o estado do formulário de avaliação.
 * @typedef {Object} StateQuestions
 * @property {number} currentQuestionIndex - O índice da questão atual no formulário.
 * @property {number} maxQuestionIndex - O índice máximo da última questão no formulário.
 * @property {boolean} isFormEmpty - Indica se o formulário está vazio (inicialmente definido como verdadeiro).
 * @property {Array} allQuestions - Um array que contém todas as questões do formulário.
 * @property {Array} answers - Um array que armazena as respostas do usuário para cada questão.
 * @property {HTMLElement|null} inputField - Uma referência ao campo de entrada atual no formulário.
 */
let stateQuestions = {
  currentQuestionIndex: 0,
  maxQuestionIndex: 0,
  isFormEmpty: true,
  allQuestions: [],
  answers: [{}],
  inputField: null,
  idForm: null,
};

// Pegar o id (via url) da avaliação usuário ao cilcar em pedente
const endpoints = {
  getFormById: "/formularios/formulario/",
  saveAnswer: "questoes/questao",
};

const endpointTest =
  "../assets/data/data_teste/data_professores/perguntasDocente.json";

// Quando o back-end estiver funcionando mudar a lógica de avaliação feita
// Ao carregar a página do formulário de avaliação
document.addEventListener("DOMContentLoaded", () => {
  const evaluationCompleted = localStorage.getItem("avaliacaoRealizada");

  if (evaluationCompleted === "true") {
    showMessageSuccess(); // Mostra a mensagem de sucesso se a avaliação já foi realizada
  } else {
    fetchData(); // Se a avaliação ainda não foi realizada, busca os dados e inicia o formulário
  }
});

/**---------{CHAMADA A API}---------*/
async function getForm() {
  try {
    const data = await get(endpointTest);
    console.log("Data", data);
    return data;
  } catch (error) {
    console.log("Error ", error);
    return null;
  }
}

async function fetchData() {
  try {
    form = await getForm();
    console.log("Form", form);
    init();
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

/**
 * Renderiza o formulário de avaliação com base nos dados fornecidos.
 *
 * @param {Object} data - Os dados do formulário de avaliação.
 * @property {string} data.titulo - O título do formulário.
 * @property {string} data.descricao - A descrição do formulário.
 * @property {any} ...rest - Outros dados que podem estar presentes, mas não são utilizados nesta função.
 */
const renderForm = async (data) => {
  const { titulo: title, descricao: description, ...rest } = data;

  const titleForm = html.get(".form-title");
  titleForm.textContent = title;

  const descriptionForm = html.get(".form-description");
  descriptionForm.textContent = description;

  createButton("Começar", "form-button", "button-start");
};

/**
 * Renderiza uma pergunta do formulário de avaliação com base no estado atual.
 * Esta função é responsável por exibir a pergunta atual, criar o campo de entrada
 * e gerenciar os botões de navegação.
 */
const renderQuestion = () => {
  const { currentQuestionIndex, allQuestions, inputField, ...rest } = stateQuestions;

  const idQuestion = allQuestions[currentQuestionIndex].id;
  const statementQuestion = allQuestions[currentQuestionIndex].enunciado;
  const form = html.get("#evaluation-form");

  if (!inputField) {
    const newInputField = html.createElementWithClasses("div", "input-field");

    newInputField.innerHTML = `
      <label>${statementQuestion}</label>
      <div class="radio-options">
        <div>
          <input type="radio" id="${idQuestion}-good" name="${idQuestion}" value="bom">
          <label for="${idQuestion}-good">Bom</label>
        </div>

        <div>
          <input type="radio" id="${idQuestion}-regular" name="${idQuestion}" value="regular">
          <label for="${idQuestion}-regular">Regular</label>
        </div>

        <div>
          <input type="radio" id="${idQuestion}-bad" name="${idQuestion}" value="ruim">
          <label for="${idQuestion}-bad">Ruim</label>
        </div>
      </div>
      <span class="error hide"></span>
    `;

    form.appendChild(newInputField);
    stateQuestions.inputField = newInputField;
    createButton("Próximo", "form-button", "button-next");

    const radioDivs = newInputField.querySelectorAll(".radio-options > div");
    radioDivs.forEach(radioDiv => {
      const radioButton = radioDiv.querySelector("input[type='radio']");
      const label = radioDiv.querySelector("label");

      radioButton.addEventListener("click", () => {
        saveAnswers();
      });

      label.addEventListener("click", () => {
        radioButton.checked = true;
        saveAnswers();
      });
    });

    return;
  }


  const input = inputField.querySelector("input");
  inputField.querySelector("label").textContent = statementQuestion;
  input.id = idQuestion;
  input.value = "";

  html.get(".button-prev")
    ? null
    : createButton("Anterior", "form-button", "button-prev");
};

/**
 * Cria e insere um botão no formulário de avaliação.
 *
 * @param {string} content - O texto exibido no botão.
 * @param {...string} elementClass - As classes CSS a serem atribuídas ao botão.
 */
const createButton = (content, ...elementClass) => {
  const button = html.createElementWithClasses("button", ...elementClass);
  const containerButton = html.get(".container-button");
  button.textContent = content;

  containerButton.appendChild(button);
};

/**
 * Alternar a visibilidade de um botão no formulário de avaliação.
 *
 * @param {HTMLElement} button - O elemento de botão a ser alternado.
 */
const toggleButton = (button) => {
  if (!button) return null;
  button.classList.toggle("hide");
};

/**
 * Exibe uma mensagem de sucesso no formulário de avaliação após o envio.
 * Esta função substitui o conteúdo do formulário com uma mensagem de sucesso.
 */
const showMessageSuccess = () => {
  const formContent = html.get(".form-content");
  const imgContent = html.get(".form-illustration-img");

  html.get(".form-description").textContent =
    "Recebemos a sua avaliação, caro aluno; seus comentários são muito importantes para nós.";
  html.get(".form-title").textContent = "Sua Opinião Faz a Diferença";

  formContent.innerHTML = "";
  imgContent.innerHTML = "";

  const messageSuccess = html.createElementWithClasses(
    "div",
    "container-success-form"
  );

  messageSuccess.innerHTML = `
  <div class="card">
  <div class="container-checkmark" >
    <i class="checkmark">✓</i>
  </div>
    <h1>Sucesso</h1>
  </div>
  `;

  formContent.appendChild(messageSuccess);
};

/**
 * Configura os ouvintes de eventos para os botões no formulário de avaliação e
 * gerencia as ações correspondentes quando os botões são clicados.
 *
 * @param {HTMLElement} button - O botão que desencadeou o evento.
 */
const eventListenerButtonsForm = (button) => {
  const { currentQuestionIndex, allQuestions, inputField, ...rest } =
    stateQuestions;

  const start = (button) => {
    toggleButton(button);
    toggleButton(html.get(".form-illustration-img"));
    renderQuestion();
  };

  const next = (button) => {
    if (
      validateInput() &&
      stateQuestions.currentQuestionIndex < stateQuestions.maxQuestionIndex
    ) {
      stateQuestions.currentQuestionIndex++;

      updateSendButton();
      renderQuestion();

      const currentInput = stateQuestions.inputField.querySelector("input");
      currentInput.value =
        stateQuestions.answers[stateQuestions.currentQuestionIndex].value;
    }
  };

  const prev = (button) => {
    if (stateQuestions.currentQuestionIndex > 0) {
      stateQuestions.currentQuestionIndex--;

      updateSendButton();
      renderQuestion();

      const currentInput = stateQuestions.inputField.querySelector("input");
      stateQuestions.inputField.querySelector(".error").textContent = "";

      currentInput.value =
        stateQuestions.answers[stateQuestions.currentQuestionIndex].value;
    }
  };

  const send = (button) => {
    if (validateInput()) {
      answer = {
        formulario: { id: stateQuestions.idForm },
        resposta: stateQuestions.answers,
      };
      console.log(answer);
  
      showMessageSuccess();
          localStorage.setItem("avaliacaoRealizada", true);

      // put(endpoints.saveAnswer, answer)
      //   .then((result) => {
      //     console.log("Feito", result);
      //   })
      //   .catch((error) => {
      //     console.log("Erro", error);
      //   });
    }
  };

  const updateSendButton = () => {
    const buttonSend = html.get(".button-send");
    const buttonNext = html.get(".button-next");

    if (
      stateQuestions.currentQuestionIndex !== stateQuestions.maxQuestionIndex
    ) {
      if (buttonSend) {
        buttonSend.remove();
        toggleButton(buttonNext);
      }
      return;
    }
    // ==
    toggleButton(buttonNext);
    createButton("Enviar", "form-button", "button-send");
  };

  const enableEnterNavigation = (input) => {
    input.addEventListener("keypress", (e) => {
      e.key === "Enter" ? next() : null;
    });
  };

  const allButtons = [
    "form-button button-start",
    "form-button button-next",
    "form-button button-prev",
    "form-button button-send",
  ];

  const buttonActions = {
    [allButtons[0]]: start,
    [allButtons[1]]: next,
    [allButtons[2]]: prev,
    [allButtons[3]]: send,
  };

  document.addEventListener("click", (e) => {
    const button = e.target;
    const buttonClass = button.getAttribute("class");

    if (buttonClass === "link-back-home" || button.closest(".link-back-home")) {
      // Permitir que o link de "link-back-home" siga o comportamento padrão
      return;
    }

    if (stateQuestions.inputField) {
      const input = stateQuestions.inputField.querySelector("input");
      enableEnterNavigation(input);
    }

    e.preventDefault();

    if (buttonActions[buttonClass]) {
      buttonActions[buttonClass](button);
    }
  });
};

/**
 * Valida o campo de entrada no formulário de avaliação (opções de rádio).
 * Esta função verifica se uma opção de rádio foi selecionada e exibe uma mensagem de erro, se necessário.
 *
 * @returns {boolean} - `true` se uma opção de rádio foi selecionada, `false` se nenhuma opção foi selecionada.
 */
const validateInput = () => {
  if (stateQuestions.inputField) {
    const radioOptions = stateQuestions.inputField.querySelectorAll(
      "input[type='radio']"
    );
    const error = stateQuestions.inputField.querySelector(".error");
    error.textContent = "";

    let isChecked = false;

    radioOptions.forEach((radio) => {
      if (radio.checked) {
        isChecked = true;
      }
    });

    if (!isChecked) {
      error.textContent = "Por favor, selecione uma opção!";
      return false;
    }

    return true;
  }
};

/**
 * Salva a resposta do usuário para a pergunta atual no formulário de avaliação.
 * Esta função extrai o valor do campo de entrada e armazena a resposta no estado.
 */
const saveAnswers = () => {
  const currentQuestion = stateQuestions.allQuestions[stateQuestions.currentQuestionIndex];
  const radioOptions = stateQuestions.inputField.querySelectorAll("input[type='radio']");

  radioOptions.forEach((radio) => {
    if (radio.checked) {
      const answerCurrent = {
        id: currentQuestion.id,
        value: radio.value,
      };
      stateQuestions.answers[stateQuestions.currentQuestionIndex] = answerCurrent;
    }
  });
};




/**
 * Inicializa o formulário de avaliação.
 * Esta função chama a função de renderização do formulário e configura ouvintes de eventos para os botões.
 */
function init() {
  stateQuestions.maxQuestionIndex = form.questoes.length - 1;
  stateQuestions.allQuestions = form.questoes;
  stateQuestions.idForm = form.id;

  renderForm(form);
  eventListenerButtonsForm();
}
