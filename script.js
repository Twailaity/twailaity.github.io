document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const accentPickerContainer = document.getElementById('accent-picker-container');
    const root = document.documentElement;

    const sunIcon = '☀️';
    const moonIcon = '🌙';

    let currentAccentId = localStorage.getItem('accent-id') || '1'; // Отслеживаем текущий ID акцента

    // --- Применение темы (светлая/темная) ---
    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (themeToggleButton) {
            themeToggleButton.innerHTML = theme === 'light' ? moonIcon : sunIcon;
            themeToggleButton.title = theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему';
        }
        localStorage.setItem('theme', theme);
    }

    // --- Применение акцентного цвета и фона ---
    function applyAccent(accentId, colorVar) {
        // Устанавливаем атрибут для CSS, чтобы он мог выбрать правильный градиент
        root.setAttribute('data-accent', accentId);
        // Устанавливаем переменную для цвета ссылок, кнопок и т.д.
        root.style.setProperty('--current-accent-color', colorVar);

        // Обновляем активный класс на кнопках
        if (accentPickerContainer) {
            const accentButtons = accentPickerContainer.querySelectorAll('.accent-option');
            accentButtons.forEach(btn => {
                btn.classList.remove('active-accent');
                if (btn.getAttribute('data-accent-id') === accentId) {
                    btn.classList.add('active-accent');
                }
            });
        }

        // Сохраняем выбор в localStorage
        localStorage.setItem('accent-id', accentId);
        localStorage.setItem('accent-color-var', colorVar);
    }

    // --- Инициализация при загрузке страницы ---

    // 1. Устанавливаем тему
    const savedTheme = localStorage.getItem('theme') ||
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // 2. Устанавливаем акцентный цвет
    const savedAccentId = localStorage.getItem('accent-id') || '1';
    const savedAccentColorVar = localStorage.getItem('accent-color-var') || 'var(--accent-color-1)';
    applyAccent(savedAccentId, savedAccentColorVar);


    // --- Обработчики событий ---

    // Клик на переключатель темы
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            let newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }

    // Клик на выбор акцентного цвета
    if (accentPickerContainer) {
        const accentButtons = accentPickerContainer.querySelectorAll('.accent-option');
        accentButtons.forEach(button => {
            button.addEventListener('click', () => {
                const accentId = button.getAttribute('data-accent-id');
                const colorVar = button.getAttribute('data-color');
                applyAccent(accentId, colorVar);
            });
        });
    }
    
    // --- Активная навигационная ссылка ---
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header ul li a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPath === currentLocation) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
