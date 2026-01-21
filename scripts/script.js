document.addEventListener('DOMContentLoaded', () => {
    const MOCK_DIRECTIONS = [
        {
            name: "Кундалини-йога",
            days: "вт, чт, сб",
            time: "90 мин",
            desc: "Практика, сочетающая в себе динамические упражнения, дыхательные техники и медитации для пробуждения внутренней энергии.",
            img: "assets/directions_kundalini.jpg"
        },
        {
            name: "Хатха-йога",
            days: "пн, ср, пт",
            time: "75 мин",
            desc: "Классическое направление йоги, направленное на достижение гармонии между телом и умом через асаны и дыхание.",
            img: "assets/directions_hatha.jpg"
        },
        {
            name: "Пилатес",
            days: "пн, вт, чт",
            time: "60 мин",
            desc: "Система упражнений для укрепления мышечного корсета, улучшения осанки и координации движений.",
            img: "assets/directions_pilates.jpg"
        },
        {
            name: "Здоровая спина",
            days: "пн, ср, пт",
            time: "60 мин",
            desc: "Занятия ориентированы на гармоничное развитие тела. Регулярное выполнение упражнений формирует мышечный корсет, удерживающий позвоночник.",
            img: "assets/directions-main.jpg"
        },
        {
            name: "Флоу-йога",
            days: "вт, пт",
            time: "70 мин",
            desc: "Динамическая практика, где одно движение плавно перетекает в другое, создавая непрерывный поток энергии.",
            img: "assets/directions_flow.jpg"
        },
        {
            name: "Стретчинг",
            days: "ср, сб",
            time: "50 мин",
            desc: "Комплекс упражнений, направленный на растяжку мышц и повышение гибкости суставов.",
            img: "assets/directions_stretching.jpg"
        }
    ];

    const MOCK_SCHEDULE = {
        monday: [
            { time: "08:00", name: "Хатха-йога", trainer: "Ирина Беляева" },
            { time: "18:00", name: "Пилатес", trainer: "Анна Беляева" }
        ],
        tuesday: [
            { time: "09:00", name: "Кундалини-йога", trainer: "Екатерина Волкова" }
        ],
        wednesday: [
            { time: "08:00", name: "Здоровая спина", trainer: "Мария Смирнова" },
            { time: "19:00", name: "Стретчинг", trainer: "Ирина Беляева" }
        ],
        thursday: [
            { time: "10:00", name: "Флоу-йога", trainer: "Анна Беляева" }
        ],
        friday: [
            { time: "08:00", name: "Хатха-йога", trainer: "Ирина Беляева" }
        ],
        saturday: [
            { time: "11:00", name: "Здоровая спина", trainer: "Мария Смирнова" }
        ]
    };

    const MOCK_COACHES = [
        {
            name: "Анна Беляева",
            desc: "Специалист по пилатесу и функциональному тренингу. Опыт работы более 7 лет. Помогает восстановиться после травм.",
            imgMain: "assets/coach_main_anna.jpg"
        },
        {
            name: "Екатерина Волкова",
            desc: "Сертифицированный преподаватель Кундалини-йоги. Практикует более 10 лет. Ведет классы медитации и дыхательных практик.",
            imgMain: "assets/coach_main_ekaterina.jpg"
        },
        {
            name: "Мария Смирнова",
            desc: "Инструктор по направлению «Здоровая спина». Высшее медицинское образование. Специализируется на коррекции осанки.",
            imgMain: "assets/coach_main_maria.jpg"
        }
    ];


    const slides = document.querySelectorAll('.home_slide');
    const counter = document.getElementById('home_counter');
    const statusFill = document.getElementById('home_status_fill');
    let currentSlide = 0;
    
    function updateSlide() {
        slides.forEach((s, i) => {
            s.style.display = i === currentSlide ? 'block' : 'none';
        });
        counter.textContent = `${currentSlide + 1}/${slides.length}`;
        statusFill.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
    }

    

    document.getElementById('prevBtn').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    });
    
    document.getElementById('nextBtn').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    });
    
    updateSlide(); 

    const dirTabs = document.querySelectorAll('.directions_tab');
    const dirName = document.querySelector('.directions_name');
    const dirDays = document.querySelector('.directions_meta_item:nth-child(1) .directions_meta_text');
    const dirTime = document.querySelector('.directions_meta_item:nth-child(2) .directions_meta_text');
    const dirDesc = document.querySelector('.directions_description');
    const dirImg = document.querySelector('.directions_image');
    const dirProgress = document.querySelector('.directions_progress_fill');

    function setDirection(index) {
        const data = MOCK_DIRECTIONS[index];
        dirName.textContent = data.name;
        dirDays.textContent = `Проходит по: ${data.days}`;
        dirTime.textContent = `Длительность: ${data.time}`;
        dirDesc.innerHTML = `<p>${data.desc}</p>`;
        dirImg.src = data.img;

        dirTabs.forEach((t, i) => {
            if(i === index) t.classList.add('directions_tab_active');
            else t.classList.remove('directions_tab_active');
        });

        dirProgress.style.width = `${((index + 1) / MOCK_DIRECTIONS.length) * 100}%`;
    }

    dirTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => setDirection(index));
    });

    document.querySelector('.directions_slider_button_prev').addEventListener('click', () => {
        let activeIdx = Array.from(dirTabs).findIndex(t => t.classList.contains('directions_tab_active'));
        let newIdx = (activeIdx - 1 + MOCK_DIRECTIONS.length) % MOCK_DIRECTIONS.length;
        setDirection(newIdx);
    });

    document.querySelector('.directions_slider_button_next').addEventListener('click', () => {
        let activeIdx = Array.from(dirTabs).findIndex(t => t.classList.contains('directions_tab_active'));
        let newIdx = (activeIdx + 1) % MOCK_DIRECTIONS.length;
        setDirection(newIdx);
    });

    const schedTabs = document.querySelectorAll('.schedule_tab');
    const schedRows = document.getElementById('schedule_rows');

    function loadSchedule(day) {
        schedRows.innerHTML = '';
        const data = MOCK_SCHEDULE[day] || [];
        
        data.forEach(item => {
            const row = document.createElement('div');
            row.className = 'schedule_table_row';
            row.innerHTML = `
                <div class="schedule_table_time">${item.time}</div>
                <div class="schedule_table_name">${item.name}</div>
                <div class="schedule_table_trainer">${item.trainer}</div>
                <div class="schedule_table_action">
                    <button class="schedule_edit_btn" data-class="${item.name}" data-time="${item.time}" data-trainer="${item.trainer}">✎</button>
                </div>
            `;
            schedRows.appendChild(row);
        });

        document.querySelectorAll('.schedule_edit_btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                openModal(e.target.dataset);
            });
        });
    }

    schedTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            schedTabs.forEach(t => t.classList.remove('schedule_tab_active'));
            tab.classList.add('schedule_tab_active');
            loadSchedule(tab.dataset.day);
        });
    });

    loadSchedule('monday'); 

    const modal = document.getElementById('modal_overlay');
    const closeBtn = document.querySelector('.modal_close');
    
    function openModal(data) {
        document.getElementById('modal_class_name').textContent = data.class;
        document.getElementById('modal_class_time').textContent = data.time;
        document.getElementById('modal_class_trainer').textContent = data.trainer;
        modal.classList.add('active');
    }

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    const coachPreviews = document.querySelectorAll('.coaches_preview');
    coachPreviews.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.dataset.trainer;
            const data = MOCK_COACHES[index];
            if(data) {
                document.getElementById('coaches_name').textContent = data.name;
                document.getElementById('coaches_text').textContent = data.desc;
                document.querySelector('.coaches_main_img').src = data.imgMain;
            }
        });
    });

    document.querySelectorAll('.connection_question').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.parentElement;
            item.classList.toggle('connection_item_active');
        });
    });
});