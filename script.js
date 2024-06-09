document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });
});