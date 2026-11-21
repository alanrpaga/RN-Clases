## FICHA DE ALCANCE DEL TIF: LUDERE (Nombre completo: Memento Ludere)

| # | Pregunta | Respuesta |
| :-: | :--- | :--- |
| 1 | **Nombre y frase** | Ludere — una app de seguimiento de partidas y juegos pendientes pudiendo dejar notas asociadas a los mismos |
| 2 | **¿Para quién es?** | Para quienes tienen mala memoria y/o no tienen tiempo para jugar continuamente |
| 3 | **¿Qué problema resuelve?** | Olvidos por parte del jugador generalmente causados por el tiempo |
| 4 | **Funciones clave** | 1. Crear, ver, editar y eliminar juegos · 2. Crear, ver, editar y eliminar partidas · 3. Crear, ver y eliminar notas · 4. Crear, ver y eliminar recuerdos · 5. Modo claro/oscuro que se recuerda · 6. Login |
| 5 | **Lo que NO hace** | notificaciones · vincular cuentas · múltiples usuarios · contraseñas · seguridad de datos |
| 6 | **Pantallas** | Login · Inicio · Mi Perfil · Juegos · Juego · Partidas · Partida (+ Pantallas de alta y edición) |
| 7 | **Mapa** | Ver abajo o ver "Diagrama de pantallas.png" |
| 8 | **Datos** | Juegos/Recuerdos/Partidas/Notas: Firebase · Tema y Sesión: `AsyncStorage` |
| 9 | **Usuario / login** | Sí, simulado: se escribe un nombre que se guarda en el celular. Sirve para saber **quién cargó las cosas** pero no vincula datos con usuario porque esta versión no gestiona múltiples usuarios |
| 10 | **Sin internet** | Solo se puede login y logout, las pantallas funcionan pero informan errores asociados a no poder acceder a Firebase (Firestore) |
| 11 | **Animaciones clave** | La sacudida ante la falta de datos para altas es clave |
```

Con sesión iniciada:                                   Sin sesión:

Stack                                                  Stack
 └── Drawer ─┬── (Tabs) ─┬── Inicio                     └── Login
             │           ├── Juegos ──── Juego
             │           └── Partidas ── Partida
             └── Perfil
```


## FUNCIONALIDADES FUERA DEL ALCANCE
Los siguientes puntos son cuestiones que quedaron fuera del alcance, explicando en cada uno la situación actual y lo pensado a futuro.

### 1. Gestión de los usuarios de la aplicación

Actualmente la aplicación gestiona un usuario para la sesión por celular, en Firebase solo se guarda una referencia a este (su nombre) en Juegos, Partidas, Recuerdos y Notas. Esto genera problemas si usuarios distintos pero con el mismo nombre utilizan la aplicación, impidiendo la separación de datos por usuario (inexistente por el momento).

Se debería persistir los datos del usuario en Firebase para darles unicidad: **id, nombre** → el dato "usuario" en Juegos, Partidas, Recuerdos y Notas está pensado para esto, en un futuro debería contener el id del usuario y no el nombre.

Adicionalmente, se debería tener en el celular el id del usuario aparte del nombre.

### 2. Editar nombre del usuario

Requiere una gestión adecuada de los usuarios, lo cual no se tiene actualmente. Si se realiza **1.** esto sería posible y sencillo de implementar.

### 3. Separación de datos

Actualmente los datos se traen sin tomar en cuenta el usuario dueño, todos ven todo. Si se realiza **1.** esto también se debe hacer.
Se debería incluir un "where()" dentro de las consultas que traen datos pasando el id del usuario.

### 4. Editar Notas y Recuerdos

Actualmente Notas y Recuerdos no se pueden editar, quedó fuera del alcance.

### 5. Seguridad de los usuarios mediante contraseña

Actualmente no se gestionan contraseñas, quedó fuera del alcance.

### 6. Notificaciones

No me agradan las lluvias de notificaciones no deseadas, afuera.

### 7. Múltiples tipos de Notas y/o Recuerdos

Actualmente tanto las Notas como los Recuerdos son texto plano. A futuro se podría y debería implementar nuevos tipos para facilitar recordar cosas que en palabras serían complicados.