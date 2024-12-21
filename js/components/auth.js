class Auth {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.isLogin = true;
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            <div class="auth-form">
                <h2>${this.isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
                <form id="authForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        ${this.isLogin ? 'Sign In' : 'Sign Up'}
                    </button>
                </form>
                <div class="auth-switch">
                    <button id="authToggle">
                        ${this.isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                    </button>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const form = document.getElementById('authForm');
        const toggleBtn = document.getElementById('authToggle');

        form.addEventListener('submit', (e) => this.handleSubmit(e));
        toggleBtn.addEventListener('click', () => {
            this.isLogin = !this.isLogin;
            this.render();
            this.attachEventListeners();
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (!Validators.email(email)) {
            alert('Please enter a valid email');
            return;
        }

        if (!Validators.password(password)) {
            alert('Password must be at least 6 characters');
            return;
        }

        // In a real app, this would be an API call
        const user = mockData.students[email];
        if (this.isLogin) {
            if (user && user.password === password) {
                Storage.setUser(user);
                window.dispatchEvent(new CustomEvent('auth:success'));
            } else {
                alert('Invalid credentials');
            }
        } else {
            alert('Sign up functionality would be implemented here');
        }
    }
}