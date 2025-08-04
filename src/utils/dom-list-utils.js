import {typeGuard} from './validation-utils.js';

import {createNewDomElement} from './dom-creation-utils.js';

export function addListElement(listId, newElement, numbersValid=false) {

    typeGuard(listId, "string", "Error: List Id must be a String");

    const list = document.getElementById(listId);

    if (!list) {
        console.error("Error : No Element Found With Id:", listId);
        return;
    }


    if (typeGuard(newElement, "object")) {

        for (const element in newElement) {
            const elementId = newElement[element];

            try{
                const domElement = createNewDomElement("li", element, elementId );
                list.append(domElement);

            }catch(error){
                console.warn(`Warning : Skipping ${element} element with id ${elementId} as its not a valid entry`);
            }

        }
        return;
    }


    const elementsToAdd = Array.isArray(newElement)
        ? newElement
        : [newElement];

    if (elementsToAdd.length === 0) {
        console.error("Error : Invalid Input New Element Must Be String Or An Array Of Length > 0");
    }


    elementsToAdd.forEach((element, index) => {

        const textContent = (numbersValid && typeGuard(element, "number")) ? `${element}` : element

        try{
            const domElement = createNewDomElement("li", textContent)
            list.append(domElement)

        } catch(error){
            console.warn(`Warning : Element no ${index + 1} skipped as it's not a Valid string , Element : ${textContent}`)
        }
    })

}


export function removeListElement(listId, referenceType , elementsReference){


    typeGuard(listId, "string", "Error: List Id must be a String");
    typeGuard(referenceType, "string", "Error: Reference Type must be a String");

    const list = document.getElementById(listId);

    if (!list) {
        console.error("Error : No Element Found With Id:", listId);
        return;
    }

    if (referenceType === "id" && typeGuard(elementsReference, "string")) {

        let element = document.getElementById(elementsReference)

        if (!element){
            console.error("Error : No Element Found With Id:", elementsReference);
            return
        }

        element.remove()
    }


    const listElements = list.children;

    if ((referenceType === "range" && Array.isArray(elementsReference)) || (referenceType === "index" && Number.isFinite(elementsReference))) {

        const [ending_index, starting_index]  = Array.isArray(elementsReference) ? [elementsReference[1] - 1, elementsReference[0] - 1]  : [elementsReference - 1, elementsReference - 1 ];

        if ((ending_index >= listElements.length || starting_index < 0) || ending_index < starting_index  ) {
            console.error("Error: Index out of bounds");
            return;
        }

        for (let i = ending_index; i >= starting_index ; i--) {
            listElements[i].remove();
        }


    } else if (referenceType === "filter" && typeof elementsReference === "function"){
        const filter = elementsReference;
        const ending_index = listElements.length - 1;
        const starting_index = 0;

        for (let i = ending_index; i >= starting_index ; i--) {
            try {
                if (filter(listElements[i])){
                    listElements[i].remove();
                }
            } catch (error) {
                console.warn(`Filter function failed at index ${i}:`, error.message);
            }
        }
    } else{
        console.error("Enter a Valid Reference Type reference by ( id: str , index: int , range : array [start , end] both inclusive , filter: condition() return true/false )")
    }
}