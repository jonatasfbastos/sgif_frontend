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
const container = html.get(".container-list-assessment");

/**---------{CHAMADA A API}---------*/
const endpointTest =
  "../assets/data/data_teste/data_professores/avaliacaoDocenteAluno.json";

const getAssessments = async () => {
  const response = await fetch(endpointTest);
  const data = await response.json();

  data.forEach((element) => {
    generateAssessments(element);
  });
};

/**
 * PageEffects - Biblioteca de Efeitos de Página
 *
 * Esta biblioteca fornece funções para aplicar efeitos de página a elementos HTML.
 *
 * @namespace PageEffects
 */
const PageEffects = {
  /**
   * applyEntryAnimation - Aplica uma classe de animação a elementos com base em uma classe específica.
   *
   * @param {string} classElement - A classe dos elementos que receberão a animação.
   * @param {string} animationClass - A classe de animação a ser aplicada aos elementos.
   */
  applyEntryAnimation: (classElement, animationClass) => {
    const elements = html.getAll(classElement);
    elements.forEach((element) => {
      element.classList.add(animationClass);
    });
  },
};

const SetupSearch = {
  searchName: () => {
    const searchInput = html.get("#search");
    const assessments = html.getAll(".box-assessments");

    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.trim().toLowerCase();

      assessments.forEach((assessment) => {
        const name = assessment
          .querySelector(".title")
          .textContent.toLowerCase();
        const shouldShow = !!name.includes(searchTerm);

        // Defina a visibilidade com base no valor de shouldShow
        assessment.style.display = shouldShow ? "block" : "none";
      });
    });
  },
  applyFilter: (selectedFilter) => {
    const assessments = html.getAll(".box-assessments");

    assessments.forEach((assessment) => {
      const name = assessment.querySelector(".title").textContent.toLowerCase();

      let shouldShow = true;

      switch (selectedFilter) {
        case "avaliados":
          shouldShow = !!assessment.querySelector(".btn-evaluated");
          break;
        case "nao-avaliados":
          shouldShow = !!assessment.querySelector(".btn-assess");
          break;
        // O caso "todos" já tem shouldShow como true por padrão
      }

      assessment.style.display = shouldShow ? "block" : "none";
    });
  },
};

const generateAssessments = ({
  nome,
  professor: { nome: nomeProfessor },
  dataFim,
  status,
}) => {
  const containerAssessments = html.createElementWithClasses(
    "div",
    "box-assessments"
  );

  const detailsAssessments = html.createElementWithClasses(
    "div",
    "box-assessments-details"
  );
  const title = html.createElementWithClasses("div", "title");
  title.textContent = nome;

  const teacher = html.createElementWithClasses("div", "teacher");
  teacher.innerHTML = `
          <span>Professor(a):</span>
          <span>${nomeProfessor}</span>
  `;

  const date = html.createElementWithClasses("div", "date");
  date.innerHTML = `
          <span> Prazo máximo:</span>
          <span> ${dataFim} </span>
  `;

  detailsAssessments.appendChild(title);
  detailsAssessments.appendChild(teacher);
  detailsAssessments.appendChild(date);

  const button = html.createElementWithClasses("button", "btn-site");

  if (status) {
    button.textContent = "Concluída";
    button.classList.add("btn-evaluated");
    // Remova a classe "btn-assess" se ela estiver presente
    button.classList.remove("btn-assess");
    button.setAttribute("disabled", true);
  } else {
    button.textContent = "Pendente";
    button.classList.add("btn-assess");
    // Remova a classe "btn-evaluated" se ela estiver presente
    button.classList.remove("btn-evaluated");

    console.log(button);
    button.addEventListener("click", () => {
      console.log("oi");
      window.location.href =
        "../br.com.ifba.avaliacaoDocente/avalicaoDocente.html";
    });
  }

  containerAssessments.appendChild(detailsAssessments);
  containerAssessments.appendChild(button);
  container.appendChild(containerAssessments);

  PageEffects.applyEntryAnimation(".box-assessments", "entry");
  SetupSearch.searchName();
};

const monitorSelect = () => {
  const filterSelect = html.get("#filter");

  const handleSelectChange = () => {
    const selectedFilter = filterSelect.value;
    SetupSearch.applyFilter(selectedFilter);
  };

  // Adiciona um ouvinte de evento de input ao select
  filterSelect.addEventListener("input", handleSelectChange);
};

// Exemplo de uso
monitorSelect();

function init() {
  getAssessments();
}
init();
