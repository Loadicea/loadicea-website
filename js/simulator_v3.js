
// Simulator V3 - Rewrite Logic
console.log('Simulator V3 Loaded');

const scenarios = {
    villa: {
        name: "Private Villa",
        image: "villa_base.png",
        baseEff: 50,
        actions: [
            { id: 'solar', title: 'Deep Clean Solar', gain: 20, savings: 6500, icon: 'ph-sun' },
            { id: 'ac', title: 'AC Optimization', gain: 15, savings: 4500, icon: 'ph-fan' },
            { id: 'smart', title: 'Smart Monitoring', gain: 10, savings: 4000, icon: 'ph-chart-line-up' }
        ]
    },
    office: {
        name: "Commercial Tower",
        image: "office_base.png",
        baseEff: 40,
        actions: [
            { id: 'chiller', title: 'Calibrate Chillers', gain: 25, savings: 55000, icon: 'ph-thermometer-cold' },
            { id: 'bms', title: 'BMS Logic Update', gain: 20, savings: 35000, icon: 'ph-desktop' },
            { id: 'seal', title: 'Envelope Sealing', gain: 10, savings: 30000, icon: 'ph-wind' }
        ]
    },
    warehouse: {
        name: "Industrial Warehouse",
        image: "warehouse_base.png",
        baseEff: 45,
        actions: [
            { id: 'pfc', title: 'Power Factor', gain: 25, savings: 40000, icon: 'ph-lightning' },
            { id: 'robot', title: 'Robotic Cleaning', gain: 20, savings: 35000, icon: 'ph-robot' },
            { id: 'loto', title: 'Safety Check', gain: 5, savings: 10000, icon: 'ph-warning' }
        ]
    },
    hotel: {
        name: "Hotel & Resort",
        image: "hotel_base.png",
        baseEff: 55,
        actions: [
            { id: 'guest', title: 'Guest Room EMS', gain: 20, savings: 45000, icon: 'ph-bed' },
            { id: 'water', title: 'Water Aerators', gain: 15, savings: 30000, icon: 'ph-drop' },
            { id: 'pump', title: 'VFD Pumps', gain: 10, savings: 20000, icon: 'ph-arrows-clockwise' }
        ]
    },
    // Remap common keys if HTML uses them
    hospitality: {
        name: "Hotel & Resort",
        image: "hotel_base.png",
        baseEff: 55,
        actions: [
            { id: 'guest', title: 'Guest Room EMS', gain: 20, savings: 45000, icon: 'ph-bed' },
            { id: 'water', title: 'Water Aerators', gain: 15, savings: 30000, icon: 'ph-drop' },
            { id: 'pump', title: 'VFD Pumps', gain: 10, savings: 20000, icon: 'ph-arrows-clockwise' }
        ]
    }
};

let currentState = {
    eff: 50,
    savings: 0
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Elements
    const bgLayer = document.querySelector('.scene-bg-layer');
    const controls = document.querySelector('.sim-controls');
    const gaugePath = document.querySelector('.gauge-progress');
    const gaugeText = document.querySelector('.gauge-center-text');
    const savingsText = document.querySelector('.sim-value-huge');

    // Overlays
    const dirt = document.querySelector('.dirt-overlay');
    const tech = document.querySelector('.tech-grid');

    if (!bgLayer) {
        console.error('CRITICAL: .scene-bg-layer not found');
        return;
    }

    // 2. Setup Nav
    const navItems = document.querySelectorAll('.sim-nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // UI Active State
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Load Data
            const key = item.dataset.scenario || 'villa';
            loadScenario(key);
        });
    });

    // 3. Load Function
    function loadScenario(key) {
        console.log('Loading Scenario:', key);
        const data = scenarios[key] || scenarios['villa'];

        // Reset State
        currentState.eff = data.baseEff;
        currentState.savings = 0;
        updateUI();

        // Overlay Reset
        if (dirt) dirt.classList.remove('cleaned');
        if (tech) tech.classList.remove('active');

        // Image Swap (Robust Method)
        const imgPath = `assets/images/${data.image}`;

        // Create temp image to check loading
        const tempImg = new Image();
        tempImg.onload = () => {
            console.log('Image Loaded OK:', imgPath);
            bgLayer.style.backgroundImage = `url('${imgPath}')`;
            bgLayer.style.opacity = 1;
        };
        tempImg.onerror = () => {
            console.error('Image Failed:', imgPath);
            bgLayer.style.backgroundColor = '#1E293B'; // Fallback
        };
        tempImg.src = imgPath;

        // Render Actions
        renderActions(data.actions);
    }

    // 4. Action Renderer
    function renderActions(actions) {
        controls.innerHTML = '';
        actions.forEach(action => {
            const btn = document.createElement('div');
            btn.className = 'action-tile';
            // Removed static savings text as requested
            btn.innerHTML = `
                <div class="action-icon"><i class="ph ${action.icon}"></i></div>
                <div class="action-content">
                    <h4>${action.title}</h4>
                </div>
                <div class="action-arrow"><i class="ph-bold ph-plus"></i></div>
            `;
            btn.onclick = (e) => {
                if (btn.classList.contains('completed')) return;
                btn.classList.add('completed');

                // Logic
                currentState.eff = Math.min(100, currentState.eff + action.gain);
                currentState.savings += action.savings;

                updateUI();

                // Visuals
                if (currentState.eff > 80 && dirt) dirt.classList.add('cleaned');
                if (action.id === 'smart' || action.id === 'bms' || action.id === 'pfc') {
                    if (tech) tech.classList.add('active');
                }

                // FX - Pass click event to position popup correctly
                spawnPopup(e.clientX, e.clientY, action.savings);
            };
            controls.appendChild(btn);
        });
    }

    // 5. Update UI
    function updateUI() {
        // Gauge (Circumference ~264 for r=42)
        const maxC = 264;
        const val = currentState.eff;
        const offset = maxC - (val / 100 * maxC);

        if (gaugePath) gaugePath.style.strokeDashoffset = offset;

        // Update Value Text specifically
        const valSpan = document.querySelector('.gauge-center-text .value');
        if (valSpan) valSpan.innerText = Math.round(val);

        // Savings
        if (savingsText) savingsText.innerText = 'AED ' + currentState.savings.toLocaleString();
    }

    // 6. Savings Popup
    function spawnPopup(x, y, amount) {
        const p = document.createElement('div');
        p.className = 'savings-popup';
        p.innerText = '+ AED ' + amount.toLocaleString();
        p.style.left = x + 'px';
        p.style.top = y + 'px';
        document.body.appendChild(p);
        setTimeout(() => p.remove(), 2000);
    }

    // Init
    loadScenario('villa');
});
