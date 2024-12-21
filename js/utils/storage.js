const Storage = {
    setUser: (user) => {
        localStorage.setItem('currentUser', JSON.stringify(user));
    },
    
    getUser: () => {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    },
    
    clearUser: () => {
        localStorage.removeItem('currentUser');
    }
};