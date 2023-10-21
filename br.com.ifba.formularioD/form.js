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

// Similuando o back-end
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
  answers: [], // Armazena as respostas do usuário
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
const createButton = (content, ...elementClass) => {
  const button = html.createElementWithClasses("button", ...elementClass);
  const containerButton = html.get(".container-button");
  button.textContent = content;

  containerButton.appendChild(button);
  eventListenerButtonsForm(button);
};

/***/
const toggleButton = (button) => {
  console.log(button);
  if (!button) return null;
  button.classList.toggle("hide");
};

/***/
const eventListenerButtonsForm = (button) => {
  const start = (button) => {
    console.log("aui  ")
    toggleButton(button);
  };

  const next = (button) => {
  };

  const prev = (button) => {
  };

  const send = (button) => {
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
    e.preventDefault();
    const button = e.target;
    const buttonClass = button.getAttribute("class");
    if (buttonActions[buttonClass]) {
      buttonActions[buttonClass](button);
    }
  });

};

/***/
function init() {
  renderForm(form);
}
init();

// // ********************************************************
// (function (params) {
//   const { titulo, descricao, ...rest } = params.form;

//   const tituloForm = html.get(".form-header .form-title");
//   tituloForm.textContent = titulo;

//   const descricaoForm = html.get(".form-header .form-description");
//   descricaoForm.textContent = descricao;

//   const containerBtn = html.createElementWithClasses("div", "container-button");

//   const stateQuestions = {
//     currentQuestion: 0,
//     maxQuestions: rest.questoes.length - 1,
//     isEmpty: true,
//     allQuestions: rest,
//     inputField: "",
//   };

//   /***/
//   const renderizarQuestao = ({
//     currentQuestion,
//     allQuestions,
//     inputField,
//     ...rest
//   }) => {
//     const idQuestion = allQuestions.questoes[currentQuestion].id;
//     const statementQuestion = allQuestions.questoes[currentQuestion].enunciado;

//     const btnPrev = html.get(".form-button-prev");

//     /***/

//     if (inputField) {
//       inputField.querySelector("label").textContent = statementQuestion;
//       inputField.querySelector("input").id = idQuestion;

//       if (!btnPrev) {
//         createButton("Anterior", "form-button", "form-button-prev");
//         prevQuestion();
//       }
//     } else {
//       // Crie o campo de entrada se for o primeiro
//       const inputField = html.createElementWithClasses("div", "input-field");

//       inputField.innerHTML = `
//         <label for="${idQuestion}">${statementQuestion}</label>
//         <input type="text" id="${idQuestion}" name="teacher-feedback" autofocus autocomplete="off">
//         <span class="error"></span>
//       `;

//       form.appendChild(inputField);
//       stateQuestions.inputField = inputField;

//       if (currentQuestion <= rest.maxQuestions) {
//         createButton("Próximo", "form-button", "form-button-next");
//       }
//     }

//     /***/
//     if (currentQuestion == rest.maxQuestions) {
//       const button = html.get(".form-button-next");

//       if (button) {
//         button.remove();
//       }
//       createButton("Enviar", "form-button", "form-button-send");
//     } else {
//       const btnSend = html.get(".form-button-send");
//       if (btnSend) {
//         btnSend.remove();
//       }
//     }
//   };

//   /***/
//   const nextQuestion = () => {
//     const btnNext = html.get(".form-button-next");
//     const input = stateQuestions.inputField.querySelector("input");

//     if (!btnNext) {
//       return;
//     }

//     const toGoNext = () => {
//       if (stateQuestions.currentQuestion >= stateQuestions.maxQuestions) {
//         return;
//       }

//       if (!validateField(input)) {
//         return;
//       }

//       stateQuestions.currentQuestion++;
//       renderizarQuestao(stateQuestions);
//     };

//     input.addEventListener("keydown", (e) => {
//       if (e.key === "Enter") {
//         console.log("entrou");
//         toGoNext();
//       }
//     });

//     btnNext.addEventListener("click", (e) => {
//       e.preventDefault();
//       toGoNext();
//     });
//   };

//   /***/
//   const prevQuestion = () => {
//     const btnPrev = html.get(".form-button-prev");
//     const input = stateQuestions.inputField.querySelector("input");

//     if (!btnPrev) {
//       return;
//     }

//     const toGoPrev = () => {
//       if (stateQuestions.currentQuestion <= 0) {
//         console.log("prev");
//         return;
//       }

//       stateQuestions.currentQuestion--;
//       renderizarQuestao(stateQuestions);
//     };

//     btnPrev.addEventListener("click", (e) => {
//       e.preventDefault();
//       toGoPrev();
//     });
//   };

//   /***/
//   form.addEventListener("submit", (e) => {
//     e.preventDefault();
//   });

//   /***/
//   function init() {
//     renderizarQuestao(stateQuestions);
//     nextQuestion();
//   }
//   init();
// })({ form }, html);

// /**
//  * Valida um campo de entrada, verificando se está vazio.
//  * Define uma mensagem de erro e um estilo apropriado para o campo.
//  * @param {HTMLElement} input - O campo de entrada a ser validado.
//  */
// const validateField = (input) => {
//   if (input.value.trim() === "") {
//     setError(input, "Por favor, preencha este campo");
//     return false;
//   } else {
//     setSuccess(input);
//     return true;
//   }
// };

// /**
//  * Define uma mensagem de erro e estilo para um elemento de entrada.
//  * @param {HTMLElement} element - O elemento de entrada a ser marcado como erro.
//  * @param {string} message - A mensagem de erro a ser exibida.
//  */
// const setError = (element, message) => {
//   element.value = "";
//   const input = element;
//   const inputControl = element.parentElement;
//   const errorDisplay = inputControl.querySelector(".error");

//   errorDisplay.innerText = message;
//   input.classList.add("input-invalid");
//   inputControl.classList.add("error", "invalid");
// };

// /**
//  * Remove uma mensagem de erro e define estilo de sucesso para um elemento de entrada.
//  * @param {HTMLElement} element - O elemento de entrada a ser marcado como sucesso.
//  */
// const setSuccess = (element) => {
//   element.value = "";
//   const inputControl = element.parentElement;
//   const errorDisplay = inputControl.querySelector(".error");

//   errorDisplay.innerText = "";
//   inputControl.classList.add("success");
//   inputControl.classList.remove("error", "invalid");
// };
