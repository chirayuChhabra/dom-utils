
export function typeGuard(val, expectedType, errorMessage=undefined, allowEmptyValues = false) {
    // If errorMessage is provided, we'll throw an error on failure
    // If no errorMessage, we'll return a boolean
    const shouldThrow = errorMessage !== undefined;
    
    // Set the default error message if not provided or invalid
    if (shouldThrow && (typeof errorMessage !== "string" && !(errorMessage instanceof String))) {
        console.warn("Warning: Invalid error message. Default message will be used.");
        errorMessage = `Error: ${val} is not of type ${expectedType}`;
    }

    const throwError = shouldThrow 
        ? () => { throw new TypeError(errorMessage) }
        : () => false;

    switch (expectedType.toLowerCase()) {
        case "string": {
            const isString = typeof val === "string" || val instanceof String;
            const conclusion = allowEmptyValues ? isString : isString && val.trim() !== "";
            if (!conclusion) return throwError();
            return true;
        }

        case "number": {
            const numVal = val instanceof Number ? val.valueOf() : val;
            const isNumber = Number.isFinite(numVal);
            if (!isNumber) return throwError();
            return true;
        }

        case "array": {
            const isArray = Array.isArray(val);
            const conclusion = allowEmptyValues ? isArray : isArray && val.length !== 0;
            if (!conclusion) return throwError();
            return true;
        }

        case "function": {
            const isFunction = typeof val === "function";
            if (!isFunction) return throwError();
            return true;
        }

        case "object": {
            const isObject = Object.prototype.toString.call(val) === "[object Object]";  // it just checks for what class the object really is Say an array obj will reflect [object Array]
            const conclusion = allowEmptyValues ? isObject : isObject && Object.keys(val).length !== 0;
            if (!conclusion) return throwError();
            return true;
        }

        default:
            throw new Error(`Error: Invalid expected type "${expectedType}"`);
    }
}