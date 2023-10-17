/**
 * Um objeto contendo utilitários para manipulação de elementos HTML.
 * @namespace
 */
const html = {
  /**
   * Obtém o primeiro elemento HTML que corresponde ao seletor especificado.
   * @param {string} element - O seletor do elemento a ser obtido.
   * @returns {Element|null} O elemento HTML correspondente ou null se não for encontrado.
   */
  getElement(element) {
    return document.querySelector(element);
  },

  /**
   * Obtém todos os elementos HTML que correspondem ao seletor especificado.
   * @param {string} element - O seletor dos elementos a serem obtidos.
   * @returns {NodeList} Uma lista de elementos HTML correspondentes.
   */
  getElements(element) {
    return document.querySelectorAll(element);
  },

  /**
   * Cria um novo elemento HTML com o nome especificado.
   * @param {string} element - O nome do elemento HTML a ser criado.
   * @returns {Element} O novo elemento HTML criado.
   */
  createElement(element) {
    return document.createElement(element);
  },

  /**
   * Adiciona uma classe CSS a um elemento HTML.
   * @param {Element} element - O elemento HTML ao qual a classe será adicionada.
   * @param {string} nameClass - O nome da classe CSS a ser adicionada.
   */
  addClass(element, nameClass) {
    element.classList.add(nameClass);
  },
};

// Elemento de destino
const targetElement = html.getElement("#evaluation-form");

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
  // Desestruturação do objeto params
  const { titulo, descricao } = params.form;

  // Renderizadas título e descrição do enuciado (class -> form-header)
  const tituloForm = html.getElement(".form-header .form-title");
  tituloForm.textContent = titulo;

  const descricaoForm = html.getElement(".form-header .form-description");
  descricaoForm.textContent = descricao;

})({ form, targetElement }, html);
