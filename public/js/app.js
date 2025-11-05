// Application State
const state = {
    currentPage: 'dashboard',
    isLoggedIn: false,
    currentUser: null
};

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    
    if (isLoggedIn) {
        showDashboard();
    } else {
        showLogin();
    }
    
    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Navigation items
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
    
    // Card links
    const cardLinks = document.querySelectorAll('.card-link');
    cardLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                navigateToPage(page);
            }
        });
    });
    
    // Add Company Button
    const addCompanyBtn = document.getElementById('addCompanyBtn');
    if (addCompanyBtn) {
        addCompanyBtn.addEventListener('click', openAddCompanyModal);
    }
    
    // Close Company Modal
    const closeCompanyModal = document.getElementById('closeCompanyModal');
    if (closeCompanyModal) {
        closeCompanyModal.addEventListener('click', closeAddCompanyModal);
    }
    
    const cancelCompanyForm = document.getElementById('cancelCompanyForm');
    if (cancelCompanyForm) {
        cancelCompanyForm.addEventListener('click', closeAddCompanyModal);
    }
    
    // Modal overlay click to close
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeAddCompanyModal);
    }
    
    // Add Company Form Submit
    const addCompanyForm = document.getElementById('addCompanyForm');
    if (addCompanyForm) {
        addCompanyForm.addEventListener('submit', handleAddCompany);
    }
    
    // Update current date
    updateCurrentDate();
    
    // Filter and search
    const statusFilter = document.getElementById('statusFilter');
    if (statusFilter) {
        statusFilter.addEventListener('change', filterApplications);
    }
    
    const searchInputs = document.querySelectorAll('[id^="search"]');
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const searchType = this.id.replace('search', '').toLowerCase();
            handleSearch(searchType, this.value);
        });
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // For demo purposes - in production, this will be handled by backend
    if (email && password) {
        // Store login state
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        
        // Show dashboard
        showDashboard();
        
        // TODO: Replace with actual API call when backend is ready
        console.log('Login attempt:', { email, password });
    } else {
        alert('Please enter both email and password');
    }
}

function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminEmail');
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginPage').classList.add('active');
    document.getElementById('dashboardPage').classList.remove('active');
}

function showDashboard() {
    document.getElementById('loginPage').classList.remove('active');
    document.getElementById('dashboardPage').classList.add('active');
    
    // Load dashboard data
    loadDashboardData();
}

function navigateToPage(pageName) {
    // Update nav active state
    document.querySelectorAll('.nav-link').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageName) {
            item.classList.add('active');
        }
    });
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(pageName + 'Content');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update page title
    const pageTitle = document.getElementById('pageTitle');
    const breadcrumbPage = document.getElementById('breadcrumbPage');
    const pageTitles = {
        'dashboard': 'Overview',
        'applications': 'Applications',
        'students': 'Students',
        'companies': 'Companies',
        'reports': 'Reports',
        'settings': 'Settings'
    };
    
    if (pageTitle) {
        pageTitle.textContent = pageTitles[pageName] || pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }
    
    if (breadcrumbPage) {
        breadcrumbPage.textContent = pageTitles[pageName] || pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }
    
    // Load page data
    loadPageData(pageName);
}

function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const options = { month: 'short', day: 'numeric', year: 'numeric' };
        const currentDate = new Date().toLocaleDateString('en-US', options);
        dateElement.textContent = currentDate;
    }
}

function loadDashboardData() {
    // TODO: Replace with actual API calls when backend is ready
    console.log('Loading dashboard data...');
    
    // For demo purposes, we'll use placeholder data
    const stats = {
        total: 0,
        approved: 0,
        pending: 0,
        rejected: 0
    };
    
    updateStatCards(stats);
    loadRecentApplications();
}

function updateStatCards(stats) {
    const statCards = document.querySelectorAll('.stat-number');
    if (statCards.length >= 4) {
        statCards[0].textContent = stats.total;
        statCards[1].textContent = stats.approved;
        statCards[2].textContent = stats.pending;
        statCards[3].textContent = stats.rejected;
    }
}

function loadRecentApplications() {
    // TODO: Replace with actual API call when backend is ready
    console.log('Loading recent applications...');
    
    // Placeholder for now
    const tableBody = document.getElementById('recentApplicationsTable');
    if (tableBody) {
        tableBody.innerHTML = '<tr><td colspan="6" class="no-data">No applications yet</td></tr>';
    }
}

function loadPageData(pageName) {
    // TODO: Replace with actual API calls when backend is ready
    console.log(`Loading ${pageName} data...`);
    
    switch(pageName) {
        case 'dashboard':
            loadDashboardData();
            break;
        case 'applications':
            loadAllApplications();
            break;
        case 'students':
            loadStudents();
            break;
        case 'companies':
            loadCompanies();
            break;
        case 'reports':
            // Reports page doesn't need dynamic loading
            break;
        case 'settings':
            loadSettings();
            break;
    }
}

function loadAllApplications() {
    console.log('Loading all applications...');
    // TODO: Implement API call
}

function loadStudents() {
    console.log('Loading students...');
    // TODO: Implement API call
}

function loadCompanies() {
    console.log('Loading companies...');
    // TODO: Implement API call
}

function loadSettings() {
    console.log('Loading settings...');
    // TODO: Implement API call
}

