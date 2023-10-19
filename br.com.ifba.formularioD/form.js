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
 * @param {Element} params.targetElement - O elemento HTML de destino onde as questões serão renderizadas.
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

  const stateQuestions = {
    currentQuestion: 0,
    maxQuestions: rest.questoes.length,
    isEmpty: true,
    allQuestions: rest,
    inputField: "",
  };

  const renderizarQuestao = ({ currentQuestion, allQuestions, inputField }) => {
    const idQuestion = allQuestions.questoes[currentQuestion].id;
    const statementQuestion = allQuestions.questoes[currentQuestion].enunciado;
    console.log(idQuestion, statementQuestion);

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
    }
  };
  renderizarQuestao(stateQuestions);

  const containerBtn = html.createElementAndClass("div", "container-button");
  const btnEnviarForm = html.createElementAndClass("button", "form-button");
  btnEnviarForm.textContent = "Proximo";

  containerBtn.appendChild(btnEnviarForm);

  form.appendChild(containerBtn);

  const nextQuestion = () => {
    const btnNext = html.get(".form-button");

    btnNext.addEventListener("click", (e) => {
      e.preventDefault();

      if (stateQuestions.currentQuestion >= stateQuestions.maxQuestions - 1) {
        return;
      }

      stateQuestions.currentQuestion++;
      renderizarQuestao(stateQuestions);
    });
  };
  nextQuestion();
})({ form }, html);

/**
 * Valida um formulário verificando se os campos de entrada estão vazios.
 * Define mensagens de erro e estilos apropriados para cada campo.
 */
const validarFormulario = () => {
  const inputs = html.getAll(".input-field input");
  const btnSendForm = html.get(".container-button .form-button");

  btnSendForm.addEventListener("click", (e) => {
    e.preventDefault();

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        setError(input, "Por favor, preencha este campo");
        return false;
      } else {
        setSuccess(input);
        return true;
      }
    });
  });
};

/**
 * Define uma mensagem de erro e estilo para um elemento de entrada.
 * @param {HTMLElement} element - O elemento de entrada a ser marcado como erro.
 * @param {string} message - A mensagem de erro a ser exibida.
 */
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  const input = inputControl.querySelector("input");

  errorDisplay.innerText = message;
  input.classList.add("input-invalid");
  inputControl.classList.add("error", "invalid");
  inputControl.classList.remove("success");
};

/**
 * Remove uma mensagem de erro e define estilo de sucesso para um elemento de entrada.
 * @param {HTMLElement} element - O elemento de entrada a ser marcado como sucesso.
 */
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

validarFormulario();
