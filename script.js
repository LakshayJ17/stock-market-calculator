document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const exploreButton = document.getElementById('explore');
    const calcHeading = document.getElementById('calc-heading');
    const learnMoreLinks = document.getElementsByClassName('learnmore');
    const aboutTap = document.getElementById('about');
    const darkMode = localStorage.getItem('dark-mode');

    // Check and apply dark mode from local storage
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }

    // Toggle dark mode and save preference to local storage
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });

    // Scroll to elements
    exploreButton.addEventListener('click', () => scrollToElement('.calculator-box'));
    calcHeading.addEventListener('click', () => scrollToElement('.calculator-box'));
    Array.from(learnMoreLinks).forEach(link => {
        link.addEventListener('click', () => scrollToElement('#learnmore-content'));
    });
    aboutTap.addEventListener('click', () => scrollToElement('#learnmore-content'));
});

function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const yOffset = 100; 
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}





