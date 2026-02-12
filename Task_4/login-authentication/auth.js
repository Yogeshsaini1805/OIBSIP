// Authentication Manager Class
class AuthManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.getCurrentUser();
        this.init();
    }

    // Initialize auth system
    init() {
        // Check if on dashboard
        if (document.body.classList.contains('dashboard-body') || window.location.pathname.includes('dashboard')) {
            this.protectDashboard();
        }

        // Setup event listeners
        const registerForm = document.getElementById('registerForm');
        const loginForm = document.getElementById('loginForm');

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
            document.getElementById('regPassword').addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    // Handle user registration
    handleRegister(e) {
        e.preventDefault();

        const fullName = document.getElementById('regFullName').value.trim();
        const email = document.getElementById('regEmail').value.trim();
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        const terms = document.getElementById('regTerms').checked;

        // Clear previous errors
        this.clearErrors();

        // Validation
        let hasError = false;

        if (!fullName) {
            this.showError('fullNameError', 'Please enter your full name');
            hasError = true;
        }

        if (!this.isValidEmail(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            hasError = true;
        }

        if (this.users.some(u => u.email === email)) {
            this.showError('emailError', 'This email is already registered');
            hasError = true;
        }

        if (password.length < 6) {
            this.showError('passwordError', 'Password must be at least 6 characters');
            hasError = true;
        }

        if (password !== confirmPassword) {
            this.showError('confirmPasswordError', 'Passwords do not match');
            hasError = true;
        }

        if (!terms) {
            alert('Please agree to the Terms and Conditions');
            hasError = true;
        }

        if (hasError) return;

        // Create new user
        const newUser = {
            id: Date.now(),
            fullName: fullName,
            email: email,
            password: this.hashPassword(password),
            createdAt: new Date().toLocaleDateString(),
            lastLogin: null
        };

        this.users.push(newUser);
        this.saveUsers();

        // Show success message
        document.getElementById('registerForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'block';

        // Redirect to login
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    }

    // Handle user login
    handleLogin(e) {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;

        this.clearErrors();

        const user = this.users.find(u => u.email === email);

        if (!user) {
            this.showError('loginEmailError', 'Email not found');
            return;
        }

        if (!this.verifyPassword(password, user.password)) {
            this.showError('loginPasswordError', 'Incorrect password');
            return;
        }

        // Update last login
        user.lastLogin = new Date().toLocaleString();
        this.saveUsers();

        // Store session
        const sessionData = {
            userId: user.id,
            email: user.email,
            fullName: user.fullName,
            loginTime: new Date().toLocaleString()
        };

        localStorage.setItem('currentUser', JSON.stringify(sessionData));

        if (rememberMe) {
            localStorage.setItem('rememberEmail', email);
        }

        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }

    // Protect dashboard from unauthorized access
    protectDashboard() {
        const currentUser = this.getCurrentUser();

        if (!currentUser) {
            // Redirect to login if not authenticated
            window.location.href = 'login.html';
            return;
        }

        // Update dashboard with user info
        document.getElementById('userName').textContent = currentUser.fullName;
        document.getElementById('userEmail').textContent = currentUser.email;
        document.getElementById('profileName').textContent = currentUser.fullName;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profileDate').textContent = currentUser.loginTime || new Date().toLocaleDateString();
        document.getElementById('avatarPlaceholder').textContent = this.getInitials(currentUser.fullName);

        // Setup edit profile
        document.getElementById('editName').value = currentUser.fullName;
        document.getElementById('editEmail').value = currentUser.email;

        const editProfileForm = document.getElementById('editProfileForm');
        if (editProfileForm) {
            editProfileForm.addEventListener('submit', (e) => this.handleEditProfile(e, currentUser.email));
        }

        const changePasswordForm = document.getElementById('changePasswordForm');
        if (changePasswordForm) {
            changePasswordForm.addEventListener('submit', (e) => this.handleChangePassword(e, currentUser.email));
        }
    }

    // Handle edit profile
    handleEditProfile(e, currentEmail) {
        e.preventDefault();

        const newName = document.getElementById('editName').value.trim();
        const newEmail = document.getElementById('editEmail').value.trim();

        if (!newName) {
            alert('Name cannot be empty');
            return;
        }

        if (!this.isValidEmail(newEmail)) {
            alert('Invalid email address');
            return;
        }

        // Find and update user
        const user = this.users.find(u => u.email === currentEmail);
        if (user) {
            user.fullName = newName;
            user.email = newEmail;
            this.saveUsers();

            // Update session
            const currentUser = this.getCurrentUser();
            currentUser.fullName = newName;
            currentUser.email = newEmail;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));

            // Update display
            document.getElementById('userName').textContent = newName;
            document.getElementById('userEmail').textContent = newEmail;
            document.getElementById('profileName').textContent = newName;
            document.getElementById('profileEmail').textContent = newEmail;

            this.closeEditModal();
            alert('Profile updated successfully');
        }
    }

    // Handle change password
    handleChangePassword(e, userEmail) {
        e.preventDefault();

        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        const user = this.users.find(u => u.email === userEmail);

        if (!user || !this.verifyPassword(currentPassword, user.password)) {
            this.showError('currentPasswordError', 'Current password is incorrect');
            return;
        }

        if (newPassword.length < 6) {
            alert('New password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            this.showError('confirmNewPasswordError', 'Passwords do not match');
            return;
        }

        // Update password
        user.password = this.hashPassword(newPassword);
        this.saveUsers();

        this.closeChangePasswordModal();
        alert('Password changed successfully');
    }

    // Check password strength
    checkPasswordStrength(password) {
        const strengthBar = document.getElementById('passwordStrength');
        
        if (!strengthBar) return;

        strengthBar.className = 'password-strength';

        if (password.length < 6) {
            return;
        }

        let strength = 0;

        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;

        if (strength <= 1) {
            strengthBar.classList.add('weak');
        } else if (strength === 2) {
            strengthBar.classList.add('medium');
        } else {
            strengthBar.classList.add('strong');
        }
    }

    // Email validation
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Hash password (simple version - in production use bcrypt or similar)
    hashPassword(password) {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return 'hash_' + Math.abs(hash).toString(36);
    }

    // Verify password
    verifyPassword(password, hash) {
        return this.hashPassword(password) === hash;
    }

    // Get initials from name
    getInitials(fullName) {
        return fullName
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }

    // Show error message
    showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Clear all error messages
    clearErrors() {
        const errorElements = document.querySelectorAll('.error-msg');
        errorElements.forEach(el => {
            el.textContent = '';
        });
    }

    // Get current logged-in user
    getCurrentUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Load users from localStorage
    loadUsers() {
        const users = localStorage.getItem('users');
        if (!users) {
            // Create demo user
            const demoUser = {
                id: 1,
                fullName: 'Demo User',
                email: 'demo@example.com',
                password: this.hashPassword('Demo@123'),
                createdAt: new Date().toLocaleDateString(),
                lastLogin: null
            };
            const savedUsers = [demoUser];
            localStorage.setItem('users', JSON.stringify(savedUsers));
            return savedUsers;
        }
        return JSON.parse(users);
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
    }
}

// Initialize auth manager when DOM is ready
let authManager;
document.addEventListener('DOMContentLoaded', () => {
    // Add dashboard class to body when on dashboard
    if (window.location.pathname.includes('dashboard')) {
        document.body.classList.add('dashboard-body');
    }

    authManager = new AuthManager();
});
