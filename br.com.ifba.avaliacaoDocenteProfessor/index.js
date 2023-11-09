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

/**---------{Variaveis globais}----------**/
const container = html.get(".container main");

/**---------{Chamadas a API professores}----------**/
const endpoint = "professores";
const endpointTest =
  "../assets/data/data_teste/data_professores/professores.json";

const getAllTeachers = async () => {
  const response = await fetch(endpointTest);
  const data = await response.json();
  generateSectionListTeachers(data);
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
   * toggleDescription - Adiciona um evento de clique a elementos para alternar a classe "active" em elementos de descrição.
   *
   * @param {string} classElement - A classe dos elementos que terão eventos de clique.
   */
  toggleDescription: (classElement) => {
    const assessments = html.getAll(classElement);
    assessments.forEach((assessment) => {
      assessment.addEventListener("click", () => {
        const description = assessment.querySelector(".description");
        description.classList.toggle("active");
      });
    });
  },

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

    const notFoundMessage = html.get("#not-found-message");

    searchInput.addEventListener("input", function () {
      const searchTerm = searchInput.value.trim().toLowerCase();

      assessments.forEach((assessment) => {
        const name = assessment
          .querySelector(".name")
          .textContent.toLowerCase();
        const shouldShow = !!name.includes(searchTerm);

        // Defina a visibilidade com base no valor de shouldShow
        assessment.style.display = shouldShow ? "block" : "none";
      });

      if (notFoundMessage) {
        notFoundMessage.style.display = "none";
      }
    });
  },
  searchDate: (dateStart, dateEnd) => {
    const assessments = html.getAll(".box-assessments");
    const notFoundMessage = html.get("#not-found-message");

    if (dateStart > dateEnd) {
      displayErrorMessage(
        notFoundMessage,
        "❌ A data de início deve ser anterior à data de término."
      );
      return;
    }

    if (!dateStart || !dateEnd) {
      displayErrorMessage(
        notFoundMessage,
        "❌ Por favor, preencha ambas as datas."
      );
      return;
    }

    notFoundMessage.style.display = "none";

    assessments.forEach((assessment) => {
      const startDateElement = assessment.querySelector(".date-start");
      const endDateElement = assessment.querySelector(".date-end");

      if (!startDateElement || !endDateElement) {
        return;
      }

      const startDate = moment(startDateElement.textContent, "YYYY-M-D");
      const endDate = moment(endDateElement.textContent, "YYYY-M-D");

      const dataStartForm = moment(dateStart, "YYYY-M-D");
      const dataEndForm = moment(dateEnd, "YYYY-M-D");

      const isInRange =
        dataStartForm.isSameOrAfter(startDate) &&
        dataEndForm.isSameOrBefore(endDate);

      assessment.style.display = isInRange ? "block" : "none";
    });

    if (
      !assessments.some((assessment) => assessment.style.display === "block")
    ) {
      displayErrorMessage(notFoundMessage, "❌ Avaliações não encontradas!");
    }
  },
};

const displayErrorMessage = (element, message) => {
  const assessments = html.getAll(".box-assessments");

  if (!element || !message) return;

  if (element.classList.contains("hide")) {
    assessments.forEach((assessment) => {
      console.log(assessment);
      assessment.style.display = "none";
    });

    element.textContent = message;
    element.classList.remove("hide");
    return;
  }
};

const filterDate = () => {
  const form = html.get("form");
  const buttonReset = html.get(".btn-reset");
  const dateStart = form.querySelector("#start-date");
  const dateEnd = form.querySelector("#end-date");
  const notFoundMessage = html.get("#not-found-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    displayErrorMessage(notFoundMessage, "");
    SetupSearch.searchDate(dateStart.value, dateEnd.value);
  });

  buttonReset.addEventListener("click", (e) => {
    e.preventDefault();

    dateStart.value = dateStart.defaultValue;
    dateEnd.value = dateEnd.defaultValue;

    const notFoundMessage = html.get("#not-found-message");
    notFoundMessage.style.display = "none";

    const assessments = html.getAll(".box-assessments");
    assessments.forEach((assessment) => {
      assessment.style.display = "block";
    });
  });
};

/**
 * Limpa o conteúdo do container.
 */
const cleanContainer = () => {
  container.innerHTML = "";
};

/**---------{Seção para escolha do professor }----------**/
const generateSectionListTeachers = (professores) => {
  const containerTeacherList = html.createElementWithClasses(
    "div",
    "container-teacher-list"
  );
  const teacherSelection = html.createElementWithClasses(
    "section",
    "teacher-selection"
  );
  teacherSelection.innerHTML = `
      <h2 class="title">Escolha um Professor para Analisar</h2>
      <p class="description">
        Navegue pela lista de professores abaixo e avalie suas
        disciplinas. Sua avaliação é importante para melhorar a qualidade
        do ensino.
     </p>
  `;

  const teacherList = html.createElementWithClasses("section", "teacher-list");

  const form = html.create("form");

  const label = html.create("label");
  label.setAttribute("for", "teacher");
  label.textContent = "Escolha um Professor:";

  const select = html.create("select");
  select.setAttribute("id", "teacher");
  select.setAttribute("name", "teacher");

  professores.forEach((professor, index) => {
    const option = html.create("option");
    option.setAttribute("value", professor.id);
    option.textContent = professor.nome;
    select.appendChild(option);
  });

  const button = html.create("button");
  button.classList.add("btn-site");
  button.textContent = "Analisar";
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const selectElement = html.get("#teacher");
    const selectedProfessor = selectElement.value;
    toGoSectionListAssessments(professores, selectedProfessor);
  });

  form.appendChild(label);
  form.appendChild(select);
  form.appendChild(button);

  teacherList.appendChild(form);

  containerTeacherList.appendChild(teacherSelection);
  containerTeacherList.appendChild(teacherList);
  container.appendChild(containerTeacherList);
};

