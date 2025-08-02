
/**
 * Registers a module to the global object
 * @param {Object} modules - the module to register
 * @param {string} globalName - the name to register the module under
 * @throws {Error} if the module is not an object
 * @throws {Error} if no suitable global object is found
 */
function makeGlobal(modules, globalName) {
    if (modules === null || typeof modules !== 'object' || modules.constructor !== Object){
        throw new Error("Module must be an Object");
    }
    if (typeof module !== "undefined" && module.exports) {
        module.exports = modules;                 // Export the WHOLE object for Node.js
    } else if (typeof globalThis !== "undefined") {
        globalThis[globalName] = modules;         // Attach to global object in browser/any env
    } else if (typeof window !== "undefined") {
        window[globalName] = modules;
    } else if (typeof self !== "undefined") {
        self[globalName] = modules;
    } else {
        throw new Error("No suitable global object found for export");
    }
}

const universalModules = {makeGlobal}
makeGlobal(universalModules, "makeGlobal");  // The utility registers itself
