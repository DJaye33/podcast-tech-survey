const surveyQuestion = document.querySelectorAll(".survey-question");
const notFirstQuestions = document.querySelectorAll(".not-first-question");
const questionOneReplies = document.querySelectorAll(".question-one");
const questionTwoReplies = document.querySelectorAll(".question-two");
const questionThreeReplies = document.querySelectorAll(".question-three");
const overlayOptionsSummary = document.querySelector(".dialogue-summary");
const overlayOptionsHeading = document.querySelector(".dialogue-heading");
const errorSpanFirst = document.querySelectorAll(".error")[0];
const errorSpanSecond = document.querySelectorAll(".error")[1];
const overlay = document.querySelector("#overlay");
const dialogue = document.querySelector(".dialogue");
const dialogueOneSmall = document.querySelector(".dialogue-one-small");
const dialogueOneMid = document.querySelector(".dialogue-one-mid");
const dialogueOneLrg = document.querySelector(".dialogue-one-lrg");
const dialogueTwoSmall = document.querySelector(".dialogue-two-small");
const dialogueTwoMid = document.querySelector(".dialogue-two-mid");
const dialogueTwoLrg = document.querySelector(".dialogue-two-lrg");

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

// question one replies
questionOneReplies.forEach((replies, idx) =>
  replies.addEventListener("click", function () {
    this.classList.add("active");
    document
      .querySelector("#snap-scroll")
      .scrollIntoView({ behavior: "smooth" });
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
      // close first question button replies after selection
      surveyQuestion[0].nextElementSibling.classList.remove("active");
      surveyQuestion[0].lastElementChild.style.transform = "initial";
      // opens next question button
      surveyQuestion[1].nextElementSibling.classList.add("active");
    }
  })
);

// one or multi
let cameraOption;
let budgetSize;

const verifyCameraOption = () => {
  if (cameraOption === "one") {
    questionThreeReplies[0].textContent = "$350 - $600";
    questionThreeReplies[1].textContent = "$750 - $900";
    questionThreeReplies[2].textContent = "$2000 - $4000";
  } else {
    questionThreeReplies[0].textContent = "$400 - $700";
    questionThreeReplies[1].textContent = "$1500 - $3000";
    questionThreeReplies[2].textContent = "$4000 - $7500";
  }
};

// question two replies
questionTwoReplies.forEach((replies, idx) =>
  replies.addEventListener("click", function () {
    this.classList.add("active");
    // checks for first reply
    if (idx === 0) {
      cameraOption = "one";
      verifyCameraOption();
      // close replies after selection
      surveyQuestion[1].nextElementSibling.classList.remove("active");
      errorSpanSecond.style.display = "none";
      // opens question three replies
      surveyQuestion[2].nextElementSibling.classList.add("active");
      // checks for second reply
    } else if (idx === 1) {
      cameraOption = "multi";
      verifyCameraOption();
      surveyQuestion[1].nextElementSibling.classList.remove("active");
      errorSpanSecond.style.display = "none";
      // opens question three replies
      surveyQuestion[2].nextElementSibling.classList.add("active");
      // deals with last reply
    }

    console.log(cameraOption);
  })
);

questionThreeReplies.forEach((reply, idx) =>
  reply.addEventListener("click", function () {
    if (cameraOption === "one" && idx === 0) {
      dialogue.classList.add("inactive");
      dialogueOneSmall.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    } else if (cameraOption === "one" && idx === 1) {
      dialogue.classList.add("inactive");
      dialogueOneSmall.classList.add("inactive");
      dialogueOneMid.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    } else if (cameraOption === "one" && idx === 2) {
      dialogue.classList.add("inactive");
      dialogueOneSmall.classList.add("inactive");
      dialogueOneMid.classList.add("inactive");
      dialogueOneLrg.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    } else if (cameraOption === "multi" && idx === 0) {
      dialogue.classList.add("inactive");
      dialogueOneSmall.classList.add("inactive");
      dialogueOneMid.classList.add("inactive");
      dialogueOneLrg.classList.add("inactive");
      dialogueTwoSmall.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    } else if (cameraOption === "multi" && idx === 1) {
      dialogue.classList.add("inactive");
      dialogueOneSmall.classList.add("inactive");
      dialogueOneMid.classList.add("inactive");
      dialogueOneLrg.classList.add("inactive");
      dialogueTwoSmall.classList.add("inactive");
      dialogueTwoMid.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    } else {
      dialogue.classList.add("inactive");
      dialogueOneSmall.classList.add("inactive");
      dialogueOneMid.classList.add("inactive");
      dialogueOneLrg.classList.add("inactive");
      dialogueTwoSmall.classList.add("inactive");
      dialogueTwoMid.classList.add("inactive");
      dialogueTwoLrg.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
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
