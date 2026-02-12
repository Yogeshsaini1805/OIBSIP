// Dashboard Functions

// Show specific content section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Add active class to clicked menu item
    event.currentTarget.classList.add('active');
}

// Open edit profile modal
function openEditModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Close edit profile modal
function closeEditModal() {
    const modal = document.getElementById('editProfileModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Open change password modal
function openChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Close change password modal
function closeChangePasswordModal() {
    const modal = document.getElementById('changePasswordModal');
    if (modal) {
        modal.classList.remove('active');
    }
    // Clear form
    const form = document.getElementById('changePasswordForm');
    if (form) {
        form.reset();
        document.getElementById('currentPasswordError').textContent = '';
        document.getElementById('confirmNewPasswordError').textContent = '';
    }
}

// Close modal on background click
document.addEventListener('DOMContentLoaded', () => {
    const editModal = document.getElementById('editProfileModal');
    const changePasswordModal = document.getElementById('changePasswordModal');

    if (editModal) {
        editModal.addEventListener('click', (e) => {
            if (e.target === editModal) {
                closeEditModal();
            }
        });
    }

    if (changePasswordModal) {
        changePasswordModal.addEventListener('click', (e) => {
            if (e.target === changePasswordModal) {
                closeChangePasswordModal();
            }
        });
    }

    // Set last password change date
    const lastChangeElement = document.getElementById('lastPasswordChange');
    if (lastChangeElement) {
        lastChangeElement.textContent = new Date().toLocaleDateString();
    }
});
