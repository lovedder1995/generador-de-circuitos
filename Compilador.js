import esbuild from "esbuild"
/*
| {
|   Nodo: "Compilador",
|   Nodos: [
|     {
|       Nodo: "Configuración",
|       Tipos: [
|         "Lista"
|       ],
*/
const Configuración = {
    bundle: true,
    /*
|       Nodos: [
|         {
|           Nodo: "Archivos de entrada",
|           Tipos: [
|             "Lista"
|           ],
    */
    entryPoints: [
        /*
|           Nodos: [
|             {
|               Referencias: [
|                 "Otro archivo: Generador_de_circuitos.js"
|               ],
|               Nodo: "Archivo",
|               Tipos: [
|                 "Texto"
|               ]
|             }
|           ]
        */
        "Compilador/Generador_de_circuitos.js" ],
    /*
|         },
|         {
|           Nodo: "Archivo de salida",
|           Tipos: [
|             "Texto"
|           ],
    */
    outfile: "compilación.js",
    /*
|         },
|         {
|           Nodo: "Sistema de módulos",
|           Tipos: [
|             "Texto"
|           ],
    */
    format: "esm", // ECMAScript
    /*
|         },
|         {
|           Nodo: "Información sobre la compilación",
|           Tipos: [
|             "Texto"
|           ],
    */
    logLevel: "debug", // Detallada
    /*
|         },
|         {
|           Nodo: "Mapa del código",
|           Tipos: [
|             "Lógica"
|           ],
    */
    sourcemap: true, // Sí
    /*
|         },
|         {
|           Nodo: "Plataforma",
|           Tipos: [
|             "Texto"
|           ],
    */
    platform: "node" } // Node
/*
|         }
|       ]
|     },
|     {
|       Referencias: [
|         "Externa: esbuild"
|       ],
|       Nodo: "Compilar",
*/
esbuild.build(
/*
|       Nodos: [
|         {
|           Referencias: [
|             "Lista: Configuración"
|           ],
|           Nodo: "Configuración"
*/
    Configuración)
/*
|         }
|       ]
|     }
|   ]
| }
*/
