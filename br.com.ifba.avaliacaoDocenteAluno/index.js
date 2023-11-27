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
const title = "Avaliação Pendente";
const message =
  "Olá! Parece que você ainda não avaliou todas as disciplinas. Sua contribuição é valiosa para nós. Por favor, lembre-se de avaliar todas as disciplinas antes de prosseguir. Obrigado pela sua colaboração!";
localStorage.setItem("avaliacaoRealizada", false);

/**---------{CHAMADA A API}---------*/
const endpointTest =
  "../assets/data/data_teste/data_professores/avaliacaoDocenteAluno.json";

const getAssessments = async () => {
  const response = await fetch(endpointTest);
  const data = await response.json();

  data.forEach((element) => {
    generateAssessments(element);
  });

  return data;
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
monitorSelect();

const Modal = {
  createModal: (title, message) => {
    const fade = html.createElementWithClasses("div", "hide");
    fade.setAttribute("id", "fade");

    const modal = html.createElementWithClasses("div", "hide");
    modal.setAttribute("id", "modal");

    const modalHeader = html.createElementWithClasses("div", "modal-header");
    const modalTitle = html.createElementWithClasses("h2", "modal-title");
    modalTitle.textContent = title;

    const buttonCloseModal = html.createElementWithClasses(
      "button",
      "btn-site"
    );
    buttonCloseModal.setAttribute("id", "close-modal");
    buttonCloseModal.textContent = "fechar";

    [modalTitle, buttonCloseModal].forEach((el) => modalHeader.appendChild(el));

    const modalBody = html.createElementWithClasses("div", "modal-body");
    const messageInfo = html.createElementWithClasses("p", "message-info");
    messageInfo.textContent = message;
    modalBody.appendChild(messageInfo);

    console.log(modalHeader, modalBody);

    [modalHeader, modalBody].forEach((el) => modal.appendChild(el));

    container.appendChild(fade);
    container.appendChild(modal);
  },
  handleModal: () => {
    const closeModalButton = html.get("#close-modal");
    const modal = html.get("#modal");
    const fade = html.get("#fade");
    const body = html.get("body");

    body.style.overflow = "hidden";
    body.style.height = "100vh";

    [modal, fade].forEach((el) => el.classList.toggle("hide"));

    const toggleModal = () => {
      [modal, fade].forEach((el) => {
        el.classList.toggle("hide");
        body.style.overflow = "auto";
        body.style.height = "auto";
      });
    };

    [closeModalButton, fade].forEach((el) => {
      el.addEventListener("click", () => toggleModal());
    });
  },
  showModal: (data, title, message) => {
    Modal.createModal(title, message);

    data.forEach((element) => {
      if (!element.status) {
        Modal.handleModal();
      }
    });
  },
};

function init() {
  getAssessments().then((data) => Modal.showModal(data, title, message));
}
init();
