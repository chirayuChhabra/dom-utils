const {makeGlobal} = require('./make-global.js');

/**
 * Validates the type of a given value and throws a TypeError if it does not match the expected type.
 *
 * @param {*} val - The value to validate.
 * @param {string} expectedType - The expected type of the value. Supported values: "string", "number", "array", "function".
 * @param {string} [errorMessage=undefined] - An optional custom error message. If not provided or invalid, a default message will be used.
 * @param {boolean} [acceptsEmptyObj=false] - If true, allows empty strings and empty arrays as valid values.
 *
 * @throws {TypeError} If the value does not match the expected type or violates the empty value condition.
 * @throws {Error} If an unsupported expected type is provided.
 *
 * @example
 * typeGuard("hello", "string"); // Passes
 * typeGuard("", "string"); // Throws TypeError
 * typeGuard("", "string", true); // Passes
 * typeGuard(42, "number"); // Passes
 * typeGuard(NaN, "number"); // Throws TypeError
 * typeGuard([], "array"); // Throws TypeError
 * typeGuard([], "array", true); // Passes
 * typeGuard(() => {}, "function"); // Passes
 */
function typeGuard(val, expectedType, errorMessage, acceptsEmptyObj=false){

    if (!(typeof errorMessage === "string" || errorMessage instanceof String)){
        console.warn("Warning : Error message Provided is Invalid, Default Message is Set");
        errorMessage = `Error : ${val} is not type of ${expectedType}`

    }

    const throwError = () => { throw new TypeError(errorMessage); }

    switch (expectedType.toLowerCase()) {

        case "string": {
            const isString = (typeof val === "string" || val instanceof String);
            const conclusion = acceptsEmptyObj ? isString : (isString && (val.trim() !== ""));
            if (!conclusion) throwError();
            break;
        }

        case "number":{
            val =  val instanceof Number ? val.valueOf() : val  // converting from Number object  to Primitive Value as needed.
            const isNumber = (Number.isFinite(val));
            if (!isNumber) throwError();
            break;
        }

        case "array":{
            const isArray = Array.isArray(val) ;
            const conclusion = acceptsEmptyObj ? isArray : (isArray && (val.length !== 0));
            if (!conclusion) throwError();
            break;
        }

        case "function":{
            const isFunction = (typeof val === "function");
            if (!isFunction) throwError();
            break;
        }
    
        default:
            throw new Error(`Error: Invalid Expected Type ${expectedType}`);
    }
}


validationUtils = {typeGuard}
makeGlobal(validationUtils, "validationUtils")