function filterApplications() {
    const filterValue = document.getElementById('statusFilter').value;
    console.log('Filtering applications by:', filterValue);
    // TODO: Implement filtering logic when backend is ready
}

function handleSearch(type, query) {
    console.log(`Searching ${type}:`, query);
    // TODO: Implement search logic when backend is ready
}

// Utility functions for future use
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function getStatusBadge(status) {
    const statusClass = `status-${status.toLowerCase()}`;
    return `<span class="status-badge ${statusClass}">${status}</span>`;
}

function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    
    const icon = {
        'success': 'fa-check-circle',
        'error': 'fa-times-circle',
        'warning': 'fa-exclamation-triangle',
        'info': 'fa-info-circle'
    }[type] || 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('notification-fade-out');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    console.log(`[${type.toUpperCase()}] ${message}`);
}

// Modal Functions
function openAddCompanyModal() {
    const modal = document.getElementById('addCompanyModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAddCompanyModal() {
    const modal = document.getElementById('addCompanyModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        const form = document.getElementById('addCompanyForm');
        if (form) {
            form.reset();
        }
    }
}

function handleAddCompany(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const companyData = {
        name: formData.get('companyName'),
        industry: formData.get('companyIndustry'),
        location: formData.get('companyLocation'),
        website: formData.get('companyWebsite'),
        contactPerson: formData.get('contactPerson'),
        contactEmail: formData.get('contactEmail'),
        contactPhone: formData.get('contactPhone'),
        positionsAvailable: formData.get('positionsAvailable'),
        jobRoles: formData.get('jobRoles'),
        stipendMin: formData.get('stipendMin'),
        stipendMax: formData.get('stipendMax'),
        duration: formData.get('duration'),
        requirements: formData.get('requirements'),
        description: formData.get('description'),
        applicationDeadline: formData.get('applicationDeadline'),
        createdAt: new Date().toISOString()
    };
    
    console.log('Company Data to be saved:', companyData);
    
    // TODO: Replace with actual API call when backend is ready
    // For now, just show success message and close modal
    showNotification('Company added successfully! (Backend integration pending)', 'success');
    
    // Close modal
    closeAddCompanyModal();
    
    // Refresh companies list
    loadCompanies();
}

// Helper function to create table action buttons
function createActionButtons(type, id) {
    const buttons = document.createElement('div');
    buttons.className = 'action-buttons';
    
    if (type === 'application') {
        buttons.innerHTML = `
            <button class="btn-action view" onclick="viewApplication('${id}')">
                <i class="fas fa-eye"></i> View
            </button>
            <button class="btn-action approve" onclick="approveApplication('${id}')">
                <i class="fas fa-check"></i> Approve
            </button>
            <button class="btn-action reject" onclick="rejectApplication('${id}')">
                <i class="fas fa-times"></i> Reject
            </button>
        `;
    } else if (type === 'student') {
        buttons.innerHTML = `
            <button class="btn-action view" onclick="viewStudent('${id}')">
                <i class="fas fa-eye"></i> View
            </button>
        `;
    } else if (type === 'company') {
        buttons.innerHTML = `
            <button class="btn-action view" onclick="viewCompany('${id}')">
                <i class="fas fa-eye"></i> View
            </button>
            <button class="btn-action edit" onclick="editCompany('${id}')">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="btn-action delete" onclick="deleteCompany('${id}')">
                <i class="fas fa-trash"></i> Delete
            </button>
        `;
    }
    
    return buttons.outerHTML;
}

// Application Actions
function viewApplication(id) {
    console.log('Viewing application:', id);
    showNotification('Application details will be shown here (Backend integration pending)', 'info');
}

function approveApplication(id) {
    if (confirm('Are you sure you want to approve this application?')) {
        console.log('Approving application:', id);
        showNotification('Application approved successfully! (Backend integration pending)', 'success');
        // TODO: API call to approve
        loadAllApplications();
    }
}

function rejectApplication(id) {
    if (confirm('Are you sure you want to reject this application?')) {
        console.log('Rejecting application:', id);
        showNotification('Application rejected! (Backend integration pending)', 'success');
        // TODO: API call to reject
        loadAllApplications();
    }
}

// Student Actions
function viewStudent(id) {
    console.log('Viewing student:', id);
    showNotification('Student details will be shown here (Backend integration pending)', 'info');
}

// Company Actions
function viewCompany(id) {
    console.log('Viewing company:', id);
    showNotification('Company details will be shown here (Backend integration pending)', 'info');
}

function editCompany(id) {
    console.log('Editing company:', id);
    showNotification('Edit company functionality will be added (Backend integration pending)', 'info');
    // TODO: Open modal with pre-filled data
}

function deleteCompany(id) {
    if (confirm('Are you sure you want to delete this company? This action cannot be undone.')) {
        console.log('Deleting company:', id);
        showNotification('Company deleted successfully! (Backend integration pending)', 'success');
        // TODO: API call to delete
        loadCompanies();
    }
}

// Export functions for use in other modules (when needed)
window.siapAdmin = {
    navigateToPage,
    showNotification,
    formatDate,
    getStatusBadge,
    openAddCompanyModal,
    closeAddCompanyModal
};

// Make action functions globally accessible
window.viewApplication = viewApplication;
window.approveApplication = approveApplication;
window.rejectApplication = rejectApplication;
window.viewStudent = viewStudent;
window.viewCompany = viewCompany;
window.editCompany = editCompany;
window.deleteCompany = deleteCompany;
