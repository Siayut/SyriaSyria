import { UiUtil } from "../util/UiUtil";

export class BorderingGame {
    private static readonly MAX_ANSWERS = 15;
    private static readonly CORRECT_ANSWERS = [
        "turkey",
        "iraq",
        "jordan",
        "israel",
        "lebanon",
    ];

    private _answerContainer: HTMLElement;
    private _answerInputElements: HTMLInputElement[] = [];


    public constructor() {
        this._answerContainer = document.getElementById("answerContainer")!
        this.updateAnswerInputCount();
    }

    private createAnswerInput(): HTMLInputElement {
        const input = document.createElement("input");
        input.type = "text";
        this._answerContainer.appendChild(input);
        this._answerInputElements.push(input);
        this.updateAnswerInputCount();
        return input;
    }

    private removeAnswerInput(): void {
        const input = this._answerInputElements.pop();
        if (input) {
            this._answerContainer.removeChild(input);
            this.updateAnswerInputCount();
        }
    }

    private updateAnswerInputCount(): void {
        const answerCountInputElement = document.getElementById("answerCountInput") as HTMLInputElement;
        answerCountInputElement.value = this._answerInputElements.length.toString();
    }

    public onUpPressed(): void {
        if (this._answerInputElements.length >= BorderingGame.MAX_ANSWERS) {
            return;
        }
        this.createAnswerInput();
    }

    public onDownPressed(): void {
        this.removeAnswerInput();
    }

    public onAnswerCountChanged(): void {
        const answerCountInputElement = document.getElementById("answerCountInput") as HTMLInputElement;
        let desiredCount = parseInt(answerCountInputElement.value);
        if (isNaN(desiredCount) || desiredCount < 0) {
            return;
        }
        if (desiredCount > BorderingGame.MAX_ANSWERS) {
            desiredCount = BorderingGame.MAX_ANSWERS;
        }

        while (this._answerInputElements.length < desiredCount) {
            this.createAnswerInput();
        }
        while (this._answerInputElements.length > desiredCount) {
            this.removeAnswerInput();
        }
        this.updateAnswerInputCount();
    }

    public onSubmit(): void {
        let correctCount = 0;
        const userAnswers = this._answerInputElements.map(input => input.value.trim().toLowerCase());
        for (const correctAnswer of BorderingGame.CORRECT_ANSWERS) {
            if (userAnswers.includes(correctAnswer)) {
                correctCount++;
            }
        }

        const popup = UiUtil.createResultPopup(
            `You got ${correctCount} out of ${userAnswers.length} correct!`,
            "Continue", () => document.location.href = "../index.html"
        );
        document.body.appendChild(popup);
    }
}
