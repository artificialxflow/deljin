// Main Application JavaScript for Furniture CRM System

class FurnitureCRM {
    constructor() {
        this.init();
        this.bindEvents();
    }

    init() {
        // Initialize the application
        this.setupDateInputs();
        this.setupConditionalFields();
        this.setupFormValidation();
        this.updateDateTime();
        
        // Update current time every minute
        setInterval(() => this.updateDateTime(), 60000);
    }

    bindEvents() {
        // Sidebar toggle
        document.getElementById('sidebarToggle').addEventListener('click', () => {
            this.toggleSidebar();
        });

        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // Visit form events
        this.setupVisitFormEvents();
        
        // Customer search and filter
        this.setupCustomerFilters();
        
        // Form submissions
        this.setupFormSubmissions();
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
    }

    navigateToPage(page) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(p => {
            p.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(`${page}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-page="${page}"]`).classList.add('active');

        // Update page title
        const pageTitles = {
            'dashboard': 'داشبورد',
            'customers': 'مدیریت مشتریان',
            'visits': 'ثبت بازدید حضوری',
            'orders': 'مدیریت سفارشات',
            'after-sales': 'خدمات پس از فروش',
            'fabric-management': 'مدیریت پارچه',
            'production': 'تولید',
            'analytics': 'گزارشات و تحلیل'
        };
        
        document.getElementById('pageTitle').textContent = pageTitles[page] || 'سیستم مدیریت';
    }

    setupDateInputs() {
        // Set today's date for date inputs
        const today = new Date().toISOString().split('T')[0];
        const visitDateInput = document.getElementById('visitDate');
        if (visitDateInput) {
            visitDateInput.value = today;
            this.updateDayOfWeek(today);
        }

        // Set current time for time inputs
        const now = new Date();
        const currentTime = now.toTimeString().slice(0, 5);
        const visitTimeInput = document.getElementById('visitTime');
        if (visitTimeInput) {
            visitTimeInput.value = currentTime;
        }
    }

    updateDayOfWeek(dateString) {
        const date = new Date(dateString);
        const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
        const dayOfWeek = days[date.getDay()];
        
        const dayInput = document.getElementById('dayOfWeek');
        if (dayInput) {
            dayInput.value = dayOfWeek;
        }
    }

    setupVisitFormEvents() {
        // Date change event
        const visitDateInput = document.getElementById('visitDate');
        if (visitDateInput) {
            visitDateInput.addEventListener('change', (e) => {
                this.updateDayOfWeek(e.target.value);
            });
        }

        // Count calculation
        const femaleCountInput = document.getElementById('femaleCount');
        const maleCountInput = document.getElementById('maleCount');
        const totalCountInput = document.getElementById('totalCount');

        if (femaleCountInput && maleCountInput && totalCountInput) {
            const updateTotal = () => {
                const female = parseInt(femaleCountInput.value) || 0;
                const male = parseInt(maleCountInput.value) || 0;
                totalCountInput.value = female + male;
            };

            femaleCountInput.addEventListener('input', updateTotal);
            maleCountInput.addEventListener('input', updateTotal);
        }

        // Customer type conditional display
        const customerTypeRadios = document.querySelectorAll('input[name="customerType"]');
        const newCustomerSection = document.getElementById('newCustomerSection');

        customerTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'new' && radio.checked) {
                    newCustomerSection.style.display = 'block';
                } else if (radio.value === 'repeat' && radio.checked) {
                    newCustomerSection.style.display = 'none';
                }
            });
        });
    }

    setupConditionalFields() {
        // Any other conditional field logic can go here
        console.log('Conditional fields setup complete');
    }

    setupCustomerFilters() {
        const searchInput = document.getElementById('customerSearch');
        const groupFilter = document.getElementById('customerGroupFilter');

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterCustomers(e.target.value, groupFilter ? groupFilter.value : '');
            });
        }

        if (groupFilter) {
            groupFilter.addEventListener('change', (e) => {
                this.filterCustomers(searchInput ? searchInput.value : '', e.target.value);
            });
        }
    }

    filterCustomers(searchTerm, groupFilter) {
        const table = document.getElementById('customersTable');
        if (!table) return;

        const rows = table.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const nameCell = row.cells[0].textContent.toLowerCase();
            const phoneCell = row.cells[1].textContent;
            const groupCell = row.cells[2].textContent;
            
            const matchesSearch = searchTerm === '' || 
                nameCell.includes(searchTerm.toLowerCase()) || 
                phoneCell.includes(searchTerm);
            
            const matchesGroup = groupFilter === '' || 
                groupCell.includes(this.getGroupDisplayName(groupFilter));
            
            if (matchesSearch && matchesGroup) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    getGroupDisplayName(value) {
        const groupNames = {
            'vip': 'مشتریان ویژه',
            'regular': 'مشتریان',
            'designer': 'دیزاینرها',
            'builder': 'سازندگان'
        };
        return groupNames[value] || value;
    }

    setupFormValidation() {
        // Phone number validation (Iranian format)
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.startsWith('98')) {
                    value = value.substring(2);
                }
                if (value.startsWith('0')) {
                    value = value.substring(1);
                }
                if (value.length <= 10) {
                    e.target.value = value;
                }
                
                // Validate format
                if (value.length === 10 && value.startsWith('9')) {
                    e.target.classList.remove('is-invalid');
                    e.target.classList.add('is-valid');
                } else if (value.length > 0) {
                    e.target.classList.remove('is-valid');
                    e.target.classList.add('is-invalid');
                } else {
                    e.target.classList.remove('is-valid', 'is-invalid');
                }
            });
        });

        // National ID validation
        const nationalIdInputs = document.querySelectorAll('#customerNationalId, input[placeholder*="کد ملی"]');
        nationalIdInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                e.target.value = value;
                
                if (value.length === 10) {
                    if (this.validateNationalId(value)) {
                        e.target.classList.remove('is-invalid');
                        e.target.classList.add('is-valid');
                    } else {
                        e.target.classList.remove('is-valid');
                        e.target.classList.add('is-invalid');
                    }
                } else if (value.length > 0) {
                    e.target.classList.remove('is-valid', 'is-invalid');
                }
            });
        });
    }

    validateNationalId(nationalId) {
        // Iranian National ID validation algorithm
        if (!/^\d{10}$/.test(nationalId)) return false;
        
        const digits = nationalId.split('').map(Number);
        const checkDigit = digits[9];
        
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            sum += digits[i] * (10 - i);
        }
        
        const remainder = sum % 11;
        
        if (remainder < 2) {
            return checkDigit === remainder;
        } else {
            return checkDigit === 11 - remainder;
        }
    }

    setupFormSubmissions() {
        // Visit form submission
        const visitForm = document.getElementById('visitForm');
        if (visitForm) {
            visitForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleVisitFormSubmission(visitForm);
            });
        }

        // Customer form submission
        const customerForm = document.getElementById('customerForm');
        if (customerForm) {
            customerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCustomerFormSubmission(customerForm);
            });
        }
    }

    handleVisitFormSubmission(form) {
        // Collect form data
        const formData = new FormData(form);
        const visitData = {};
        
        for (let [key, value] of formData.entries()) {
            visitData[key] = value;
        }

        // Add calculated fields
        visitData.totalCount = document.getElementById('totalCount').value;
        visitData.dayOfWeek = document.getElementById('dayOfWeek').value;

        console.log('Visit Data:', visitData);

        // Show success message
        this.showNotification('بازدید با موفقیت ثبت شد', 'success');
        
        // Reset form
        form.reset();
        this.setupDateInputs();
    }

    handleCustomerFormSubmission(form) {
        // Collect form data
        const formData = new FormData(form);
        const customerData = {};
        
        for (let [key, value] of formData.entries()) {
            customerData[key] = value;
        }

        console.log('Customer Data:', customerData);

        // Show success message
        this.showNotification('مشتری با موفقیت ثبت شد', 'success');
        
        // Close modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('customerModal'));
        if (modal) {
            modal.hide();
        }
        
        // Reset form
        form.reset();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; left: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    updateDateTime() {
        // Update any time-sensitive displays
        const now = new Date();
        console.log('DateTime updated:', now.toLocaleString('fa-IR'));
    }

    // Utility methods
    formatCurrency(amount) {
        return new Intl.NumberFormat('fa-IR').format(amount) + ' تومان';
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('fa-IR');
    }

    // Data management methods (these would connect to your backend)
    async loadCustomers() {
        // Mock data for demonstration
        return [
            {
                id: 1,
                name: 'علی احمدی',
                phone: '09123456789',
                email: 'ali.ahmadi@email.com',
                group: 'vip',
                level: 'gold',
                credit: 50000000
            },
            {
                id: 2,
                name: 'فاطمه موسوی',
                phone: '09876543210',
                email: 'f.mousavi@email.com',
                group: 'regular',
                level: 'silver',
                credit: 20000000
            }
        ];
    }

    async loadOrders() {
        // Mock data for demonstration
        return [
            {
                id: 'ORD-001',
                customer: 'علی احمدی',
                date: '1402/08/10',
                amount: 25000000,
                status: 'production',
                deliveryDate: '1402/09/15'
            }
        ];
    }

    async loadAfterSalesRequests() {
        // Mock data for demonstration
        return [
            {
                id: 'AS-001',
                customer: 'علی احمدی',
                subject: 'نقص در رنگ‌کاری',
                priority: 'high',
                status: 'reviewing',
                date: '1402/08/12'
            }
        ];
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new FurnitureCRM();
    
    // Make app globally accessible for debugging
    window.furnitureCRM = app;
    
    console.log('Furniture CRM System initialized successfully');
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FurnitureCRM;
}