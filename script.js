document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmode-toggle');
    const exploreButton = document.getElementById('explore');
    const calcHeading = document.getElementById('calc-heading');
    const learnMoreLinks = document.getElementsByClassName('learnmore');
    const aboutTap = document.getElementById('about')

    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
    });

    exploreButton.addEventListener('click', () => scrollToElement('.calculator-box'));
    calcHeading.addEventListener('click', () => scrollToElement('.calculator-box'));

    Array.from(learnMoreLinks).forEach(link => {
        link.addEventListener('click', () => scrollToElement('#learnmore-content'));
    });
    aboutTap.addEventListener('click', () => scrollToElement('#learnmore-content'))
});

function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const yOffset = 130;
        const y = element.getBoundingClientRect().top + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}



