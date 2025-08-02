
function isReallyString(val) {
    return typeof val === "string" || val instanceof String;
  }


/**
 * Throws if val is not of the expected type.
 * @param {*} val - The value to check.
 * @param {string} expectedType - "string", "number", "array", "function".
 * @param {string} errorMessage - Custom error message if the check fails, if no or invalid error message is provided , will set to default val is not type of expected type.
 */
function typeGuard(val, expectedType, errorMessage){

    if (!(typeof errorMessage === "string" || errorMessage instanceof String)){
        console.warn("Warning : Error message Provided is Invalid, Default Message is Set");
        errorMessage = `Error : ${val} is not type of ${expectedType}`

    }

    const throwError = () => { throw new TypeError(errorMessage); }

    switch (expectedType.toLowerCase()) {

        case "string":
            const isString = (typeof val === "string") || (val instanceof String);
            if (!isString) throwError();
            break;

        case "number":
            val =  val instanceof Number ? val.valueOf() : val  // converting from Number object  to Primitive Value as needed.
            const isNumber = (Number.isFinite(val));
            if (!isNumber) throwError();
            break;

        case "array":
            const isArray = Array.isArray(val) ;
            if (!isArray) throwError();
            break;
        
        case "function":
            const isFunction = (typeof val === "function");
            if (!isFunction) throwError();
            break;
    
        default:
            throw new Error(`Error: Invalid Expected Type ${expectedType}`);
    }
}

/**
 * Adds new elements to a list element.
 * @param {string} listId - The id of the list element to add elements to.
 * @param {string|number|Array<string|number>} newElement - The new element to add to the list or an array of new elements.
 * @param {boolean} [numbersValid=false] - Whether the numbers are valid for adding to the list, defaults to false.
 * @returns {void}
 */
function addListElement(listId, newElement, numbersValid=false){
    
    if (!isReallyString(listId)){
        console.error("Error : List Id Must Be A String");
        return;
    }
    const list = document.getElementById(listId);

    if (!list) {
        console.error("Error : No Element Found With Id:", listId);return;}const elementsToAdd = Array.isArray(newElement) ? newElement : [newElement]
    if(elementsToAdd.length > 0){
        elementsToAdd.forEach( (element, index) => {
            const newListElement = document.createElement("li");

            const workingElement = (numbersValid && Number.isFinite(element)) ? `${element}` : element

            if ((isReallyString(workingElement) && workingElement.trim() !== "")){
                newListElement.innerText = workingElement;
                list.appendChild(newListElement);
            }else {
                console.warn(`Log : Element no ${index+1} skipped as it's not a Valid string , Element : ${workingElement}`);
            }
        })
    } else{
        console.error("Error : Invalid Inputs List Id Must Be A Valid String And New Element Must Be String Or An Array Of Length > 0");
    }
}


/**
 * Removes elements from a list element based on reference type and reference.
 * @param {string} listId - The id of the list element to remove elements from.
 * @param {string} referenceType - The type of reference, can be one of "id", "index", "range", or "filter".
 * @param {string|number|Array<number>|function} elementsReference - The reference to remove elements.
 *      - If referenceType is "id", elementsReference must be the id of the element to remove.
 *      - If referenceType is "index", elementsReference must be the 1 based index of the element to remove.
 *      - If referenceType is "range", elementsReference must be an array of two numbers, the start and end index of the range of elements to remove.
 *      - If referenceType is "filter", elementsReference must be a function that takes an element and returns true if the element should be removed, false otherwise.
 * @returns {void}
 */
function removeListElement(listId, referenceType , elementsReference){


    if (!isReallyString(listId) || !isReallyString(referenceType)){
        console.error("Error : List Id and typeOf Reference Must Be A String");
        return;
    }

    const list = document.getElementById(listId);

    if (!list) {
        console.error("Error : No Element Found With Id:", listId);
        return;
    }

    if (referenceType === "id" && isReallyString(elementsReference)) {
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


