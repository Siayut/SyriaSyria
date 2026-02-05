import { UiUtil } from "../util/UiUtil";

export class CapitalGame {
    private static readonly CORRECT_ANSWER = "damascus";

    public onAnswerChange(): void {
        const errorDiv = document.getElementById("error-text") as HTMLDivElement;
        errorDiv.textContent = "";
    }

    public onSubmit(): void {
        const answerSelectElement = document.getElementById("capital-select") as HTMLSelectElement;
        const selectValue = answerSelectElement.value.trim().toLowerCase();

        const answerInputElement = document.getElementById("capital-input") as HTMLInputElement;
        const inputValue = answerInputElement.value.trim().toLowerCase();

        if (selectValue && inputValue) {
            const errorDiv = document.getElementById("error-text") as HTMLDivElement;
            errorDiv.textContent = "Please answer using either the dropdown or the text input, not both.";
            return;
        }

        const finalAnswer = selectValue || inputValue;

        const popup = UiUtil.createResultPopup(
            finalAnswer === CapitalGame.CORRECT_ANSWER ? "Correct!" : "Incorrect!",
            "Continue", () => document.location.href = "../index.html"
        );
        document.body.appendChild(popup);
    }
}
