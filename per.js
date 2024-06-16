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

    const perForm = document.getElementById('per-form');

    perForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const totalValue = parseFloat(document.getElementById('totalValue').value);
        const stockPrice = parseFloat(document.getElementById('stockPrice').value);
        const stockUnits = parseFloat(document.getElementById('stockUnits').value);
        let stockValue = stockPrice * stockUnits;

        let valid = true;

        if (totalValue <= 0) {
            document.getElementById('total-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('total-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('total-warning').style.display = 'none';
        }

        if (stockPrice <= 0) {
            document.getElementById('price-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('price-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('price-warning').style.display = 'none';
        }

        if (stockUnits <= 0) {
            document.getElementById('unit-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('unit-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('unit-warning').style.display = 'none';
        }

        if (stockValue > totalValue) {
            document.getElementById('price-warning').innerText = `Stock value can't be greater than portfolio value`;
            document.getElementById('price-warning').style.display = 'block';
            document.getElementById('unit-warning').innerText = 'Please enter correct values';
            document.getElementById('unit-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('price-warning').style.display = 'none';
            document.getElementById('unit-warning').style.display = 'none';
        }


        if (valid) {
            const percentageValue = ((stockValue / totalValue) * 100).toFixed(2);
            document.getElementById('per-value').innerText = percentageValue + ' %';
        }

    })
})