import esbuild from "esbuild"
import prompts from "prompts"
import generar_circuito from "./Generador_de_circuitos.js"
/*
| #Compilador Compilador
==============
= Compilador =
==============
*/
/*
| #Configuración 📝 Configuración
-----------------
- Configuración -
-----------------
*/
const Configuración = { bundle: true,
    /*
    | #Archivo_de_entrada ⚙️ Archivo de entrada
    [ Archvio de entrada ]
    */
    /* Generador_de_circuitos.js */ entryPoints: [ "Generador_de_circuitos.js" ],
    /*
    | #Archivo_de_salida ⚙️ Archivo de salida
    [ Archvio de salida ]
    */
    /* compilación.js */ outfile: "compilación.js",
    /*
    | #Sistema_de_módulos ⚙️ Sistema de módulos
    [ Sistema de módulos ]
    */
    /* ECMAScript */ format: "esm",
    /*
    | #Información_sobre_la_compilación ⚙️ Información sobre la compilación
    [ Información sobre la compilación ]
    */
    /* Detallada */ logLevel: "debug",
    /*
    | #Mapa_del_código_de_origen ⚙️ Mapa del código de origen
    [ Mapa del código de origen ]
    */
    /* Sí */ sourcemap: true,
    /*
    | #Plataforma ⚙️ Plataforma
    [ Plataforma ]
    */
    /* Node */ platform: "node",
    /*
| #Extensiones 📝 Extensiones
---------------
- Extensiones -
---------------
*/
    /*
    | #Extensión-Generador_de_circuitos 🔌 Generador de circuitos
    [ Generador de circuitos ]
    */
    /* Cuando se termine de compilar, generamos el circuito. */ plugins: [ { name: "Generador de circuitos", setup(compilar) { compilar.onEnd(() => { generar_circuito() } ) } } ] }
/*
--------
- Menú -
--------
*/
const Opciones_disponibles = {
    /*
    | #Compilar_una_vez (condicional visible) ▶️ Compilar una vez
    [ Compilar una vez ]
    */
    "Compilar una vez": () => { esbuild.build(Configuración).catch((error) => { console.error(error); process.exit(1) } ) },
    /*
    | #Compilar_y_volver_a_compilar_cada_vez_que_se_modifique_un_archivo_que_forme_parte_de_la_compilación (condicional visible) 🔁 Compilar y volver a compilar</br>cada vez que se modifique un archivo</br>que forme parte de la compilación
    [ Compilar y volver a compilar cada vez que se modifique un archivo que forme parte de la compilación ]
    */
    "Compilar y volver a compilar cada vez que se modifique un archivo que forme parte de la compilación": () => { esbuild.context(Configuración).then(contexto => { contexto.watch() } ).catch((error) => { console.error(error); process.exit(1) } ) } }
/*
| #Menú (visible) 📝 Menú
*/
/* El menú */ const elección = await prompts([
    /* nos permitirá */ { message: "Selecciona una opción para compilar:",
        /* seleccionar */ type: "select",
        /* una opción */ name: "opción",
        /* entre las opciones disponibles: */ choices: Object.keys(Opciones_disponibles).map(opción => ({ title: opción, value: opción } ) ) } ] ); if (!elección.opción) process.exit(0)
/*
| #Ejecutar_la_opción_elegida_para_compilar (pendiente) Ejecutar la opción elegida para compilar
--------------------------------------------
- Ejecutar la opción elegida para compilar -
--------------------------------------------
*/
/* Ejecutamos la opción elegida. */ Opciones_disponibles[elección.opción]()
