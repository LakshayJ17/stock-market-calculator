document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const darkMode = localStorage.getItem('dark-mode');

    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }

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

    const cgForm = document.getElementById('cg-form');

    cgForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
        const salePrice = parseFloat(document.getElementById('salePrice').value);
        const holdingPeriod = parseFloat(document.getElementById('holdingPeriod').value);
        const totalIncome = parseFloat(document.getElementById('totalIncome').value);

        let valid = true;

        if (purchasePrice <= 0) {
            document.getElementById('purchase-price-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('purchase-price-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('purchase-price-warning').style.display = 'none';
        }

        if (salePrice <= 0) {
            document.getElementById('sale-price-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('sale-price-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('sale-price-warning').style.display = 'none';
        }

        if (holdingPeriod <= 0) {
            document.getElementById('holding-period-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('holding-period-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('holding-period-warning').style.display = 'none';
        }

        if (totalIncome <= 0) {
            document.getElementById('total-income-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('total-income-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('total-income-warning').style.display = 'none';
        }

        if (valid) {
            const capitalGain = salePrice - purchasePrice;
            let taxRate = 0;
            let exemptionLimit = 0;

            if (holdingPeriod > 1) {
                // Long-term capital gains (LTCG)
                exemptionLimit = 100000; // Exemption for LTCG up to ₹1,00,000
                if (capitalGain > exemptionLimit) {
                    taxRate = 10;
                } else {
                    taxRate = 0;
                }
            } else {
                // Short-term capital gains (STCG)
                taxRate = 15;
            }

            let taxableGain = capitalGain;
            if (taxRate === 10 && capitalGain > exemptionLimit) {
                taxableGain = capitalGain - exemptionLimit;
            }

            const taxPayable = (taxableGain * taxRate) / 100;
            let totalTaxPayable = taxPayable;

            // Check if total income is within the basic exemption limit for STCG
            const basicExemptionLimit = 250000; // For individuals below 60 years
            if (totalIncome + taxableGain <= basicExemptionLimit) {
                totalTaxPayable = 0; // No tax if total income including gains is below exemption limit
            } else if (totalIncome < basicExemptionLimit && totalIncome + taxableGain > basicExemptionLimit) {
                const remainingExemption = basicExemptionLimit - totalIncome;
                if (holdingPeriod <= 1) {
                    totalTaxPayable = ((taxableGain - remainingExemption) * taxRate) / 100;
                }
            }

            const resultText = `
            Purchase Price: ₹ ${purchasePrice.toFixed(2)}<br>
            Sale Price: ₹ ${salePrice.toFixed(2)}<br>
            Holding Period: ${holdingPeriod} years<br>
            Total Income: ₹ ${totalIncome.toFixed(2)}<br>
            Capital Gain: ₹ ${capitalGain.toFixed(2)}<br>
            Tax Rate: ${taxRate} %<br>
            Tax Payable: ₹ ${totalTaxPayable.toFixed(2)}`;

            document.getElementById('resultText').innerHTML = resultText;

            scrollToElement('#result')
        }

    })
    function scrollToElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const yOffset = -150;
            const y = element.getBoundingClientRect().top + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
})