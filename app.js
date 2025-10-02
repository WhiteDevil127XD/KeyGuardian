// Key Guardian Pro - Password Manager Application
class PasswordManager {
    constructor() {
        this.currentUser = null;
        this.currentPage = 'dashboard';
        this.passwords = [];
        this.theme = 'dark';
        this.sidebarCollapsed = false;
        this.currentView = 'grid';
        
        // Sample data
        this.sampleData = {
            samplePasswords: [
                {"id": "1", "site": "Gmail", "username": "john@email.com", "password": "MyStr0ng!P@ssw0rd", "category": "Personal", "strength": "Strong", "compromised": false, "lastUsed": "2024-07-18", "created": "2024-01-15"},
                {"id": "2", "site": "Bank of America", "username": "john.doe", "password": "B@nking123$", "category": "Finance", "strength": "Strong", "compromised": false, "lastUsed": "2024-07-19", "created": "2024-02-10"},
                {"id": "3", "site": "Netflix", "username": "johndoe@email.com", "password": "password123", "category": "Entertainment", "strength": "Weak", "compromised": true, "lastUsed": "2024-07-15", "created": "2023-12-01"},
                {"id": "4", "site": "LinkedIn", "username": "john.doe.professional", "password": "LinkedInP@ss2024!", "category": "Work", "strength": "Strong", "compromised": false, "lastUsed": "2024-07-18", "created": "2024-03-05"},
                {"id": "5", "site": "Amazon", "username": "johndoe@email.com", "password": "Amaz0n$hopping2024", "category": "Shopping", "strength": "Strong", "compromised": false, "lastUsed": "2024-07-17", "created": "2024-01-20"},
                {"id": "6", "site": "Facebook", "username": "john.doe.123", "password": "facebook", "category": "Social", "strength": "Weak", "compromised": true, "lastUsed": "2024-07-10", "created": "2023-11-15"},
                {"id": "7", "site": "GitHub", "username": "johndoe_dev", "password": "GitHubDev2024#", "category": "Work", "strength": "Strong", "compromised": false, "lastUsed": "2024-07-19", "created": "2024-02-28"},
                {"id": "8", "site": "Dropbox", "username": "john@email.com", "password": "CloudStorage!2024", "category": "Personal", "strength": "Strong", "compromised": false, "lastUsed": "2024-07-16", "created": "2024-04-12"},
                {"id": "9", "site": "PayPal", "username": "johndoe@email.com", "password": "PayPal123", "category": "Finance", "strength": "Medium", "compromised": false, "lastUsed": "2024-07-18", "created": "2024-01-08"},
                {"id": "10", "site": "Steam", "username": "john_gamer", "password": "GamingTime!2024", "category": "Entertainment", "strength": "Strong", "compromised": false, "lastUsed": "2024-07-19", "created": "2024-03-20"},
                {"id": "11", "site": "Discord", "username": "JohnDoe#1234", "password": "Discord123!", "category": "Social", "strength": "Medium", "compromised": false, "lastUsed": "2024-07-17", "created": "2024-02-14"},
                {"id": "12", "site": "Slack", "username": "john.doe@company.com", "password": "WorkSlack@2024", "category": "Work", "strength": "Strong", "compromised": false, "lastUsed": "2024-07-19", "created": "2024-01-03"},
                {"id": "13", "site": "Microsoft", "username": "johndoe@outlook.com", "password": "Microsoft365$", "category": "Work", "strength": "Strong", "compromised": false, "lastUsed": "2024-07-18", "created": "2024-02-01"},
                {"id": "14", "site": "Spotify", "username": "john_music_lover", "password": "MusicStream2024!", "category": "Entertainment", "strength": "Strong", "compromised": false, "lastUsed": "2024-07-19", "created": "2024-03-15"},
                {"id": "15", "site": "Reddit", "username": "john_reddit_user", "password": "reddit123", "category": "Social", "strength": "Weak", "compromised": true, "lastUsed": "2024-07-12", "created": "2023-10-20"}
            ],
            recentActivity: [
                {"action": "Password generated", "item": "New strong password", "time": "2 hours ago"},
                {"action": "Login to Gmail", "item": "john@email.com", "time": "4 hours ago"},
                {"action": "Password updated", "item": "Bank of America", "time": "1 day ago"},
                {"action": "New password added", "item": "Spotify", "time": "2 days ago"},
                {"action": "Security scan completed", "item": "Found 3 compromised passwords", "time": "3 days ago"}
            ],
            securityRecommendations: [
                {"type": "critical", "title": "Update compromised passwords", "description": "3 passwords found in data breaches", "action": "Update now"},
                {"type": "warning", "title": "Strengthen weak passwords", "description": "4 passwords are considered weak", "action": "Generate stronger"},
                {"type": "info", "title": "Enable 2FA", "description": "Add two-factor authentication for better security", "action": "Set up 2FA"},
                {"type": "info", "title": "Review old passwords", "description": "5 passwords haven't been updated in 6+ months", "action": "Review passwords"}
            ]
        };
        
        // Wait for DOM to be ready before initializing
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }
    
