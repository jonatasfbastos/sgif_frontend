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

/**---------{}----------**/
const endpoint = "professor";

const getAllTeachers = () => {
  get(endpoint)
    .then((data) => {
      console.log("Data ", data);
      //renderizar todos os professores
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
