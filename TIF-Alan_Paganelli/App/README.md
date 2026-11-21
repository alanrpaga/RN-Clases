# Alan Paganelli - Trabajo Integrador Final: LUDERE

## ¿Qué es LUDERE?
**LUDERE** es una aplicación móvil desarrollada en React Native para uso personal, la cual permite recordar datos importantes sobre algún juego o sobre alguna partida. De esta manera, los frágiles pensamientos que navegan en la mente a merced del olvido pueden resguardarse.

En otras palabras, **LUDERE** es una libreta digital ordenada destinada a jugadores, donde estos pueden guardar información relevante (a sus ojos) en su celular.

## Tecnologías usadas
* React Native
* Expo
* Expo Go
* Firebase

## Instalación
El código de esta aplicación es público y se puede encontrar [AQUÍ](https://github.com/alanrpaga/RN-Clases/tree/f2a3c10a7a01e03b29e96ce19b248a143ce7571a/TIF-Alan_Paganelli)

Para esta aplicación se usó las siguientes librerías:
* npx expo install react-native-safe-area-context
* npx expo install @react-native-async-storage/async-storage
* npx expo install @react-navigation/drawer
* npm install firebase
* npx expo install expo-navigation-bar
* npx expo install @react-native-picker/picker
* (Espero que no se me olvide ninguna)

Importante: usa SDK 54!

## Arquitectura
Para entender un poco la estructura de la aplicación (**App**) digamos que consta de tres partes:
* La primera parte es la carpeta **app**, donde se tiene las pantallas de la aplicación ordenadas según Stacks-Drawers-Tabs. 
* La segunda parte es la carpeta **features**, donde se tiene las funcionalidades por separado. 
* La última parte es **shared**, donde se tiene elementos utilizados en varias funcionalidades.

## Temas y estilos
La aplicación cuenta con dos temas, "*Claro* ☀️" y "*Oscuro* 🌙". La mayoría de los colores provienen de [ACÁ](https://atlassian.design/foundations/color/color-palette), aunque algunos son derivados de estos como los colores de los botones **Editar X** y **Eliminar X**.

La totalidad de estilos existentes se encuentra en **sharedStyles.jsx** y no debería existir ninguno por fuera del mismo.

## Persistencia
Existen dos tipos de persistencias en esta aplicación:
* El usuario de la sesión** y el tema de la aplicación son persistidos en el celular de forma asincrónica.
* Los datos asociados con los **Juegos**, las **Partidas**, los **Recuerdos** y las **Notas** son persistidos en Firebase (Firestore).

## Sobre la versión actual: 1.0.0v
La aplicación es funcional permitiendo las características mencionadas en la *Ficha de Alcance*, restando únicamente la gestión de múltiples usuarios. Como la aplicación es de uso personal esto quedó fuera del alcance, soy consciente de que esto falta y es necesario si se desea publicar **LUDERE**.