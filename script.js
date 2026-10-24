/* ============================================================
   ORCHESTRA · Keynote Motion Engine
   Lenis + GSAP ScrollTrigger + SplitType + Internationalization
   ============================================================ */
(() => {
  "use strict";

  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const EASE = "power4.out";
  const chapters = Array.from(document.querySelectorAll("[data-chapter]"));
  const demoChapter = document.querySelector(".chapter.demo");

  /* =========================================================
     TRANSLATIONS (RU / UZ / EN)
     ========================================================= */
  const TRANSLATIONS = {
    "ru": {
        "introSurname": "Бахтияров",
        "introFirstName": "<em>Султанбек</em>",
        "introPatronymic": "Диярович",
        "pifTitle": "Prezident<br><em>iqtidorli farzandlari</em>",
        "uzcTitle": "UzCombinator",
        "ch3": "UzCombinator",
        "introEyebrow": "01 — O‘QUVCHILAR KENGASHI",
        "ch0": "Обо мне",
        "ch1": "Аль-Хорезми",
        "ch2": "Президентская программа",
        "introSchoolLabel": "Школа №",
        "introClass": "10 «D» класс",
        "introRoleLabel": "Моя роль",
        "introRole": "IT-координатор IT Community Каракалпакстана",
        "introCertBadge": "Сертификат IT Park · Startup Manager",
        "introCertSub": "За вклад в развитие стартап-экосистемы и менторство локальных проектов",
        "introCertView": "Посмотреть сертификат",
        "introCertHover": "Увеличить",
        "certModalTitle": "Сертификат признания · IT Park",
        "certModalDesc": "Бахтияров Султанбек — Startup Manager · За вклад в развитие стартап-экосистемы",
        "certModalFooterDate": "25 сентября 2026 г. · Нукус, Узбекистан",
        "certModalFooterHint": "Нажмите Esc или кликните вне окна, чтобы закрыть",
        "khEyebrow": "02 — В 14 ЛЕТ",
        "khTitle": "Аль-Хорезми",
        "khLead": "Прошёл отбор в президентскую программу",
        "khApplicantsLabel": "участников отбора",
        "khSelectedLabel": "прошли отбор",
        "khRankSuffix": "-е",
        "khRankLabel": "моё место в отборе",
        "pifEyebrow": "03 — В 15 ЛЕТ",
        "pifLead": "Прошёл во вторую президентскую программу",
        "pifApplicantsLabel": "заявок по всему Узбекистану",
        "pifSelectedLabel": "отобранных участников",
        "pifResult": "Я в их числе",
        "uzcEyebrow": "04 — В 15 ЛЕТ",
        "uzcLead": "Прошёл <em>первый этап</em><br>отбора",
        "uzcApplicantsLabel": "участников отбора",
        "uzcPercentLabel": "отобранных на первом этапе",
        "uzcResult": "Вошёл в эти 5%",
        "uzcProofBtn": "Посмотреть оригинал",
        "uzcProofTag": "UZ COMBINATOR",
        "uzcProofTitle": "Top 5% стартапов · Orchestra",
        "uzcHoverText": "Увеличить",
        "uzcModalTitle": "Официальное поздравление · UzCombinator",
        "uzcModalDesc": "Orchestra отобрана в топ-5% стартапов на этапе собеседований",
        "uzcModalFooterText": "UzCombinator · Tabriklaymiz! Orchestra suhbat bosqichiga o‘tgan Top 5% startaplar qatorida",
        "uzcModalFooterHint": "Нажмите Esc или кликните вне окна, чтобы закрыть",
        "teamCtoDesc": "Архитектура, разработка и техническая надёжность.",
        "teamCpoDesc": "Развитие продукта, UX/UI и приоритеты функций.",
        "teamCeoDesc": "Стратегия, развитие бизнеса и партнёрства.",
        "teamCfoDesc": "Бюджетирование, финансовое планирование и контроль расходов.",
        "teamTitle": "Команда",
        "teamEyebrow": "15 — КОМАНДА",
        "mktAnnual": "в год · модель",
        "mktSourceLocal": "World Bank / IT Park, III кв. 2024: 25 тыс. занятых в IT-услугах и ПО",
        "mktSourceGlobal": "SlashData, 2025: 36,5 млн профессиональных разработчиков",
        "mktSourcesLabel": "База расчёта:",
        "mktMethod": "5% — рабочая гипотеза о доле профильных покупателей, а не измеренное использование ИИ. TAM — выбранный сегмент. SAM — предварительная оценка: занятые в IT-услугах и ПО не равны числу разработчиков. Число мест и готовность платить требуют проверки. SOM — цель по активным подпискам к концу периода, не выручка за первый год.",
        "mktMethodTitle": "Допущения и источники",
        "loaderSub": "Инженерная ИИ-платформа",
        "ovTitle": "Все разделы",
        "heroEyebrow": "05 — ORCHESTRA — ИНЖЕНЕРНАЯ ИИ-ПЛАТФОРМА",
        "heroTitle1": "Один разработчик.",
        "heroTitle2": "Команда ИИ-<em>инженеров</em>.",
        "heroLead": "Orchestra объединяет анализ репозитория, память о коде и ИИ-агентов. Разработчик задаёт цель, следит за работой и проверяет изменения в одном пространстве.",
        "scrollCueText": "Скролл",
        "probEyebrow": "06 — ПРОБЛЕМА",
        "probTitle": "Контекст теряется между задачами и инструментами.",
        "stat1Cap": "знания о коде разбросаны по файлам, чатам и людям",
        "stat2Cap": "задачи, агенты и изменения требуют общего управления",
        "stat3Cap": "результат ИИ нужно проверить перед объединением кода",
        "whyEyebrow": "07 — ПОЧЕМУ СЕЙЧАС",
        "whyTitle": "ИИ уже работает с кодом. Нужен связный процесс.",
        "whyCap1": "Инструменты перешли от подсказок к многошаговым задачам: анализу, изменениям и проверкам.",
        "whyCap2": "Повторные задачи требуют контекста: архитектуры, прошлых решений и истории изменений.",
        "whyCap3": "Ценность для команды — понятный ход работы, проверяемый результат и видимые расходы.",
        "whyNote": "Наш фокус: связать понимание кода и выполнение задач в одном рабочем процессе.",
        "solEyebrow": "08 — РЕШЕНИЕ",
        "solTitle": "От понимания репозитория к проверенным изменениям.",
        "step1Tag": "GitHub",
        "step1Title": "Подключить репозиторий",
        "step1Desc": "Выберите проект и ветку, с которыми будет работать Orchestra.",
        "step2Tag": "Анализ",
        "step2Title": "Понять код",
        "step2Desc": "Изучите структуру, технологии и зависимости. Задавайте вопросы о проекте.",
        "step3Tag": "Память",
        "step3Title": "Сохранить контекст",
        "step3Desc": "Используйте историю анализов, снимки и различия между версиями.",
        "step4Tag": "Агенты",
        "step4Title": "Поставить задачу",
        "step4Desc": "Опишите нужное изменение. Агенты используют контекст репозитория для работы с кодом.",
        "step5Tag": "Проверка",
        "step5Title": "Проверить результат",
        "step5Desc": "Просмотрите файлы, diff и результаты проверок перед принятием изменений.",
        "step6Tag": "История",
        "step6Title": "Продолжить с контекстом",
        "step6Desc": "Вернитесь к истории работы, уточните задачу и продолжите следующую итерацию.",
        "prodEyebrow": "09 — ПРОДУКТ",
        "prodTitle": "Пять сценариев. Одно пространство.",
        "cap1": "<b>Репозиторий и контекст</b> — файлы, структура, анализ, снимки и память проекта",
        "cap2": "<b>Задачи</b> — запрос на естественном языке и отчёт о выполнении",
        "cap3": "<b>Работа с кодом</b> — создание и изменение файлов с помощью агентов",
        "cap4": "<b>Проверка изменений</b> — редактор, diff и подготовка pull request",
        "cap5": "<b>Рабочее пространство</b> — вопросы о коде, проекты и история активности",
        "mktEyebrow": "10 — РЫНОК",
        "mktTitle": "Рынок. Сценарий для старта.",
        "tamTitle": "Глобальный целевой сегмент",
        "samTitle": "Стартовый сегмент в Узбекистане",
        "somTitle": "Цель на 12–18 месяцев",
        "tamDesc": "36,5 млн профессиональных разработчиков × 5% профильных покупателей × $324 в год. Доля 5% — допущение модели.",
        "samDesc": "25 тыс. занятых в IT-услугах и ПО × 5% профильных покупателей = 1 250 мест. Потенциал при $324 в год за место.",
        "somDesc": "100 платящих клиентов × $27 в месяц = $2 700 MRR. Годовой темп выручки при достижении цели — $32 400.",
        "mktNote": "Расчётная модель, не фактическая выручка. База: Standard $27 × 12 = $324/год; без доплат за использование.",
        "bizEyebrow": "11 — БИЗНЕС-МОДЕЛЬ",
        "bizTitle": "Подписка и включённые AI-кредиты.",
        "bizCard1Title": "Место разработчика",
        "bizCard1Desc": "Пользовательская подписка для индивидуальных разработчиков и небольших команд.",
        "bizCard2Title": "Командный тариф",
        "bizCard2Desc": "Общие репозитории, командное пространство, приоритетная очередь агентов.",
        "bizCard3Title": "По мере использования",
        "bizCard3Desc": "Оплата за агенто-часы для ресурсоёмких и масштабных вычислений.",
        "bizCard3Metric": "за агенто-час",
        "bizCard4Title": "Enterprise",
        "bizCard4Desc": "Локальное развёртывание, SSO, аудит безопасности, выделенный SLA.",
        "bizCard4Metric": "индивидуально",
        "compEyebrow": "12 — КОНКУРЕНТЫ",
        "compTitle": "Память кода и агенты — в одном процессе.",
        "compCol0": "Что сравниваем",
        "compCol1": "ORCHESTRA",
        "compCol2": "Cursor",
        "compCol3": "GitHub Copilot",
        "compCol4": "Devin",
        "compRow1Label": "Контекст кода",
        "compRow1Us": "Анализ, снимки и память репозитория",
        "compRow1Other1": "Контекст проекта и общая память агентов",
        "compRow1Other2": "Контекст репозитория и память сессий",
        "compRow1Other3": "Индекс репозитория, DeepWiki и знания",
        "compRow2Label": "Выполнение задач",
        "compRow2Us": "Задачи для агентов в рабочем пространстве",
        "compRow2Other1": "Агенты в IDE и облаке; Projects",
        "compRow2Other2": "Облачные задачи, изменения и тесты",
        "compRow2Other3": "Агентные сессии и выполнение задач",
        "compRow3Label": "Параллельная работа",
        "compRow3Us": "Координация агентов — фокус развития",
        "compRow3Other1": "Projects координирует несколько агентов",
        "compRow3Other2": "Агентные сессии и workflows",
        "compRow3Other3": "Managed Devins: параллельные сессии",
        "compRow4Label": "Проверка результата",
        "compRow4Us": "Файлы, diff и подготовка PR",
        "compRow4Other1": "Проверка изменений и pull requests",
        "compRow4Other2": "Pull requests, review и проверки",
        "compRow4Other3": "Pull requests, review и тесты",
        "compRow5Label": "Продуктовый акцент",
        "compRow5Us": "Понять → запомнить → выполнить → проверить",
        "compRow5Other1": "Разработка и координация в среде Cursor",
        "compRow5Other2": "Агенты внутри GitHub и IDE",
        "compRow5Other3": "Делегирование инженерных задач",
        "compNote": "Память и параллельность есть и у конкурентов. Ставка Orchestra — удобство единого процесса для небольших команд; преимущество проверяем на пилотах, а не заявляем как доказанный факт.",
        "techEyebrow": "08 — ТЕХНОЛОГИИ",
        "techTitle": "GitHub API. Мультиагентная оркестрация. Синхронизация.",
        "tech1Title": "GitHub API и управление контекстом",
        "tech1Desc": "Полное понимание репозитория. Изоляция веток для каждого агента. Мгновенный синк.",
        "tech2Title": "Мультиагентная оркестрация",
        "tech2Desc": "Роутинг-движок распределяет задачи между параллельными агентами со специализациями.",
        "tech3Title": "Инфраструктура LLM",
        "tech3Desc": "Модельно-независимый слой. Лучшие LLM для генерации, рефакторинга и ревью кода.",
        "tech4Title": "Слой безопасности",
        "tech4Desc": "OAuth, разграничение прав, ваш код никогда не хранится за пределами вашего GitHub.",
        "roadEyebrow": "14 — ДОРОЖНАЯ КАРТА",
        "roadTitle": "План на 18 месяцев после инвестиций.",
        "road1Desc": "Интеграция с GitHub, выполнение задач одним агентом, авто-PR, первые 500 пользователей.",
        "road2Title": "Мультиагентность",
        "road2Desc": "Параллельные агенты, ролевая модель, управление ветками, командные воркспейсы.",
        "road3Title": "Платформа",
        "road3Desc": "Enterprise-тариф, self-hosted версия, мультирепозитории, экосистема интеграций.",
        "road4Title": "ИИ-платформа разработки",
        "road4Desc": "Полный автономный цикл разработки. Агенты сами проектируют, пишут, тестируют и деплоят.",
        "invEyebrow": "16 — ИНВЕСТИЦИИ",
        "invTitle": "Раунд инвестиций.",
        "invRound": "10% доли · $1,5M post-money · предложение",
        "invUse1": "Разработка продукта и тестирование",
        "invUse2": "AI API, серверы и хранение данных",
        "invUse3": "Маркетинг, продажи и пилоты",
        "invUse4": "Операционная команда и инструменты",
        "invUse5": "Юридические услуги и бухгалтерия",
        "invUse6": "Резерв на непредвиденные расходы",
        "invFounders": "План на 18 месяцев: $138K расходов (≈ $7,7K/мес) + $12K резерва. Разработка учтена отдельно от операционной команды; суммы предварительные.",
        "invNote": "$150K → 18 месяцев → проверка спроса и платящие клиенты",
        "thanksSlogan": "Один разработчик. Команда ИИ-инженеров.",
        "zoomHintText": "Увеличить",
        "navMenuLabel": "Меню",
        "tTitle": "Orchestra · пример рабочего процесса",
        "tCmd": "Задача: разобраться в авторизации и добавить тесты",
        "tLog1": "Репозиторий подключён: структура и зависимости",
        "tLog2": "Контекст: память проекта и история изменений",
        "tLog3": "Агенты: анализ, план и изменения кода",
        "tLog4": "Проверки: тесты и просмотр diff",
        "tLog5": "Результат: изменения для проверки разработчиком",
        "probBadge1": "Старый подход",
        "probCard1Title": "Каждую задачу начинаем с разбора кода",
        "probCard1Desc": "Нужно найти нужные файлы, восстановить решения команды и перенести контекст в чат. Затем отдельно проверить результат.",
        "probBadge2": "Подход Orchestra",
        "probCard2Title": "Общий контекст для человека и агентов",
        "probCard2Desc": "Анализ, память, задачи и изменения связаны с репозиторием. Разработчик видит путь от запроса до результата.",
        "demoS1": "Слайд 1",
        "demoS1Sub": "Поместите фото в assets/images/demo-1.png",
        "demoS2": "Слайд 2",
        "demoS2Sub": "Поместите фото в assets/images/demo-2.png",
        "demoS3": "Слайд 3",
        "demoS3Sub": "Поместите фото в assets/images/demo-3.png",
        "demoS4": "Слайд 4",
        "demoS4Sub": "Поместите фото в assets/images/demo-4.png",
        "demoS5": "Слайд 5",
        "demoS5Sub": "Поместите фото в assets/images/demo-5.png",
        "mktSeg1Title": "Глобальный рынок",
        "mktStat1L": "TAM (Проф. разрабы)",
        "mktStat1S": "36.5М польз. × $250/год",
        "mktStat2L": "SAM (Активные в ИИ)",
        "mktStat2S": "29.2М польз. × $250/год",
        "mktStat3L": "SOM (Цель 3-5 лет)",
        "mktStat3S": "10,000 польз. × $250/год",
        "tArr": "ARR",
        "mktSrc1": "Источники: SlashData (2025) 47.2М всего / 36.5М проф. GitHub Octoverse (2025) ~80% ИИ. Базовый ARPU: $250/год.",
        "mktSeg2Title": "Узбекистан",
        "mktStat4L": "TAM (IT-Ядро)",
        "mktStat4S": "40,000 польз. × $250/год",
        "mktStat5L": "SAM (Активные в ИИ)",
        "mktStat5S": "32,000 польз. × $250/год",
        "mktStat6L": "SOM (Локальная цель)",
        "mktStat6S": "1,000 польз. × $250/год",
        "mktSrc2": "Источники: President.uz (2025) 40К высокооплачиваемых IT-специалистов. Прогноз 80% интеграции ИИ.",
        "mktSeg3Title": "B2B и Команды",
        "mktStat7L": "Целевые компании",
        "mktStat7S": "Технологичные софтверные компании",
        "mktStat8L": "ARPU команды",
        "mktStat8S": "Сред. 10 мест в команде",
        "mktStat9L": "Объем рынка (TAM)",
        "mktStat9S": "B2B сегмент ПО",
        "mktSrc3": "Источники: Агрегаторы (TechBehemoths, AscendixTech SaaS отчет 2025).",
        "bizT1": "Basic",
        "bizT2": "Standard",
        "bizT3": "Pro",
        "bizT4": "Advanced",
        "tMo": " /мес.",
        "tCr": "Кредиты",
        "tAg": "Одновременные агенты",
        "tRep": "Репозитории",
        "tFil": "Файлы",
        "tD": "дней",
        "tMem": "Память",
        "tUnl": "Безлимит",
        "cbHero": "Наш фокус",
        "cbAst": "IDE + Cloud",
        "cbTrad": "GitHub + IDE",
        "cbAgt": "Агент",
        "tracEyebrow": "13 — TRACTION",
        "tracTitle": "20+ АКТИВНЫХ ПОЛЬЗОВАТЕЛЕЙ",
        "tracSub": "За первые 2 недели MVP · по данным команды",
        "tMvp": "Запуск MVP",
        "tRu": "Реальные пользователи",
        "tCf": "Непрерывный фидбек",
        "tracDesc": "Следующие метрики: повторное использование, доля принятых изменений, стоимость задачи и конверсия в оплату.",
        "footText": "© 2026 Orchestra · Инженерная ИИ-Платформа",
        "ch4": "Orchestra",
        "ch5": "Проблема",
        "ch6": "Почему сейчас",
        "ch7": "Решение",
        "ch8": "Продукт",
        "ch9": "Рынок",
        "ch10": "Бизнес-модель",
        "ch11": "Конкуренты",
        "ch12": "Traction",
        "ch13": "Дорожная карта",
        "ch14": "Команда",
        "ch15": "Инвестиции",
        "ch16": "Контакты",
        "stat1Word": "Контекст",
        "stat2Word": "Координация",
        "stat3Word": "Проверка",
        "whyWord1": "Агенты",
        "whyWord2": "Память",
        "whyWord3": "Контроль",
        "prodNote": "Анализ и память дают контекст агентам. На экранах — примеры интерфейса; надёжность выполнения измеряем на реальных задачах.",
        "bizNote": "Планируемая тарифная модель: Standard $27, Pro $59, Advanced $119 в месяц. Дополнительное использование и лимиты Advanced уточняются. Тарифы тестового лендинга пока отличаются.",
        "roadDate1": "0–3 мес.",
        "roadHeading1": "Качество ядра",
        "roadText1": "Анализ, память и агентные задачи. Измерить повторное использование и ошибки.",
        "roadDate2": "4–6 мес.",
        "roadHeading2": "Платные пилоты",
        "roadText2": "Проверить готовность платить и стоимость выполнения задач.",
        "roadDate3": "7–9 мес.",
        "roadHeading3": "Координация агентов",
        "roadText3": "Улучшить параллельную работу, тесты и обработку конфликтов.",
        "roadDate4": "10–12 мес.",
        "roadHeading4": "Командные сценарии",
        "roadText4": "Улучшить общий контекст, доступы и контроль бюджета.",
        "roadDate5": "13–18 мес.",
        "roadHeading5": "100 платящих клиентов",
        "roadText5": "Цель: $2 700 MRR при $27/мес. Проверить удержание до масштабирования.",
        "compSources": "Источники: официальная документация · проверено 23.10.2026"
    },
    "uz": {
        "introSurname": "Бахтияров",
        "introFirstName": "<em>Султанбек</em>",
        "introPatronymic": "Диярович",
        "pifTitle": "Prezident<br><em>iqtidorli farzandlari</em>",
        "uzcTitle": "UzCombinator",
        "ch3": "UzCombinator",
        "introEyebrow": "01 — O‘QUVCHILAR KENGASHI",
        "ch0": "Men haqimda",
        "ch1": "Al-Xorazmiy",
        "ch2": "Prezident dasturi",
        "introSchoolLabel": "Maktab №",
        "introClass": "10 «D» sinf",
        "introRoleLabel": "Mening rolim",
        "introRole": "Qoraqalpog‘iston IT Community IT koordinatori",
        "introCertBadge": "IT Park sertifikati · Startup Manager",
        "introCertSub": "Startap ekotizimini rivojlantirish va mahalliy loyihalarni qo‘llab-quvvatlash uchun",
        "introCertView": "Sertifikatni ko‘rish",
        "introCertHover": "Kattalashtirish",
        "certModalTitle": "Minnatdorchilik sertifikati · IT Park",
        "certModalDesc": "Bahtiyarov Sultanbek — Startup Manager · Startap ekotizimini rivojlantirishdagi hissasi uchun",
        "certModalFooterDate": "2026-yil 25-sentabr · Nukus, O‘zbekiston",
        "certModalFooterHint": "Yopish uchun Esc tugmasini bosing yoki tashqariga bosing",
        "khEyebrow": "02 — 14 YOSHIMDA",
        "khTitle": "Al-Xorazmiy",
        "khLead": "Prezident dasturiga saralashdan o‘tdim",
        "khApplicantsLabel": "saralash ishtirokchilari",
        "khSelectedLabel": "saralashdan o‘tganlar",
        "khRankSuffix": "-o‘rin",
        "khRankLabel": "saralashdagi o‘rnim",
        "pifEyebrow": "03 — 15 YOSHIMDA",
        "pifLead": "Ikkinchi prezident dasturiga o‘tdim",
        "pifApplicantsLabel": "O‘zbekiston bo‘ylab kelib tushgan arizalar",
        "pifSelectedLabel": "saralangan ishtirokchilar",
        "pifResult": "Men ular qatoridaman",
        "uzcEyebrow": "04 — 15 YOSHIMDA",
        "uzcLead": "Saralashning <em>birinchi bosqichidan</em><br>o‘tdim",
        "uzcApplicantsLabel": "saralash ishtirokchilari",
        "uzcPercentLabel": "birinchi bosqichda saralanganlar",
        "uzcResult": "Shu 5% qatoriga kirdim",
        "uzcProofBtn": "Aslini ko‘rish",
        "uzcProofTag": "UZ COMBINATOR",
        "uzcProofTitle": "Startaplarning Top 5% · Orchestra",
        "uzcHoverText": "Kattalashtirish",
        "uzcModalTitle": "Rasmiy tabrik · UzCombinator",
        "uzcModalDesc": "Orchestra suhbat bosqichiga o‘tgan Top 5% startaplar qatorida",
        "uzcModalFooterText": "UzCombinator · Tabriklaymiz! Orchestra suhbat bosqichiga o‘tgan Top 5% startaplar qatorida",
        "uzcModalFooterHint": "Yopish uchun Esc tugmasini bosing yoki tashqariga bosing",
        "teamCtoDesc": "Arxitektura, dasturlash va texnik ishonchlilik.",
        "teamCpoDesc": "Mahsulotni rivojlantirish, UX/UI va funksiyalar ustuvorligi.",
        "teamCeoDesc": "Strategiya, biznesni rivojlantirish va hamkorliklar.",
        "teamCfoDesc": "Byudjet, moliyaviy rejalashtirish va xarajatlar nazorati.",
        "teamTitle": "Jamoa",
        "teamEyebrow": "15 — JAMOA",
        "mktAnnual": "yiliga · model",
        "mktSourceLocal": "World Bank / IT Park, 2024-yil III chorak: IT xizmatlari va dasturiy ta’minotda 25 ming xodim",
        "mktSourceGlobal": "SlashData, 2025: 36,5 mln professional dasturchi",
        "mktSourcesLabel": "Hisoblash asosi:",
        "mktMethod": "5% — mos xaridorlar ulushi haqidagi faraz, AI ishlatilishining o‘lchangan ko‘rsatkichi emas. TAM — tanlangan segment. SAM dastlabki baho: IT xizmatlari va dasturiy ta’minotdagi barcha xodimlar dasturchi emas. O‘rinlar soni va to‘lashga tayyorlik tekshirilishi kerak. SOM — davr oxiridagi faol obunalar maqsadi, birinchi yil daromadi emas.",
        "mktMethodTitle": "Farazlar va manbalar",
        "loaderSub": "AI Muhandislik Platformasi",
        "ovTitle": "Barcha bo'limlar",
        "heroEyebrow": "05 — ORCHESTRA — AI MUHANDISLIK PLATFORMASI",
        "heroTitle1": "Bitta dasturchi.",
        "heroTitle2": "AI <em>muhandislar</em> jamoasi.",
        "heroLead": "Orchestra repozitoriy tahlili, kod xotirasi va AI agentlarini birlashtiradi. Dasturchi maqsad qo‘yadi, ishni kuzatadi va o‘zgarishlarni bitta muhitda tekshiradi.",
        "scrollCueText": "Pastga",
        "probEyebrow": "06 — MUAMMO",
        "probTitle": "Vazifalar va vositalar orasida kontekst yo‘qoladi.",
        "stat1Cap": "kod haqidagi bilim fayllar, chatlar va odamlarga tarqalgan",
        "stat2Cap": "vazifalar, agentlar va o‘zgarishlarni birga boshqarish kerak",
        "stat3Cap": "AI natijasini kodni birlashtirishdan oldin tekshirish kerak",
        "whyEyebrow": "07 — NEGA AYNAN HOZIR",
        "whyTitle": "AI kod bilan ishlaydi. Endi yaxlit jarayon kerak.",
        "whyCap1": "Vositalar oddiy tavsiyalardan tahlil, o‘zgarish va tekshiruv kabi ko‘p bosqichli vazifalarga o‘tdi.",
        "whyCap2": "Takroriy vazifalarga arxitektura, oldingi qarorlar va o‘zgarishlar tarixi kerak.",
        "whyCap3": "Jamoa uchun qiymat: tushunarli jarayon, tekshiriladigan natija va ko‘rinadigan xarajatlar.",
        "whyNote": "Bizning yo‘nalish: kodni tushunish va vazifalarni bajarishni bitta jarayonga birlashtirish.",
        "solEyebrow": "08 — YECHIM",
        "solTitle": "Repozitoriyni tushunishdan tekshirilgan o‘zgarishlargacha.",
        "step1Tag": "GitHub",
        "step1Title": "Repozitoriyni ulash",
        "step1Desc": "Orchestra ishlaydigan loyiha va tarmoqni tanlang.",
        "step2Tag": "Tahlil",
        "step2Title": "Kodni tushunish",
        "step2Desc": "Tuzilma, texnologiyalar va bog‘liqliklarni o‘rganing. Loyiha haqida savol bering.",
        "step3Tag": "Xotira",
        "step3Title": "Kontekstni saqlash",
        "step3Desc": "Tahlillar tarixi, nusxalar va versiyalar orasidagi farqlardan foydalaning.",
        "step4Tag": "Agentlar",
        "step4Title": "Vazifa qo‘yish",
        "step4Desc": "Kerakli o‘zgarishni yozing. Agentlar kod bilan ishlashda repozitoriy kontekstidan foydalanadi.",
        "step5Tag": "Tekshiruv",
        "step5Title": "Natijani tekshirish",
        "step5Desc": "O‘zgarishlarni qabul qilishdan oldin fayllar, diff va tekshiruv natijalarini ko‘ring.",
        "step6Tag": "Tarix",
        "step6Title": "Kontekst bilan davom etish",
        "step6Desc": "Ish tarixiga qayting, vazifani aniqlashtiring va keyingi bosqichni boshlang.",
        "prodEyebrow": "09 — MAHSULOT",
        "prodTitle": "Besh ssenariy. Bitta muhit.",
        "cap1": "<b>Repozitoriy va kontekst</b> — fayllar, tuzilma, tahlil, nusxalar va loyiha xotirasi",
        "cap2": "<b>Vazifalar</b> — tabiiy tildagi so‘rov va bajarilish hisoboti",
        "cap3": "<b>Kod bilan ishlash</b> — agentlar yordamida fayllarni yaratish va o‘zgartirish",
        "cap4": "<b>O‘zgarishlarni tekshirish</b> — muharrir, diff va pull request tayyorlash",
        "cap5": "<b>Ish muhiti</b> — kod haqidagi savollar, loyihalar va faollik tarixi",
        "mktEyebrow": "10 — BOZOR",
        "mktTitle": "Bozor. Boshlang‘ich ssenariy.",
        "tamTitle": "Global maqsadli segment",
        "samTitle": "O‘zbekistondagi boshlang‘ich segment",
        "somTitle": "12–18 oylik maqsad",
        "tamDesc": "36,5 mln professional dasturchi × 5% mos xaridor × yiliga $324. 5% ulush — model farazi.",
        "samDesc": "IT xizmatlari va dasturiy ta’minotdagi 25 ming xodim × 5% mos xaridor = 1 250 o‘rin. Har bir o‘rin yiliga $324.",
        "somDesc": "100 to‘lovchi mijoz × oyiga $27 = $2 700 MRR. Maqsadga erishilgandagi yillik daromad sur’ati — $32 400.",
        "mktNote": "Hisoblash modeli, amaldagi daromad emas. Asos: Standard $27 × 12 = yiliga $324; qo‘shimcha foydalanish to‘lovlarisiz.",
        "bizEyebrow": "11 — BIZNES MODEL",
        "bizTitle": "Obuna va kiritilgan AI kreditlari.",
        "bizCard1Title": "Dasturchi o'rni",
        "bizCard1Desc": "Yakkabosh dasturchilar va kichik jamoalar uchun oylik obuna.",
        "bizCard2Title": "Jamoaviy reja",
        "bizCard2Desc": "Umumiy ish hududi, jamoaviy repozitoriylar, agentlar uchun ustuvor navbat.",
        "bizCard3Title": "Foydalanishga qarab",
        "bizCard3Desc": "Katta va murakkab hisoblashlar uchun sarflangan agent-soatiga to'lov.",
        "bizCard3Metric": "har agent-soatiga",
        "bizCard4Title": "Enterprise",
        "bizCard4Desc": "Shaxsiy serverda o'rnatish, SSO, xavfsizlik auditi, maxsus SLA.",
        "bizCard4Metric": "kelishilgan holda",
        "compEyebrow": "12 — RAQOBAT",
        "compTitle": "Kod xotirasi va agentlar — bitta jarayonda.",
        "compCol0": "Taqqoslash mezoni",
        "compCol1": "ORCHESTRA",
        "compCol2": "Cursor",
        "compCol3": "GitHub Copilot",
        "compRow1Label": "Kod konteksti",
        "compRow1Us": "Tahlil, nusxalar va repo xotirasi",
        "compRow1Other1": "Loyiha konteksti va agentlar xotirasi",
        "compRow1Other2": "Repo konteksti va sessiya xotirasi",
        "compRow2Label": "Vazifalar",
        "compRow2Us": "Ish muhitida agentlar uchun vazifalar",
        "compRow2Other1": "IDE va bulut agentlari; Projects",
        "compRow2Other2": "Bulut vazifalari, o‘zgarishlar va testlar",
        "compRow3Label": "Parallel ish",
        "compRow3Us": "Agentlarni muvofiqlashtirish — rivojlanish yo‘nalishi",
        "compRow3Other1": "Projects bir nechta agentni boshqaradi",
        "compRow3Other2": "Agent sessiyalari va workflows",
        "compRow4Label": "Natija nazorati",
        "compRow4Us": "Fayllar, diff va PR tayyorlash",
        "compRow4Other1": "O‘zgarishlar va pull request tekshiruvi",
        "compRow4Other2": "Pull requests, review va tekshiruvlar",
        "compRow5Label": "Mahsulot yo‘nalishi",
        "compRow5Us": "Tushunish → eslash → bajarish → tekshirish",
        "compRow5Other1": "Cursor muhitida yaratish va muvofiqlashtirish",
        "compRow5Other2": "GitHub va IDE ichidagi agentlar",
        "compNote": "Xotira va parallel ish raqobatchilarda ham bor. Orchestra kichik jamoalar uchun yaxlit jarayon qulayligiga tayanadi; ustunlik pilotlarda tekshiriladi.",
        "techEyebrow": "08 — TEXNOLOGIYALAR",
        "techTitle": "GitHub API. Ko'p agentli orkestratsiya. Sinxronizatsiya.",
        "tech1Title": "GitHub API va kontekstni boshqarish",
        "tech1Desc": "Repozitoriyni to'liq tushunish. Har bir agent uchun alohida branch. Lahzalik sinxronizatsiya.",
        "tech2Title": "Ko'p agentli orkestratsiya",
        "tech2Desc": "Vazifalarni taqsimlash tizimi ishlarni ixtisoslashgan parallel agentlarga yo'naltiradi.",
        "tech3Title": "LLM infratuzilmasi",
        "tech3Desc": "Modelga bog'liq bo'lmagan qatlam. Kod yozish va review uchun eng ilg'or LLM modellar.",
        "tech4Title": "Xavfsizlik qatlami",
        "tech4Desc": "OAuth, aniq ruxsatlar, sizning kodingiz hech qachon GitHub-dan tashqarida saqlanmaydi.",
        "roadEyebrow": "14 — YO'L XARITASI",
        "roadTitle": "Investitsiyadan keyingi 18 oylik reja.",
        "road1Desc": "GitHub integratsiyasi, yagona agent bilan vazifa bajarish, avto PR, ilk 500 foydalanuvchi.",
        "road2Title": "Ko'p agentlilik",
        "road2Desc": "Parallel agentlar, rollar taqsimoti, branchlarni boshqarish, jamoaviy hududlar.",
        "road3Title": "Platforma",
        "road3Desc": "Enterprise daraja, self-hosted opsiyasi, multi-repozitoriy, integratsiyalar ekotizimi.",
        "road4Title": "AI Muhandislik Platformasi",
        "road4Desc": "To'liq avtonom muhandislik sikli. Agentlar o'zi rejalashtirib, kodlab, testdan o'tkazib deploy qiladi.",
        "invEyebrow": "16 — INVESTITSIYA",
        "invTitle": "Investitsiya raundi.",
        "invRound": "10% ulush · $1,5M post-money · taklif",
        "invUse1": "Mahsulot yaratish va sinovlar",
        "invUse2": "AI API, serverlar va ma’lumotlar",
        "invUse3": "Marketing, savdo va pilotlar",
        "invUse4": "Operatsion jamoa va vositalar",
        "invUse5": "Yuridik xizmatlar va buxgalteriya",
        "invUse6": "Kutilmagan xarajatlar zaxirasi",
        "invFounders": "18 oylik reja: $138K xarajat (≈ $7,7K/oy) + $12K zaxira. Dasturlash va operatsion jamoa alohida hisoblangan; summalar taxminiy.",
        "invNote": "$150K → 18 oy → talabni tekshirish va pullik mijozlar",
        "thanksSlogan": "Bitta dasturchi. AI muhandislar jamoasi.",
        "zoomHintText": "Kattalashtirish",
        "navMenuLabel": "Menyu",
        "tTitle": "Orchestra · ish jarayoni namunasi",
        "tCmd": "Vazifa: avtorizatsiyani tushunish va testlar qo‘shish",
        "tLog1": "Repozitoriy ulandi: tuzilma va bog‘liqliklar",
        "tLog2": "Kontekst: loyiha xotirasi va o‘zgarishlar tarixi",
        "tLog3": "Agentlar: tahlil, reja va kod o‘zgarishlari",
        "tLog4": "Tekshiruv: testlar va diff ko‘rigi",
        "tLog5": "Natija: dasturchi tekshirishi uchun o‘zgarishlar",
        "probBadge1": "Eski yondashuv",
        "probCard1Title": "Har vazifa kodni o‘rganishdan boshlanadi",
        "probCard1Desc": "Kerakli fayllar va jamoa qarorlarini topish, kontekstni chatga ko‘chirish va natijani tekshirish kerak.",
        "probBadge2": "Orchestra yondashuvi",
        "probCard2Title": "Inson va agentlar uchun umumiy kontekst",
        "probCard2Desc": "Tahlil, xotira, vazifalar va o‘zgarishlar repozitoriyga bog‘langan. Dasturchi so‘rovdan natijagacha jarayonni ko‘radi.",
        "demoS1": "Slayd 1",
        "demoS1Sub": "Rasmni assets/images/demo-1.png ga joylashtiring",
        "demoS2": "Slayd 2",
        "demoS2Sub": "Rasmni assets/images/demo-2.png ga joylashtiring",
        "demoS3": "Slayd 3",
        "demoS3Sub": "Rasmni assets/images/demo-3.png ga joylashtiring",
        "demoS4": "Slayd 4",
        "demoS4Sub": "Rasmni assets/images/demo-4.png ga joylashtiring",
        "demoS5": "Slayd 5",
        "demoS5Sub": "Rasmni assets/images/demo-5.png ga joylashtiring",
        "mktSeg1Title": "Global Bozor",
        "mktStat1L": "TAM (Pro Dasturchilar)",
        "mktStat1S": "36.5M foyd. × $250/yil",
        "mktStat2L": "SAM (AI-Faol)",
        "mktStat2S": "29.2M foyd. × $250/yil",
        "mktStat3L": "SOM (3-5 yillik maqsad)",
        "mktStat3S": "10,000 foyd. × $250/yil",
        "tArr": "ARR",
        "mktSrc1": "Manbalar: SlashData (2025) 47.2M jami / 36.5M pro dasturchilar. GitHub Octoverse (2025) ~80% AI. Baza ARPU: $250/yil.",
        "mktSeg2Title": "O'zbekiston",
        "mktStat4L": "TAM (IT Asosi)",
        "mktStat4S": "40,000 foyd. × $250/yil",
        "mktStat5L": "SAM (AI-Faol)",
        "mktStat5S": "32,000 foyd. × $250/yil",
        "mktStat6L": "SOM (Mahalliy maqsad)",
        "mktStat6S": "1,000 foyd. × $250/yil",
        "mktSrc2": "Manbalar: President.uz (2025) 40K yuqori daromadli IT yoshlar. 80% AI joriy qilinishi kutilmoqda.",
        "mktSeg3Title": "B2B va Jamoalar",
        "mktStat7L": "Maqsadli Kompaniyalar",
        "mktStat7S": "Texnologik dasturiy kompaniyalar",
        "mktStat8L": "Jamoa ARPU",
        "mktStat8S": "O'rtacha har jamoaga 10 o'rin",
        "mktStat9L": "Bozor hajmi (TAM)",
        "mktStat9S": "B2B dasturiy ta'minot segmenti",
        "mktSrc3": "Manbalar: Agregatorlar (TechBehemoths, AscendixTech SaaS hisoboti 2025).",
        "bizT1": "Asosiy",
        "bizT2": "Standart",
        "bizT3": "Pro",
        "bizT4": "Murakkab",
        "tMo": " /oy",
        "tCr": "Kreditlar",
        "tAg": "Bir vaqtning o'zida ishlaydigan agentlar",
        "tRep": "Repozitoriylar",
        "tFil": "Fayllar",
        "tD": "kun",
        "tMem": "Xotira",
        "tUnl": "Cheksiz",
        "cbHero": "Bizning yo‘nalish",
        "cbAst": "IDE + Cloud",
        "cbTrad": "GitHub + IDE",
        "cbAgt": "Agent",
        "compCol4": "Devin",
        "compRow1Other3": "Repo indeksi, DeepWiki va bilimlar",
        "compRow2Other3": "Agent sessiyalari va vazifalar",
        "compRow3Other3": "Managed Devins: parallel sessiyalar",
        "compRow4Other3": "Pull requests, review va testlar",
        "compRow5Other3": "Muhandislik vazifalarini topshirish",
        "tracEyebrow": "13 — TORTISHISH (TRACTION)",
        "tracTitle": "20+ FAOL FOYDALANUVCHILAR",
        "tracSub": "MVPning dastlabki 2 haftasi · jamoa ma’lumoti",
        "tMvp": "MVP ishga tushirish",
        "tRu": "Haqiqiy foydalanuvchilar",
        "tCf": "Uzluksiz fikr-mulohaza",
        "tracDesc": "Keyingi ko‘rsatkichlar: qayta foydalanish, qabul qilingan o‘zgarishlar ulushi, vazifa xarajati va to‘lovga o‘tish.",
        "footText": "© 2026 Orchestra · AI Muhandislik Platformasi",
        "ch4": "Orchestra",
        "ch5": "Muammo",
        "ch6": "Nega hozir",
        "ch7": "Yechim",
        "ch8": "Mahsulot",
        "ch9": "Bozor",
        "ch10": "Biznes model",
        "ch11": "Raqobat",
        "ch12": "Traction",
        "ch13": "Yo'l xaritasi",
        "ch14": "Jamoa",
        "ch15": "Investitsiya",
        "ch16": "Aloqa",
        "stat1Word": "Kontekst",
        "stat2Word": "Muvofiqlik",
        "stat3Word": "Tekshiruv",
        "whyWord1": "Agentlar",
        "whyWord2": "Xotira",
        "whyWord3": "Nazorat",
        "prodNote": "Tahlil va xotira agentlarga kontekst beradi. Ekranlar interfeys misollari; ishonchlilik real vazifalarda o‘lchanadi.",
        "bizNote": "Rejalashtirilgan tariflar: Standard $27, Pro $59, Advanced $119/oy. Qo‘shimcha foydalanish va Advanced limitlari aniqlashtiriladi. Test sahifasidagi tariflar hozircha farq qiladi.",
        "roadDate1": "0–3 oy",
        "roadHeading1": "Asos sifati",
        "roadText1": "Tahlil, xotira va agent vazifalari. Qayta foydalanish va xatolarni o‘lchash.",
        "roadDate2": "4–6 oy",
        "roadHeading2": "Pullik pilotlar",
        "roadText2": "To‘lashga tayyorlik va vazifalar xarajatini tekshirish.",
        "roadDate3": "7–9 oy",
        "roadHeading3": "Agentlar muvofiqligi",
        "roadText3": "Parallel ish, testlar va ziddiyatlarni hal qilishni yaxshilash.",
        "roadDate4": "10–12 oy",
        "roadHeading4": "Jamoaviy ssenariylar",
        "roadText4": "Umumiy kontekst, kirish huquqi va byudjet nazoratini yaxshilash.",
        "roadDate5": "13–18 oy",
        "roadHeading5": "100 pullik mijoz",
        "roadText5": "Maqsad: $27/oy bilan $2 700 MRR. Kengayishdan oldin saqlanishni tekshirish.",
        "compSources": "Manbalar: rasmiy hujjatlar · 23.10.2026 tekshirildi"
    },
    "en": {
        "introSurname": "Бахтияров",
        "introFirstName": "<em>Султанбек</em>",
        "introPatronymic": "Диярович",
        "pifTitle": "Prezident<br><em>iqtidorli farzandlari</em>",
        "uzcTitle": "UzCombinator",
        "ch3": "UzCombinator",
        "introEyebrow": "01 — O‘QUVCHILAR KENGASHI",
        "ch0": "About me",
        "ch1": "Al-Khwarizmi",
        "ch2": "Presidential program",
        "introSchoolLabel": "School No.",
        "introClass": "Class 10 «D»",
        "introRoleLabel": "My role",
        "introRole": "IT Coordinator, IT Community of Karakalpakstan",
        "introCertBadge": "IT Park Certificate · Startup Manager",
        "introCertSub": "For valuable contribution to startup ecosystem growth and local mentorship",
        "introCertView": "View certificate",
        "introCertHover": "Zoom in",
        "certModalTitle": "Certificate of Appreciation · IT Park",
        "certModalDesc": "Sultanbek Bahtiyarov — Startup Manager · For contribution to the startup ecosystem",
        "certModalFooterDate": "25 September 2026 · Nukus, Uzbekistan",
        "certModalFooterHint": "Press Esc or click outside to close",
        "khEyebrow": "02 — AT AGE 14",
        "khTitle": "Al-Khwarizmi",
        "khLead": "Passed selection for the presidential program",
        "khApplicantsLabel": "selection participants",
        "khSelectedLabel": "passed selection",
        "khRankSuffix": "th",
        "khRankLabel": "my rank in the selection",
        "pifEyebrow": "03 — AT AGE 15",
        "pifLead": "Selected for a second presidential program",
        "pifApplicantsLabel": "applications across Uzbekistan",
        "pifSelectedLabel": "selected participants",
        "pifResult": "I am one of them",
        "uzcEyebrow": "04 — AT AGE 15",
        "uzcLead": "Passed the <em>first stage</em><br>of selection",
        "uzcApplicantsLabel": "selection participants",
        "uzcPercentLabel": "selected at the first stage",
        "uzcResult": "I was among these 5%",
        "uzcProofBtn": "View full banner",
        "uzcProofTag": "UZ COMBINATOR",
        "uzcProofTitle": "Top 5% Startups · Orchestra",
        "uzcHoverText": "Zoom in",
        "uzcModalTitle": "Official Selection · UzCombinator",
        "uzcModalDesc": "Orchestra selected among Top 5% startups for the interview stage",
        "uzcModalFooterText": "UzCombinator · Congratulations! Orchestra selected into Top 5% startups for interview stage",
        "uzcModalFooterHint": "Press Esc or click outside to close",
        "teamCtoDesc": "Architecture, engineering and technical reliability.",
        "teamCpoDesc": "Product development, UX/UI and feature priorities.",
        "teamCeoDesc": "Strategy, business development and partnerships.",
        "teamCfoDesc": "Budgeting, financial planning and cost control.",
        "teamTitle": "Team",
        "teamEyebrow": "15 — TEAM",
        "mktAnnual": "per year · model",
        "mktSourceLocal": "World Bank / IT Park, Q3 2024: 25K IT services and software employees",
        "mktSourceGlobal": "SlashData, 2025: 36.5M professional developers",
        "mktSourcesLabel": "Model inputs:",
        "mktMethod": "5% is an assumed share of qualified buyers, not measured AI adoption. TAM covers the selected segment. SAM is preliminary: IT services and software employees are not all developers. Seat counts and willingness to pay require validation. SOM is an end-of-period active subscription target, not first-year revenue.",
        "mktMethodTitle": "Assumptions and sources",
        "loaderSub": "AI Engineering Platform",
        "ovTitle": "All Sections",
        "heroEyebrow": "05 — ORCHESTRA — AI ENGINEERING PLATFORM",
        "heroTitle1": "One developer.",
        "heroTitle2": "A team of AI <em>engineers</em>.",
        "heroLead": "Orchestra brings repository analysis, code memory and AI agents into one workspace. Developers set goals, follow execution and review changes.",
        "scrollCueText": "Scroll",
        "probEyebrow": "06 — THE PROBLEM",
        "probTitle": "Context gets lost between tasks and tools.",
        "stat1Cap": "code knowledge is scattered across files, chats and people",
        "stat2Cap": "tasks, agents and changes need coordinated execution",
        "stat3Cap": "AI output needs review before changes are merged",
        "whyEyebrow": "07 — WHY NOW",
        "whyTitle": "AI can work with code. The workflow must connect.",
        "whyCap1": "Tools now handle multi-step analysis, editing and checks alongside code suggestions.",
        "whyCap2": "Repeated tasks need architecture knowledge, past decisions and change history.",
        "whyCap3": "Teams need visible progress, reviewable results and clear costs.",
        "whyNote": "Our focus: connect code understanding with task execution in one workflow.",
        "solEyebrow": "08 — SOLUTION",
        "solTitle": "From understanding the repository to reviewed changes.",
        "step1Tag": "GitHub",
        "step1Title": "Connect a repository",
        "step1Desc": "Choose the project and branch Orchestra will work with.",
        "step2Tag": "Analysis",
        "step2Title": "Understand the code",
        "step2Desc": "Explore structure, technologies and dependencies. Ask questions about the project.",
        "step3Tag": "Memory",
        "step3Title": "Retain context",
        "step3Desc": "Use analysis history, snapshots and differences between versions.",
        "step4Tag": "Agents",
        "step4Title": "Assign a task",
        "step4Desc": "Describe the change. Agents use repository context to work on the code.",
        "step5Tag": "Review",
        "step5Title": "Review the result",
        "step5Desc": "Inspect files, diffs and check results before accepting changes.",
        "step6Tag": "History",
        "step6Title": "Continue with context",
        "step6Desc": "Return to the work history, refine the task and continue the next iteration.",
        "prodEyebrow": "09 — PRODUCT",
        "prodTitle": "Five workflows. One workspace.",
        "cap1": "<b>Repository context</b> — files, structure, analysis, snapshots and project memory",
        "cap2": "<b>Tasks</b> — natural-language requests and execution summaries",
        "cap3": "<b>Code changes</b> — create and modify files with agents",
        "cap4": "<b>Change review</b> — editor, diffs and pull request preparation",
        "cap5": "<b>Workspace</b> — code questions, projects and activity history",
        "mktEyebrow": "10 — MARKET",
        "mktTitle": "The market. A starting scenario.",
        "tamTitle": "Global target segment",
        "samTitle": "Initial segment in Uzbekistan",
        "somTitle": "12–18 month target",
        "tamDesc": "36.5M professional developers × 5% qualified buyers × $324 per year. The 5% share is a model assumption.",
        "samDesc": "25K IT services and software employees × 5% qualified buyers = 1,250 seats. Potential at $324 per seat annually.",
        "somDesc": "100 paying customers × $27 per month = $2,700 MRR. Annual revenue run rate at target: $32,400.",
        "mktNote": "Scenario model, not actual revenue. Basis: Standard $27 × 12 = $324/year; usage charges excluded.",
        "bizEyebrow": "11 — BUSINESS MODEL",
        "bizTitle": "Subscription with included AI credits.",
        "bizCard1Title": "Developer Seats",
        "bizCard1Desc": "Per-seat subscription for individual developers and small teams.",
        "bizCard2Title": "Team Plan",
        "bizCard2Desc": "Shared workspace, team repos, priority agent queues.",
        "bizCard3Title": "Usage-Based AI",
        "bizCard3Desc": "Pay per agent-hour for compute-intensive workloads.",
        "bizCard3Metric": "per agent-hour",
        "bizCard4Title": "Enterprise",
        "bizCard4Desc": "Self-hosted deployment, SSO, audit logs, SLA.",
        "bizCard4Metric": "custom",
        "compEyebrow": "12 — COMPETITIVE LANDSCAPE",
        "compTitle": "Code memory and agents in one workflow.",
        "compCol0": "Comparison",
        "compCol1": "ORCHESTRA",
        "compCol2": "Cursor",
        "compCol3": "GitHub Copilot",
        "compRow1Label": "Code context",
        "compRow1Us": "Analysis, snapshots and repository memory",
        "compRow1Other1": "Project context and shared agent memory",
        "compRow1Other2": "Repository context and session memory",
        "compRow2Label": "Task execution",
        "compRow2Us": "Agent tasks in a shared workspace",
        "compRow2Other1": "IDE and cloud agents; Projects",
        "compRow2Other2": "Cloud tasks, edits and tests",
        "compRow3Label": "Parallel work",
        "compRow3Us": "Agent coordination is a development focus",
        "compRow3Other1": "Projects coordinates multiple agents",
        "compRow3Other2": "Agent sessions and workflows",
        "compRow4Label": "Result review",
        "compRow4Us": "Files, diffs and PR preparation",
        "compRow4Other1": "Change review and pull requests",
        "compRow4Other2": "Pull requests, review and checks",
        "compRow5Label": "Product emphasis",
        "compRow5Us": "Understand → remember → execute → review",
        "compRow5Other1": "Build and coordinate within Cursor",
        "compRow5Other2": "Agents within GitHub and IDEs",
        "compNote": "Competitors also offer memory and parallel agents. Orchestra focuses on a cohesive workflow for small teams; that advantage must be validated in pilots.",
        "techEyebrow": "08 — TECHNOLOGY",
        "techTitle": "GitHub API. Multi-agent orchestration. Real-time sync.",
        "tech1Title": "GitHub API & Context Management",
        "tech1Desc": "Full repository awareness. Branch isolation per agent. Real-time sync.",
        "tech2Title": "Multi-Agent Orchestration",
        "tech2Desc": "Task routing engine assigns work across parallel agents with defined roles.",
        "tech3Title": "LLM Infrastructure",
        "tech3Desc": "Model-agnostic layer. Best-in-class LLMs for code generation and review.",
        "tech4Title": "Security Layer",
        "tech4Desc": "OAuth, scoped permissions, no code stored outside your GitHub — ever.",
        "roadEyebrow": "14 — ROADMAP",
        "roadTitle": "An 18-month plan after funding.",
        "road1Desc": "GitHub integration, single-agent task execution, PR generation, first 500 users.",
        "road2Title": "Multi-Agent",
        "road2Desc": "Parallel agents, role assignment, branch management, team workspaces.",
        "road3Title": "Platform",
        "road3Desc": "Enterprise tier, self-hosted option, multi-repo support, integrations ecosystem.",
        "road4Title": "AI Engineering Platform",
        "road4Desc": "Full autonomous engineering lifecycle. Agents that plan, build, test, and deploy.",
        "invEyebrow": "16 — INVESTMENT",
        "invTitle": "We are raising.",
        "invRound": "10% equity · $1.5M post-money · proposed",
        "invUse1": "Product development and testing",
        "invUse2": "AI APIs, servers and storage",
        "invUse3": "Marketing, sales and pilots",
        "invUse4": "Operations team and tools",
        "invUse5": "Legal services and accounting",
        "invUse6": "Contingency reserve",
        "invFounders": "18-month plan: $138K spend (≈ $7.7K/month) + $12K reserve. Engineering is separate from operations payroll; amounts are estimates.",
        "invNote": "$150K → 18 months → demand validation and paying customers",
        "thanksSlogan": "One developer. A team of AI engineers.",
        "zoomHintText": "Zoom",
        "navMenuLabel": "Menu",
        "tTitle": "Orchestra · example workflow",
        "tCmd": "Task: understand authentication and add tests",
        "tLog1": "Repository connected: structure and dependencies",
        "tLog2": "Context: project memory and change history",
        "tLog3": "Agents: analysis, plan and code changes",
        "tLog4": "Checks: tests and diff review",
        "tLog5": "Result: changes ready for developer review",
        "probBadge1": "Legacy Workflow",
        "probCard1Title": "Every task starts with understanding the code",
        "probCard1Desc": "Find the right files, recover team decisions and move context into a chat. Then review the result separately.",
        "probBadge2": "The Orchestra approach",
        "probCard2Title": "Shared context for developers and agents",
        "probCard2Desc": "Analysis, memory, tasks and changes stay connected to the repository. Developers can follow a request through to its result.",
        "demoS1": "Slide 1",
        "demoS1Sub": "Put image in assets/images/demo-1.png",
        "demoS2": "Slide 2",
        "demoS2Sub": "Put image in assets/images/demo-2.png",
        "demoS3": "Slide 3",
        "demoS3Sub": "Put image in assets/images/demo-3.png",
        "demoS4": "Slide 4",
        "demoS4Sub": "Put image in assets/images/demo-4.png",
        "demoS5": "Slide 5",
        "demoS5Sub": "Put image in assets/images/demo-5.png",
        "mktSeg1Title": "Global Market",
        "mktStat1L": "TAM (Pro Devs)",
        "mktStat1S": "36.5M users × $250/yr",
        "mktStat2L": "SAM (AI-Active)",
        "mktStat2S": "29.2M users × $250/yr",
        "mktStat3L": "SOM (3-5 Yr Goal)",
        "mktStat3S": "10,000 users × $250/yr",
        "tArr": "ARR",
        "mktSrc1": "Sources: SlashData (2025) 47.2M total / 36.5M pro devs. GitHub Octoverse (2025) ~80% AI adoption. Base ARPU: $250/yr.",
        "mktSeg2Title": "Uzbekistan",
        "mktStat4L": "TAM (IT Core)",
        "mktStat4S": "40,000 users × $250/yr",
        "mktStat5L": "SAM (AI-Active)",
        "mktStat5S": "32,000 users × $250/yr",
        "mktStat6L": "SOM (Local Goal)",
        "mktStat6S": "1,000 users × $250/yr",
        "mktSrc2": "Sources: President.uz (2025) 40K high-income IT youth. Assuming 80% AI adoption rate.",
        "mktSeg3Title": "B2B & Teams",
        "mktStat7L": "Target Companies",
        "mktStat7S": "Tech-enabled software firms",
        "mktStat8L": "Team ARPU",
        "mktStat8S": "Avg. 10 seats per team",
        "mktStat9L": "TAM Value",
        "mktStat9S": "B2B software segment",
        "mktSrc3": "Sources: Aggregated directories (TechBehemoths, AscendixTech SaaS report 2025).",
        "bizT1": "Basic",
        "bizT2": "Standard",
        "bizT3": "Pro",
        "bizT4": "Advanced",
        "tMo": " /mo.",
        "tCr": "Credits",
        "tAg": "Concurrent Agents",
        "tRep": "Repositories",
        "tFil": "Files",
        "tD": "days",
        "tMem": "Memory",
        "tUnl": "Unlimited",
        "cbHero": "Our focus",
        "cbAst": "IDE + Cloud",
        "cbTrad": "GitHub + IDE",
        "cbAgt": "Agent",
        "compCol4": "Devin",
        "compRow1Other3": "Repository index, DeepWiki and knowledge",
        "compRow2Other3": "Agent sessions and task execution",
        "compRow3Other3": "Managed Devins: parallel sessions",
        "compRow4Other3": "Pull requests, review and tests",
        "compRow5Other3": "Delegate engineering tasks",
        "tracEyebrow": "13 — TRACTION",
        "tracTitle": "20+ ACTIVE USERS",
        "tracSub": "First 2 weeks of the MVP · team-reported",
        "tMvp": "MVP Launch",
        "tRu": "Real Users",
        "tCf": "Continuous Feedback",
        "tracDesc": "Next metrics: repeat usage, accepted-change rate, cost per task and paid conversion.",
        "footText": "© 2026 Orchestra · AI Engineering Platform",
        "ch4": "Orchestra",
        "ch5": "Problem",
        "ch6": "Why Now",
        "ch7": "Solution",
        "ch8": "Product",
        "ch9": "Market",
        "ch10": "Business Model",
        "ch11": "Competition",
        "ch12": "Traction",
        "ch13": "Roadmap",
        "ch14": "Team",
        "ch15": "Investment",
        "ch16": "Contact",
        "stat1Word": "Context",
        "stat2Word": "Coordination",
        "stat3Word": "Review",
        "whyWord1": "Agents",
        "whyWord2": "Memory",
        "whyWord3": "Control",
        "prodNote": "Analysis and memory give agents context. Screens show interface examples; execution reliability is measured on real tasks.",
        "bizNote": "Proposed pricing: Standard $27, Pro $59, Advanced $119 per month. Overage pricing and Advanced limits are being defined. The test landing page currently shows different plans.",
        "roadDate1": "0–3 months",
        "roadHeading1": "Core quality",
        "roadText1": "Analysis, memory and agent tasks. Measure repeat usage and failures.",
        "roadDate2": "4–6 months",
        "roadHeading2": "Paid pilots",
        "roadText2": "Validate willingness to pay and task execution costs.",
        "roadDate3": "7–9 months",
        "roadHeading3": "Agent coordination",
        "roadText3": "Improve parallel execution, testing and conflict handling.",
        "roadDate4": "10–12 months",
        "roadHeading4": "Team workflows",
        "roadText4": "Improve shared context, access controls and budget visibility.",
        "roadDate5": "13–18 months",
        "roadHeading5": "100 paying customers",
        "roadText5": "Target: $2,700 MRR at $27/month. Validate retention before scaling.",
        "compSources": "Sources: official documentation · checked 23 Oct 2026"
    }
};

  /* =========================================================
     LOADER
     ========================================================= */
  const loader = document.getElementById("loader");
  function finishLoad() {
    document.body.style.overflow = "";
    if (window.__lenis) window.__lenis.resize?.();
    // Measure chapters only after the opening slide has reached its final position.
    if (window.ScrollTrigger) {
      ScrollTrigger.refresh();
      ScrollTrigger.update();
    }
    syncActiveChapter();
    updateScrub();
    if (window.__lenis) window.__lenis.start();
  }

  function runLoader() {
    if (REDUCED || !window.gsap) {
      if (loader) loader.style.display = "none";
      finishLoad();
      return;
    }
    document.body.style.overflow = "hidden";
    const word = loader.querySelector(".loader__word");
    const sub = loader.querySelector(".loader__sub");
    
    let letters = word.textContent;
    word.innerHTML = letters.split("").map((c) => `<span>${c}</span>`).join("");
    const spans = word.querySelectorAll("span");

    const tl = gsap.timeline({ onComplete: finishLoad });
    gsap.set(chapters[0], { y: window.innerHeight });
    gsap.set(spans, { yPercent: 120, opacity: 0 });
    gsap.set(sub, { opacity: 0 });
    tl.to(spans, { yPercent: 0, opacity: 1, duration: 0.8, ease: EASE, stagger: 0.04 }, 0.1)
      .to(sub, { opacity: 1, duration: 0.5 }, 0.4)
      .to({}, { duration: 0.2 })
      .to(spans, { y: -50, opacity: 0, duration: 0.5, ease: "power2.in", stagger: 0.02 }, 1.1)
      .to(sub, { y: -30, opacity: 0, duration: 0.4, ease: "power2.in" }, 1.1)
      .to(chapters[0], { y: 0, duration: 1.2, ease: "power4.out" }, 1.3)
      .to(loader, { opacity: 0, duration: 0.8, ease: "power2.out" }, 1.3)
      .set(loader, { display: "none" })
      .add(() => loader.classList.add("is-done"));
  }

  /* =========================================================
     LENIS SMOOTH SCROLL
     ========================================================= */
  let lenis = null;
  if (window.Lenis && !REDUCED) {
    lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    window.__lenis = lenis;
    lenis.stop();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.ScrollTrigger) lenis.on("scroll", ScrollTrigger.update);
  }

  function scrollToChapter(i) {
    const el = chapters[i];
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.2 });
    else el.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
  }

  /* =========================================================
     GSAP SETUP & REVEALS
     ========================================================= */
  let demoST = null;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    /* ---- TEXT: split-line reveals (headlines) ---- */
    function initSplitLines() {
      document.querySelectorAll("[data-split]").forEach((el) => {
        if (REDUCED) return;
        if (el._splitInstance) el._splitInstance.revert();
        const split = new SplitType(el, { types: "lines", lineClass: "line-inner" });
        el._splitInstance = split;
        split.lines.forEach((ln) => {
          if (ln.parentNode && !ln.parentNode.classList.contains("split-wrap")) {
            const wrap = document.createElement("span");
            wrap.className = "split-wrap";
            wrap.style.display = "block";
            wrap.style.overflow = "hidden";
            ln.parentNode.insertBefore(wrap, ln);
            wrap.appendChild(ln);
          }
        });
        gsap.set(split.lines, { yPercent: 115 });
        ScrollTrigger.create({
          trigger: el, start: "top 85%",
          onEnter: () => gsap.to(split.lines, { yPercent: 0, duration: 1.1, ease: EASE, stagger: 0.08, overwrite: "auto" }),
        });
      });
    }
    initSplitLines();
    window._initSplitLines = initSplitLines;

    /* ---- HERO / VISION line masks ---- */
    document.querySelectorAll("[data-line]").forEach((line) => {
      const inner = document.createElement("span");
      inner.style.display = "block";
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
      if (REDUCED) return;
      gsap.set(inner, { yPercent: 120 });
      ScrollTrigger.create({
        trigger: line, start: "top 92%",
        onEnter: () => gsap.to(inner, { yPercent: 0, duration: 1.2, ease: EASE }),
      });
    });

    /* ---- Generic reveals ---- */
    if (!REDUCED) {
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el, start: "top 88%",
          onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: EASE }),
        });
      });
      /* Step Cards reveal */
      gsap.utils.toArray(".step-card").forEach((card, idx) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, delay: (idx % 3) * 0.1, ease: EASE,
          scrollTrigger: { trigger: card, start: "top 88%" }
        });
      });
    } else {
      gsap.set("[data-reveal], .step-card", { opacity: 1, y: 0 });
    }

    /* ---- Parallax media ---- */
    if (!REDUCED) {
      gsap.utils.toArray("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax) || 0.15;
        const target = el.querySelector(".problem__visual-grid, .vision__bg-glow") || el;
        gsap.fromTo(target, { yPercent: -amt * 50 }, {
          yPercent: amt * 50, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }

    /* ---- Number count-ups ---- */
    gsap.utils.toArray("[data-count]").forEach((el) => {
      const end = parseFloat(el.dataset.count) || 0;
      const dec = parseInt(el.dataset.decimals || (el.dataset.count.includes(".") ? "1" : "0"), 10);
      const pre = el.dataset.prefix || "";
      const suf = el.dataset.suffix || "";
      const text = el.dataset.text || null;
      const render = (v) => {
        const num = typeof v === "number" ? v : parseFloat(v) || 0;
        el.textContent = text && num >= end ? text : pre + num.toFixed(dec) + suf;
      };
      if (REDUCED) { render(end); return; }
      const obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el, start: "top 88%", once: true,
        onEnter: () => gsap.to(obj, { v: end, duration: 1.6, ease: "power2.out", onUpdate: () => render(obj.v) }),
      });
    });

    /* ---- Rings (market) ---- */
    ScrollTrigger.create({
      trigger: ".rings", start: "top 78%", once: true,
      onEnter: () => {
        if (REDUCED) { gsap.set(".ring", { xPercent: -50, yPercent: -50, opacity: 1, scale: 1 }); return; }
        gsap.to(".ring--tam", { opacity: 1, scale: 1, duration: 1, ease: EASE });
        gsap.to(".ring--sam", { opacity: 1, scale: 1, duration: 1, ease: EASE, delay: 0.15 });
        gsap.to(".ring--som", { opacity: 1, scale: 1, duration: 1, ease: EASE, delay: 0.3 });
      },
    });
    gsap.set(".ring", { xPercent: -50, yPercent: -50, scale: 0.3, opacity: 0 });

    /* ---- Timeline fill + milestones ---- */
    const tFill = document.getElementById("timelineFill");
    if (tFill) {
      if (REDUCED) tFill.style.width = "100%";
      else gsap.to(tFill, { width: "100%", ease: "none",
        scrollTrigger: { trigger: "#timeline", start: "top 70%", end: "bottom 85%", scrub: 0.5 } });
    }
    document.querySelectorAll(".milestone").forEach((m) => {
      ScrollTrigger.create({ trigger: m, start: "top 80%", onEnter: () => m.classList.add("is-in") });
    });

    /* ---- Investment use bars ---- */
    gsap.utils.toArray(".use").forEach((u) => {
      const bar = u.querySelector(".use__bar span");
      const w = getComputedStyle(u).getPropertyValue("--w").trim() || "50%";
      if (REDUCED) { bar.style.width = w; return; }
      ScrollTrigger.create({ trigger: u, start: "top 85%", once: true,
        onEnter: () => gsap.to(bar, { width: w, duration: 1.2, ease: EASE }) });
    });

    /* ---- Product demo: horizontal pin scroll with Indicator Update ---- */
    const track = document.getElementById("demoTrack");
    if (track && demoChapter && !REDUCED && window.innerWidth > 600) {
      const getDist = () => Math.max(track.scrollWidth - window.innerWidth + 80, 0);
      gsap.to(track, {
        x: () => -getDist(),
        ease: "none",
        scrollTrigger: {
          trigger: demoChapter,
          start: "top top",
          end: () => "+=" + getDist(),
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateDemoIndicator(self.progress);
          }
        }
      });
      demoST = ScrollTrigger.getAll().find((st) => st.trigger === demoChapter);
    }

    function updateDemoIndicator(progress) {
      const dots = document.querySelectorAll("#demoDots .demo__dot");
      const ind = document.getElementById("demoIndicator");
      if (!dots.length) return;
      const idx = Math.min(Math.floor(progress * dots.length), dots.length - 1);
      dots.forEach((d, k) => d.classList.toggle("is-active", k === idx));
      if (ind) ind.textContent = `0${idx + 1} / 0${dots.length}`;
    }

    /* Clickable indicator dots to scroll horizontally */
    document.querySelectorAll("#demoDots .demo__dot").forEach((dot, k) => {
      dot.style.cursor = "pointer";
      dot.addEventListener("click", () => {
        if (!demoST) return;
        const targetY = demoST.start + (k / 4) * (demoST.end - demoST.start);
        if (lenis) lenis.scrollTo(targetY, { duration: 1.0 });
        else window.scrollTo({ top: targetY, behavior: "smooth" });
      });
    });

    /* ---- Thank-you logo draw ---- */
    const tLogo = document.getElementById("thanksLogo");
    if (tLogo && !REDUCED) {
      gsap.set(tLogo, { opacity: 0, scale: 0.94, filter: "blur(8px)" });
      ScrollTrigger.create({ trigger: tLogo, start: "top 80%", once: true,
        onEnter: () => gsap.to(tLogo, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: EASE }) });
    }

    /* ---- Per-chapter theme + nav state ---- */
    chapters.forEach((ch, i) => {
      ScrollTrigger.create({
        trigger: ch, start: "top 55%", end: "bottom 55%",
        onToggle: (self) => { if (self.isActive) setActive(i, ch); },
      });
    });
  }

  /* =========================================================
     NAV: dots, chapter label, theme, scrub
     ========================================================= */
  const rail = document.getElementById("rail");
  const navNum = document.getElementById("navNum");
  const navName = document.getElementById("navName");
  const scrubBar = document.getElementById("scrubBar");
  const themeMap = chapters.map((c) => c.dataset.theme || "light");

  chapters.forEach((ch, i) => {
    const dot = document.createElement("button");
    dot.className = "rail__dot";
    dot.setAttribute("aria-label", (i + 1) + ". " + ch.dataset.name);
    dot.addEventListener("click", () => scrollToChapter(i));
    rail.appendChild(dot);
  });
  const dots = Array.from(rail.children);
  let current = 0;

  function setActive(i, ch) {
    current = i;
    dots.forEach((d, k) => d.classList.toggle("is-active", k === i));
    navNum.textContent = String(i + 1).padStart(2, "0");
    const activeLang = document.documentElement.lang || "ru";
    const t = TRANSLATIONS[activeLang] || TRANSLATIONS["ru"];
    navName.textContent = t["ch" + i] || ch.dataset.name;
    document.body.setAttribute("data-theme", themeMap[i]);
  }
  chapters.forEach((ch) => ch.setAttribute("data-theme", ch.dataset.theme || "light"));

  function syncActiveChapter() {
    const viewportMarker = window.innerHeight * 0.55;
    let visibleIndex = 0;
    chapters.forEach((chapter, index) => {
      if (chapter.getBoundingClientRect().top <= viewportMarker) visibleIndex = index;
    });
    if (chapters[visibleIndex]) setActive(visibleIndex, chapters[visibleIndex]);
  }

  /* ---- Scrub bar on scroll ---- */
  function updateScrub() {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? window.scrollY / h : 0;
    scrubBar.style.width = (p * 100).toFixed(2) + "%";
  }
  window.addEventListener("scroll", () => {
    updateScrub();
    syncActiveChapter();
  }, { passive: true });
  if (lenis) lenis.on("scroll", updateScrub);
  updateScrub();

  /* =========================================================
     OVERVIEW GRID
     ========================================================= */
  const overview = document.getElementById("overview");
  const ovGrid = document.getElementById("overviewGrid");
  const navChapter = document.getElementById("navChapter");
  const ovClose = document.getElementById("overviewClose");

  chapters.forEach((ch, i) => {
    const b = document.createElement("button");
    b.className = "ov-card";
    const activeLang = document.documentElement.lang || "ru";
    const tName = (TRANSLATIONS[activeLang] && TRANSLATIONS[activeLang]["ch" + i]) || ch.dataset.name;
    b.innerHTML = `<span>${String(i + 1).padStart(2, "0")}</span><b>${tName}</b>`;
    b.addEventListener("click", () => { closeOverview(); scrollToChapter(i); });
    ovGrid.appendChild(b);
  });
  function openOverview() { overview.classList.add("is-open"); overview.setAttribute("aria-hidden", "false"); navChapter.setAttribute("aria-expanded", "true"); }
  function closeOverview() { overview.classList.remove("is-open"); overview.setAttribute("aria-hidden", "true"); navChapter.setAttribute("aria-expanded", "false"); }
  navChapter.addEventListener("click", () => overview.classList.contains("is-open") ? closeOverview() : openOverview());
  ovClose.addEventListener("click", closeOverview);

  /* =========================================================
     KEYBOARD + WHEEL PIN STEPPING + FULLSCREEN
     ========================================================= */
  document.addEventListener("keydown", (e) => {
    // Keep presentation navigation behind the open certificate stationary.
    if (document.getElementById("uzcModal")?.classList.contains("is-open")) {
      if (e.key === "Escape") { e.preventDefault(); closeUzcModal(); }
      else if (e.key === "Tab") {
        const first = document.getElementById("uzcModalExternal");
        const last = document.getElementById("uzcModalClose");
        if (!document.getElementById("uzcModal").contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      } else if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "PageDown", "PageUp", "Home", "End"].includes(e.key)) e.preventDefault();
      return;
    }
    if (e.target.closest?.("#uzcOpenBtn, #uzcProofCard") && ["Enter", " "].includes(e.key)) return;
    if (e.key === "Escape") {
      const certModal = document.getElementById("certModal");
      if (certModal && certModal.classList.contains("is-open")) {
        certModal.classList.remove("is-open");
        certModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (window.__lenis) window.__lenis.start();
        return;
      }
      const uzcModal = document.getElementById("uzcModal");
      if (uzcModal && uzcModal.classList.contains("is-open")) {
        uzcModal.classList.remove("is-open");
        uzcModal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        if (window.__lenis) window.__lenis.start();
        return;
      }
      if (lightbox && lightbox.classList.contains("is-open")) {
        closeLightbox();
        return;
      }
      overview.classList.contains("is-open") ? closeOverview() : openOverview();
    }
    else if (["ArrowDown", "ArrowRight", "PageDown", " "].includes(e.key) && !e.shiftKey) {
      e.preventDefault();
      syncActiveChapter();
      /* Step through the product chapter’s horizontal slides before scrolling down */
      if (demoST && ((chapters[current] === demoChapter) || (window.scrollY >= demoST.start - 80 && window.scrollY <= demoST.end - 15))) {
        const sy = window.scrollY;
        const startY = demoST.start;
        const endY = demoST.end;
        const stepDist = (endY - startY) / 4;
        if (sy < endY - 15) {
          for (let k = 1; k <= 4; k++) {
            const targetY = startY + k * stepDist;
            if (targetY > sy + 15) {
              if (lenis) lenis.scrollTo(targetY, { duration: 1.0 });
              else window.scrollTo({ top: targetY, behavior: "smooth" });
              return;
            }
          }
        }
      }
      scrollToChapter(Math.min(current + 1, chapters.length - 1));
    }
    else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key) || (e.key === " " && e.shiftKey)) {
      e.preventDefault();
      syncActiveChapter();
      /* Step backwards through the product chapter’s horizontal slides */
      if (demoST && ((chapters[current] === demoChapter) || (window.scrollY >= demoST.start + 15 && window.scrollY <= demoST.end + 80))) {
        const sy = window.scrollY;
        const startY = demoST.start;
        const endY = demoST.end;
        const stepDist = (endY - startY) / 4;
        if (sy > startY + 15) {
          for (let k = 3; k >= 0; k--) {
            const targetY = startY + k * stepDist;
            if (targetY < sy - 15) {
              if (lenis) lenis.scrollTo(targetY, { duration: 1.0 });
              else window.scrollTo({ top: targetY, behavior: "smooth" });
              return;
            }
          }
        }
      }
      scrollToChapter(Math.max(current - 1, 0));
    }
    else if (e.key === "Home") { e.preventDefault(); scrollToChapter(0); }
    else if (e.key === "End") { e.preventDefault(); scrollToChapter(chapters.length - 1); }
    else if (e.key === "f" || e.key === "F") { toggleFullscreen(); }
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.().catch(() => {});
    else document.exitFullscreen?.();
  }

  document.querySelectorAll("[data-goto]").forEach((btn) => {
    btn.addEventListener("click", (e) => { e.preventDefault(); scrollToChapter(parseInt(btn.dataset.goto, 10)); });
  });

  /* =========================================================
     LANGUAGE SWITCHER (RU / UZ / EN)
     ========================================================= */
  function setLanguage(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;
    document.documentElement.lang = lang;
    document.querySelectorAll("#langSwitcher .lang-btn").forEach(btn => {
      btn.classList.toggle("is-active", btn.dataset.lang === lang);
    });

    document.querySelectorAll("[data-split]").forEach(el => {
      if (el._splitInstance) {
        el._splitInstance.revert();
        el._splitInstance = null;
      }
    });
    
    Object.keys(t).forEach(id => {
      if (/^ch\d+$/.test(id)) {
        const idx = parseInt(id.replace("ch", ""), 10);
        if (chapters[idx]) {
          chapters[idx].dataset.name = t[id];
          const dot = rail.children[idx];
          if (dot) dot.setAttribute("aria-label", (idx + 1) + ". " + t[id]);
          const ovCard = ovGrid.children[idx];
          if (ovCard) {
            const b = ovCard.querySelector("b");
            if (b) b.textContent = t[id];
          }
        }
        if (current === idx && navName) navName.textContent = t[id];
      } else if (id === "zoomHintText") {
        document.querySelectorAll(".zoom-hint-text").forEach(el => el.textContent = t[id]);
      } else if (["tMo", "tCr", "tAg", "tRep", "tFil", "tD", "tMem", "tUnl", "tArr", "tMvp", "tRu", "tCf"].includes(id)) {
        const cls = ".t-" + id.substring(1).toLowerCase();
        document.querySelectorAll(cls).forEach(el => el.innerHTML = t[id]);
      } else {
        const el = document.getElementById(id);
        if (el) {
          if (el.hasAttribute("data-line")) {
            const inner = el.querySelector("span");
            if (inner) inner.innerHTML = t[id];
            else el.innerHTML = t[id];
          } else {
            el.innerHTML = t[id];
          }
        }
      }
    });

    document.querySelectorAll(".market-unit").forEach(el => el.textContent = t.mktAnnual);
    if (window._updateLightboxLanguage) window._updateLightboxLanguage();

    if (window._initSplitLines) window._initSplitLines();
    if (window.ScrollTrigger) setTimeout(() => ScrollTrigger.refresh(), 150);
  }

  document.querySelectorAll("#langSwitcher .lang-btn").forEach(btn => {
    btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
  });

  /* =========================================================
     FULLSCREEN BUTTON
     ========================================================= */
  const fsBtn = document.getElementById("fullscreenBtn");
  if (fsBtn) {
    const iconExpand = fsBtn.querySelector(".icon-expand");
    const iconCompress = fsBtn.querySelector(".icon-compress");
    const fsText = fsBtn.querySelector(".fullscreen-btn__text");

    function updateFullscreenUI() {
      const isFullscreen = !!document.fullscreenElement;
      if (iconExpand) iconExpand.style.display = isFullscreen ? "none" : "";
      if (iconCompress) iconCompress.style.display = isFullscreen ? "" : "none";
      if (fsText) fsText.textContent = isFullscreen ? "Exit" : "Fullscreen";
    }

    fsBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        if (document.exitFullscreen) document.exitFullscreen();
      }
    });

    document.addEventListener("fullscreenchange", updateFullscreenUI);
    updateFullscreenUI();
  }

  /* =========================================================
     LIGHTBOX & ZOOM ENGINE (CLOSE-UP VIEWER)
     ========================================================= */
  const lightbox = document.getElementById("lightbox");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxZoomIn = document.getElementById("lightboxZoomIn");
  const lightboxZoomOut = document.getElementById("lightboxZoomOut");
  const lightboxZoomReset = document.getElementById("lightboxZoomReset");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxViewport = document.getElementById("lightboxViewport");

  let lbCurrentIndex = 0;
  let lbSlides = [];
  let currentZoom = 1;
  let panX = 0;
  let panY = 0;
  let isDragging = false;
  let startX = 0;
  let startY = 0;

  function collectSlides() {
    lbSlides = [];
    document.querySelectorAll("#demoTrack .device").forEach((article, idx) => {
      const img = article.querySelector(".device__screen");
      const cap = article.querySelector(".device__cap");
      if (img && img.style.opacity !== "0" && img.src && !img.src.endsWith("undefined")) {
        let titleText = "Slide " + (idx + 1);
        if (cap) {
          const b = cap.querySelector("b");
          if (b) titleText = b.textContent.trim();
        }
        lbSlides.push({
          element: article,
          imgUrl: img.src,
          title: titleText,
          captionHtml: cap ? cap.innerHTML : "",
          index: idx
        });
      }
    });
  }

  function updateTransform() {
    if (lightboxImg) {
      lightboxImg.style.transform = `scale(${currentZoom}) translate(${panX}px, ${panY}px)`;
      lightboxImg.classList.toggle("is-zoomed", currentZoom > 1);
    }
  }

  function resetZoom() {
    currentZoom = 1;
    panX = 0;
    panY = 0;
    updateTransform();
  }

  function renderSlide(idx) {
    if (lbSlides.length === 0) return;
    lbCurrentIndex = (idx + lbSlides.length) % lbSlides.length;
    const slide = lbSlides[lbCurrentIndex];
    resetZoom();
    if (lightboxImg) lightboxImg.src = slide.imgUrl;
    if (lightboxTitle) lightboxTitle.textContent = slide.title;
    if (lightboxCaption) lightboxCaption.innerHTML = slide.captionHtml;
    if (lightboxCounter) lightboxCounter.textContent = `${lbCurrentIndex + 1} / ${lbSlides.length}`;
  }

  function openLightbox(slideIdx) {
    collectSlides();
    if (lbSlides.length === 0) return;
    let foundIdx = lbSlides.findIndex(s => s.index === slideIdx);
    if (foundIdx === -1) foundIdx = 0;
    renderSlide(foundIdx);
    if (lightbox) lightbox.classList.add("is-open");
    if (window.__lenis) window.__lenis.stop();
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (lightbox) lightbox.classList.remove("is-open");
    resetZoom();
    document.body.style.overflow = "";
    if (window.__lenis) window.__lenis.start();
  }

  window._updateLightboxLanguage = () => {
    if (lightbox && lightbox.classList.contains("is-open")) {
      collectSlides();
      renderSlide(lbCurrentIndex);
    }
  };

  document.querySelectorAll("#demoTrack .device").forEach((article, idx) => {
    const frame = article.querySelector(".device__frame");
    if (frame) {
      frame.addEventListener("click", () => {
        const img = article.querySelector(".device__screen");
        if (img && img.style.opacity !== "0" && img.src) {
          openLightbox(idx);
        }
      });
    }
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", () => renderSlide(lbCurrentIndex - 1));
  if (lightboxNext) lightboxNext.addEventListener("click", () => renderSlide(lbCurrentIndex + 1));

  if (lightboxZoomIn) lightboxZoomIn.addEventListener("click", () => {
    currentZoom = Math.min(currentZoom + 0.5, 4);
    updateTransform();
  });
  if (lightboxZoomOut) lightboxZoomOut.addEventListener("click", () => {
    currentZoom = Math.max(currentZoom - 0.5, 1);
    if (currentZoom === 1) { panX = 0; panY = 0; }
    updateTransform();
  });
  if (lightboxZoomReset) lightboxZoomReset.addEventListener("click", resetZoom);

  if (lightboxImg) {
    lightboxImg.addEventListener("dblclick", () => {
      if (currentZoom === 1) {
        currentZoom = 2;
      } else {
        currentZoom = 1;
        panX = 0;
        panY = 0;
      }
      updateTransform();
    });

    lightboxImg.addEventListener("mousedown", (e) => {
      if (currentZoom > 1) {
        isDragging = true;
        startX = e.clientX - panX * currentZoom;
        startY = e.clientY - panY * currentZoom;
        e.preventDefault();
      }
    });
  }

  window.addEventListener("mousemove", (e) => {
    if (isDragging && currentZoom > 1) {
      panX = (e.clientX - startX) / currentZoom;
      panY = (e.clientY - startY) / currentZoom;
      updateTransform();
    }
  });

  window.addEventListener("mouseup", () => {
    if (isDragging) isDragging = false;
  });

  if (lightboxViewport) {
    lightboxViewport.addEventListener("wheel", (e) => {
      if (!lightbox || !lightbox.classList.contains("is-open")) return;
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.25 : -0.25;
      currentZoom = Math.min(Math.max(currentZoom + delta, 1), 4);
      if (currentZoom === 1) { panX = 0; panY = 0; }
      updateTransform();
    }, { passive: false });
  }

  window.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") renderSlide(lbCurrentIndex - 1);
    else if (e.key === "ArrowRight") renderSlide(lbCurrentIndex + 1);
    else if (e.key === "+" || e.key === "=") { currentZoom = Math.min(currentZoom + 0.5, 4); updateTransform(); }
    else if (e.key === "-") { currentZoom = Math.max(currentZoom - 0.5, 1); if (currentZoom === 1) { panX = 0; panY = 0; } updateTransform(); }
    else if (e.key === "0") resetZoom();
  });

  /* =========================================================
     CERTIFICATE MODAL (SLIDE 01)
     ========================================================= */
  const certModal = document.getElementById("certModal");
  const certModalBackdrop = document.getElementById("certModalBackdrop");
  const certModalClose = document.getElementById("certModalClose");
  const introCertCard = document.getElementById("introCertCard");
  const introCertOpenBtn = document.getElementById("introCertOpenBtn");

  function openCertModal() {
    if (!certModal) return;
    certModal.classList.add("is-open");
    certModal.setAttribute("aria-hidden", "false");
    if (window.__lenis) window.__lenis.stop();
    document.body.style.overflow = "hidden";
  }

  function closeCertModal() {
    if (!certModal) return;
    certModal.classList.remove("is-open");
    certModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (window.__lenis) window.__lenis.start();
  }

  if (introCertCard) {
    introCertCard.addEventListener("click", openCertModal);
    introCertCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCertModal();
      }
    });
  }
  if (introCertOpenBtn) introCertOpenBtn.addEventListener("click", openCertModal);
  if (certModalClose) certModalClose.addEventListener("click", closeCertModal);
  if (certModalBackdrop) certModalBackdrop.addEventListener("click", closeCertModal);

  /* =========================================================
     UZCOMBINATOR BANNER MODAL (SLIDE 04)
     ========================================================= */
  const uzcModal = document.getElementById("uzcModal");
  const uzcModalBackdrop = document.getElementById("uzcModalBackdrop");
  const uzcModalClose = document.getElementById("uzcModalClose");
  const uzcProofCard = document.getElementById("uzcProofCard");
  const uzcOpenBtn = document.getElementById("uzcOpenBtn");
  let uzcReturnFocus = null;

  function openUzcModal() {
    if (!uzcModal) return;
    uzcReturnFocus = document.activeElement;
    uzcModal.classList.add("is-open");
    uzcModal.setAttribute("aria-hidden", "false");
    if (window.__lenis) window.__lenis.stop();
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => {
      if (uzcModal.classList.contains("is-open")) uzcModalClose?.focus({ preventScroll: true });
    });
  }

  function closeUzcModal() {
    if (!uzcModal) return;
    uzcModal.classList.remove("is-open");
    uzcModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (window.__lenis) window.__lenis.start();
    uzcReturnFocus?.focus({ preventScroll: true });
  }

  if (uzcProofCard) {
    uzcProofCard.addEventListener("click", openUzcModal);
    uzcProofCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openUzcModal();
      }
    });
  }
  if (uzcOpenBtn) uzcOpenBtn.addEventListener("click", openUzcModal);
  if (uzcModalClose) uzcModalClose.addEventListener("click", closeUzcModal);
  if (uzcModalBackdrop) uzcModalBackdrop.addEventListener("click", closeUzcModal);

  /* =========================================================
     BOOT
     ========================================================= */
  window.addEventListener("load", runLoader);
  let rt;
  window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 200); });
  document.querySelector(".market-method")?.addEventListener("toggle", () => {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  setActive(0, chapters[0]);
  setLanguage("ru");
})();
