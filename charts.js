
document.addEventListener('DOMContentLoaded', function () {
    // Sales Chart
    const salesChartCtx = document.getElementById('salesChart');
    if (salesChartCtx) {
        new Chart(salesChartCtx, {
            type: 'line',
            data: {
                labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور'],
                datasets: [{
                    label: 'فروش ماهانه',
                    data: [1.2, 1.9, 1.5, 2.1, 2.5, 2.2],
                    borderColor: '#8b4513',
                    backgroundColor: 'rgba(139, 69, 19, 0.1)',
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    // Customer Type Chart
    const customerTypeChartCtx = document.getElementById('customerTypeChart');
    if (customerTypeChartCtx) {
        new Chart(customerTypeChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['مشتریان ویژه', 'مشتریان عادی', 'دیزاینرها', 'سازندگان'],
                datasets: [{
                    data: [300, 500, 150, 280],
                    backgroundColor: ['#8b4513', '#deb887', '#cd853f', '#a0522d'],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    // Product Sales Chart
    const productSalesChartCtx = document.getElementById('productSalesChart');
    if (productSalesChartCtx) {
        new Chart(productSalesChartCtx, {
            type: 'bar',
            data: {
                labels: ['مبلمان راحتی', 'مبلمان کلاسیک', 'سرویس خواب', 'میز ناهارخوری'],
                datasets: [{
                    label: 'تعداد فروش',
                    data: [120, 80, 60, 90],
                    backgroundColor: '#8b4513',
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    // Visits By Day Chart
    const visitsByDayChartCtx = document.getElementById('visitsByDayChart');
    if (visitsByDayChartCtx) {
        new Chart(visitsByDayChartCtx, {
            type: 'pie',
            data: {
                labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
                datasets: [{
                    data: [15, 25, 20, 30, 35, 50, 10],
                    backgroundColor: ['#8b4513', '#deb887', '#cd853f', '#a0522d', '#d2691e', '#a52a2a', '#654321'],
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }
});
