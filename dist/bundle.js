var SyriaSyria = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // src/index.ts
  var index_exports = {};
  __export(index_exports, {
    BorderingGame: () => BorderingGame,
    CapitalGame: () => CapitalGame
  });

  // util/UiUtil.ts
  var UiUtil = class {
    static createResultPopup(message, buttonText, buttonOnClick) {
      const resultInputBlocker = document.createElement("div");
      resultInputBlocker.classList.add("resultInputBlocker", "centered");
      const resultPopup = document.createElement("div");
      resultPopup.className = "resultPopup";
      resultInputBlocker.appendChild(resultPopup);
      const resultText = document.createElement("p");
      resultText.innerText = message;
      resultPopup.appendChild(resultText);
      const closeButton = document.createElement("button");
      closeButton.innerText = buttonText;
      closeButton.onclick = buttonOnClick;
      closeButton.className = "closeButton";
      resultPopup.appendChild(closeButton);
      return resultInputBlocker;
    }
  };

  // games/borderingGame.ts
  var _BorderingGame = class _BorderingGame {
    constructor() {
      __publicField(this, "_answerContainer");
      __publicField(this, "_answerInputElements", []);
      this._answerContainer = document.getElementById("answerContainer");
      this.updateAnswerInputCount();
    }
    createAnswerInput() {
      const input = document.createElement("input");
      input.type = "text";
      this._answerContainer.appendChild(input);
      this._answerInputElements.push(input);
      this.updateAnswerInputCount();
      return input;
    }
    removeAnswerInput() {
      const input = this._answerInputElements.pop();
      if (input) {
        this._answerContainer.removeChild(input);
        this.updateAnswerInputCount();
      }
    }
    updateAnswerInputCount() {
      const answerCountInputElement = document.getElementById("answerCountInput");
      answerCountInputElement.value = this._answerInputElements.length.toString();
    }
    onUpPressed() {
      if (this._answerInputElements.length >= _BorderingGame.MAX_ANSWERS) {
        return;
      }
      this.createAnswerInput();
    }
    onDownPressed() {
      this.removeAnswerInput();
    }
    onAnswerCountChanged() {
      const answerCountInputElement = document.getElementById("answerCountInput");
      let desiredCount = parseInt(answerCountInputElement.value);
      if (isNaN(desiredCount) || desiredCount < 0) {
        return;
      }
      if (desiredCount > _BorderingGame.MAX_ANSWERS) {
        desiredCount = _BorderingGame.MAX_ANSWERS;
      }
      while (this._answerInputElements.length < desiredCount) {
        this.createAnswerInput();
      }
      while (this._answerInputElements.length > desiredCount) {
        this.removeAnswerInput();
      }
      this.updateAnswerInputCount();
    }
    onSubmit() {
      let correctCount = 0;
      const userAnswers = this._answerInputElements.map((input) => input.value.trim().toLowerCase());
      for (const correctAnswer of _BorderingGame.CORRECT_ANSWERS) {
        if (userAnswers.includes(correctAnswer)) {
          correctCount++;
        }
      }
      const popup = UiUtil.createResultPopup(
        `You got ${correctCount} out of ${userAnswers.length} correct!`,
        "Continue",
        () => document.location.href = "../index.html"
      );
      document.body.appendChild(popup);
    }
  };
  __publicField(_BorderingGame, "MAX_ANSWERS", 15);
  __publicField(_BorderingGame, "CORRECT_ANSWERS", [
    "turkey",
    "iraq",
    "jordan",
    "israel",
    "lebanon"
  ]);
  var BorderingGame = _BorderingGame;

  // games/capitalGame.ts
  var _CapitalGame = class _CapitalGame {
    onAnswerChange() {
      const errorDiv = document.getElementById("error-text");
      errorDiv.textContent = "";
    }
    onSubmit() {
      const answerSelectElement = document.getElementById("capital-select");
      const selectValue = answerSelectElement.value.trim().toLowerCase();
      const answerInputElement = document.getElementById("capital-input");
      const inputValue = answerInputElement.value.trim().toLowerCase();
      if (selectValue && inputValue) {
        const errorDiv = document.getElementById("error-text");
        errorDiv.textContent = "Please answer using either the dropdown or the text input, not both.";
        return;
      }
      const finalAnswer = selectValue || inputValue;
      const popup = UiUtil.createResultPopup(
        finalAnswer === _CapitalGame.CORRECT_ANSWER ? "Correct!" : "Incorrect!",
        "Continue",
        () => document.location.href = "../index.html"
      );
      document.body.appendChild(popup);
    }
  };
  __publicField(_CapitalGame, "CORRECT_ANSWER", "damascus");
  var CapitalGame = _CapitalGame;
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=bundle.js.map
