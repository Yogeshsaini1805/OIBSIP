# Login Authentication System

A complete authentication system with registration, login, and secured dashboard.

## Features

### 🔐 Authentication
- **User Registration** - Create new accounts with email and password
- **User Login** - Secure login with email and password
- **Session Management** - Persist user sessions with localStorage
- **Password Strength Indicator** - Real-time password strength feedback
- **Remember Me** - Optional remember me functionality

### 🛡️ Security Features
- **Email Validation** - Validate proper email format
- **Password Hashing** - Simple hash function (use bcrypt in production)
- **Password Verification** - Secure password comparison
- **XSS Protection** - Input sanitization
- **Session Protection** - Prevent unauthorized dashboard access

### 📊 Dashboard
- **User Profile** - View and edit profile information
- **Settings** - Customize account settings
- **Security** - Change password and manage security settings
- **Activity Log** - View account activity history
- **Responsive Design** - Works on all devices

### 📱 Pages Included

1. **register.html** - User registration page
   - Full name, email, password input fields
   - Password strength checker
   - Terms and conditions validation

2. **login.html** - User login page
   - Email and password login
   - Remember me option
   - Forgot password link
   - Demo credentials displayed

3. **dashboard.html** - Secured user dashboard
   - Profile information
   - Account settings
   - Security options
   - Activity timeline

4. **forgot-password.html** - Password recovery page
   - Email verification
   - Reset link simulation

### 📁 File Structure

```
login-authentication/
├── index.html (redirects to login)
├── register.html
├── login.html
├── dashboard.html
├── forgot-password.html
├── auth.js (authentication logic)
├── dashboard.js (dashboard functionality)
├── styles.css
└── README.md
```

### 🚀 How to Use

#### 1. **First Time Users - Register**
- Open `register.html`
- Fill in: Full Name, Email, Password
- Check the Terms checkbox
- Click "Register"
- Automatically redirects to login page

#### 2. **Existing Users - Login**
- Open `login.html`
- Enter your email and password
- Optionally check "Remember me"
- Click "Login"
- Access your dashboard

#### 3. **Demo Account**
- Email: `demo@example.com`
- Password: `Demo@123`

#### 4. **Access Dashboard**
- Only accessible after login
- Logout available in top-right corner
- Session persists even after page refresh

### 🔧 Features Explained

#### Registration
- Validates full name is not empty
- Checks email format and uniqueness
- Enforces minimum 6-character password
- Passwords must match
- Requires terms acceptance

#### Login
- Email must be registered
- Password must be correct
- Optional "Remember me" saves email to localStorage
- Protects dashboard from unauthorized access

#### Dashboard
- **Profile**: View and edit user information
- **Settings**: Manage email notifications, 2FA, dark mode
- **Security**: Change password, view login history, manage sessions
- **Activity**: See when account was created and last accessed

### 💾 Data Storage

All data is stored in **localStorage** (client-side):
- `users` - Array of all registered users
- `currentUser` - Currently logged-in user session
- `rememberEmail` - Saved email for convenience

**Note**: This is a demo implementation. In production:
- Use a backend server (Node.js, Django, etc.)
- Implement proper password hashing (bcrypt)
- Use secure cookies or JWT tokens
- Store data in a database
- Use HTTPS for secure communication

### 🎨 Styling

The application features:
- Modern gradient design (purple/blue theme)
- Smooth animations and transitions
- Responsive grid layouts
- Mobile-friendly interface
- Professional form styling

### 🔐 Security Notes

Current implementation:
- Uses simple hash for demonstration
- Client-side validation only
- Data stored in localStorage

For production, implement:
- Server-side validation
- bcrypt or similar for password hashing
- HTTP-only cookies or JWT tokens
- HTTPS encryption
- Rate limiting on login attempts
- Account lockout after failed attempts
- Email verification for registration
- Password reset via email tokens

### 🐛 Testing

1. **Register a new account**
   - Try registering with valid details
   - Try registering with existing email (should fail)
   - Check password strength indicator

2. **Login**
   - Login with correct credentials
   - Try logging in with wrong password
   - Use demo account credentials

3. **Dashboard**
   - View and edit profile
   - Change password
   - Test logout functionality

4. **Responsive Design**
   - Test on mobile devices
   - Test on tablets
   - Test on desktop

### 📝 Demo Workflow

1. Open `login.html`
2. Use demo credentials:
   - Email: `demo@example.com`
   - Password: `Demo@123`
3. Explore the dashboard
4. Try editing profile
5. Try changing password
6. Logout and login again

Or register a new account:
1. Open `register.html`
2. Create a new account
3. Login with your credentials
4. Access your dashboard

### 🎯 Future Enhancements

- Email verification on registration
- Password reset via email
- Social media login (OAuth)
- Two-factor authentication (2FA)
- User profile picture upload
- Account deactivation
- Session timeout
- Login history dashboard
- IP-based login alerts
- Dark mode toggle

### 📧 Support

For questions or issues, refer to the code comments and structure.

---

**Last Updated**: February 2026  
**Version**: 1.0
