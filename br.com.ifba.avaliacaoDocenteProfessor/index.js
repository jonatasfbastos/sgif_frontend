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

/**---------{Limpar Container}----------**/
const cleanBox = () => {
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
    toGoSectionListAssessments(professores,selectedProfessor);
  });

  form.appendChild(label);
  form.appendChild(select);
  form.appendChild(button);

  teacherList.appendChild(form);

  containerTeacherList.appendChild(teacherSelection);
  containerTeacherList.appendChild(teacherList);
  container.appendChild(containerTeacherList);
};

/**---------{Search}----------**/
function setupSearch() {
  const searchInput = html.get("#search");
  const assessmentsDetails = html.getAll(".box-assessments");

  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.trim().toLowerCase();

    assessmentsDetails.forEach((assessment) => {
      const name = assessment.querySelector(".name").textContent.toLowerCase();
      const shouldShow = !!name.includes(searchTerm);

      // Defina a visibilidade com base no valor de shouldShow
      assessment.style.display = shouldShow ? "block" : "none";
    });
  });
}

const toGoSectionListAssessments = (professores, professor) => {
  if (!professor) {
    return;
  }

  const teacher = professores.filter((teacher) => teacher.id === professor);
  if (teacher) {
    cleanBox();
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
        placeholder="Buscar Disciplina"
      />
      <input type="date" name="start-date" />
      <input type="date" name="end-date" />
      <input type="submit" class="btn-site" value="Buscar" />
    </form>
  `;
  teacherAssessments.appendChild(assessmentsControl);

  const assessmentsContent = html.createElementWithClasses(
    "div",
    "assessments-content"
  );

  if (disciplinas.length > 0) {
    console.log("ois");
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
  setupSearch();
  effcectDownBox();
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
    `;

  return boxAssessments;
};

function effcectDownBox() {
  const assessmentsDetails = html.getAll(".box-assessments");
  assessmentsDetails.forEach((assessment) => {
    assessment.addEventListener("click", () => {
      const description = assessment.querySelector(".description");
      description.classList.toggle("active");
    });
  });
}

/**---------{Iniciar}----------**/
function init() {
  getAllTeachers();
  generateSectionListTeachers();
}
init();
