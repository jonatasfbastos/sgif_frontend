const assessmentsDetails = document.querySelectorAll(".box-assessments");

assessmentsDetails.forEach((assessment) => {
  assessment.addEventListener("click", () => {
    const description = assessment.querySelector(".description");
    description.classList.toggle("active");
  });
});
