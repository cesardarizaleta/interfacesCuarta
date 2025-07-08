document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('tangramCanvas');
    const ctx = canvas.getContext('2d');

    // Tamaño de diseño base para escalar las figuras
    const DESIGN_WIDTH = 600;
    const DESIGN_HEIGHT = 400;

    // --- Definición del estado de las piezas del Tangram ---
    // Cada pieza tiene un estado inicial (ensamblada) y final (desarmada).
    const pieces = [
        {
            type: 'triangle',
            color: '#FF7F50', // 1. Naranja (pequeño)
            legLength: 45,
            startX: 202, startY: 243, startRotation: 0,
            endX: -150, endY: 250, endRotation: -45
        },
        {
            type: 'rect',
            color: '#00B050', // 2. Verde (cuadrado)
            width: 45, height: 45,
            startX: 376, startY: 70, startRotation: 45,
            endX: 750, endY: 80, endRotation: 0
        },
        {
            type: 'triangle',
            color: '#008080', // 3. Teal (pequeño)
            legLength: 45,
            startX: 382, startY: 108, startRotation: 90,
            endX: 800, endY: 150, endRotation: 135
        },
        {
            type: 'triangle',
            color: '#FF00FF', // 4. Fucsia (grande)
            legLength: 90,
            startX: 292, startY: 154, startRotation: 0,
            endX: -200, endY: 100, endRotation: 20
        },
        {
            type: 'triangle',
            color: '#000080', // 5. Azul (grande)
            legLength: 90,
            startX: 292, startY: 243, startRotation: 180,
            endX: 850, endY: 300, endRotation: 220
        },
        {
            type: 'parallelogram',
            color: '#FFDB58', // 6. Amarillo (paralelogramo)
            baseWidth: 48, height: 45, skewOffset: 45,
            startX: 248, startY: 266, startRotation: 180,
            endX: -180, endY: 350, endRotation: 135
        },
        {
            type: 'triangle',
            color: '#800080', // 7. Morado (mediano)
            legLength: 65,
            startX: 337, startY: 108, startRotation: 45,
            endX: 300, endY: 500, endRotation: 90
        }
    ];

    // --- Funciones de dibujo (sin cambios) ---
    function drawTriangle(color, x, y, legLength, rotation = 0) {
        ctx.save(); ctx.fillStyle = color; ctx.translate(x, y); ctx.rotate(rotation * Math.PI / 180);
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(legLength, 0); ctx.lineTo(0, legLength);
        ctx.closePath(); ctx.fill(); ctx.restore();
    }
    function drawRect(color, x, y, width, height, rotation = 0) {
        ctx.save(); ctx.fillStyle = color; ctx.translate(x + width / 2, y + height / 2);
        ctx.rotate(rotation * Math.PI / 180); ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.restore();
    }
    function drawParallelogram(color, x, y, baseWidth, height, skewOffset, rotation = 0) {
        ctx.save(); ctx.fillStyle = color; const p1x = 0, p1y = 0; const p2x = baseWidth, p2y = 0;
        const p3x = baseWidth - skewOffset, p3y = height; const p4x = -skewOffset, p4y = height;
        const centerLocalX = (baseWidth - skewOffset) / 2; const centerLocalY = height / 2;
        ctx.translate(x, y); ctx.rotate(rotation * Math.PI / 180);
        ctx.beginPath(); ctx.moveTo(p1x - centerLocalX, p1y - centerLocalY); ctx.lineTo(p2x - centerLocalX, p2y - centerLocalY);
        ctx.lineTo(p3x - centerLocalX, p3y - centerLocalY); ctx.lineTo(p4x - centerLocalX, p4y - centerLocalY);
        ctx.closePath(); ctx.fill(); ctx.restore();
    }

    // --- Lógica de Animación ---
    let animationStartTime = 0;
    const totalAnimationDuration = 6000; // 6 segundos en total
    const phaseDuration = totalAnimationDuration / 2; // 3 segundos por fase
    let animationFrameId;

    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    function animate(timestamp) {
        if (!animationStartTime) {
            animationStartTime = timestamp;
        }

        const elapsedTime = timestamp - animationStartTime;
        let progress;

        // Fase 1: Desarmar (0 -> 3 segundos)
        if (elapsedTime < phaseDuration) {
            progress = elapsedTime / phaseDuration; // Progreso va de 0 a 1
        } 
        // Fase 2: Rearmar (3 -> 6 segundos)
        else {
            progress = 1 - ((elapsedTime - phaseDuration) / phaseDuration); // Progreso va de 1 a 0
        }

        // Aplicar easing para un movimiento más suave
        let easedProgress = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
        
        drawScene(easedProgress);

        // Continúa la animación hasta que se completen los 6 segundos
        if (elapsedTime < totalAnimationDuration) {
            animationFrameId = requestAnimationFrame(animate);
        } else {
            // Asegura que la figura quede perfectamente ensamblada al final
            drawScene(0); 
        }
    }

    // --- Función principal de dibujo ---
    function drawScene(progress = 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.min(canvas.width / DESIGN_WIDTH, canvas.height / DESIGN_HEIGHT);
        const offsetX = (canvas.width - DESIGN_WIDTH * scale) / 2;
        const offsetY = (canvas.height - DESIGN_HEIGHT * scale) / 2;

        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        pieces.forEach(p => {
            const currentX = lerp(p.startX, p.endX, progress);
            const currentY = lerp(p.startY, p.endY, progress);
            const currentRotation = lerp(p.startRotation, p.endRotation, progress);

            switch (p.type) {
                case 'triangle':
                    drawTriangle(p.color, currentX, currentY, p.legLength, currentRotation);
                    break;
                case 'rect':
                    drawRect(p.color, currentX, currentY, p.width, p.height, currentRotation);
                    break;
                case 'parallelogram':
                    drawParallelogram(p.color, currentX, currentY, p.baseWidth, p.height, p.skewOffset, currentRotation);
                    break;
            }
        });
        ctx.restore();
    }

    // --- Controlador de inicio y redimensionamiento ---
    function start() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }
        animationStartTime = 0;
        
        // Inicia la animación directamente
        animationFrameId = requestAnimationFrame(animate);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        start();
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});