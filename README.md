# OIBSIP - Web Development Projects

A collection of four progressive web development projects built with HTML, CSS, and JavaScript. Each project demonstrates fundamental web development concepts and progressively increases in complexity.

## 📋 Project Overview

### Task 1: Calculator
A fully functional calculator application with a clean, modern interface built using HTML, CSS, and Vanilla JavaScript.

**Features:**
- Basic arithmetic operations (Addition, Subtraction, Multiplication, Division)
- Decimal number support
- Clear and Delete functionality
- Percentage calculation
- Responsive design
- Keyboard support
- Operation history display

**Technologies:** HTML5, CSS3, Vanilla JavaScript  
**Location:** `Task_1/Calculator/`

**Files:**
- `index.html` - HTML structure
- `styles.css` - Styling and layout
- `script.js` - Calculator logic and functionality

**Demo Workflow:**
1. Click number buttons to enter values
2. Select an operation
3. Enter another number
4. Click equals to calculate
5. Use Clear to reset or Delete to remove last digit

---

### Task 2: Tribute Page - Dr. APJ Abdul Kalam

A tribute page dedicated to Dr. APJ Abdul Kalam, the "Missile Man of India," showcasing his life, achievements, and legacy.

**Features:**
- Responsive design with hero section
- Professional gradient styling
- Multiple content sections:
  - Header with title and dates
  - Hero section with personal photo
  - Biography section
  - Major achievements (6 key cards)
  - Awards and recognition list
  - Inspirational quotes section
  - Footer with credits
- Smooth animations and hover effects
- Mobile-friendly responsive layout

**Technologies:** HTML5, CSS3  
**Location:** `Task_2/tribute_page/`

**Files:**
- `index.html` - Complete tribute page structure
- `styles.css` - Professional styling with animations
- `photo-APJ.jpg` - Dr. APJ Abdul Kalam's photograph

**Content Sections:**
- Biography of Dr. Kalam
- Major Achievements (Space Program, Missile Development, Nuclear Tests, Presidency, etc.)
- Awards (Bharat Ratna, Padma Vibhushan, etc.)
- Inspirational quotes
- Legacy and impact on Indian science

---

### Task 3: To-Do List Web App

A comprehensive task management application with separate pending and completed task lists, complete with CRUD operations and persistent data storage.

**Features:**
- ✅ Add new tasks with description and due date
- 📝 Edit existing tasks with modal dialog
- ✓ Mark tasks as complete/pending
- 🗑️ Delete individual tasks or clear entire lists
- 📅 Due date tracking
- ⏰ Task creation and completion timestamps
- 📊 Real-time statistics (Total, Pending, Completed counts)
- 💾 Persistent storage using localStorage
- 📱 Fully responsive design
- 🎨 Modern UI with gradient background
- ⚡ Smooth animations and transitions

**Technologies:** HTML5, CSS3, Vanilla JavaScript  
**Location:** `Task_3/to-do-list/`

**Files:**
- `index.html` - Complete task management interface
- `styles.css` - Responsive design with animations
- `script.js` - Task management logic with localStorage

**How to Use:**
1. Enter task title (required)
2. Add optional description and due date
3. Click "Save Task" to add
4. View tasks in Pending or Completed sections
5. Mark task complete with the checkmark button
6. Edit tasks using the Edit button
7. Delete individual tasks or clear entire lists
8. Stats dashboard shows real-time counts

**Data Structure:**
Each task contains:
- Unique ID
- Title and description
- Due date
- Completion status
- Creation timestamp
- Completion timestamp

---

### Task 4: Login Authentication System

A complete authentication system with user registration, login, session management, and a secured dashboard with profile management.

**Features:**
- 🔐 User Registration with validation
- 🔐 Secure Login with session management
- 💾 Data persistence with localStorage
- 🛡️ Password strength indicator
- 👁️ Show/hide password toggle
- 📧 Email validation and uniqueness checking
- 🔒 Protected dashboard (unauthorized users redirected to login)
- 👤 User profile management
- ⚙️ Account settings and security options
- 🔑 Change password functionality
- 📊 Activity log and login history
- 📱 Fully responsive design

**Technologies:** HTML5, CSS3, Vanilla JavaScript  
**Location:** `Task_4/login-authentication/`

