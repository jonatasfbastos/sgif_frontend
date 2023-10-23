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

// Simluando o back-end
const form = {
  id: 1,
  titulo: "Bem-vindo à Avaliação Docente",
  descricao:
    "Por favor, forneça seu feedback sobre o desempenho do seu professor abaixo. Sua contribuição é valiosa para nós.",
  questoes: [
    {
      id: 1,
      enunciado:
        "O professor atendeu às suas expectativas em relação ao curso?",
      respostas: [
        {
          texto: "",
          usuario: { login: "" },
        },
      ],
    },
    {
      id: 2,
      enunciado: "O professor demonstrou entusiasmo pelo assunto?",
      respostas: [
        {
          texto: "",
          usuario: { login: "" },
        },
      ],
    },
    {
      id: 3,
      enunciado: "Você recomendaria este professor a outros alunos?",
      respostas: [
        {
          texto: "",
          usuario: { login: "" },
        },
      ],
    },
    {
      id: 4,
      enunciado: "O professor utilizou uma variedade de métodos de ensino?",
      respostas: [
        {
          texto: "",
          usuario: { login: "" },
        },
      ],
    },
    {
      id: 5,
      enunciado:
        "O professor comunicou as informações de forma clara e compreensível?",
      respostas: [
        {
          texto: "",
          usuario: { login: "" },
        },
      ],
    },
  ],
};

/***/
const getForm = async () => {
  const response = await fetch("./data.json");
  const data = await response.json(response);
  return data;
};

/***/
const stateQuestions = {
  currentQuestionIndex: 0, // Índice da questão atual
  maxQuestionIndex: form.questoes.length - 1, // Índice máximo da última questão
  isFormEmpty: true, // Indica se o formulário está vazio
  allQuestions: form.questoes, // Todas as questões do formulário
  answers: [{}], // Armazena as respostas do usuário
  inputField: null, // Referência ao campo de entrada atual
};

/***/
const renderForm = (data) => {
  const { titulo: title, descricao: description, ...rest } = data;

  const titleForm = html.get(".form-title");
  titleForm.textContent = title;

  const descriptionForm = html.get(".form-description");
  descriptionForm.textContent = description;

  createButton("Começar", "form-button", "button-start");
};

/***/
const renderQuestion = () => {
  const { currentQuestionIndex, allQuestions, inputField, ...rest } =
    stateQuestions;

  const idQuestion = allQuestions[currentQuestionIndex].id;
  const statementQuestion = allQuestions[currentQuestionIndex].enunciado;
  const form = html.get("#evaluation-form");

  if (!inputField) {
    const newInputField = html.createElementWithClasses("div", "input-field");

    newInputField.innerHTML = `
        <label for="${idQuestion}">${statementQuestion}</label>
        <input type="text" id="${idQuestion}" name="teacher-feedback" autofocus autocomplete="off">
        <span class="error hide"></span>
      `;

    form.appendChild(newInputField);
    stateQuestions.inputField = newInputField;
    createButton("Próximo", "form-button", "button-next");

    const input = newInputField.querySelector("input");
    input.addEventListener("input", saveAnswers);

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

/***/
const createButton = (content, ...elementClass) => {
  const button = html.createElementWithClasses("button", ...elementClass);
  const containerButton = html.get(".container-button");
  button.textContent = content;

  containerButton.appendChild(button);
};

/***/
const toggleButton = (button) => {
  if (!button) return null;
  button.classList.toggle("hide");
};

/***/
const showMessageSuccess = () => {
  const formContent = html.get(".form-content");

  html.get(".form-description").textContent =
    "Recebemos a sua avaliação, caro aluno; seus comentários são muito importantes para nós.";
  html.get(".form-title").textContent = "Sua Opinião Faz a Diferença";

  formContent.innerHTML = "";

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

/***/
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

      currentInput.value =stateQuestions.answers[stateQuestions.currentQuestionIndex].value;

    }
  };

  const send = (button) => {
    if (validateInput()) {
      showMessageSuccess();
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

/***/
const validateInput = () => {
  if (stateQuestions.inputField) {
    const input = stateQuestions.inputField.querySelector("input");
    const error = stateQuestions.inputField.querySelector(".error");
    error.textContent = "";

    if (input.value.trim() === "") {
      input.value = "";
      error.textContent = "Por favor, preeencha este campo!";
      return false;
    }

    return true;
  }
};

/***/
const saveAnswers = () => {
  const currentInput = stateQuestions.inputField.querySelector("input");
  const currentInputId = currentInput.id;
  const currentInputValue = currentInput.value;

  const answerCurrent = {
    id: currentInputId,
    value: currentInputValue,
  };

  stateQuestions.answers[stateQuestions.currentQuestionIndex] = answerCurrent;
};

/***/
function init() {
  renderForm(form);
  eventListenerButtonsForm();
}
init();
