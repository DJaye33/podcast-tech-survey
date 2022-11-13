const surveyQuestion = document.querySelectorAll(".survey-question");
const notFirstQuestions = document.querySelectorAll(".not-first-question");
const questionOneReplies = document.querySelectorAll(".question-one");
const overlayOptionsSummary = document.querySelector(".dialogue-summary");
const overlayOptionsHeading = document.querySelector(".dialogue-heading");
const errorSpanFirst = document.querySelectorAll(".error")[0];
const overlay = document.querySelector("#overlay");

// make first question active on load
window.addEventListener("load", function () {
  surveyQuestion.forEach((question) => {
    if (question.classList.contains("active")) {
      question.nextElementSibling.classList.add("active");
      question.lastElementChild.style.transform = "rotate(180deg)";
    }
  });
});

let isFirstQuestionAnswered = false;

// can be called to check if first question has been answered
const checkFirstQuestionAnswered = () => {
  notFirstQuestions.forEach((question) => {
    if (isFirstQuestionAnswered) {
      question.removeAttribute("disabled");
    } else {
      question.setAttribute("disabled", "");
    }
  });
};

checkFirstQuestionAnswered();

questionOneReplies.forEach((replies, idx) =>
  replies.addEventListener("click", function () {
    this.classList.add("active");
    // checks for first two replies
    if (idx <= 1) {
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
      // checks for third reply
    } else if (idx === 2) {
      overlayOptionsSummary.textContent = "No Problem!";
      overlayOptionsHeading.textContent = "We can help!";
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
      // deals with last reply
    } else {
      isFirstQuestionAnswered = true;
      checkFirstQuestionAnswered();
      errorSpanFirst.style.display = "none";
      surveyQuestion[0].nextElementSibling.classList.remove("active");
      surveyQuestion[0].lastElementChild.style.transform = "initial";
      surveyQuestion[1].nextElementSibling.classList.add("active");
    }
  })
);

// control question active states with click event
surveyQuestion.forEach((question) => {
  question.addEventListener("click", function () {
    if (this.nextElementSibling.classList.contains("active")) {
      this.nextElementSibling.classList.remove("active");
      this.lastElementChild.style.transform = "initial";
      console.dir(question);
    } else {
      this.nextElementSibling.classList.add("active");
      this.lastElementChild.style.transform = "rotate(180deg)";
    }
  });
});
