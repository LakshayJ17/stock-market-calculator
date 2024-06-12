document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });
})

document.getElementById('sip-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    var monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
    var annualRate = parseFloat(document.getElementById('annual-rate').value);
    var investmentPeriod = parseFloat(document.getElementById('investment-period').value);

    // Calculate result
    var futureValue = calculateFutureValue(monthlyInvestment, annualRate, investmentPeriod);

    // Display result
    document.getElementById('future-value').textContent = '₹' + futureValue.toFixed(2);
});

function calculateFutureValue(monthlyInvestment, annualRate, investmentPeriod) {
    var monthlyRate = (annualRate / 100) / 12;
    var months = investmentPeriod * 12;

    var futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

    return futureValue;
}
