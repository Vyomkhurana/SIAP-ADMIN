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
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            navigateToPage(page);
        });
    });
    
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
    document.querySelectorAll('.nav-item').forEach(item => {
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
    if (pageTitle) {
        pageTitle.textContent = pageName.charAt(0).toUpperCase() + pageName.slice(1);
    }
    
    // Load page data
    loadPageData(pageName);
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
    // TODO: Implement notification system
    console.log(`[${type.toUpperCase()}] ${message}`);
    alert(message);
}

// Export functions for use in other modules (when needed)
window.siapAdmin = {
    navigateToPage,
    showNotification,
    formatDate,
    getStatusBadge
};
