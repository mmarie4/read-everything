const store = {
    get: (key: string) => {
        const item = localStorage.getItem(key)
        if (item) {
            return JSON.parse(item)
        }
    },
    save: (key: string, object: object) => {
        localStorage.setItem(key, JSON.stringify(object));
    },
    remove: (key: string) => {
        localStorage.removeItem(key);
    },

    keys: {
    }
}

export default store;