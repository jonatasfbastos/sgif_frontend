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

const assessmentsDetails = html.getAll(".box-assessments");

assessmentsDetails.forEach((assessment) => {
  assessment.addEventListener("click", () => {
    const description = assessment.querySelector(".description");
    description.classList.toggle("active");
  });
});

const container = html.get(".container main");

/**---------{Limpar Container}----------**/
const cleanBox = () => {
  container.innerHTML = "";
};

/**---------{Seção para escolha do professor }----------**/
const generateSectionListTeachers = (data) => {
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
  teacherList.innerHTML = `
      <form>
        <label for="teacher">Escolha um Professor:</label>
        <select id="teacher" name="teacher">
          <option value="professor1">Professores</option>
          <option value="professor2">Professor 2</option>
          <option value="professor3">Professor 3</option>
        </select>
        <button class="btn-site">Analisar</button>
      </form>
  `;

  containerTeacherList.appendChild(teacherSelection);
  containerTeacherList.appendChild(teacherList);
  container.appendChild(containerTeacherList);
};






/**---------{Chamadas a API}----------**/
const endpoint = "professores";

const getAllTeachers = () => {
  get(endpoint)
    .then((data) => {
      generateSectionListTeachers(data);
      console.log("Data ", data);
      return data;
    })
    .catch((error) => {
      console.log("Error ", error);
    });
};

function init() {
  getAllTeachers();
}
init();
