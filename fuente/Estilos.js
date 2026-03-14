/*
| .Estilos 📝 Estilos
===========
= Estilos =
===========
*/
/*
| #Estilos-Error_en_el_circuito 📝 Error en el circuito
------------------------
- Error en el circuito -
------------------------
*/
/* Si no hay ningún error en el circuito, ocultamos la sección. */ export default "div:has(> a) { display: flex; align-items: flex-start; } #_Error_en_el_circuito:has(> :empty) { display: none; }" +
/*
| #Estilos-Sectores 📝 Sectores
------------
- Sectores -
------------
*/
/* - Color de fondo: Verde translúcido */ ".sector { background-color: #80ff8010;" +
/* - Acomodo de los hijos: Pegados al borde superior */ "display: flex; flex-shrink: 0;" +
/* - Margen: 1 vez el tamaño de la tipografía */ "margin: 1rem;" +
/* - Holgura: 1 vez el tamaño de la tipografía */ "padding: 1rem; }" +
/*
[ Hijos de los sectores ]
*/
/* - Acomodo de los hijos: De arriba abajo */ ".sector > div:last-child { flex-direction: column; }" +
/*
| #Estilos-Nodos 📝 Nodos
---------
- Nodos -
---------
*/
/* - Color de fondo: Turquesa translúcido */ ".nodo, a.nodo { background-color: #00808010;" +
/* - Holgura: 1 vez el tamaño de la tipografía */ "padding: 1rem;" +
/* - Margen: 1 vez el tamaño de la tipografía */ "margin: 1rem;" +
/* - Tamaño de la tipografía: 3 */ "font-size: 3rem;" +
/* - Tipo de borde: Sólido */ "border-style: solid;" +
/* - Color del borde: Negro translúcido */ "border-color: #0000009c;" +
/* - Ancho del borde: 0.1 veces el tamaño de la tipografía */ "border-width: 0.1rem; }" +
/*
[ Sin revisar ]
*/
/* - Borde: 0.1 veces el tamaño de la tipografía, sólido, color rojo translúcido */ ".nodo.sin-revisar { border: 0.1rem solid #ff00009c; }" +
/*
[ Entrada ]
*/
/* - Color de fondo: Verde translúcido */ "#_Circuito > div > .sector > a { background-color: #80ff8025; }" +
/*
[ Conexión ]
*/
/* Le quitamos los bordes colindantes a los nodos conectados y los superponemos. */ ".conexión a + a { border-left: none; margin-left: -1.5rem; } .conexión a:not(:first-child) { border-left: none; margin-left: -1.5rem; } .conexión a:not(:last-child) { border-right: none; }" +
/*
[ Condicional ]
*/
/* - Borde izquierdo: 0.1 veces el tamaño de la tipografía, punteado, color magenta translúcido */ ".nodo.condicional { padding-left: 1.25rem !important; border-left-style: dotted !important; border-left-width: 1rem !important; border-left-color: #ff80f99c !important; }" +
/*
[ Referencia ]
*/
/* - Color de fondo: Naranja translúcido */ ".nodo.referencia { background-color: #ff8c0025; }" +
/*
[ Referencia externa ]
*/
/* - Color de fondo: Morado translúcido */ ".nodo.referencia-externa { background-color: #80008025; }" +
/*
[ Error ]
*/
/* - Color de fondo: Rojo translúcido */ ".nodo.error { background-color: #ff000025; }" +
/*
[ Sin elementos ]
*/
/* - Color de fondo: Rojo translúcido */ ".nodo.sin-elementos { background-color: #ff000025; }" +
/*
[ Resaltado ]
*/
/* - Color de borde: Naranja sólido */ ".nodo.resaltado { border-color: #ff8c00 !important; }"
