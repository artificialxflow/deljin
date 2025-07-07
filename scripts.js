
document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mainContent = document.getElementById('mainContent');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
    });

    // Handle visit form logic
    const visitForm = document.getElementById('visitForm');
    if (visitForm) {
        const femaleCount = document.getElementById('femaleCount');
        const maleCount = document.getElementById('maleCount');
        const totalCount = document.getElementById('totalCount');
        const visitDate = document.getElementById('visitDate');
        const dayOfWeek = document.getElementById('dayOfWeek');
        const newCustomerSection = document.getElementById('newCustomerSection');
        const customerTypeRadios = document.querySelectorAll('input[name="customerType"]');

        const updateTotal = () => {
            totalCount.value = parseInt(femaleCount.value) + parseInt(maleCount.value);
        };

        const updateDayOfWeek = () => {
            const date = new Date(visitDate.value);
            const days = ['یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'];
            dayOfWeek.value = days[date.getDay()];
        };

        femaleCount.addEventListener('input', updateTotal);
        maleCount.addEventListener('input', updateTotal);
        visitDate.addEventListener('input', updateDayOfWeek);

        customerTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.value === 'new') {
                    newCustomerSection.classList.add('active');
                } else {
                    newCustomerSection.classList.remove('active');
                }
            });
        });

        // Initial setup
        updateTotal();
        updateDayOfWeek();
        if(document.querySelector('input[name="customerType"]:checked').value === 'new'){
            newCustomerSection.classList.add('active');
        }

    }
});