//
const toGoSectionListTeachers = () => {
  const buttonBack = html.get(".btn-back");

  buttonBack.addEventListener("click", (e) => {
    e.preventDefault();
    cleanContainer();
    getAllTeachers();
  });
};

const toGoSectionListAssessments = (professores, professor) => {
  if (!professor) {
    return;
  }

  const teacher = professores.filter((teacher) => teacher.id === professor);
  if (teacher) {
    cleanContainer();
    generateSectionListAssessmentsTeacher(teacher);
  }
};

/**---------{Seção para mostra as avaliações do professor}----------**/
const generateSectionListAssessmentsTeacher = (data) => {
  const teacher = data[0];
  console.log(teacher);

  const containerTeacher = html.createElementWithClasses(
    "div",
    "container-teacher"
  );

  const teacherDetails = html.createElementWithClasses(
    "div",
    "teacher-details"
  );

  const teacherInfos = html.createElementWithClasses("div", "teacher-infos");

  const photo = html.createElementWithClasses("div", "photo");
  photo.innerHTML = `<img src="../images/user-default.png" alt="Foto do ${teacher.nome}" />`;

  const name = html.createElementWithClasses("div", "name");
  name.textContent = teacher.nome;

  const office = html.createElementWithClasses("div", "office");
  office.textContent = teacher.funcaoServidor.nome + "(a)";

  teacherInfos.appendChild(photo);
  teacherInfos.appendChild(name);
  teacherInfos.appendChild(office);

  const containerCourses = html.createElementWithClasses(
    "div",
    "container-courses"
  );

  const h2 = html.createElementWithClasses("h2");
  h2.textContent = `As disciplinas que ${teacher.nome} ministra`;

  const ul = html.createElementWithClasses("ul", "list-courses");
  const disciplinas = teacher.disciplinas.avaliacao.disciplina;

  if (disciplinas.length > 0) {
    disciplinas.map((disciplina) => {
      ul.innerHTML += `<li>${disciplina.nome}</li>`;
    });
  } else {
    ul.innerHTML += `<li>${disciplinas.nome}</li>`;
  }

  containerCourses.appendChild(h2);
  containerCourses.appendChild(ul);

  teacherDetails.appendChild(teacherInfos);
  teacherDetails.appendChild(containerCourses);

  const teacherAssessments = html.createElementWithClasses(
    "div",
    "teacher-assessments"
  );

  const assessmentsControl = html.createElementWithClasses(
    "div",
    "assessments-control"
  );
  assessmentsControl.innerHTML = `
    <form>
      <input
        type="search"
        name="search"
        id="search"
        autocomplete="off"
        placeholder="Buscar Disciplina"
      />
      <div>
        <input type="date" id="start-date" name="start-date" />
        <input type="date" id="end-date" name="end-date" />
        <input type="submit" class="btn-site btn-reset" value="Resetar" />
        <input type="submit" class="btn-site" value="Buscar" />
      </div>
    </form>
  `;
  teacherAssessments.appendChild(assessmentsControl);

  const assessmentsContent = html.createElementWithClasses(
    "div",
    "assessments-content"
  );

  const buttonBack = html.createElementWithClasses(
    "button",
    "btn-site",
    "btn-back"
  );
  buttonBack.innerHTML = `
  <i class="bi bi-arrow-left"></i>
  `;

  container.appendChild(buttonBack);

  const notFoundMessage = html.createElementWithClasses(
    "div",
    "container-not-found-message"
  );

  notFoundMessage.innerHTML = `
  <div id="not-found-message" class="hide"></div>
  `;
  assessmentsContent.appendChild(notFoundMessage);

  if (disciplinas.length > 0) {
    disciplinas.map((assessment) => {
      const boxAssessments = generatetAssessments(assessment);
      assessmentsContent.appendChild(boxAssessments);
    });
  } else {
    const boxAssessments = generatetAssessments(disciplinas);
    assessmentsContent.appendChild(boxAssessments);
  }

  teacherAssessments.appendChild(assessmentsContent);

  containerTeacher.appendChild(teacherDetails);
  containerTeacher.appendChild(teacherAssessments);
  container.appendChild(containerTeacher);

  SetupSearch.searchName();
  PageEffects.applyEntryAnimation(".box-assessments", "entry");
  PageEffects.applyEntryAnimation(".list-courses li", "entry");
  PageEffects.toggleDescription(".box-assessments");
  toGoSectionListTeachers();
  filterDate();
};

const generatetAssessments = (assessment) => {
  const boxAssessments = html.createElementWithClasses(
    "div",
    "box-assessments"
  );

  boxAssessments.innerHTML = `
        <div class="assessments-details">
          <span class="name">${assessment.nome}</span>
          <div>
            <span class="workload" title="Carga Horária">${
              assessment.cargaHoraria + " Horas"
            }</span>
            <span class="code" title="código">${"#" + assessment.codigo}</span>
            <span class="arrow-down">
              <i class="bi bi-arrow-down-short"></i>
            </span>
          </div>
        </div>

        <div class="description">
        ${assessment.descricao}
        </div>
        <div class="dates">
          <span class="date-start">${assessment.dataInicio}</span>
          <span class="date-end">${assessment.dataFim}</span>
        </div>
    `;

  return boxAssessments;
};

/**---------{Iniciar}----------**/
function init() {
  getAllTeachers();
  generateSectionListTeachers();
}
init();
