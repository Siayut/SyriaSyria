export abstract class UiUtil {
    public static createResultPopup(message: string, buttonText: string, buttonOnClick: () => void): HTMLElement {
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
}