**Files:**
- `index.html` - Main entry point (redirects to login)
- `register.html` - User registration page
- `login.html` - Login page with demo credentials
- `dashboard.html` - Secured user dashboard
- `forgot-password.html` - Password recovery page
- `auth.js` - Complete authentication logic
- `dashboard.js` - Dashboard functionality
- `styles.css` - Professional styling for all pages
- `README.md` - Detailed authentication system documentation

**Authentication Pages:**
1. **Register** - Create new account
   - Full name input
   - Email with duplicate checking
   - Password with strength indicator
   - Confirm password matching
   - Terms acceptance

2. **Login** - Access existing account
   - Email and password verification
   - Remember me option
   - Forgot password link
   - Demo credentials displayed

3. **Dashboard** - User profile and settings
   - Profile section (view/edit)
   - Settings (notifications, 2FA, dark mode)
   - Security (password management)
   - Activity log

4. **Forgot Password** - Account recovery
   - Email verification
   - Reset confirmation

**Demo Account:**
- Email: `demo@example.com`
- Password: `Demo@123`

**Security Features:**
- Email format validation
- Password strength checking
- Password hashing (simple implementation)
- Session management via localStorage
- XSS protection through input sanitization
- Unauthorized access prevention

---

## 🚀 Project Structure

```
OIBSIP/
├── Task_1/
│   └── Calculator/
│       ├── index.html
│       ├── styles.css
│       └── script.js
│
├── Task_2/
│   └── tribute_page/
│       ├── index.html
│       ├── styles.css
│       └── photo-APJ.jpg
│
├── Task_3/
│   └── to-do-list/
│       ├── index.html
│       ├── styles.css
│       └── script.js
│
└── Task_4/
    └── login-authentication/
        ├── index.html
        ├── register.html
        ├── login.html
        ├── dashboard.html
        ├── forgot-password.html
        ├── auth.js
        ├── dashboard.js
        ├── styles.css
        └── README.md
```

---

## 🛠️ Technologies Used

### Task 1: Calculator
- **HTML5** - Semantic structure
- **CSS3** - Modern styling, flexbox, animations
- **JavaScript** - Event handling, mathematical operations

### Task 2: Tribute Page
- **HTML5** - Semantic content structure
- **CSS3** - Gradients, animations, responsive grid
- **Image** - Embedded photograph

### Task 3: To-Do List
- **HTML5** - Form elements and semantic structure
- **CSS3** - Grid layouts, animations, responsive design
- **JavaScript** - DOM manipulation, localStorage, class-based architecture

### Task 4: Authentication
- **HTML5** - Forms and semantic structure
- **CSS3** - Modern design, gradients, modal dialogs
- **JavaScript** - Authentication logic, session management, localStorage

---

## 📊 Key Learning Outcomes

### Task 1 - Calculator
- DOM manipulation and event handling
- Mathematical calculations with JavaScript
- Responsive button grid design
- Function-based architecture

### Task 2 - Tribute Page
- Semantic HTML structure
- CSS animations and transitions
- Responsive grid and flexbox layouts
- Professional typography and spacing

### Task 3 - To-Do List
- Class-based JavaScript architecture
- CRUD operations
- localStorage for data persistence
- Modal dialogs and dynamic DOM updates
- Form validation
- Real-time statistics

### Task 4 - Authentication
- User registration and validation
- Login session management
- Password strength checking
- Protected routes (dashboard security)
- Edit profile functionality
- Multi-page application flow
- Complex state management

---

## 🎯 Getting Started

