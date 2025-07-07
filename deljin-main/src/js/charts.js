// Charts and Data Visualization for Furniture CRM System

class ChartManager {
    constructor() {
        this.charts = {};
        this.initCharts();
    }

    initCharts() {
        // Initialize charts when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupCharts();
            });
        } else {
            this.setupCharts();
        }
    }

    setupCharts() {
        this.createSalesChart();
        this.createCustomerTypeChart();
        this.createKPICharts();
    }

    createSalesChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;

        // Sample data for monthly sales
        const salesData = {
            labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
            datasets: [{
                label: 'فروش (میلیون تومان)',
                data: [2800, 3200, 2900, 3500, 4100, 3800, 4200, 3900, 4500, 4800, 4300, 5200],
                borderColor: '#8b4513',
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#8b4513',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        };

        const config = {
            type: 'line',
            data: salesData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                family: 'Vazirmatn',
                                size: 14
                            },
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            family: 'Vazirmatn'
                        },
                        bodyFont: {
                            family: 'Vazirmatn'
                        },
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toLocaleString('fa-IR') + ' میلیون تومان';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            font: {
                                family: 'Vazirmatn'
                            },
                            callback: function(value) {
                                return value.toLocaleString('fa-IR');
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Vazirmatn'
                            }
                        }
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        };

        this.charts.salesChart = new Chart(ctx, config);
    }

    createCustomerTypeChart() {
        const ctx = document.getElementById('customerTypeChart');
        if (!ctx) return;

        const customerTypeData = {
            labels: ['مشتریان ویژه', 'مشتریان عادی', 'دیزاینرها', 'سازندگان', 'مشاوران املاک', 'سفیران برند'],
            datasets: [{
                data: [234, 456, 123, 89, 67, 45],
                backgroundColor: [
                    '#8b4513',
                    '#deb887',
                    '#cd853f',
                    '#f39c12',
                    '#27ae60',
                    '#3498db'
                ],
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverBorderWidth: 3,
                hoverBorderColor: '#ffffff'
            }]
        };

        const config = {
            type: 'doughnut',
            data: customerTypeData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Vazirmatn',
                                size: 12
                            },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleFont: {
                            family: 'Vazirmatn'
                        },
                        bodyFont: {
                            family: 'Vazirmatn'
                        },
                        callbacks: {
                            label: function(context) {
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((context.parsed / total) * 100).toFixed(1);
                                return context.label + ': ' + context.parsed.toLocaleString('fa-IR') + ' نفر (' + percentage + '%)';
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateRotate: true,
                    duration: 2000
                }
            }
        };

        this.charts.customerTypeChart = new Chart(ctx, config);
    }

    createKPICharts() {
        // This method can be expanded to create additional KPI charts
        // for production, after-sales, fabric management, etc.
        
        // Production KPI Chart
        this.createProductionKPIChart();
        
        // After-sales KPI Chart
        this.createAfterSalesKPIChart();
    }

    createProductionKPIChart() {
        // Sample production workflow timeline chart
        const productionStages = [
            'ثبت سفارش',
            'تایید سفارش',
            'شروع تولید',
            'تولید CNC',
            'ساخت اسکلت',
            'رنگ‌کاری',
            'خیاطی',
            'رویه‌کوبی',
            'کنترل کیفیت',
            'ورود به انبار',
            'تحویل'
        ];

        // This could be used in a production timeline view
        console.log('Production stages defined:', productionStages);
    }

    createAfterSalesKPIChart() {
        // Sample after-sales priority distribution
        const afterSalesData = {
            high: 12,
            medium: 28,
            low: 35
        };

        console.log('After-sales data prepared:', afterSalesData);
    }

    updateChart(chartName, newData) {
        if (this.charts[chartName]) {
            this.charts[chartName].data = newData;
            this.charts[chartName].update();
        }
    }

    destroyChart(chartName) {
        if (this.charts[chartName]) {
            this.charts[chartName].destroy();
            delete this.charts[chartName];
        }
    }

    resizeCharts() {
        Object.keys(this.charts).forEach(chartName => {
            if (this.charts[chartName]) {
                this.charts[chartName].resize();
            }
        });
    }

    // Method to generate reports
    generateSalesReport(startDate, endDate) {
        // Mock data generation for sales report
        const report = {
            period: { start: startDate, end: endDate },
            totalSales: 45600000000, // 45.6 billion tomans
            totalOrders: 287,
            averageOrderValue: 158885375,
            topCustomers: [
                { name: 'علی احمدی', orders: 12, value: 680000000 },
                { name: 'فاطمه موسوی', orders: 8, value: 520000000 },
                { name: 'محمد رضایی', orders: 6, value: 450000000 }
            ],
            productCategories: {
                'مبلمان نئوکلاسیک': 40,
                'مبلمان مدرن': 35,
                'سرویس غذاخوری': 15,
                'سرویس خواب': 10
            }
        };

        return report;
    }

    generateCustomerReport() {
        // Mock customer analytics
        const report = {
            totalCustomers: 1234,
            newCustomersThisMonth: 87,
            customerRetentionRate: 78.5,
            averageCustomerLifetimeValue: 2850000,
            customerSatisfactionScore: 4.3,
            groupDistribution: {
                'مشتریان ویژه': 234,
                'مشتریان عادی': 456,
                'دیزاینرها': 123,
                'سازندگان': 89,
                'مشاوران املاک': 67,
                'سفیران برند': 45
            }
        };

        return report;
    }

    generateProductionReport() {
        // Mock production analytics
        const report = {
            averageProductionTime: 28, // days
            averageOrderToDelivery: 35, // days
            qualityControlPassRate: 96.8,
            onTimeDeliveryRate: 89.2,
            productionEfficiency: 92.5,
            bottlenecks: [
                { stage: 'رنگ‌کاری', averageDelay: 3.5 },
                { stage: 'خیاطی', averageDelay: 2.1 }
            ]
        };

        return report;
    }

    generateAfterSalesReport() {
        // Mock after-sales analytics
        const report = {
            totalRequests: 200,
            averageResponseTime: 2.3, // hours
            averageResolutionTime: 48, // hours
            customerSatisfactionAfterService: 4.1,
            commonIssues: [
                { issue: 'نقص در تولید', count: 45, percentage: 22.5 },
                { issue: 'آسیب در حمل و نقل', count: 38, percentage: 19 },
                { issue: 'خطای نصب', count: 32, percentage: 16 },
                { issue: 'استفاده ناصحیح', count: 28, percentage: 14 }
            ],
            priorityDistribution: {
                high: 12,
                medium: 28,
                low: 35
            }
        };

        return report;
    }

    // Method to export chart as image
    exportChart(chartName, filename) {
        if (this.charts[chartName]) {
            const canvas = this.charts[chartName].canvas;
            const url = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = filename || `${chartName}.png`;
            link.href = url;
            link.click();
        }
    }

    // Real-time data update simulation
    startRealTimeUpdates() {
        setInterval(() => {
            this.updateDashboardStats();
        }, 30000); // Update every 30 seconds
    }

    updateDashboardStats() {
        // Simulate real-time updates
        const statElements = document.querySelectorAll('.stat-content h3');
        statElements.forEach(element => {
            const currentValue = parseInt(element.textContent.replace(/[^\d]/g, ''));
            if (currentValue) {
                // Simulate small random changes
                const change = Math.floor(Math.random() * 10) - 5;
                const newValue = Math.max(0, currentValue + change);
                element.textContent = newValue.toLocaleString('fa-IR');
            }
        });
    }
}

// Initialize chart manager
document.addEventListener('DOMContentLoaded', () => {
    const chartManager = new ChartManager();
    
    // Make globally accessible
    window.chartManager = chartManager;
    
    // Handle window resize
    window.addEventListener('resize', () => {
        chartManager.resizeCharts();
    });
    
    console.log('Chart Manager initialized successfully');
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChartManager;
}