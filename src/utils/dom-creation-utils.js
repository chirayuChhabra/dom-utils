import {typeGuard} from "./validation-utils";


export function createNewDomElement(elementTag, elementTextContent = undefined, newElementID = undefined, newElementClass = undefined) {
    typeGuard(elementTag, "string", "Error: element tag must be a String");

    const newDomElement = document.createElement(elementTag);

    // Only set textContent if it's meaningful this will reject void elements like <br>, <img> ,etc
    if (elementTextContent && newDomElement.childNodes !== null) {
        typeGuard(elementTextContent, "string", `Error: Text content (${elementTextContent}) must be a String`);
        newDomElement.textContent = elementTextContent;
    }

    // Set ID if provided and valid/unique
    if (newElementID) {
        typeGuard(newElementID, "string", `Error: Element ID (${newElementID}) must be a String`);
        if (document.getElementById(newElementID)) {
            throw new Error(`Invalid Element ID: ${newElementID} is already registered`);
        }
        newDomElement.id = newElementID;
    }

    // Set classes if provided (handles multiple/bad whitespace with the regex, regular expression  \...\, and /s is for white spaces so \ /s+ \ one or more white spaces)
    if (newElementClass) {
        typeGuard(newElementClass, "string", `Error: Element class (${newElementClass}) must be a String`);
        const classList = newElementClass.trim().split(/\s+/);
        newDomElement.classList.add(...classList);
    }
    return newDomElement;
}