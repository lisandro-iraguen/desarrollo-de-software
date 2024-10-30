# Trabajo Final de Desarrollo de Software

**Instituto Educativo UTN - FRD**

Este repositorio contiene los archivos y pasos necesarios para ejecutar el sistema completo de nuestro proyecto final de Desarrollo de Software. Sigue las instrucciones a continuación para configurar cada componente de la aplicación.

## Requisitos previos
Asegúrate de tener instalados:
- **MySQL** o cualquier gestor de base de datos SQL compatible.
- **Java** (versión compatible con el backend).
- **Node.js** y **npm** para ejecutar Angular en el frontend.

## Pasos de Ejecución

### 1. Iniciar la Base de Datos
Ejecuta el script SQL proporcionado para configurar la base de datos. Este paso es crucial, ya que prepara todas las tablas y relaciones necesarias para que los datos fluyan correctamente en el sistema.

```sql
-- Ejecuta el script en tu gestor de base de datos
Backend-Java/dds/sqlqueries.sql;
```
### 2. Arrancar el Backend (Java)
Con la base de datos lista, es momento de activar el backend en Java. Este componente es el núcleo del sistema y se encarga de:
Conectar con la base de datos.
Proporcionar los servicios de negocio (API REST).
Procesar la lógica de negocio y gestionar cada solicitud.
Para ejecutar el backend, sigue estos pasos:
```bash
# Navega al directorio del backend y ejecuta
cd backend/
java -jar nombre-del-archivo.jar
```
Asegúrate de que el archivo de configuración (application.properties) está correctamente configurado para conectar con tu base de datos antes de iniciar el backend.

### 3. Ejecutar el Frontend (Angular)
Finalmente, pon en marcha el frontend de Angular con el comando ```npm start```. Esto abrirá la interfaz de usuario y permitirá que interactúes visualmente con la aplicación.
#### Navega al directorio del frontend y ejecuta
```bash
cd frontend/
npm install  # instala las dependencias si es la primera vez
npm start    # inicia la aplicación en modo de desarrollo
```