### Prerequisites
- Web browser (Chrome, Firefox, Edge, Safari)
- Text editor (VS Code, Sublime Text, etc.)
- Basic knowledge of HTML, CSS, JavaScript

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/OIBSIP.git
   cd OIBSIP
   ```

2. **Navigate to any task folder**
   ```bash
   cd Task_1/Calculator
   # or Task_2/tribute_page
   # or Task_3/to-do-list
   # or Task_4/login-authentication
   ```

3. **Open in browser**
   - Simply open the `index.html` file in your web browser
   - Or use Live Server extension in VS Code
   - Or host on a local server

### Running Each Project

**Task 1 - Calculator:**
```bash
# Open Task_1/Calculator/index.html
```

**Task 2 - Tribute Page:**
```bash
# Open Task_2/tribute_page/index.html
```

**Task 3 - To-Do List:**
```bash
# Open Task_3/to-do-list/index.html
# Start adding tasks and managing them
```

**Task 4 - Authentication:**
```bash
# Open Task_4/login-authentication/index.html
# Register new account or use demo credentials:
# Email: demo@example.com
# Password: Demo@123
```

---

## 📝 Usage Examples

### Calculator
```
1. Enter first number: 10
2. Click operation: +
3. Enter second number: 5
4. Click =
5. Result: 15
```

### To-Do List
```
1. Type task: "Complete project"
2. Add description (optional)
3. Set due date (optional)
4. Click "Save Task"
5. View in Pending Tasks
6. Click "Mark Complete" when done
7. Task moves to Completed Tasks
```

### Authentication System
```
1. Open login page
2. Click "Register here" link
3. Fill in registration form
4. Click Register
5. Login with new credentials
6. Access personal dashboard
7. Edit profile
8. Change password
9. Logout
```

---

## 🎨 Design Features

### Responsive Design
- Mobile-first approach
- Breakpoints for mobile (480px), tablet (768px), desktop (1024px)
- Flexible layouts using CSS Grid and Flexbox

### Modern UI/UX
- Gradient color schemes
- Smooth animations and transitions
- Hover effects and visual feedback
- Professional typography
- Consistent spacing and padding

### Accessibility
- Semantic HTML elements
- Form labels for input fields
- Clear error messages
- Readable color contrast
- Keyboard navigation support

---

## 🔒 Security Considerations

### Current Implementation
- Client-side validation
- Simple password hashing
- localStorage for session management
- Basic XSS prevention

### Production Recommendations
- Implement server-side validation
- Use bcrypt or Argon2 for password hashing
- Store sessions in secure HTTP-only cookies
- Use HTTPS for all communications
- Implement rate limiting
- Add CSRF protection
- Use JWT tokens for API authentication
- Regular security audits

---

## 🚀 Future Enhancements

### Task 1 - Calculator
- Scientific calculator mode
- Calculation history
- Multi-step calculations
- Custom styling themes

### Task 2 - Tribute Page
- Multiple tribute pages
- Search functionality
- Comment system
- Responsive image gallery

### Task 3 - To-Do List
- Backend integration (Node.js/Express)
- User authentication per task
- Task categories and tags
- Recurring tasks
- Email reminders
- Calendar view
- Dark mode toggle

### Task 4 - Authentication
- Email verification
- Two-factor authentication (2FA)
- Social media login (OAuth)
- User profile picture upload
- Advanced security settings
- Session timeout
- IP-based login alerts
- Admin dashboard

---

## 📚 Learning Resources

### HTML & CSS
- [MDN Web Docs - HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)

### JavaScript
- [MDN Web Docs - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [JavaScript.info](https://javascript.info/)
- [Eloquent JavaScript](https://eloquentjavascript.net/)

### Web Development
- [freeCodeCamp](https://www.freecodecamp.org/)
- [Codecademy](https://www.codecademy.com/)
- [Udemy Web Courses](https://www.udemy.com/)

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👨‍💻 Author

**Yogesh**  
OIBSIP Web Development Internship

---

## 📞 Support

For questions, issues, or feedback:
- Open an issue on GitHub
- Contact: [your email]
- Visit: [your website]

---

## 🎉 Project Completion Status

- ✅ Task 1: Calculator - Completed
- ✅ Task 2: Tribute Page - Completed
- ✅ Task 3: To-Do List Web App - Completed
- ✅ Task 4: Login Authentication System - Completed

**Overall Progress:** 100% ✨

---

## 📊 Statistics

| Task | Files | Lines of Code | Technologies | Status |
|------|-------|---------------|--------------|--------|
| Calculator | 3 | ~300 | HTML, CSS, JS | ✅ Complete |
| Tribute Page | 3 | ~400 | HTML, CSS | ✅ Complete |
| To-Do List | 3 | ~500 | HTML, CSS, JS | ✅ Complete |
| Authentication | 8 | ~1000 | HTML, CSS, JS | ✅ Complete |
| **Total** | **17** | **~2200** | **HTML, CSS, JS** | **✅ All Tasks Complete** |

---

**Last Updated:** February 12, 2026  
**Version:** 1.0  
**Status:** Production Ready
