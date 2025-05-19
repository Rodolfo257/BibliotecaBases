<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylesInicio.css">
    <title>Biblioteca</title>
</head>
<body>

    <header class="header">
        <div class="logo">
            <h1>Biblioteca 6 Avance 2 conectado</h1>
        </div>
        <nav class="navbar">
            <ul>
                <li><a href="#inicio">Inicio</a></li>
                <li><a href="#catalogo">Catálogo</a></li>
                <li class="dropdown">
                    <a href="#">Alumnos</a>
                    <div class="dropdown-content">
                        <a href="#" onclick="mostrarSeccion('altas-alumnos')">Altas</a>
                        <a href="#" onclick="mostrarSeccion('consultas-alumnos')">Consultas</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="#">Profesores</a>
                    <div class="dropdown-content">
                        <a href="#" onclick="mostrarSeccion('altas-profesores')">Altas</a>
                        <a href="#" onclick="mostrarSeccion('consultas-profesores')">Consultas</a>
                    </div>
                </li>
                <li class="dropdown">
                    <a href="#">Libros</a>
                    <div class="dropdown-content">
                        <a href="#" onclick="mostrarSeccion('altas-libros')">Altas</a>
                        <a href="#" onclick="mostrarSeccion('consultas-libros')">Consultas</a>
                    </div>
                </li>
                <li id="bienvenidoUsuario"></li>
                <li> <button id="cerrarSecion">Cerrar Sesion</button></li>
            </ul>
        </nav>
    </header>

    <section class="hero">
        <h2>Bienvenido a la Biblioteca 6,</h2>
        
        <p>Accede a miles de libros y recursos en línea de manera fácil y rápida.</p>
        <a href="#catalogo" class="btn">Explora el Catálogo</a>
    </section>

    <section id="altas-alumnos" class="section" style="display:none;">
    <h2>Alta de Alumnos</h2>
    <form id="form-alumno">
        <label for="codigo">Código:</label>
        <input type="text" id="codigo" name="codigo" maxlength="20" required><br>

        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" maxlength="100" required><br>

        <label for="carrera">Carrera:</label>
        <input type="text" id="carrera" name="carrera" maxlength="100"><br>

        <label for="correo">Correo electrónico:</label>
        <input type="text" id="correo" name="correo" maxlength="100"><br>

        <button type="submit">Registrar Alumno</button>
    </form>
    <p id="mensaje-alumno"></p>
</section>

<section id="consultas-alumnos" class="section" style="display:none;">
    <h2>Consulta de Alumnos</h2>
    <table border="1" id="tabla-alumnos">
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Carrera</th>
                <th>Correo</th>
            </tr>
        </thead>
        <tbody id="table-Alumno-body">
            <!-- Aquí se insertarán los alumnos -->
        </tbody>
    </table>
</section>

    <footer class="footer">
        <p>&copy; 2025 Biblioteca Virtual | Todos los derechos reservados.</p>
    </footer>

<script> 
    const usuario1 = localStorage.getItem("usuario");
    const bienvenido = document.getElementById("bienvenidoUsuario");

    if (usuario1) {
        bienvenido.textContent = `"${usuario1}"`;
    } else {
        bienvenido.textContent = " :) ";
    }


    function mostrarSeccion(id) {
    const secciones = document.querySelectorAll(".section");
    secciones.forEach(sec => sec.style.display = "none");

    const seleccionada = document.getElementById(id);
    if (seleccionada) {
        seleccionada.style.display = "block";
        if (id === "consultas-alumnos") {
            consultarAlumnos(); // Cargar alumnos cuando se muestra la tabla
        }
    }
}

    // Envío del formulario de alta de alumno
    document.getElementById("form-alumno").addEventListener("submit", async function(e) {
        e.preventDefault();

        const codigo = document.getElementById("codigo").value;
        const nombre = document.getElementById("nombre").value;
        const carrera = document.getElementById("carrera").value;
        const correo_electronico = document.getElementById("correo").value;

        const respuesta = await fetch('http://127.0.0.1:3000/alumnos', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ codigo, nombre, carrera, correo_electronico})
        });

        const resultado = await respuesta.json();
        const mensaje = document.getElementById("mensaje-alumno");
        mensaje.textContent = resultado.message;

        if (resultado.success) {
            document.getElementById("form-alumno").reset();
        }
    });



    async function consultarAlumnos() {
    try {
        console.log("vamos a consultar alumnos")
        
        const respuesta = await fetch('http://127.0.0.1:3000/alumnos');
        const datos = await respuesta.json();

         console.log("Datos recibidos:", datos);

        const tbody = document.querySelector("#tabla-alumnos tbody");
        tbody.innerHTML = ""; // Limpia la tabla antes de insertar

        if (datos.success) {
            datos.alumnos.forEach(alumno => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${alumno.codigo}</td>
                    <td>${alumno.nombre}</td>
                    <td>${alumno.carrera || ""}</td>
                    <td>${alumno.correo_electronico || ""}</td>
                `;
                tbody.appendChild(fila);
            });
        } else {
            tbody.innerHTML = "<tr><td colspan='4'>No se pudieron cargar los alumnos</td></tr>";
        }
    } catch (error) {
        console.error("Error al obtener alumnos:", error);
    }
}

</script>

</body>
</html>