    init() {
        this.loadTheme();
        this.bindEvents();
        this.loadPasswords();
        this.updateStats();
    }
    
    bindEvents() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
        
        // Master password strength
        const masterPassword = document.getElementById('master-password');
        if (masterPassword) {
            masterPassword.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value, 'login-strength-meter'));
        }
        
        // Password toggle
        const passwordToggle = document.querySelector('.password-toggle');
        if (passwordToggle) {
            passwordToggle.addEventListener('click', () => this.togglePasswordVisibility());
        }
        
        // Theme toggles
        const themeToggles = document.querySelectorAll('#theme-toggle, #header-theme-toggle');
        themeToggles.forEach(toggle => {
            if (toggle) {
                toggle.addEventListener('click', () => this.toggleTheme());
            }
        });
        
        // Biometric buttons (demo)
        const biometricBtns = document.querySelectorAll('.biometric-btn');
        biometricBtns.forEach(btn => {
            btn.addEventListener('click', () => this.showToast('Biometric authentication is a demo feature', 'info'));
        });
        
        // Forgot password
        const forgotBtn = document.getElementById('forgot-password-btn');
        if (forgotBtn) {
            forgotBtn.addEventListener('click', () => this.showModal('forgot-password-modal'));
        }
        
        // Navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            if (!link.classList.contains('logout-btn')) {
                link.addEventListener('click', (e) => {
                    const page = link.getAttribute('data-page');
                    if (page) {
                        this.navigateTo(page);
                    }
                });
            }
        });
        
        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
        
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }
        
        // Global search
        const globalSearch = document.getElementById('global-search');
        if (globalSearch) {
            globalSearch.addEventListener('input', (e) => this.handleGlobalSearch(e.target.value));
        }
        
        // View controls
        const gridViewBtn = document.getElementById('grid-view-btn');
        const listViewBtn = document.getElementById('list-view-btn');
        if (gridViewBtn) gridViewBtn.addEventListener('click', () => this.setView('grid'));
        if (listViewBtn) listViewBtn.addEventListener('click', () => this.setView('list'));
        
        // Filters
        const categoryFilter = document.getElementById('category-filter');
        const strengthFilter = document.getElementById('strength-filter');
        if (categoryFilter) categoryFilter.addEventListener('change', () => this.filterPasswords());
        if (strengthFilter) strengthFilter.addEventListener('change', () => this.filterPasswords());
        
        // Password Generator
        const regenerateBtn = document.getElementById('regenerate-btn');
        const copyPasswordBtn = document.getElementById('copy-password-btn');
        const passwordLength = document.getElementById('password-length');
        
        if (regenerateBtn) regenerateBtn.addEventListener('click', () => this.generatePassword());
        if (copyPasswordBtn) copyPasswordBtn.addEventListener('click', () => this.copyGeneratedPassword());
        if (passwordLength) passwordLength.addEventListener('input', (e) => this.updateLengthValue(e.target.value));
        
        // Generator options
        const generatorCheckboxes = document.querySelectorAll('#generator-page input[type="checkbox"]');
        generatorCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.generatePassword());
        });
        
        // Theme selector in settings
        const themeSelector = document.getElementById('theme-selector');
        if (themeSelector) {
            themeSelector.addEventListener('change', (e) => this.setTheme(e.target.value));
        }
        
        // Modal handling
        const modalCloses = document.querySelectorAll('.modal-close, .modal-cancel');
        modalCloses.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) this.hideModal(modal.id);
            });
        });
        
        // Modal backdrop
        const modalBackdrops = document.querySelectorAll('.modal-backdrop');
        modalBackdrops.forEach(backdrop => {
            backdrop.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                if (modal) this.hideModal(modal.id);
            });
        });
        
        // Responsive handling
        window.addEventListener('resize', () => this.handleResize());
        this.handleResize();
    }
    
    handleLogin(e) {
        e.preventDefault();
        const masterPasswordInput = document.getElementById('master-password');
        const masterPassword = masterPasswordInput ? masterPasswordInput.value : '';
        const loginBtn = document.querySelector('.login-btn');
        
        if (!masterPassword) {
            this.showToast('Please enter your master password', 'error');
            return;
        }
        
        if (masterPassword.length < 8) {
            this.showToast('Master password must be at least 8 characters', 'error');
            return;
        }
        
        // Show loading state
        if (loginBtn) {
            const btnContent = loginBtn.querySelector('.btn-content');
            const btnLoader = loginBtn.querySelector('.btn-loader');
            
            if (btnContent) btnContent.classList.add('hidden');
            if (btnLoader) btnLoader.classList.remove('hidden');
            loginBtn.disabled = true;
        }
        
        // Simulate authentication delay
        setTimeout(() => {
            this.currentUser = { username: 'John Doe', email: 'john@email.com' };
            this.showMainApp();
            this.showToast('Welcome back to Key Guardian Pro!', 'success');
            
            // Reset button state
            if (loginBtn) {
                const btnContent = loginBtn.querySelector('.btn-content');
                const btnLoader = loginBtn.querySelector('.btn-loader');
                
                if (btnContent) btnContent.classList.remove('hidden');
                if (btnLoader) btnLoader.classList.add('hidden');
                loginBtn.disabled = false;
            }
        }, 1000);
    }
    
    showMainApp() {
        const loginScreen = document.getElementById('login-screen');
        const mainApp = document.getElementById('main-app');
        
        if (loginScreen) loginScreen.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        
        this.navigateTo('dashboard');
    }
    
    logout() {
        this.currentUser = null;
        const mainApp = document.getElementById('main-app');
        const loginScreen = document.getElementById('login-screen');
        const masterPassword = document.getElementById('master-password');
        
        if (mainApp) mainApp.classList.add('hidden');
        if (loginScreen) loginScreen.classList.remove('hidden');
        if (masterPassword) masterPassword.value = '';
        
        this.showToast('Logged out successfully', 'success');
    }
    
    navigateTo(page) {
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => link.classList.remove('active'));
        
        const activeNavLink = document.querySelector(`[data-page="${page}"]`);
        if (activeNavLink) activeNavLink.classList.add('active');
        
        // Show page
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('active'));
        
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) targetPage.classList.add('active');
        
        this.currentPage = page;
        
        // Load page specific content
        if (page === 'vault') {
            this.renderPasswords();
        } else if (page === 'dashboard') {
            this.renderDashboard();
        } else if (page === 'security') {
            this.renderSecurity();
        } else if (page === 'generator') {
            this.generatePassword();
        }
        
        // Close mobile sidebar
        if (window.innerWidth <= 768) {
            this.closeMobileSidebar();
        }
    }
    
    toggleSidebar() {
        if (window.innerWidth <= 768) {
            // Mobile: toggle sidebar overlay
            const sidebar = document.getElementById('sidebar');
            if (sidebar) sidebar.classList.toggle('open');
        } else {
            // Desktop: collapse sidebar
            this.sidebarCollapsed = !this.sidebarCollapsed;
            const mainApp = document.getElementById('main-app');
            if (mainApp) mainApp.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
        }
    }
    
    closeMobileSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('open');
    }
    
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(this.theme);
    }
    
    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update theme icons
        const themeIcons = document.querySelectorAll('.theme-icon');
        themeIcons.forEach(icon => {
            icon.textContent = theme === 'dark' ? '☀️' : '🌙';
        });
        
        // Update theme selector
        const themeSelector = document.getElementById('theme-selector');
        if (themeSelector) {
            themeSelector.value = theme;
        }
        
        this.showToast(`Switched to ${theme} theme`, 'success');
    }
    
    loadTheme() {
        this.setTheme('dark'); // Default to dark theme
    }
    
    loadPasswords() {
        this.passwords = [...this.sampleData.samplePasswords];
    }
    
    updateStats() {
        const total = this.passwords.length;
        const strong = this.passwords.filter(p => p.strength === 'Strong').length;
        const weak = this.passwords.filter(p => p.strength === 'Weak').length;
        const compromised = this.passwords.filter(p => p.compromised).length;
        
        const totalEl = document.getElementById('total-passwords');
        const strongEl = document.getElementById('strong-passwords');
        const weakEl = document.getElementById('weak-passwords');
        const compromisedEl = document.getElementById('compromised-passwords');
        
        if (totalEl) totalEl.textContent = total;
        if (strongEl) strongEl.textContent = strong;
        if (weakEl) weakEl.textContent = weak;
        if (compromisedEl) compromisedEl.textContent = compromised;
    }
    
    renderDashboard() {
        this.renderRecentActivity();
        this.renderSecurityRecommendations();
        this.updateStats();
    }
    
    renderRecentActivity() {
        const container = document.getElementById('recent-activity');
        if (!container) return;
        
        container.innerHTML = this.sampleData.recentActivity.map(activity => `
            <div class="activity-item">
                <div class="activity-info">
                    <div class="activity-action">${activity.action}</div>
                    <div class="activity-details">${activity.item}</div>
                </div>
                <div class="activity-time">${activity.time}</div>
            </div>
        `).join('');
    }
    
    renderSecurityRecommendations() {
        const container = document.getElementById('security-recommendations');
        if (!container) return;
        
        container.innerHTML = this.sampleData.securityRecommendations.map(rec => `
            <div class="recommendation-item">
                <div class="recommendation-icon ${rec.type}">
                    ${rec.type === 'critical' ? '🚨' : rec.type === 'warning' ? '⚠️' : 'ℹ️'}
                </div>
                <div class="recommendation-content">
                    <div class="recommendation-title">${rec.title}</div>
                    <div class="recommendation-description">${rec.description}</div>
                    <a href="#" class="recommendation-action" onclick="app.showToast('${rec.action} feature coming soon!', 'info'); return false;">${rec.action}</a>
                </div>
            </div>
        `).join('');
    }
    
    renderPasswords() {
        const container = document.getElementById('passwords-container');
        if (!container) return;
        
        const categoryFilter = document.getElementById('category-filter');
        const strengthFilter = document.getElementById('strength-filter');
        
        const categoryValue = categoryFilter ? categoryFilter.value : 'All';
        const strengthValue = strengthFilter ? strengthFilter.value : 'All';
        
        let filteredPasswords = this.passwords;
        
        if (categoryValue !== 'All') {
            filteredPasswords = filteredPasswords.filter(p => p.category === categoryValue);
        }
        
        if (strengthValue !== 'All') {
            filteredPasswords = filteredPasswords.filter(p => p.strength === strengthValue);
        }
        
        container.className = this.currentView === 'grid' ? 'passwords-grid' : 'passwords-list';
        
        if (filteredPasswords.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No passwords found</h3>
                    <p>Try adjusting your filters or add a new password.</p>
                    <button class="btn btn--primary" onclick="app.showToast('Add password feature coming soon!', 'info')">Add Password</button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filteredPasswords.map(password => `
            <div class="password-card ${password.compromised ? 'compromised' : ''}" data-id="${password.id}">
                <div class="password-header">
                    <div class="password-site">${password.site}</div>
                    <div class="password-category">${password.category}</div>
                </div>
                
                <div class="password-info">
                    <div class="password-username">${password.username}</div>
                    <div class="password-field">
                        <div class="password-value">••••••••••••</div>
                        <button class="copy-btn" onclick="app.copyPassword('${password.password}')" title="Copy password">
                            📋
                        </button>
                    </div>
                </div>
                
                <div class="password-footer">
                    <div class="password-strength-badge strength-${password.strength.toLowerCase()}">
                        ${password.strength}
                    </div>
                    <div class="password-actions">
                        <button class="password-action-btn" onclick="app.showToast('Edit feature coming soon!', 'info')" title="Edit">✏️</button>
                        <button class="password-action-btn" onclick="app.showToast('Delete feature coming soon!', 'info')" title="Delete">🗑️</button>
                    </div>
                </div>
                
                ${password.compromised ? '<div class="compromised-warning">⚠️ Found in data breach</div>' : ''}
            </div>
        `).join('');
    }
    
    filterPasswords() {
        this.renderPasswords();
    }
    
    setView(view) {
        this.currentView = view;
        
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => btn.classList.remove('active'));
        
        const activeViewBtn = document.getElementById(`${view}-view-btn`);
        if (activeViewBtn) activeViewBtn.classList.add('active');
        
        this.renderPasswords();
    }
    
    handleGlobalSearch(query) {
        if (this.currentPage !== 'vault') return;
        
        const filteredPasswords = this.passwords.filter(password => 
            password.site.toLowerCase().includes(query.toLowerCase()) ||
            password.username.toLowerCase().includes(query.toLowerCase()) ||
            password.category.toLowerCase().includes(query.toLowerCase())
        );
        
        const container = document.getElementById('passwords-container');
        if (!container) return;
        
        if (filteredPasswords.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🔍</div>
                    <h3>No results found</h3>
                    <p>No passwords match "${query}". Try a different search term.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = filteredPasswords.map(password => `
            <div class="password-card ${password.compromised ? 'compromised' : ''}" data-id="${password.id}">
                <div class="password-header">
                    <div class="password-site">${password.site}</div>
                    <div class="password-category">${password.category}</div>
                </div>
                
                <div class="password-info">
                    <div class="password-username">${password.username}</div>
                    <div class="password-field">
                        <div class="password-value">••••••••••••</div>
                        <button class="copy-btn" onclick="app.copyPassword('${password.password}')" title="Copy password">
                            📋
                        </button>
                    </div>
                </div>
                
                <div class="password-footer">
                    <div class="password-strength-badge strength-${password.strength.toLowerCase()}">
                        ${password.strength}
                    </div>
                    <div class="password-actions">
                        <button class="password-action-btn" onclick="app.showToast('Edit feature coming soon!', 'info')" title="Edit">✏️</button>
                        <button class="password-action-btn" onclick="app.showToast('Delete feature coming soon!', 'info')" title="Delete">🗑️</button>
                    </div>
                </div>
                
                ${password.compromised ? '<div class="compromised-warning">⚠️ Found in data breach</div>' : ''}
            </div>
        `).join('');
    }
    
    generatePassword() {
        const lengthEl = document.getElementById('password-length');
        const includeUpperEl = document.getElementById('include-uppercase');
        const includeLowerEl = document.getElementById('include-lowercase');
        const includeNumbersEl = document.getElementById('include-numbers');
        const includeSymbolsEl = document.getElementById('include-symbols');
        const excludeAmbiguousEl = document.getElementById('exclude-ambiguous');
        
        const length = lengthEl ? lengthEl.value : 16;
        const includeUpper = includeUpperEl ? includeUpperEl.checked : true;
        const includeLower = includeLowerEl ? includeLowerEl.checked : true;
        const includeNumbers = includeNumbersEl ? includeNumbersEl.checked : true;
        const includeSymbols = includeSymbolsEl ? includeSymbolsEl.checked : true;
        const excludeAmbiguous = excludeAmbiguousEl ? excludeAmbiguousEl.checked : false;
        
        let charset = '';
        
        if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (excludeAmbiguous) {
            charset = charset.replace(/[0Ol1Il]/g, '');
        }
        
        if (!charset) {
            this.showToast('Please select at least one character type', 'error');
            return;
        }
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        
        const generatedPasswordEl = document.getElementById('generated-password');
        const copyPasswordBtnEl = document.getElementById('copy-password-btn');
        
        if (generatedPasswordEl) generatedPasswordEl.textContent = password;
        if (copyPasswordBtnEl) copyPasswordBtnEl.disabled = false;
        
        // Update strength meter
        this.updatePasswordStrength(password);
    }
    
    updatePasswordStrength(password) {
        const strength = this.calculatePasswordStrength(password);
        const strengthFill = document.getElementById('strength-bar-fill');
        const strengthText = document.getElementById('strength-text');
        
        if (strengthFill) {
            strengthFill.className = `strength-fill strength-${strength.level}`;
            strengthFill.style.width = `${strength.percentage}%`;
        }
        
        if (strengthText) {
            strengthText.textContent = `${strength.label} (${strength.percentage}%)`;
        }
    }
    
    calculatePasswordStrength(password) {
        let score = 0;
        let feedback = [];
        
        // Length scoring
        if (password.length >= 12) score += 25;
        else if (password.length >= 8) score += 15;
        else feedback.push('Use at least 8 characters');
        
        // Character variety
        if (/[a-z]/.test(password)) score += 15;
        else feedback.push('Add lowercase letters');
        
        if (/[A-Z]/.test(password)) score += 15;
        else feedback.push('Add uppercase letters');
        
        if (/[0-9]/.test(password)) score += 15;
        else feedback.push('Add numbers');
        
        if (/[^a-zA-Z0-9]/.test(password)) score += 15;
        else feedback.push('Add symbols');
        
        // Bonus points
        if (password.length >= 16) score += 10;
        if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score += 5;
        
        // Determine level
        let level, label;
        if (score >= 80) {
            level = 'strong';
            label = 'Strong';
        } else if (score >= 60) {
            level = 'medium';
            label = 'Medium';
        } else {
            level = 'weak';
            label = 'Weak';
        }
        
        return { score, level, label, percentage: Math.min(score, 100), feedback };
    }
    
    checkPasswordStrength(password, containerId) {
        if (!password) return;
        
        const strength = this.calculatePasswordStrength(password);
        const container = document.getElementById(containerId);
        
        if (container) {
            container.className = `password-strength strength-${strength.level}`;
        }
    }
    
    updateLengthValue(value) {
        const lengthValueEl = document.getElementById('length-value');
        if (lengthValueEl) lengthValueEl.textContent = value;
        this.generatePassword();
    }
    
    copyGeneratedPassword() {
        const generatedPasswordEl = document.getElementById('generated-password');
        const password = generatedPasswordEl ? generatedPasswordEl.textContent : '';
        this.copyToClipboard(password);
    }
    
    copyPassword(password) {
        this.copyToClipboard(password);
    }
    
    copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('Password copied to clipboard', 'success');
            }).catch(() => {
                this.fallbackCopyToClipboard(text);
            });
        } else {
            this.fallbackCopyToClipboard(text);
        }
    }
    
    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        textArea.style.pointerEvents = 'none';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            this.showToast('Password copied to clipboard', 'success');
        } catch (err) {
            this.showToast('Failed to copy to clipboard', 'error');
        }
        
        document.body.removeChild(textArea);
    }
    
    renderSecurity() {
        this.renderCompromisedPasswords();
    }
    
    renderCompromisedPasswords() {
        const container = document.getElementById('compromised-list');
        if (!container) return;
        
        const compromisedPasswords = this.passwords.filter(p => p.compromised);
        
        if (compromisedPasswords.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🛡️</div>
                    <h3>No compromised passwords found</h3>
                    <p>Great! None of your passwords have been found in data breaches.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = compromisedPasswords.map(password => `
            <div class="compromised-item">
                <div class="compromised-info">
                    <div class="compromised-site">${password.site}</div>
                    <div class="compromised-breach">Found in data breach - Update immediately</div>
                </div>
                <button class="btn btn--sm btn--primary" onclick="app.showToast('Password update feature coming soon!', 'info')">Update Password</button>
            </div>
        `).join('');
    }
    
    togglePasswordVisibility() {
        const passwordInput = document.getElementById('master-password');
        const toggleBtn = document.querySelector('.password-toggle');
        
        if (!passwordInput || !toggleBtn) return;
        
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleBtn.textContent = '🙈';
        } else {
            passwordInput.type = 'password';
            toggleBtn.textContent = '👁️';
        }
    }
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            
            // Focus first focusable element
            setTimeout(() => {
                const focusable = modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
                if (focusable) focusable.focus();
            }, 10);
        }
    }
    
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        
        toastContainer.appendChild(toast);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 3000);
    }
    
    handleResize() {
        if (window.innerWidth <= 768) {
            // Mobile: ensure sidebar is closed
            const mainApp = document.getElementById('main-app');
            if (mainApp) mainApp.classList.remove('sidebar-collapsed');
            this.closeMobileSidebar();
        } else {
            // Desktop: restore sidebar state
            const mainApp = document.getElementById('main-app');
            if (mainApp) mainApp.classList.toggle('sidebar-collapsed', this.sidebarCollapsed);
        }
    }
}

