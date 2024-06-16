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

    const avgForm = document.getElementById('avg-form');

    avgForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const firstBuyPrice = parseFloat(document.getElementById('first-buy-price').value);
        const firstBuyQty = parseFloat(document.getElementById('first-buy-qty').value);
        const secondBuyPrice = parseFloat(document.getElementById('second-buy-price').value);
        const secondBuyQty = parseFloat(document.getElementById('second-buy-qty').value);

        let valid = true;

        if (firstBuyPrice <= 0) {
            document.getElementById('first-price-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('first-price-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('first-price-warning').style.display = 'none';
        }

        if (firstBuyQty <= 0) {
            document.getElementById('first-qty-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('first-qty-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('first-qty-warning').style.display = 'none';
        }

        if (secondBuyPrice <= 0) {
            document.getElementById('second-price-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('second-price-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('second-price-warning').style.display = 'none';
        }

        if (secondBuyQty <= 0) {
            document.getElementById('second-qty-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('second-qty-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('second-qty-warning').style.display = 'none';
        }

        if (valid) {
            const totalFirstCost = firstBuyPrice * firstBuyQty;
            const totalSecondCost = secondBuyPrice * secondBuyQty;

            const totalQty = firstBuyQty + secondBuyQty;
            const totalCost = totalFirstCost + totalSecondCost;
            const averagePrice = totalCost / totalQty;

            document.getElementById('averagePrice').innerText = '₹ ' + averagePrice.toFixed(2);
            document.getElementById('totalQty').innerText = totalQty;
            document.getElementById('totalInv').innerText = '₹ ' + totalCost;

            scrollToElement('#result');
        }


    });
    function scrollToElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            const yOffset = 150;
            const y = element.getBoundingClientRect().top + window.pageYOffset - yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    }
});
