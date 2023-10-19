/**
 * Um objeto contendo utilitários para manipulação de elementos HTML.
 * @namespace
 */
const html = {
  /**
   * Obtém o primeiro elemento HTML que corresponde ao seletor especificado.
   * @param {string} selector - O seletor do elemento a ser obtido.
   * @returns {Element|null} O elemento HTML correspondente ou null se não for encontrado.
   */
  get(selector) {
    return document.querySelector(selector);
  },

  /**
   * Obtém todos os elementos HTML que correspondem ao seletor especificado.
   * @param {string} selector - O seletor dos elementos a serem obtidos.
   * @returns {NodeList} Uma lista de elementos HTML correspondentes.
   */
  getAll(selector) {
    return document.querySelectorAll(selector);
  },

  /**
   * Cria um novo elemento HTML com o nome especificado.
   * @param {string} element - O nome do elemento HTML a ser criado.
   * @returns {Element} O novo elemento HTML criado.
   */
  create(element) {
    return document.createElement(element);
  },

  /**
   * Cria um novo elemento HTML com o nome especificado e adiciona classes a ele.
   * @param {string} element - O nome do elemento HTML a ser criado.
   * @param {...string} classes - Uma ou mais classes CSS a serem adicionadas ao elemento.
   * @returns {Element} O novo elemento HTML criado com as classes especificadas.
   */
  createElementAndClass(element, ...classes) {
    if (element) {
      const genericElement = document.createElement(element);
      if (classes.length > 0) {
        genericElement.classList.add(...classes);
      }
      return genericElement;
    }
    return;
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

/**
 * Função para renderizar questões do back-end.
 *
 * @param {Object} params - Parâmetros da função.
 * @param {Object} params.form - Um objeto contendo os dados do formulário.
 * @param {Object} htmlUtil - Um objeto contendo utilitários para manipulação de elementos HTML.
 * @returns {void}
 */

(function (params) {
  const { titulo, descricao, ...rest } = params.form;

  const tituloForm = html.get(".form-header .form-title");
  tituloForm.textContent = titulo;

  const descricaoForm = html.get(".form-header .form-description");
  descricaoForm.textContent = descricao;

  const form = html.get("#evaluation-form");
  const containerBtn = html.createElementAndClass("div", "container-button");

  const stateQuestions = {
    currentQuestion: 0,
    maxQuestions: rest.questoes.length - 1,
    isEmpty: true,
    allQuestions: rest,
    inputField: "",
  };

  const createButton = (content, ...elementClass) => {
    const button = html.createElementAndClass("button", ...elementClass);
    button.textContent = content;

    containerBtn.appendChild(button);
    form.appendChild(containerBtn);
  };

  const renderizarQuestao = ({
    currentQuestion,
    allQuestions,
    inputField,
    ...rest
  }) => {
    const idQuestion = allQuestions.questoes[currentQuestion].id;
    const statementQuestion = allQuestions.questoes[currentQuestion].enunciado;

    if (inputField) {
      inputField.querySelector("label").textContent = statementQuestion;
      inputField.querySelector("input").id = idQuestion;
    } else {
      // Crie o campo de entrada se for o primeiro
      const inputField = html.createElementAndClass("div", "input-field");

      inputField.innerHTML = `
        <label for="${idQuestion}">${statementQuestion}</label>
        <input type="text" id="${idQuestion}" name="teacher-feedback" required autofocus autocomplete="off">
        <span class="error"></span>
      `;

      form.appendChild(inputField);
      stateQuestions.inputField = inputField;

      if (currentQuestion <= rest.maxQuestions) {
        createButton("Anterior", "form-button", "form-button-prev");
        createButton("Próximo", "form-button", "form-button-next");
      }
    }

    if (currentQuestion == rest.maxQuestions) {
      [".form-button-next", ".form-button-prev"].forEach((btnClass) => {
        const button = html.get(btnClass);
        if (button) {
          button.remove();
        }
      });
      createButton("Enviar", "form-button", "form-button-send");
    }
  };
  renderizarQuestao(stateQuestions);

  const nextQuestion = () => {
    const btnNext = html.get(".form-button-next");
    const input = stateQuestions.inputField.querySelector("input");

    if (!btnNext) {
      return;
    }

    btnNext.addEventListener("click", (e) => {
      e.preventDefault();

      if (stateQuestions.currentQuestion >= stateQuestions.maxQuestions) {
        return;
      }

      if (!validateField(input)) {
        return;
      }

      stateQuestions.currentQuestion++;
      renderizarQuestao(stateQuestions);
    });
  };
  nextQuestion();
})({ form }, html);

/**
 * Valida um campo de entrada, verificando se está vazio.
 * Define uma mensagem de erro e um estilo apropriado para o campo.
 * @param {HTMLElement} input - O campo de entrada a ser validado.
 */
const validateField = (input) => {
  if (input.value.trim() === "") {
    setError(input, "Por favor, preencha este campo");
    return false;
  } else {
    setSuccess(input);
    return true;
  }
};

/**
 * Define uma mensagem de erro e estilo para um elemento de entrada.
 * @param {HTMLElement} element - O elemento de entrada a ser marcado como erro.
 * @param {string} message - A mensagem de erro a ser exibida.
 */
const setError = (element, message) => {
  element.value = "";
  const input = element;
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  input.classList.add("input-invalid");
  inputControl.classList.add("error", "invalid");
};

/**
 * Remove uma mensagem de erro e define estilo de sucesso para um elemento de entrada.
 * @param {HTMLElement} element - O elemento de entrada a ser marcado como sucesso.
 */
const setSuccess = (element) => {
  element.value = "";
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error", "invalid");
};
