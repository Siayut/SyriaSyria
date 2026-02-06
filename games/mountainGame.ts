import { UiUtil } from "../util/UiUtil";

export class MountainGame {
    private static readonly HIGHEST_MOUNTAIN = "Mount Herman";
    private static readonly LOWEST_MOUNTAIN = "Lake Tiberias";

    public onSubmit(): void {
        const highestInputElement = document.getElementById("highest-input") as HTMLInputElement;
        const lowestInputElement = document.getElementById("lowest-input") as HTMLInputElement;

        const highestAnswer = highestInputElement.value.trim().toLowerCase();
        const lowestAnswer = lowestInputElement.value.trim().toLowerCase();

        const isHighestCorrect = highestAnswer === MountainGame.HIGHEST_MOUNTAIN.toLowerCase();
        const isLowestCorrect = lowestAnswer === MountainGame.LOWEST_MOUNTAIN.toLowerCase();

        let message: string;
        if (isHighestCorrect && isLowestCorrect) {
            message = "Both answers are correct!";
        } else if (isHighestCorrect) {
            message = "The highest point answer is correct, but the lowest point answer is incorrect.";
        } else if (isLowestCorrect) {
            message = "The lowest point answer is correct, but the highest point answer is incorrect.";
        } else {
            message = "Both answers are incorrect.";
        }

        const popup = UiUtil.createResultPopup(
            message,
            "Continue", () => document.location.href = "../index.html"
        );
        document.body.appendChild(popup);
    }
}
