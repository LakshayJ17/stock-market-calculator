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

    const plForm = document.getElementById('pl-form');

    plForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let quantity = parseFloat(document.getElementById('qty').value);
        let buyPrice = parseFloat(document.getElementById('buyPrice').value);
        let sellPrice = parseFloat(document.getElementById('sellingPrice').value);

        let totalBuyCost = buyPrice * quantity;
        let totalSellValue = sellPrice * quantity;

        let valid = true;

        if (quantity <= 0) {
            document.getElementById('qty-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('qty-warning').style.display = 'block';
            valid = false;
        }else {
            document.getElementById('qty-warning').style.display = 'none';
        }

        if (buyPrice <= 0) {
            document.getElementById('buy-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('buy-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('buy-warning').style.display = 'none';
        }

        if (sellPrice <= 0) {
            document.getElementById('sell-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('sell-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('sell-warning').style.display = 'none';
        }

        if (valid) {
            function calculateTax() {
                let turnover = totalBuyCost + totalSellValue;
                let exchangeCharges = (0.00325 / 100) * turnover;
                let sebiCharges = (0.0001 / 100) * turnover;
                let stampDuty = (0.015 / 100) * totalBuyCost;
                let stt = (0.1 / 100) * turnover;
                let gst = (18 / 100) * (exchangeCharges + sebiCharges);
                let dpCharges = 13.5;

                let totalTax = exchangeCharges + sebiCharges + stampDuty + stt + gst + dpCharges;
                return totalTax;
            }

            function calculateProfitOrLoss(totalTax) {
                let profitOrLoss = totalSellValue - totalBuyCost - totalTax;
                return profitOrLoss;
            }

            let totalTax = calculateTax();
            let profitOrLoss = calculateProfitOrLoss(totalTax);
            document.getElementById('tax-value').textContent = '₹ ' + totalTax.toFixed(2);
            if (profitOrLoss >= 0) {
                document.getElementById('result').innerHTML = `<h3>Profit : ₹ ${profitOrLoss.toFixed(2)}</h3>`;
            }
            else {
                let absoluteLoss = Math.abs(profitOrLoss);
                document.getElementById('result').innerHTML = `<h3>Loss : ₹ ${absoluteLoss.toFixed(2)}</h3>`;
            }

            scrollToElement('#result');
        }

    });

    function scrollToElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const yOffset = 150;
            const y = element.getBoundingClientRect().top + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
});








