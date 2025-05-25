document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle-button');
    const accentPickerContainer = document.getElementById('accent-picker-container');
    const root = document.documentElement; // Получаем корневой элемент <html>

    // --- Переключение тем ---
    const sunIcon = '☀️'; // Иконка солнца
    const moonIcon = '🌙'; // Иконка луны

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme); // Устанавливаем атрибут data-theme на <html>
        if (themeToggleButton) {
            themeToggleButton.innerHTML = theme === 'light' ? moonIcon : sunIcon; // Меняем иконку на кнопке
            themeToggleButton.title = theme === 'light' ? 'Переключить на темную тему' : 'Переключить на светлую тему'; // Меняем title кнопки
        }
        localStorage.setItem('theme', theme); // Сохраняем выбор темы в localStorage
    }

    // Загружаем сохраненную тему или определяем по системным настройкам
    const savedTheme = localStorage.getItem('theme') ||
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme); // Применяем тему

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            let newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'; // Определяем новую тему
            applyTheme(newTheme); // Применяем новую тему
        });
    }

    // --- Переключение акцентного цвета ---
    function applyAccentColor(colorVar) {
        root.style.setProperty('--current-accent-color', colorVar); // Устанавливаем CSS-переменную
        localStorage.setItem('accent-color', colorVar); // Сохраняем выбор цвета

        // Обновляем активный класс на кнопках выбора цвета
        if (accentPickerContainer) {
            const accentButtons = accentPickerContainer.querySelectorAll('.accent-option');
            accentButtons.forEach(btn => {
                btn.classList.remove('active-accent');
                if (btn.getAttribute('data-color') === colorVar) {
                    btn.classList.add('active-accent');
                }
            });
        }
    }

    // Загружаем сохраненный акцентный цвет или используем цвет по умолчанию
    const savedAccentColor = localStorage.getItem('accent-color') || 'var(--accent-color-1)';
    applyAccentColor(savedAccentColor); // Применяем цвет

    if (accentPickerContainer) {
        const accentButtons = accentPickerContainer.querySelectorAll('.accent-option');
        accentButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedColor = button.getAttribute('data-color'); // Получаем цвет из атрибута data-color
                applyAccentColor(selectedColor); // Применяем выбранный цвет
            });
        });
    }

    // --- Активная навигационная ссылка ---
    // Это помогает выделить текущую страницу в навигации
    const currentLocation = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header ul li a');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop() || 'index.html'; // Получаем имя файла из href ссылки
        if (linkPath === currentLocation) {
            link.classList.add('active'); // Добавляем класс 'active', стилизованный в CSS
        } else {
            link.classList.remove('active');
        }
    });
});