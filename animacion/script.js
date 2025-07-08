document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('tangramCanvas');
    const ctx = canvas.getContext('2d');

    // Definimos un tamaño de diseño base para las figuras
    // Esto nos permite usar las coordenadas originales y que JS las escale
    const DESIGN_WIDTH = 600;
    const DESIGN_HEIGHT = 400;

    // Función para redimensionar el canvas a la ventana y redibujar
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawTangram(); // Vuelve a dibujar las figuras cada vez que se redimensiona
    }

    // Función para dibujar un triángulo
    function drawTriangle(color, x, y, legLength, rotation = 0) {
        ctx.save(); // Guarda el estado actual de las transformaciones del canvas
        ctx.fillStyle = color;

        // Traslada el origen del canvas al punto (x, y) donde queremos posicionar el vértice del triángulo
        ctx.translate(x, y);
        
        // Rota el canvas alrededor de este nuevo origen
        ctx.rotate(rotation * Math.PI / 180); // Convierte grados a radianes

        // Dibuja el triángulo. Ahora sus coordenadas son relativas al nuevo origen (0,0)
        // Este patrón dibuja un triángulo rectángulo isósceles con el ángulo recto en (0,0)
        // y los catetos a lo largo de los ejes positivos (0,0), (legLength,0), (0,legLength)
        ctx.beginPath();
        ctx.moveTo(0, 0); // Vértice del ángulo recto (ahora en el origen local)
        ctx.lineTo(legLength, 0); // Extremo de un cateto
        ctx.lineTo(0, legLength); // Extremo del otro cateto
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    // Función para dibujar un rectángulo (se puede rotar para un cuadrado)
    function drawRect(color, x, y, width, height, rotation = 0) {
        ctx.save(); // Guarda el estado actual del canvas
        ctx.fillStyle = color;
        ctx.translate(x + width / 2, y + height / 2); // Mueve el origen al centro del rectángulo
        ctx.rotate(rotation * Math.PI / 180); // Rota
        ctx.fillRect(-width / 2, -height / 2, width, height); // Dibuja centrado en el nuevo origen
        ctx.restore(); // Restaura el estado anterior del canvas (sin la traslación y rotación)
    }

    // Función para dibujar un paralelogramo
    function drawParallelogram(color, x, y, baseWidth, height, skewOffset, rotation = 0) {
        ctx.save(); // Guarda el estado actual del canvas
        ctx.fillStyle = color;

        // Calcular las coordenadas de los vértices relativas a un origen (0,0) antes de la rotación
        // Asumimos que el paralelogramo "base" tiene su esquina inferior izquierda en (0,0)
        // y se extiende horizontalmente a 'baseWidth' y verticalmente a 'height'.
        // El 'skewOffset' desplaza la esquina superior izquierda.
        const p1x = 0;
        const p1y = 0;
        const p2x = baseWidth;
        const p2y = 0;
        const p3x = baseWidth - skewOffset;
        const p3y = height;
        const p4x = -skewOffset;
        const p4y = height;

        // Calcular el centro del bounding box de este paralelogramo para la rotación
        const minLocalX = Math.min(p1x, p2x, p3x, p4x);
        const maxLocalX = Math.max(p1x, p2x, p3x, p4x);
        const minLocalY = Math.min(p1y, p2y, p3y, p4y);
        const maxLocalY = Math.max(p1y, p2y, p3y, p4y);

        const centerLocalX = (minLocalX + maxLocalX) / 2;
        const centerLocalY = (minLocalY + maxLocalY) / 2;

        // Traslada el origen del canvas al punto (x, y) que es el centro deseado
        ctx.translate(x, y);
        
        // Rota el canvas alrededor de este nuevo origen
        ctx.rotate(rotation * Math.PI / 180);

        // Dibuja el paralelogramo con coordenadas ajustadas para que su centro esté en (0,0) local
        ctx.beginPath();
        ctx.moveTo(p1x - centerLocalX, p1y - centerLocalY);
        ctx.lineTo(p2x - centerLocalX, p2y - centerLocalY);
        ctx.lineTo(p3x - centerLocalX, p3y - centerLocalY);
        ctx.lineTo(p4x - centerLocalX, p4y - centerLocalY);
        ctx.closePath();
        ctx.fill();

        ctx.restore(); // Restaura el estado del canvas
    }

    // --- Función principal de dibujo de todas las figuras del Tangram ---
    function drawTangram() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia todo el canvas antes de dibujar

        ctx.globalAlpha = 1; // Establece la opacidad a 70%.

        // Calcula el factor de escala para ajustar el dibujo al tamaño actual del canvas
        const scale = Math.min(canvas.width / DESIGN_WIDTH, canvas.height / DESIGN_HEIGHT);

        // Calcula el offset para centrar el dibujo escalado
        const offsetX = (canvas.width - DESIGN_WIDTH * scale) / 2;
        const offsetY = (canvas.height - DESIGN_HEIGHT * scale) / 2;

        ctx.save(); // Guarda el estado del contexto (importante antes de transformaciones globales)

        // Aplica la traslación y la escala
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);

        // --- Dibujo de las figuras del Tangram con las coordenadas de diseño originales ---

        // 1. Triángulo pequeño naranja (#FF7F50)
        const naranjaTriangleX = 202; // Mueve 50px a la derecha
        const naranjaTriangleY = 243;     // No lo muevas en Y
        const naranjaTriangleRotation = 0; // Rota 90 grados

        drawTriangle('#FF7F50', naranjaTriangleX, naranjaTriangleY, 45, naranjaTriangleRotation); 
        
        // 2. Cuadrado verde (#00B050) - Rotado 45 grados para que parezca un rombo
        drawRect('#00B050', 376, 70, 45, 45, 45); // (x, y, width, height, rotation)

        // 3. Triángulo pequeño teal (#008080)
        const tealTriangleX = 400 - 18; // Mueve 50px a la derecha
        const tealTriangleY = 100 + 8;     // No lo muevas en Y
        const tealTriangleRotation = 90; // Rota 90 grados

        drawTriangle('#008080', tealTriangleX, tealTriangleY, 45, tealTriangleRotation); 

        // 4. Triángulo grande fucsia (arriba a la derecha) (#FF00FF)
        const fucsiaTriangleX = 292; // Mueve 50px a la derecha
        const fucsiaTriangleY = 100 + 54;     // No lo muevas en Y
        const fucsiaTriangleRotation = 0; // Rota 90 grados

        drawTriangle('#FF00FF', fucsiaTriangleX, fucsiaTriangleY, 90, fucsiaTriangleRotation); 

        // 5. Triángulo grande azul (arriba a la derecha) (#000080)
        const azulTriangleX = 292; // Mueve 50px a la derecha
        const azulTriangleY = 200 + 43;     // No lo muevas en Y
        const azulTriangleRotation = 180; // Rota 90 grados

        drawTriangle('#000080', azulTriangleX, azulTriangleY, 90, azulTriangleRotation); 

        // 6. Paralelogramo naranja (#FFDB58)
        const paraColor = '#FFDB58';
        const paraCenterX = 248; // Centro X deseado
        const paraCenterY = 266; // Centro Y deseado
        const paraBaseWidth = 48;
        const paraHeight = 45;
        const paraSkewOffset = 45; // Inclinación: 50px de desplazamiento horizontal en la parte superior
        const paraRotation = 180; // Rotación inicial

        drawParallelogram(paraColor, paraCenterX, paraCenterY, paraBaseWidth, paraHeight, paraSkewOffset, paraRotation);

        // 7. Triángulo morado (#800080)
        const moradoTriangleX = 337; // Mueve 50px a la derecha
        const moradoTriangleY = 100 + 8;     // No lo muevas en Y
        const moradoTriangleRotation = 45; // Rota 90 grados

        drawTriangle('#800080', moradoTriangleX, moradoTriangleY, 65, moradoTriangleRotation); 


        ctx.restore(); // Restaura el estado del contexto a antes de las transformaciones
    }

    // Llama a resizeCanvas inicialmente para dibujar al cargar la página
    resizeCanvas();

    // Vuelve a dibujar las figuras si la ventana cambia de tamaño
    window.addEventListener('resize', resizeCanvas);
});