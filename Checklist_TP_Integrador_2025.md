# ✅ Checklist TP Integrador 2025 - Autoservicio

## 🧱 1. BASE GENERAL

- [X] Elegir un rubro que NO sea comida
- [X] Definir dos categorías coherentes
- [X] Crear logo, nombre de la empresa y favicon

## 🔧 2. BACKEND – Admin + API

### 🔐 Autenticación

- [X] Login con email y password (encriptado)
- [X] Botón de acceso rápido
- [X] Middleware para proteger rutas admin
- [ ] Registro de logs de login (extra final)

### 👨‍💼 Panel de administración (vistas HTML - EJS)

- [X] Pantalla login
- [ ] Dashboard: lista de productos activos/inactivos por categoría
- [X] Alta producto: con imagen
- [X] Editar producto: con nueva imagen
- [X] Eliminar producto (baja lógica)
- [X] Activar producto inactivo
- [ ] Botón para descargar ventas en Excel
- [ ] Pantalla registros con estadísticas y logs (extra final)

### 🧠 Lógica API (responde en JSON)

- [X] Rutas RESTful (MVC)
- [X] CRUD productos
- [ ] Carga de imágenes
- [ ] Crear y listar ventas con productos (M:N)
- [X] Crear usuarios admin
- [ ] Validaciones con middleware
- [X] Paginación de productos
- [ ] Listar encuestas (extra)
- [ ] Descargar encuestas (extra)

## 📝 3. ENCUESTA (Extra – Cliente)

- [ ] Pantalla encuesta con textarea, email, checkbox, slider, file
- [ ] Validar campos con mensajes de error
- [ ] Opción para omitir encuesta visible pero discreta
- [ ] Guardar encuesta en DB con fecha
- [ ] Modal de agradecimiento al enviar

## 📦 4. BASE DE DATOS

- [X] Crear tablas: productos, usuarios, ventas, ventas_productos, extras (encuestas, logs)
- [X] Relaciones bien definidas con claves foráneas
- [X] Migraciones o script de creación

## 🔁 6. TESTEO FINAL

- [ ] Probar flujo completo del cliente
- [ ] Probar flujo completo del admin
- [ ] Productos inactivos no aparecen al cliente
- [ ] Todo es responsive
- [ ] Validación de errores en pantalla
