## Структура папок и файлов
```
├── src/                             # исходники
│   ├── blocks/                      # блоки
│   │   ├── library/                 # библиотека блоков (кросс-проектные блоки)
│   │   │   └── block-name/          # папка с файлами блока
│   │   │
│   │   └── utils/                   # миксуемые блоки-утили
│   │
│   ├── pages/                       # страницы проекта
│       ├── index.html                # разводящая страница, содержит ссыкли на страницы проекта
│       └── page-name/               # директория с файлами страницы
│
├── app/                            # папка с файлами сборки + ресурсы
├── .gitignore                       # список исключённых файлов из Git
├── gulpfile.js                      # файл для запуска gulp
├── package.json                     # список зависимостей и скриптов
└── readme.md                        # документация
```