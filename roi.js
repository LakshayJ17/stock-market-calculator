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

    const roiForm = document.getElementById('roi-form');

    roiForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const investedAmount = parseFloat(document.getElementById('invested').value);
        const returnAmount = parseFloat(document.getElementById('return').value);
        const time = parseFloat(document.getElementById('time').value);

        let valid = true;

        if (investedAmount <= 0) {
            document.getElementById('invested-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('invested-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('invested-warning').style.display = 'none';
        }

        if (returnAmount <= 0) {
            document.getElementById('return-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('return-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('return-warning').style.display = 'none';
        }

        if (time <= 0) {
            document.getElementById('time-warning').innerText = 'Please enter a value greater than 0';
            document.getElementById('time-warning').style.display = 'block';
            valid = false;
        } else {
            document.getElementById('time-warning').style.display = 'none';
        }

        if (valid) {
            const gains = returnAmount - investedAmount;
            document.getElementById('gain-value').innerText = '₹ ' + gains.toFixed(2);

            const roi = ((returnAmount - investedAmount) / investedAmount) * 100;
            document.getElementById('roi-value').innerText = roi.toFixed(2) + ' %';

            const annualRoi = roi / time;
            document.getElementById('annual-value').innerText = annualRoi.toFixed(2) + ' %';
        }
    });
});
