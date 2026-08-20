/* =========================================================================
   KEG RACE 2026 — CONFIGURACIÓN DE FIREBASE
   -------------------------------------------------------------------------
   ESTE ES EL ÚNICO ARCHIVO QUE TENÉS QUE EDITAR.

   Cómo conseguir estos datos:
     1. console.firebase.google.com  →  tu proyecto
     2. Ícono de engranaje (arriba izquierda)  →  Configuración del proyecto
     3. Bajá hasta "Tus apps"  →  elegí tu app web
     4. Marcá la opción "Config"
     5. Copiá los valores y pegalos abajo, entre las comillas

   Reemplazá TODO lo que dice PEGA-AQUI. Respetá las comillas y las comas.

   ¿Es peligroso que estas claves sean públicas? No. En Firebase estas
   claves son identificadores, no contraseñas: dicen "a qué proyecto
   hablar", no "quién sos". Lo que protege tus datos son las reglas de
   Firestore que publicaste en la consola, y esas no viven acá.
   ========================================================================= */

window.KEGRACE_FIREBASE = {
  apiKey:            "AIzaSyD9ReDfxiQlX8Q8l6WZBHSJSidsT8lXRhs",
  authDomain:        "keg-race-2026-c7281.firebaseapp.com",
  projectId:         "keg-race-2026-c7281",
  storageBucket:     "keg-race-2026-c7281.firebasestorage.app",
  messagingSenderId: "138412327808",
  appId:             "1:138412327808:web:ac47b00dee2790eae5b765"
};

/* -------------------------------------------------------------------------
   EJEMPLO de cómo se ve ya completo (estos valores NO sirven, son de muestra):

   window.KEGRACE_FIREBASE = {
     apiKey:            "AIzaSyBjQnv4Z5BEYjCGk5bfUB8wD-Q4i4_q9AI",
     authDomain:        "keg-race-2026.firebaseapp.com",
     projectId:         "keg-race-2026",
     storageBucket:     "keg-race-2026.firebasestorage.app",
     messagingSenderId: "534338016747",
     appId:             "1:534338016747:web:dd8fa1d9abdaba1522f5ae"
   };
   ------------------------------------------------------------------------- */
