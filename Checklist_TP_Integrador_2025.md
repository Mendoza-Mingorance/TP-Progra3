
# ✅ Checklist TP Integrador 2025 - Autoservicio

## 🧱 1. BASE GENERAL
- [x] Elegir un rubro que NO sea comida
- [x] Definir dos categorías coherentes
- [x] Crear logo, nombre de la empresa y favicon

## 💻 2. FRONTEND – Cliente (Autoservicio)

### 🖼️ Pantallas
- [ ] Pantalla de bienvenida (input nombre)
- [ ] Pantalla de productos (categorías, imágenes, info, agregar/quitar al carrito)
- [ ] Pantalla de carrito (ver y modificar cantidades)
- [ ] Pantalla de ticket con nombre, productos, fecha y nombre empresa
- [ ] Pantalla de detalle por producto (extra final)
- [ ] Pantalla de encuesta (extra final)

### 📲 Funcionalidades
- [ ] Responsive (PC y móvil)
- [ ] Cambiar entre temas claro/oscuro y mantener en reload
- [ ] Redirección con botón al login admin
- [ ] Productos paginados
- [ ] Descargar ticket como PDF
- [ ] Reiniciar app al finalizar compra
- [ ] Modal de confirmación de compra
- [ ] Validar nombre antes de ver productos
- [ ] Persistir compra en DB con fecha, nombre, total

## 🔧 3. BACKEND – Admin + API

### 🔐 Autenticación
- [x] Login con email y password (encriptado)
- [ ] Botón de acceso rápido
- [ ] Middleware para proteger rutas admin
- [ ] Registro de logs de login (extra final)

### 👨‍💼 Panel de administración (vistas HTML - EJS)
- [ ] Pantalla login
- [ ] Dashboard: lista de productos activos/inactivos por categoría
- [ ] Alta producto: con imagen
- [ ] Editar producto: con nueva imagen
- [x] Eliminar producto (baja lógica)
- [x] Activar producto inactivo
- [ ] Botón para descargar ventas en Excel
- [ ] Pantalla registros con estadísticas y logs (extra final)

### 🧠 Lógica API (responde en JSON)
- [x] Rutas RESTful (MVC)
- [x] CRUD productos
- [ ] Carga de imágenes
- [ ] Crear y listar ventas con productos (M:N)
- [x] Crear usuarios admin
- [ ] Validaciones con middleware
- [x] Paginación de productos
- [ ] Listar encuestas (extra)
- [ ] Descargar encuestas (extra)

## 📝 4. ENCUESTA (Extra – Cliente)
- [ ] Pantalla encuesta con textarea, email, checkbox, slider, file
- [ ] Validar campos con mensajes de error
- [ ] Opción para omitir encuesta visible pero discreta
- [ ] Guardar encuesta en DB con fecha
- [ ] Modal de agradecimiento al enviar

## 📦 5. BASE DE DATOS
- [x] Crear tablas: productos, usuarios, ventas, ventas_productos, extras (encuestas, logs)
- [x] Relaciones bien definidas con claves foráneas
- [x] Migraciones o script de creación

## 🔁 6. TESTEO FINAL
- [ ] Probar flujo completo del cliente
- [ ] Probar flujo completo del admin
- [ ] Productos inactivos no aparecen al cliente
- [ ] Todo es responsive
- [ ] Validación de errores en pantalla
