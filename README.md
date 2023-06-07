# Philips HUE Command Center - CoderHouse JS
#### [Visita la página oficial!](https://lemon-desert-0d9a58510.3.azurestaticapps.net/)
Este práctico dashboard te permitirá conocer los dispositivos de la familia HUE conectados a tu hogar y administrarlos desde la comodidad de tu computadora/celular.
#### [Listado de dispositivos soportados](https://www.tienda.philips.com.ar/Hue)
#### [Demo del sistema de luces](https://www.youtube.com/watch?v=tBKvLUTMoMI)
## Objetivos del proyecto
- ✅ Generar un cómodo dashboard para el usuario que le permita administrar los dispositivos lumínicos conectados en su hogar
- ✅ Permitir la creación/eliminación de dispositivos
- ✅ Organizar los dispositivos por habitaciones
- ✅ Filtrar dispositivos conectados por habitación
- ✅ BONUS: permitir al usuario cambiar el tema de visualización

## En el próximo release, agregaremos la siguiente funcionalidad:

- Crear nuevas habitaciones personalizadas
- Mediante la api provista por el [bridge](https://www.tienda.philips.com.ar/929001180642/p) ([documentación no oficial](https://www.burgestrand.se/hue-api/))
  * Utilizarla para almacenar la información del usuario/hogar en lugar del local storage provisto por el navegador
  * Controlar las luces:
     + Encendido/apagado automático
     + Cambio de escena/color
     + Actualización del nombre del dispositivo
