document.addEventListener('DOMContentLoaded', () => {
    let appData = null;

    async function loadAppData() {
        try {
            const response = await fetch('data.json'); 
            if (!response.ok) throw new Error('Ошибка сети');
            appData = await response.json();
            
            initDirections();
            initSchedule();
            initCoaches();
        } catch (error) {
            console.error('Не удалось загрузить данные:', error);
        }
    }

    const slides = document.querySelectorAll('.home_slide');
    const counter = document.getElementById('home_counter');
    const statusFill = document.getElementById('home_status_fill');
    let currentSlide = 0;
    
    function updateSlide() {
        slides.forEach((s, i) => s.style.display = i === currentSlide ? 'block' : 'none');
        if (counter) counter.textContent = `${currentSlide + 1}/${slides.length}`;
        if (statusFill) statusFill.style.width = `${((currentSlide + 1) / slides.length) * 100}%`;
    }

    document.getElementById('prevBtn')?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide();
    });
    
    document.getElementById('nextBtn')?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide();
    });
    updateSlide();

    function initDirections() {
        const dirTabs = document.querySelectorAll('.directions_tab');
        const dirName = document.querySelector('.directions_name');
        const dirDays = document.querySelector('.directions_meta_item:nth-child(1) .directions_meta_text');
        const dirTime = document.querySelector('.directions_meta_item:nth-child(2) .directions_meta_text');
        const dirDesc = document.querySelector('.directions_description');
        const dirImg = document.querySelector('.directions_image');
        const dirProgress = document.querySelector('.directions_progress_fill');

        function setDirection(index) {
            const data = appData.directions[index];
            dirName.textContent = data.title;
            dirDays.textContent = `Проходит по: ${data.schedule}`;
            dirTime.textContent = `Длительность: ${data.duration}`;
            dirDesc.innerHTML = data.description.map(p => `<p>${p}</p>`).join('');
            dirImg.src = data.image;

            dirTabs.forEach((t, i) => t.classList.toggle('directions_tab_active', i === index));
            if (dirProgress) dirProgress.style.width = `${((index + 1) / appData.directions.length) * 100}%`;
        }

        dirTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => setDirection(index));
        });

        document.querySelector('.directions_slider_button_prev')?.addEventListener('click', () => {
            let activeIdx = Array.from(dirTabs).findIndex(t => t.classList.contains('directions_tab_active'));
            setDirection((activeIdx - 1 + appData.directions.length) % appData.directions.length);
        });

        document.querySelector('.directions_slider_button_next')?.addEventListener('click', () => {
            let activeIdx = Array.from(dirTabs).findIndex(t => t.classList.contains('directions_tab_active'));
            setDirection((activeIdx + 1) % appData.directions.length);
        });

        setDirection(3); 
    }

    function initSchedule() {
        const schedTabs = document.querySelectorAll('.schedule_tab');
        const schedRows = document.getElementById('schedule_rows');


        function loadSchedule(day) {
            if (!schedRows) return;
            schedRows.innerHTML = '';
            const dayData = appData.schedule[day] || [];
            
            dayData.forEach(item => {
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
                btn.addEventListener('click', (e) => openModal(e.currentTarget.dataset));
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
    }

    const modal = document.getElementById('modal_overlay');
    function openModal(data) {
        if (!modal) return;
        document.getElementById('modal_class_name').textContent = data.class;
        document.getElementById('modal_class_time').textContent = data.time;
        document.getElementById('modal_class_trainer').textContent = data.trainer;
        modal.classList.add('active');
    }

    document.querySelector('.modal_close')?.addEventListener('click', () => modal.classList.remove('active'));

    function initCoaches() {
        const coachPreviews = document.querySelectorAll('.coaches_preview');
        coachPreviews.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                const data = appData.coaches[index];
                if (data) {
                    document.getElementById('coaches_name').textContent = data.name;
                    document.getElementById('coaches_text').textContent = data.description;
                    document.querySelector('.coaches_main_img').src = data.photo;
                }
            });
        });
    }

    document.querySelectorAll('.connection_question').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.parentElement.classList.toggle('connection_item_active');
        });
    });

    loadAppData();
});
