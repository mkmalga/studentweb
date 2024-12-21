class App {
    constructor() {
        this.auth = new Auth('auth-container');
        this.dashboard = new Dashboard('dashboard-container');
        this.init();
    }

    init() {
        this.checkAuth();
        this.attachEventListeners();
    }

    checkAuth() {
        const user = Storage.getUser();
        if (user) {
            this.showDashboard();
        } else {
            this.showAuth();
        }
    }

    showAuth() {
        const authContainer = document.getElementById('auth-container');
        const dashboardContainer = document.getElementById('dashboard-container');

        if (authContainer && dashboardContainer) {
            authContainer.classList.remove('hidden');
            dashboardContainer.classList.add('hidden');
        }

        this.auth.init();
    }

    showDashboard() {
        const authContainer = document.getElementById('auth-container');
        const dashboardContainer = document.getElementById('dashboard-container');

        if (authContainer && dashboardContainer) {
            authContainer.classList.add('hidden');
            dashboardContainer.classList.remove('hidden');
        }

        this.dashboard.init(); // Initializes the Dashboard and its listeners
    }

    attachEventListeners() {
        // Listen for the custom events for login and logout
        window.addEventListener('auth:success', () => this.showDashboard());
        window.addEventListener('auth:logout', () => {
            this.showAuth();
            this.dashboard.currentSection = 'home'; // Reset to the default section on logout
        });
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
