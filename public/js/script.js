(() => {
'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')
    }, false)
})
})()

// Dark/Light Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Get saved theme from localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    console.log('Applying saved theme:', savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update theme toggle icon
    updateThemeIcon(savedTheme);
    
    // Add event listener to theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        console.log('Theme toggle button found');
        themeToggle.addEventListener('click', toggleTheme);
    } else {
        console.error('Theme toggle button not found!');
    }
});

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    console.log('Toggling theme from', currentTheme, 'to', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}
