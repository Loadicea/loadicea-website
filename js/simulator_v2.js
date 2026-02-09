
document.addEventListener('DOMContentLoaded', () => {
    // Only run if simulator container exists
    const simulatorContainer = document.querySelector('.simulator-container');
    if (!simulatorContainer) return;

    let currentScenario = 'villa';
    let currentEfficiency = 50;
    let currentSavings = 0;

    // Scenarios Data
    const scenarios = {
        villa: {
            name: "Private Villa",
            icon: "ph-house-simple",
            image: "villa_base.png",
            baseEfficiency: 50,
            maxSavings: 15000,
            actions: [
                { id: 'solar', title: 'Deep Clean Solar', gain: 20, savings: 6500, desc: 'Restore 100% PV output.', icon: 'ph-sun' },
                { id: 'ac', title: 'AC Optimization', gain: 15, savings: 4500, desc: 'Reduce compressor load.', icon: 'ph-fan' },
                { id: 'smart', title: 'Smart Monitoring', gain: 10, savings: 4000, desc: 'Track usage in real-time.', icon: 'ph-chart-line-up' }
            ]
        },
        office: {
            name: "Commercial Tower",
            icon: "ph-buildings",
            image: "office_base.png",
            baseEfficiency: 40,
            maxSavings: 120000,
            actions: [
                { id: 'chiller', title: 'Calibrate Chillers', gain: 25, savings: 55000, desc: 'Precision Delta-T tuning.', icon: 'ph-thermometer-cold' },
                { id: 'bms', title: 'BMS Logic Update', gain: 20, savings: 35000, desc: 'Intelligent scheduling.', icon: 'ph-desktop' },
                { id: 'seal', title: 'Envelope Sealing', gain: 10, savings: 30000, desc: 'Stop cool air leakage.', icon: 'ph-wind' }
            ]
        },
        // Mapped commercial to office for simplicity in demo if needed, or separate
        commercial: {
            name: "Commercial Tower",
            icon: "ph-buildings",
            image: "office_base.png",
            baseEfficiency: 40,
            maxSavings: 120000,
            actions: [
                { id: 'chiller', title: 'Calibrate Chillers', gain: 25, savings: 55000, desc: 'Precision Delta-T tuning.', icon: 'ph-thermometer-cold' },
                { id: 'bms', title: 'BMS Logic Update', gain: 20, savings: 35000, desc: 'Intelligent scheduling.', icon: 'ph-desktop' },
                { id: 'seal', title: 'Envelope Sealing', gain: 10, savings: 30000, desc: 'Stop cool air leakage.', icon: 'ph-wind' }
            ]
        },
        warehouse: {
            name: "Industrial Warehouse",
            icon: "ph-factory",
            image: "warehouse_base.png",
            baseEfficiency: 45,
            maxSavings: 85000,
            actions: [
                { id: 'pfc', title: 'Power Factor Correction', gain: 25, savings: 40000, desc: 'Eliminate fines.', icon: 'ph-lightning' },
                { id: 'robot', title: 'Robotic Cleaning', gain: 20, savings: 35000, desc: 'Automated maintenance.', icon: 'ph-robot' },
                { id: 'loto', title: 'Safety Compliance', gain: 5, savings: 10000, desc: 'Avoid downtime risks.', icon: 'ph-warning' }
            ]
        },
        hospitality: {
            name: "Hotel & Resort",
            icon: "ph-armchair",
            image: "hotel_base.png",
            baseEfficiency: 55,
            maxSavings: 95000,
            actions: [
                { id: 'guest', title: 'Guest Room EMS', gain: 20, savings: 45000, desc: 'Auto-setback sensors.', icon: 'ph-bed' },
                { id: 'water', title: 'Water Aerators', gain: 15, savings: 30000, desc: 'Reduce consumption 50%.', icon: 'ph-drop' },
                { id: 'pump', title: 'VFD Pump Control', gain: 10, savings: 20000, desc: 'Match speed to demand.', icon: 'ph-arrows-clockwise' }
            ]
        }
    };

    // Elements
    const gaugeCircle = document.querySelector('.gauge-progress');
    const gaugeText = document.querySelector('.gauge-center-text');
    const savingsDisplay = document.querySelector('.sim-value-huge');
    const sceneImage = document.querySelector('.scene-image');
    const controlsContainer = document.querySelector('.sim-controls');

    // Init Overlays
    const sceneContainer = document.querySelector('.sim-scene');
    if (!document.querySelector('.dirt-overlay')) {
        sceneContainer.insertAdjacentHTML('beforeend', '<div class="dirt-overlay"></div><div class="tech-grid"></div>');
    }
    const dirtOverlay = document.querySelector('.dirt-overlay');
    const techGrid = document.querySelector('.tech-grid');

    // Sidebar Interactions
    document.querySelectorAll('.sim-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.sim-nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // Fade switch
            sceneContainer.style.opacity = 0;
            setTimeout(() => {
                loadScenario(item.dataset.scenario);
                sceneContainer.style.opacity = 1;
            }, 300);
        });
    });

    function loadScenario(id) {
        currentScenario = id;
        const data = scenarios[id];

        // Reset Logic
        currentEfficiency = data.baseEfficiency;
        currentSavings = 0;

        // Reset Visuals
        // Reset Visuals
        updateGauge(currentEfficiency);
        updateSavings(0);

        // Define error handler BEFORE setting src
        sceneImage.onerror = function () {
            console.error('Image failed to load:', sceneImage.src);
            sceneImage.style.backgroundColor = '#334155'; // Fallback gray
        };

        // Set src (No cache buster for local files)
        sceneImage.src = `assets/images/${data.image}`;

        sceneImage.onerror = function () {
            console.error('Image failed to load:', sceneImage.src);
            sceneImage.style.backgroundColor = '#334155'; // Fallback gray
        };

        // Reset Overlays
        dirtOverlay.classList.remove('cleaned');
        techGrid.classList.remove('active');

        // Render Controls (Tiles)
        controlsContainer.innerHTML = '';
        data.actions.forEach(action => {
            const tile = document.createElement('div');
            tile.className = 'action-tile';
            tile.innerHTML = `
                <div class="action-icon"><i class="ph ${action.icon}"></i></div>
                <div class="action-content">
                    <h4>${action.title}</h4>
                    <p>${action.desc}</p>
                </div>
                <div style="margin-left: auto; color: var(--sim-gold); font-weight: 700; font-size: 0.9rem;">+ AED ${action.savings.toLocaleString()}</div>
            `;
            tile.addEventListener('click', () => triggerAction(tile, action));
            controlsContainer.appendChild(tile);
        });
    }

    function triggerAction(tile, action) {
        if (tile.classList.contains('completed')) return;
        tile.classList.add('completed');

        // Update Math
        const oldSavings = currentSavings;
        currentSavings += action.savings;
        const oldEff = currentEfficiency;
        currentEfficiency = Math.min(100, currentEfficiency + action.gain);

        // Animate
        animateSavings(oldSavings, currentSavings);
        updateGauge(currentEfficiency);

        // Visual Effects
        if (currentEfficiency > 80) dirtOverlay.classList.add('cleaned');
        if (action.id === 'smart' || action.id === 'bms') techGrid.classList.add('active');

        // Particles
        spawnGoldParticles(tile);
    }

    function updateGauge(val) {
        // Radius 28 (approx), Circumference ~176
        // stroke-dasharray is set in CSS/SVG. Let's assume 100 for simplicity in CSS for % mapping
        // Logic: stroke-dasharray="100", offset 100 = empty, 0 = full
        const offset = 100 - val;
        gaugeCircle.style.strokeDashoffset = offset;
        gaugeText.innerText = val + '%';

        // Color shift
        if (val > 80) gaugeCircle.style.stroke = '#10B981'; // Emerald
        else if (val > 60) gaugeCircle.style.stroke = '#F59E0B'; // Gold
        else gaugeCircle.style.stroke = '#EF4444'; // Red
    }

    function animateSavings(start, end) {
        const duration = 1000;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // EaseOutQuart
            const ease = 1 - Math.pow(1 - progress, 4);

            const current = Math.floor(start + (end - start) * ease);
            savingsDisplay.innerText = 'AED ' + current.toLocaleString();

            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    function spawnGoldParticles(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const p = document.createElement('div');
            p.className = 'gold-particle';
            p.innerHTML = '<i class="ph-fill ph-coins"></i>'; // or sparkle
            p.style.left = (centerX + (Math.random() - 0.5) * 50) + 'px';
            p.style.top = (centerY + (Math.random() - 0.5) * 20) + 'px';
            p.style.animationDelay = (Math.random() * 0.2) + 's';
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 2000);
        }
    }
    // Load Initial (Call this LAST)
    loadScenario('villa');
});
