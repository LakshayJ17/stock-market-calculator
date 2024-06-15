document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const darkMode = localStorage.getItem('dark-mode');

    // Apply dark mode if enabled in local storage
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

    // Toggle dark mode and save preference to local storage
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('dark-mode', 'disabled');
            }
        });
    }

    const sipOpt = document.getElementById('sip-opt');
    const lumpsumOpt = document.getElementById('lumpsum-opt');
    const sipForm = document.getElementById('sip-form');
    const lumpsumForm = document.getElementById('lumpsum-form');
    const futureValueDisplay = document.getElementById('future-value');

    sipOpt.addEventListener('click', () => {
        sipForm.style.display = 'block';
        lumpsumForm.style.display = 'none';
        sipOpt.classList.add('selected');
        lumpsumOpt.classList.remove('selected');
        futureValueDisplay.textContent = '';

    })

    lumpsumOpt.addEventListener('click', () => {
        sipForm.style.display = 'none';
        lumpsumForm.style.display = 'block';
        sipOpt.classList.remove('selected');
        lumpsumOpt.classList.add('selected');
        futureValueDisplay.textContent = '';

    });



    sipForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form values
        let monthlyInvestment = parseFloat(document.getElementById('monthly-investment').value);
        let annualRate = parseFloat(document.getElementById('annual-rate').value);
        let investmentPeriod = parseFloat(document.getElementById('investment-period').value);

        let valid = true;

        if (isNaN(monthlyInvestment) || monthlyInvestment < 500) {
            document.getElementById('monthly-investment-warning').style.display = 'block';
            document.getElementById('monthly-investment-warning').innerText = 'Minimum investment amount is 500';
            valid = false;
        } else {
            document.getElementById('monthly-investment-warning').style.display = 'none';
        }

        if (isNaN(annualRate) || annualRate <= 0) {
            document.getElementById('annual-rate-warning').style.display = 'block';
            document.getElementById('annual-rate-warning').innerText = 'Please enter a value greater than 0';
            valid = false;
        } else {
            document.getElementById('annual-rate-warning').style.display = 'none';
        }

        if (isNaN(investmentPeriod) || investmentPeriod <= 0) {
            document.getElementById('investment-period-warning').style.display = 'block';
            document.getElementById('investment-period-warning').innerText = 'Please enter a value greater than 0';
            valid = false;
        } else {
            document.getElementById('investment-period-warning').style.display = 'none';
        }

        if (valid) {
            // Calculate result
            let futureValue = calculateFutureValueSIP(monthlyInvestment, annualRate, investmentPeriod);

            // Display result
            futureValueDisplay.textContent = '₹ ' + futureValue;
        }

    });

    lumpsumForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let lumpsumAmount = parseFloat(document.getElementById('lumpsum-amount').value);
        let annualRateLumpsum = parseFloat(document.getElementById('annual-rate-lumpsum').value);
        let investmentPeriodLumpsum = parseFloat(document.getElementById('investment-period-lumpsum').value);

        let valid = true;

        if (isNaN(lumpsumAmount) || lumpsumAmount < 500) {
            document.getElementById('lumpsum-amount-warning').style.display = 'block';
            document.getElementById('lumpsum-amount-warning').innerText = 'Minimum investment amount is 500';
            valid = false;
        } else {
            document.getElementById('lumpsum-amount-warning').style.display = 'none';
        }

        if (isNaN(annualRate) || annualRate <= 0) {
            document.getElementById('annual-rate-lumpsum-warning').style.display = 'block';
            document.getElementById('annual-rate-lumpsum-warning').innerText = 'Please enter a value greater than 0';
            valid = false;
        } else {
            document.getElementById('annual-rate-lumpsum-warning').style.display = 'none';
        }

        if (isNaN(investmentPeriod) || investmentPeriod <= 0) {
            document.getElementById('investment-period-lumpsum-warning').style.display = 'block';
            document.getElementById('investment-period-lumpsum-warning').innerText = 'Please enter a value greater than 0';
            valid = false;
        } else {
            document.getElementById('investment-period-lumpsum-warning').style.display = 'none';
        }

        if (valid) {
            let futureValue = calculateFutureValueLumpsum(lumpsumAmount, annualRateLumpsum, investmentPeriodLumpsum);
            futureValueDisplay.textContent = '₹ ' + futureValue;
        }

    });

    function calculateFutureValueSIP(monthlyInvestment, annualRate, investmentPeriod) {
        let monthlyRate = (annualRate / 100) / 12;
        let months = investmentPeriod * 12;

        let futureValue = monthlyInvestment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
        return Math.floor(futureValue);
    }

    function calculateFutureValueLumpsum(lumpsumAmount, annualRate, investmentPeriod) {
        let annualRateDecimal = annualRate / 100;

        let futureValue = lumpsumAmount * Math.pow(1 + annualRateDecimal, investmentPeriod);
        return Math.floor(futureValue);
    }
});
