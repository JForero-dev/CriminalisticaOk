document.addEventListener('DOMContentLoaded', function () {

    const mainButton = document.createElement('button');
    mainButton.innerHTML = '<i class="fas fa-plus"></i>';
    mainButton.classList.add('main-toggle-button');

    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.classList.add('theme-toggle-button');

    const langToggle = document.createElement('button');
    langToggle.innerHTML = '<i class="fas fa-language"></i>';
    langToggle.classList.add('lang-toggle-button');

    const buttons = [mainButton, themeToggle, langToggle];

    const styleButton = (btn) => {
        Object.assign(btn.style, {
            width: '50px',
            height: '50px',
            backgroundColor: '#007bff',
            color: '#f8fafc',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
            transition: 'background-color 0.3s ease',
            border: 'none',
            fontSize: '1.5em',
            cursor: 'pointer'
        });

        btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#ff9719';
        });

        btn.addEventListener('mouseleave', () => {
            const isDarkMode = document.body.classList.contains('dark-mode');
            btn.style.backgroundColor = isDarkMode ? '#0a359d' : '#007bff';
        });
    };

    buttons.forEach(styleButton);

    Object.assign(mainButton.style, {
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        zIndex: '999'
    });


    const extraButtonsContainer = document.createElement('div');
    Object.assign(extraButtonsContainer.style, {
        position: 'fixed',
        bottom: '90px',
        left: '30px',
        display: 'none',
        flexDirection: 'column',
        gap: '10px',
        zIndex: '999'
    });

    mainButton.addEventListener('click', () => {
        const isVisible = extraButtonsContainer.style.display === 'flex';
        extraButtonsContainer.style.display = isVisible ? 'none' : 'flex';

        const isDarkMode = document.body.classList.contains('dark-mode');
        mainButton.style.backgroundColor = isVisible
            ? (isDarkMode ? '#0a359d' : '#007bff')
            : '#ff9719';
    });

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggle.innerHTML = isDarkMode
            ? '<i class="fas fa-sun"></i>'
            : '<i class="fas fa-moon"></i>';

        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

        buttons.forEach(btn => {
            btn.style.backgroundColor = isDarkMode ? '#0a359d' : '#007bff';
        });
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        buttons.forEach(btn => btn.style.backgroundColor = '#0a359d');
    }

    langToggle.addEventListener('click', () => {
        const fileMap = {
            // Español → Inglés
            'index.html': 'Templates/Translate/enIndex.html',
            'politica.html': 'Translate/politic.html',
            'servicio.html': 'Translate/services.html',

            // Inglés → Español
            'enIndex.html': '../../index.html',
            'politic.html': '../politica.html',
            'services.html': '../servicio.html'
        };
        const pathParts = window.location.pathname.split('/');
        const currentFile = pathParts[pathParts.length - 1] || 'index.html';
        const newFile = fileMap[currentFile];

        if (newFile) {
            window.location.href = newFile;
        } else {
            alert('No se pudo detectar el idioma actual.');
        }
    });

    extraButtonsContainer.appendChild(themeToggle);
    extraButtonsContainer.appendChild(langToggle);

    document.body.appendChild(mainButton);
    document.body.appendChild(extraButtonsContainer);
});