// Initialize the application when DOM is ready
let app;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new PasswordManager();
    });
} else {
    app = new PasswordManager();
}

// Service Worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        const swCode = `
            const CACHE_NAME = 'keyguardian-pro-v1';
            const urlsToCache = [
                '/',
                '/index.html',
                '/style.css',
                '/app.js'
            ];

            self.addEventListener('install', (event) => {
                event.waitUntil(
                    caches.open(CACHE_NAME)
                        .then((cache) => cache.addAll(urlsToCache))
                );
            });

            self.addEventListener('fetch', (event) => {
                event.respondWith(
                    caches.match(event.request)
                        .then((response) => {
                            if (response) {
                                return response;
                            }
                            return fetch(event.request);
                        })
                );
            });
        `;
        
        const blob = new Blob([swCode], { type: 'application/javascript' });
        const swUrl = URL.createObjectURL(blob);
        
        navigator.serviceWorker.register(swUrl)
            .then((registration) => {
                console.log('ServiceWorker registered successfully');
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for global search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.focus();
        }
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal:not(.hidden)');
        openModals.forEach(modal => {
            if (app) app.hideModal(modal.id);
        });
        
        // Close mobile sidebar
        if (window.innerWidth <= 768 && app) {
            app.closeMobileSidebar();
        }
    }
    
    // Demo shortcut: Ctrl/Cmd + L for quick login
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        const masterPassword = document.getElementById('master-password');
        if (masterPassword && !app.currentUser) {
            masterPassword.value = 'demopassword123';
            const loginForm = document.getElementById('login-form');
            if (loginForm) {
                loginForm.dispatchEvent(new Event('submit'));
            }
        }
    }
});

// Additional DOM ready handlers for tooltips and accessibility
document.addEventListener('DOMContentLoaded', () => {
    // Add aria-labels for better accessibility
    const buttonsWithTitles = document.querySelectorAll('button[title]');
    buttonsWithTitles.forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.getAttribute('title'));
        }
    });
    
    // Focus management for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                // Trap focus within modal
                const focusableElements = modal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        });
    });
});