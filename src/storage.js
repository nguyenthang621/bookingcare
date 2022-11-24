export const classStorage = {
    getItemStorage: (name) => {
        let result = localStorage.getItem(name);
        return result;
    },
    setItemStorage: (name, value) => {
        localStorage.setItem(name, value);
        return;
    },
    removeItemStorage: (name) => {
        localStorage.removeItem(name);
        return;
    },
};
