![ProgreaGit](/titulo.png)
# Título del proyecto:

#### Ejemplo de Lectura de datos JSON 
***
## Índice
1. [Características](#caracter-sticas-)
2. [Contenido del proyecto](#contenido-del-proyecto)
3. [Tecnologías](#tecnologías)
4. [IDE](#ide)
5. [Instalación](#instalación)
6. [Demo](#demo)
7. [Autor(es)](#autores)
8. [Institución Académica](#institución-académica)
***

#### Características:

  - Proyecto con lectura de datos json a través de la API fecth JavaScript
  - Carga dinámica del JSON 

***
  #### Contenido del proyecto

├───backend
│   └───src
│       ├───main
│       │   ├───java
│       │   │   └───co
│       │   │       └───edu
│       │   │           └───ufps
│       │   │               └───progreagit
│       │   │                   │   ProgreaGitApplication.java
│       │   │                   │   
│       │   │                   ├───config
│       │   │                   │       AppProperties.java
│       │   │                   │       SecurityConfig.java
│       │   │                   │       WebMvcConfig.java
│       │   │                   │       
│       │   │                   ├───controller
│       │   │                   │       AuthController.java
│       │   │                   │       BaseController.java
│       │   │                   │       ProjectController.java
│       │   │                   │       ProjectsController.java
│       │   │                   │       SequenceGenerator.java
│       │   │                   │       UserController.java
│       │   │                   │       
│       │   │                   ├───exception
│       │   │                   │       BadRequestException.java
│       │   │                   │       NotContentException.java
│       │   │                   │       OAuth2AuthenticationProcessingException.java
│       │   │                   │       ResourceNotFoundException.java
│       │   │                   │       
│       │   │                   ├───model
│       │   │                   │       AuthProvider.java
│       │   │                   │       CoDirector.java
│       │   │                   │       ERole.java
│       │   │                   │       Project.java
│       │   │                   │       Roles.java
│       │   │                   │       User.java
│       │   │                   │       UserNetwork.java
│       │   │                   │       
│       │   │                   ├───payload
│       │   │                   │       ApiResponse.java
│       │   │                   │       AuthResponse.java
│       │   │                   │       LoginRequest.java
│       │   │                   │       SearchProject.java
│       │   │                   │       SearchUser.java
│       │   │                   │       SignUpRequest.java
│       │   │                   │       UserRequest.java
│       │   │                   │       
│       │   │                   ├───repository
│       │   │                   │       ProjectJPA.java
│       │   │                   │       UserJPA.java
│       │   │                   │       UserNetworkJPA.java
│       │   │                   │       
│       │   │                   ├───security
│       │   │                   │   │   CurrentUser.java
│       │   │                   │   │   CustomUserDetailsService.java
│       │   │                   │   │   RestAuthenticationEntryPoint.java
│       │   │                   │   │   TokenAuthenticationFilter.java
│       │   │                   │   │   TokenProvider.java
│       │   │                   │   │   UserPrincipal.java
│       │   │                   │   │   
│       │   │                   │   └───oauth2
│       │   │                   │       │   CustomOAuth2UserService.java
│       │   │                   │       │   HttpCookieOAuth2AuthorizationRequestRepository.java
│       │   │                   │       │   OAuth2AuthenticationFailureHandler.java
│       │   │                   │       │   OAuth2AuthenticationSuccessHandler.java
│       │   │                   │       │   
│       │   │                   │       └───user
│       │   │                   │               FacebookOAuth2UserInfo.java
│       │   │                   │               GithubOAuth2UserInfo.java
│       │   │                   │               GoogleOAuth2UserInfo.java
│       │   │                   │               OAuth2UserInfo.java
│       │   │                   │               OAuth2UserInfoFactory.java
│       │   │                   │               
│       │   │                   ├───service
│       │   │                   │       ProjectService.java
│       │   │                   │       UserService.java
│       │   │                   │       
│       │   │                   └───util
│       │   │                           ControllerUtil.java
│       │   │                           CookieUtils.java
│       │   │                           
│       │   └───resources
│       │           application.properties
│       │           import.sql
│       │           
│       └───test
│           ├───java
│           │   ├───co
│           │   │   └───edu
│           │   │       └───ufps
│           │   │           └───progreagit
│           │   │                   ProgreaGitProjectTest.java
│           │   │                   ProgreaGitUserTests.java
│           │   │                   
│           │   └───dataBuilder
│           │           ProgreaGitBuilder.java
│           │           
│           └───resources
│                   application.properties
│                   import.sql
│                   
└───frontend
    ├───public
    │   │   index.html
    │   │   logo192.png
    │   │   logo512.png
    │   │   logoufps.ico
    │   │   manifest.json
    │   │   
    │   └───img
    │           loading-81.gif
    │           loading.gif
    │           logo_ufps_200.jpg
    │           
    └───src
        │   App.js
        │   App.test.js
        │   index.js
        │   logo.svg
        │   Plantilla.js
        │   serviceWorker.js
        │   setupTests.js
        │   
        ├───Components
        │   │   ActData.js
        │   │   PrivateRouter.js
        │   │   
        │   ├───Admin
        │   │       Administrador.js
        │   │       AsignaRol.js
        │   │       BuscaPersonas.js
        │   │       BuscaProyectos.js
        │   │       MediaAdmin.js
        │   │       MostrarMasProyecto.js
        │   │       TableAdmin.js
        │   │       
        │   ├───General
        │   │       OAuth2.js
        │   │       Profile.js
        │   │       PruebaRoute.js
        │   │       
        │   ├───Invitado
        │   │       BuscaInvitado.js
        │   │       Invitado.js
        │   │       MediaInv.js
        │   │       TableInvitado.js
        │   │       VerIntegrante.js
        │   │       
        │   ├───Lider
        │   │       EliminaIntegrante.js
        │   │       HistorialProy.js
        │   │       Integrante.js
        │   │       Lider.js
        │   │       MediaLider.js
        │   │       ModalIntegrantes.js
        │   │       RegProy.js
        │   │       
        │   └───Plantilla
        │           Body.js
        │           Footer.js
        │           Header.js
        │           LoadingIndicator.js
        │           LoadingInternal.js
        │           LoginButton.js
        │           Menu.js
        │           NavBar.js
        │           
        ├───Global
        │       Iframe.js
        │       index.js
        │       
        ├───Images
        │       header-superior-principal.jpg
        │       logo_ufps.png
        │       
        ├───Styles
        │       App.css
        │       index.css
        │       Plantilla.css
        │       
        └───Util
                ApiUtil.js
                FormUtil.js

***
#### Tecnologías

  - HTML5
  - TypeScript
  - JavaScript
  - Java
  - Spring
  - Hibernate
	

  ***
#### IDE

  ## Backend
    - Se empleo el IDe IntelJs -(https://www.jetbrains.com/idea/)

  ## Frontend
    - Se empleó el IDE WebStorm -(https://www.jetbrains.com/webstorm/)

***
### Instalación
  ## Backend
     Se requiere la instalación de MAVEN en la máquina en la cual se va a construir la aplicacion JAVA, para asi generar el .war,
     el cual es utilizado para distribuir una colección de JavaServer Pages, entre otros. Seguidamente después de la instalación se 
     ejecutara el siguiente comando ( mvn clear install -Dmaven.test.skip=true) el cual exporta el archivo anteriormente nombrado a
     la carpeta /target.
     
     Como contenedor de servlets se utilizó Apache Tomcat 9, y se sugiere la instalación del software. A continuación, se copiará el 
     archivo .war a la carpeta webapps donde se encuentra instalado Apache Tomcat, finalmente se abre la aplicación desde el navegador
     indicando la dirección y el puerto de entrada del servidor.

     Observación:
     El comando -Dmaven.test.skip=true es empleado para evitar la cargue los test.

 ## Frontend
    Se requiere previamente tener un servidor funcional e instalar el entorno de ejecución node.js (https://nodejs.org/es/download/). 
    Una vez instalado el manejador de paquetes npm (el cual es instala automáticamente junto con Node.js) a continuación, se instala 
    React.js, utilizando los siguientes comando:
     [-npm install react –save]
     [-npm install react-dom –save]
    Una vez instalado, se subirán los archivos pertenecientes al proyecto y se abrirá el directorio raíz por consola (cmd, powerShell,
    Konsole, Terminal), seguidamente se ejecutará el comando "npm install" para descargar todas las dependencias del proyecto.

    Finalmente, el comando "npm start" ejecutará la aplicación en su modo frontend.

    De esta manera la aplicación frontend ProgreaGit se ejecutará sin problemas.

    En el caso en el que se requiera la aplicación en producción, se ejecutará el comando “npm project build” reemplazando el comando 
    “npm start”

	
     
     

***
### Demo
   Para ver el demo de la aplicación puede dirigirse a: [ProgreaGit](http://progreagitv.cpsw.ingsistemasufps.co/).

   Nota: El backend se encuentra en la dirección (http://progreagit.cpsw.ingsistemasufps.co/).

***
### Autor(es)
Proyecto desarrollado por 
	[Elian Nahun Zapata Alfonso COD:1151193 ] (<eliannahunza@ufps.edu.co>).
	[Jhorman Jesus Botello COD.1151454] (<jhomanjesusbdbod@ufps.edu.co>)
	[Juliana Andrea Ortega Castillo COD.1151134] (<julianaandreaoc@ufps.edu.co>)


***
### Institución Académica   
Proyecto desarrollado en el curso de profundizacion de desarrollo de software del  
[Programa de Ingeniería de Sistemas] de la [Universidad Francisco de Paula Santander]



   

   
