## FICHA DE ALCANCE DEL TIF: LUDERE (Nombre completo: Memento Ludere)

| # | Pregunta | Respuesta |
| :-: | :--- | :--- |
| 1 | **Nombre y frase** | Ludere — una app de seguimiento de partidas pendientes pudiendo dejar notas asociadas a estas o al juego |
| 2 | **¿Para quién es?** | Para quienes tienen mala memoria o no tienen tiempo para jugar |
| 3 | **¿Qué problema resuelve?** | Olvido por falta de memoria o por falta de tiempo de partidas empezadas |
| 4 | **Funciones clave** | 1. Crear usuario · 2. Ver y cargar juegos · 3. Ver y cargar partidas · 4. Crear notitas · 5. Crear recuerditos · 6. Modo claro/oscuro que se recuerda · 7. Login |
| 5 | **Lo que NO hace** | notificaciones · vincular cuentas · múltiples usuarios · cerrar sesión · contraseñas · seguridad de datos |
| 6 | **Pantallas** | Login · Inicio · Mi Perfil · Juegos · Juego · Partidas · Partida |
| 7 | **Mapa** | Ver abajo |
| 8 | **Datos** | Juegos/Recuerditos/Partidas/Notitas: Firebase · Tema y Sesión: `AsyncStorage` |
| 9 | **Usuario / login** | Sí, simulado: se escribe un nombre que se guarda en el celular. Sirve para saber **quién cargó las cosas** pero no vincula datos con usuario porque esta versión no gestiona múltiples usuarios |
| 10 | **Sin internet** | |
| 11 | **Animaciones clave (3)** | |
| 12 | **Riesgos y plan B** | |
| 13 | **Hitos** | |

```

-----------------------------------------

Con sesión iniciada:                        Sin sesión:

Stack                                       Stack
 ├── Drawer ─┬── Inicio ── Tabs ─┬── Juegos   └── Login
 │           │                   └── Partidas
 │           └── Perfil (con "Cerrar sesión")
 └── Nuevo usuario
```

---

## 🧭 Chequeo final de un buen alcance

- [ ] Cabe en **5 funciones clave** como máximo.
- [ ] Cada pantalla tiene **un propósito claro** (si una pantalla "hace de todo", hay que dividirla).
- [ ] Sé **de dónde viene cada dato** y **dónde se guarda**.
- [ ] Tengo escrito **lo que NO hace**.
- [ ] Es algo que puedo **terminar y probar** antes de la Clase 14.
- [ ] Tengo un **plan B** si falla una parte (internet, API, Firebase).