import { UiUtil } from "../util/UiUtil";

export class ContinentGame {
    private static readonly CORRECT_ANSWER = "asia";

    public onClick(answer: string): void {
        let message: string;
        if (answer === ContinentGame.CORRECT_ANSWER) {
            message = "Correct!";
        } else {
            message = "Incorrect!";
        }
        const popup = UiUtil.createResultPopup(
            message,
            "Continue", () => document.location.href = "../index.html"
        );
        document.body.appendChild(popup);
    }
}