let globalAny: any = global;

export const setGlobal = (x: Object) => {
    if (typeof globalAny.data === "undefined") {
        globalAny.data = {};
    }
    Object.assign(globalAny.data, x)
}

export const getGlobal = (x: string) => {
    if (typeof globalAny.data === "undefined") {
        globalAny.data = {};
    }
    return globalAny.data[x];
}