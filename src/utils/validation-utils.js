export function typeGuard(val, expectedType, errorMessage=undefined, acceptsEmptyObj = false, returnBoolOnError = true) {
    if (typeof errorMessage !== "string" && !(errorMessage instanceof String)) {
        console.warn("Warning: Invalid error message. Default message will be used.");
        errorMessage = `Error: ${val} is not of type ${expectedType}`;
    }

    const throwError = returnBoolOnError
        ? () => false
        : () => { throw new TypeError(errorMessage); };

    switch (expectedType.toLowerCase()) {
        case "string": {
            const isString = typeof val === "string" || val instanceof String;
            const conclusion = acceptsEmptyObj ? isString : isString && val.trim() !== "";
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
            const conclusion = acceptsEmptyObj ? isArray : isArray && val.length !== 0;
            if (!conclusion) return throwError();
            return true;
        }

        case "function": {
            const isFunction = typeof val === "function";
            if (!isFunction) return throwError();
            return true;
        }

        default:
            throw new Error(`Error: Invalid expected type "${expectedType}"`);
    }
}