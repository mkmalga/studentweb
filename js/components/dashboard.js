class Dashboard {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.user = Storage.getUser();
        this.currentSection = 'home';
        this.feeData = {
            tuitionFee: 5000,
            libraryFee: 200,
            laboratoryFee: 300,
            examinationFee: 250,
            developmentFee: 150,
            sportsFee: 100,
            transportationFee: 400,
            totalPaid: 3500
        };
    }

    init() {
        if (!this.user) {
            this.container.innerHTML = '<p>User not logged in. Redirecting...</p>';
            setTimeout(() => window.location.href = '/login.html', 2000);
            return;
        }
        this.render();
        this.attachEventListeners();
    }

    render() {
        this.container.innerHTML = `
            ${this.renderNavigation()}
            <div class="container">
                ${this.renderContent()}
            </div>
           
        `;
        this.attachEventListeners(); // Reattach event listeners after rendering
    }

    renderNavigation() {
        return `
            <nav class="nav-container">
                <div class="nav-content">
                    <a href="#" class="nav-logo">StudentHub</a>
                    <div class="nav-links">
                        <a href="#" data-section="home" class="nav-link ${this.currentSection === 'home' ? 'active' : ''}">Home</a>
                        <a href="#" data-section="academics" class="nav-link ${this.currentSection === 'academics' ? 'active' : ''}">Academics</a>
                        <a href="#" data-section="fees" class="nav-link ${this.currentSection === 'fees' ? 'active' : ''}">Fees</a>
                    </div>
                    <button id="logoutBtn" class="btn btn-primary">Logout</button>
                </div>
            </nav>
        `;
    }

    renderContent() {
        const sections = {
            home: this.renderHome(),
            academics: this.renderAcademics(),
            fees: this.renderFees()
        };

        return sections[this.currentSection] || sections.home;
    }

    renderHome() {
        return `
            <div id="home">
                <h1 class="text-3xl font-bold mb-6">Welcome, ${this.user.name}</h1>
                ${this.renderStatistics()}
            </div>
        `;
    }

    
 renderAcademics() {
                const mockData = {
                    subjects: [
                        { name: 'Math', grade: 'A' },
                        { name: 'Science', grade: 'B+' },
                        { name: 'History', grade: 'A-' },
                        { name: 'English', grade: 'B' },
                        { name: 'Art', grade: 'A+' },
                        { name: 'Physical Education', grade: 'A' }
                    ]
                };
            
                return `
                    <div id="academics">
                        <h2 class="text-2xl font-bold mb-6">Academic Performance</h2>
                        <div class="subjects-grid">
                            ${mockData.subjects.map(subject => this.renderSubjectCard(subject)).join('')}
                        </div>
                    </div>
                `;
            }
            
            renderSubjectCard(subject) {
                return `
                    <div class="subject-card">
                        <h3>${subject.name}</h3>
                        <p>Grade: ${subject.grade}</p>
                    </div>
                `;
            }
            
    

    renderFees() {
        const totalFees = Object.values(this.feeData).reduce((acc, val) => 
            typeof val === 'number' && val !== this.feeData.totalPaid ? acc + val : acc, 0);
        const remainingBalance = totalFees - this.feeData.totalPaid;

        return `
            <div id="fees">
                <h2 class="text-2xl font-bold mb-6">Fee Details</h2>
                <div class="fee-container">
                    <div class="fee-summary-card">
                        <div class="fee-header">
                            <h3>Semester Fee Summary</h3>
                            <span class="semester">Spring 2024</span>
                        </div>
                        <div class="fee-details">
                            ${Object.entries(this.feeData)
                                .filter(([key]) => key !== 'totalPaid')
                                .map(([key, value]) => `
                                    <div class="fee-row">
                                        <span>${this.capitalize(key.replace('Fee', ' Fee'))}</span>
                                        <span>$${value}</span>
                                    </div>
                                `).join('')}
                            <div class="fee-total">
                                <span>Total Fees</span>
                                <span>$${totalFees}</span>
                            </div>
                        </div>
                        <div class="payment-status">
                            <div class="status-row">
                                <span>Amount Paid</span>
                                <span class="paid">$${this.feeData.totalPaid}</span>
                            </div>
                            <div class="status-row">
                                <span>Remaining Balance</span>
                                <span class="remaining">$${remainingBalance}</span>
                            </div>
                            <div class="payment-progress">
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${(this.feeData.totalPaid / totalFees) * 100}%"></div>
                                </div>
                                <span class="progress-text">${((this.feeData.totalPaid / totalFees) * 100).toFixed(1)}% Paid</span>
                            </div>
                        </div>
                        <button class="pay-now-btn">Pay Now</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderStatistics() {
        const statistics = [
            { label: 'Attendance', value: '95%' },
            { label: 'Assignments Submitted', value: '12/12' },
            { label: 'Upcoming Exams', value: '3' }
        ];
        {
        return `
            <div class="stats-container">
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-number">95%</div>
                        <div class="stat-label">Average Attendance</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">85</div>
                        <div class="stat-label">Academic Score</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">12</div>
                        <div class="stat-label">Achievements</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">3</div>
                        <div class="stat-label">Active Projects</div>
                    </div>
                </div>
            </div>`;
    }
    }

   
    attachEventListeners() {
        // Attach logout button listener
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                Storage.clearUser();
                window.dispatchEvent(new CustomEvent('auth:logout'));
            });
        }

        // Use event delegation for navigation links
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    e.preventDefault();
                    const section = e.target.dataset.section;
                    if (section) {
                        this.currentSection = section;
                        this.render(); // Re-render the dashboard
                    }
                }
            });
        }
    }

    capitalize(text) {
        return text.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/\b\w/g, char => char.toUpperCase());
    }
}
