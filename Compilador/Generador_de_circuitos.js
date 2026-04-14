import { readFileSync, writeFileSync } from "fs"
import { join, parse, dirname, normalize, basename } from "path"
import { minify_sync } from "terser"
import JSON5 from "json5"
import Tipos_de_nodo from "./Generador_de_circuitos/Tipos_de_nodo.js"
import Tipos_de_referencia from "./Generador_de_circuitos/Tipos_de_referencia.js"
import Generar_instrucciones from "./Generador_de_circuitos/Generador_de_instrucciones.js"
/*
| {
|   Nodo: "Generador de circuitos",
|   Tipos: [
|     "Procedimiento"
|   ],
*/
export default () => {
    /*
|   Nodos: [
|     {
|       Nodo: "Archivos",
|       Tipos: [
|         "Cesto"
|       ]
    */
    const Archivos = []
    /*
|     },
|     {
|       Nodo: "Analizar archivo",
|       Tipos: [
|         "Procedimiento"
|       ],
    */
    const Analizar_archivo = ({
        /*
|       Nodos: [
|         {
|           Nodo: "Contexto",
|           Tipos: [
|             "Lista"
|           ],
|           Nodos: [
|             {
|               Nodo: "Nombre del archivo",
|               Tipos: [
|                 "Texto"
|               ]
|             }
|           ]
        */
        Nombre_del_archivo }) => {
        /*
|         },
|         {
|           Referencias: [
|             "Texto: Nombre del archivo"
|           ],
|           Nodo: "Contenido del archivo",
|           Tipos: [
|             "Derivado",
|             "Texto"
|           ],
        */
        let Contenido_del_archivo
        try { Contenido_del_archivo = readFileSync(join(process.cwd(), Nombre_del_archivo), "utf8")
            /*
|           Nodos: [
|             {
|               Nodo: "No se puede leer el archivo",
|               Tipos: [
|                 "Error"
|               ],
            */
        } catch (error) {
            /*
|               Nodos: [
|                 {
|                   Referencias: [
|                     "Texto: Nombre del archivo"
|                   ],
|                   Nodo: "Lo notificamos"
            */
            console.error(error, `\n\nNo se puede leer el archivo: «${Nombre_del_archivo}»`)
            /*
|                 },
|                 {
|                   Nodo: "Cancelamos la compilación"
            */
            process.exit(1) }
        /*
|                 }
|               ]
|             },
|             {
|               Nodo: "Líneas del archivo",
|               Tipos: [
|                 "Derivado",
|                 "Lista"
|               ],
        */
        const Líneas_del_archivo = Contenido_del_archivo.split("\n").map(línea => línea.replace(/\r$/, "") )
        /*
|               Nodos: [
|                 {
|                   Nodo: "Líneas que refieren al circuito",
|                   Tipos: [
|                     "Ramificación",
|                     "Derivado",
|                     "Lista"
|                   ],
|                   Nodos: [
        */
        const Líneas_que_refieren_al_circuito = Líneas_del_archivo.map((línea, identificador) => (
        /*
|                     {
|                       Nodo: "La línea no refiere al circuito. La convertimos en una línea vacía."
        */
            !línea.startsWith("|") ? "" :
            /*
|                     },
|                     {
|                       Nodo: "La línea refiere al circuito. Le quitamos la marca que indica que refiere al circuito, y si hay un nodo, referencias o tipos de nodo, le agregamos el número de línea correspondiente."
            */
                línea.replace("|", "")
                    .replace("Nodo:", `Número_de_línea: ${identificador + 1}, Nodo:`)
                    .replace("Referencias:", `Número_de_línea_de_las_referencias: ${identificador + 1}, Referencias:`)
                    .replace("Tipos:", `Número_de_línea_de_los_tipos: ${identificador + 1}, Tipos:`) ) )
        /*
|                     }
|                   ]
|                 }
|               ]
|             }
|           ]
|         },
|         {
|               Referencias: [
|                 "Lista: Líneas que refieren al circuito"
|               ],
|               Nodo: "Circuito del archivo",
|               Tipos: [
|                 "Derivado",
|                 "Lista",
|                 "Ramificación"
|               ],
        */
        let Circuito_del_archivo = Líneas_que_refieren_al_circuito.join("\n")
        /*
|               Nodos: [
|                 {
|                   Nodo: "Ninguna línea refiere al circuito. Creamos un circuito provisional."
        */
        if (!Circuito_del_archivo.trim()) {
            Circuito_del_archivo = { Número_de_línea: 1, Nodo: basename(Nombre_del_archivo) }
            /*
|                 },
|                 {
|                   Referencias: [
|                     "Externa: JSON5"
|                   ],
|                   Nodo: "Sí hay líneas que refieren al circuito. Las analizamos gramaticalmente para generar el circuito.",
            */
        } else {
            try { Circuito_del_archivo = JSON5.parse(Circuito_del_archivo)
            /*
|                   Nodos: [
|                     {
|                       Nodo: "Error de sintaxis en el «JSON5» del circuito",
|                       Tipos: [
|                         "Error"
|                       ],
            */
            } catch (error) {
                /*
|                       Nodos: [
|                         {
|                           Referencias: [
|                             "Texto: Nombre del archivo"
|                           ],
|                           Nodo: "Lo notificamos"
                */
                console.error(`Error de sintaxis en el «JSON5» del circuito:\n    ${join(process.cwd(), Nombre_del_archivo)}:${error.lineNumber}:${error.columnNumber}`)
                /*
|                         },
|                         {
|                           Nodo: "Cancelamos la compilación"
                */
                process.exit(1) } }
        /*
|                         }
|                       ]
|                     }
|                   ]
|                 }
|               ]
|         },
|         {
|           Referencias: [
|             "Cesto: Archivos"
|           ],
|           Nodo: "Agregar",
        */
        Archivos.push({
            /*
|           Nodos: [
|             {
|               Referencias: [
|                 "Texto: Nombre del archivo"
|               ],
|               Nodo: "Archivo"
            */
            Archivo: Nombre_del_archivo,
            /*
|             },
|             {
|               Referencias: [
|                 "Lista: Circuito del archivo"
|               ],
|               Nodo: "Circuito"
            */
            Circuito: Circuito_del_archivo } )
        /*
|             }
|           ]
|         },
|         {
|           Nodo: "Verificar tipos de nodo",
|           Tipos: [
|             "Procedimiento"
|           ],
        */
        const Verificar_tipos_de_nodo = ({
        /*
|           Nodos: [
|             {
|               Nodo: "Contexto",
|               Tipos: [
|                 "Lista"
|               ],
|               Nodos: [
|                 {
|                   Nodo: "Nodo",
|                   Tipos: [
|                     "Lista"
|                   ]
            */
            Nodo }) => {
            /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Nodo"
|               ],
|               Nodo: "Propiedades",
|               Nodos: [
|                 {
|                   Nodo: "Tipos de nodo",
|                   Tipos: [
|                     "Lista"
|                   ]
            */
            const Tipos = Nodo.Tipos || []
            /*
|                 },
|                 {
|                   Nodo: "Número de línea de los tipos de nodo",
|                   Tipos: [
|                     "Número"
|                   ]
            */
            const Número_de_línea_de_los_tipos = Nodo.Número_de_línea_de_los_tipos
            /*
|                 },
|                 {
|                   Nodo: "Nodos",
|                   Tipos: [
|                     "Lista"
|                   ]
            */
            const Nodos = Nodo.Nodos || []
            /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Tipos de nodo"
|               ],
|               Nodo: "Iterar",
            */
            Tipos.forEach((
                /*
|               Nodos: [
|                 {
|                   Nodo: "Contexto",
|                   Tipos: [
|                     "Lista"
|                   ],
|                   Nodos: [
|                     {
|                       Nodo: "Tipo de nodo",
|                       Tipos: [
|                         "Texto"
|                       ]
                */
                Tipo) => {
                /*
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Otro archivo: Tipos_de_nodo.js"
|                   ],
|                   Nodo: "Tipo de nodo inválido",
|                   Tipos: [
|                     "Error"
|                   ],
*/
                if (!Object.keys(Tipos_de_nodo).find(tipo => tipo === Tipo)) {
                    /*
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Texto: Nombre del archivo",
|                         "Número: Número de línea de los tipos de nodo",
|                         "Otro archivo: Tipos_de_nodo.js"
|                       ],
|                       Nodo: "Lo notificamos"
|                     },
                    */
                    console.error(`Tipo de nodo inválido. En «${Tipo}»:\n    ${join(process.cwd(), `${Nombre_del_archivo}:${Número_de_línea_de_los_tipos}`) }`)
                    console.error(`\nLos tipos de nodo válidos son:\n    ${Object.keys(Tipos_de_nodo).join("\n    ") }`)
                    /*
|                     {
|                       Nodo: "Cancelamos la compilación"
                    */
                    process.exit(1)  } } )
            /*
|                     }
|                   ]
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Nodos",
|               ],
|               Nodo: "Iterar",
            */
            Nodos.forEach(
                /*
|               Nodos: [
|                 {
|                   Nodo: "Contexto",
|                   Tipos: [
|                     "Lista"
|                   ],
|                   Nodos: [
|                     {
|                       Nodo: "Nodo",
|                       Tipos: [
|                         "Lista"
|                       ]
                */
                Nodo => {
                    /*
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Instancia recursiva: Verificar tipos de nodo"
|                   ],
|                   Nodo: "Verificar tipos de nodo",
                    */
                    Verificar_tipos_de_nodo({
                        /*
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Lista: Nodo",
|                       ],
|                       Nodo: "Nodo"
                        */
                        Nodo } ) } ) }
        /*
|                     }
|                   ]
|                 }
|               ]
|             }
|           ]
|         },
|         {
|           Referencias: [
|             "Instancia: Verificar tipos de nodo"
|           ],
|           Nodo: "Verificar tipos de nodo",
        */
        Verificar_tipos_de_nodo({
        /*
|           Nodos: [
|             {
|               Referencias: [
|                 "Lista: Circuito del archivo",
|               ],
|               Nodo: "Nodo"
        */
            Nodo: Circuito_del_archivo })
        /*
|             }
|           ]
|         },
|         {
|           Nodo: "Referencias en este archivo",
|           Tipos: [
|             "Cesto"
|           ]
        */
        const Referencias_en_este_archivo = []
        /*
|         },
|         {
|           Nodo: "Buscar referencias",
|           Tipos: [
|             "Procedimiento"
|           ],
        */
        const Buscar_referencias = ({
            /*
|           Nodos: [
|             {
|               Nodo: "Contexto",
|               Tipos: [
|                 "Lista"
|               ],
|               Nodos: [
|                 {
|                   Nodo: "Nodo",
|                   Tipos: [
|                     "Lista"
|                   ]
            */
            Nodo }) => {
            /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Nodo"
|               ],
|               Nodo: "Propiedades",
|               Nodos: [
|                 {
|                   Nodo: "Referencias",
|                   Tipos: [
|                     "Lista"
|                   ]
            */
            const Referencias = Nodo.Referencias || []
            /*
|                 },
|                 {
|                   Nodo: "Número de línea de las referencias",
|                   Tipos: [
|                     "Número"
|                   ]
            */
            const Número_de_línea_de_las_referencias = Nodo.Número_de_línea_de_las_referencias
            /*
|                 },
|                 {
|                   Nodo: "Nodos",
|                   Tipos: [
|                     "Lista"
|                   ]
            */
            const Nodos = Nodo.Nodos || []
            /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Referencias"
|               ],
|               Nodo: "Iterar",
            */
            Referencias.forEach((
                /*
|               Nodos: [
|                 {
|                   Nodo: "Contexto",
|                   Tipos: [
|                     "Lista"
|                   ],
|                   Nodos: [
|                     {
|                       Nodo: "Referencia",
|                       Tipos: [
|                         "Texto"
|                       ]
                */
                Referencia,
                /*
|                     },
|                     {
|                       Nodo: "Identificador",
|                       Tipos: [
|                         "Número"
|                       ]
                */
                Identificador) => {
                /*
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Texto: Referencia"
|                   ],
|                   Nodo: "Tipo de referencia",
|                   Tipos: [
|                     "Derivado",
|                     "Texto"
|                   ],
                */
                const Tipo_de_referencia = Object.keys(Tipos_de_referencia).find(tipo_de_referencia => Referencia.replace(`${tipo_de_referencia}: `, "") !== Referencia)
                /*
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Otro archivo: Tipos_de_referencia.js"
|                       ],
|                       Nodo: "Sin tipo de referencia o tipo de referencia inválido",
|                       Tipos: [
|                         "Error"
|                       ],
                */
                if (!Tipo_de_referencia) {
                    /*
|                       Nodos: [
|                         {
|                           Referencias: [
|                             "Texto: Referencia",
|                             "Texto: Nombre del archivo",
|                             "Número: Número de línea de las referencias",
|                             "Otro archivo: Tipos_de_referencia.js"
|                           ],
|                           Nodo: "Lo notificamos"
|                         },
                    */
                    console.error(`Falta el tipo de referencia o el tipo es inválido. En «${Referencia}»:\n    ${join(process.cwd(), `${Nombre_del_archivo}:${Número_de_línea_de_las_referencias}`) }`)
                    console.error(`\nLos tipos de referencia válidos son:\n    ${Object.keys(Tipos_de_referencia).join("\n    ") }`)
                    /*
|                         {
|                           Nodo: "Cancelamos la compilación"
                    */
                    process.exit(1) }
                /*
|                         }
|                       ]
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Texto: Referencia"
|                   ],
|                   Nodo: "Lo referido",
|                   Tipos: [
|                     "Ramificación",
|                     "Derivado",
|                     "Texto"
|                   ],
                */
                const Lo_referido = Referencia.replace(`${Tipo_de_referencia}: `, "")
                /*
|                   Nodos: [
|                     {
|                       Nodo: "Referencia a algo dentro del mismo archivo. No modificamos la referencia."
|                     },
|                     {
|                       Nodo: "Referencia a un archivo",
|                       Tipos: [
|                         "Ramificación"
|                       ],
                */
                if (Tipo_de_referencia.endsWith(" archivo")) {
                    /*
|                       Nodos: [
|                         {
|                           Referencias: [
|                             "Lista: Referencias",
|                             "Número: Identificador",
|                             "Texto: Tipo de referencia",
|                             "Texto: Nombre del archivo",
|                             "Texto: Lo referido"
|                           ],
|                           Nodo: "No se está especificando la carpeta actual o la carpeta superior. Modificamos la referencia dando por hecho que se está buscando en una carpeta con el mismo nombre que el archivo."
                        */
                    if ((!Lo_referido.startsWith("../") && !Lo_referido.startsWith("./"))) {
                        Referencias[Identificador] = `${Tipo_de_referencia}: ${join(join(dirname(Nombre_del_archivo), parse(Nombre_del_archivo).name), Lo_referido).replaceAll("\\", "/")}`
                        /*
|                         },
|                         {
|                           Referencias: [
|                             "Lista: Referencias",
|                             "Número: Identificador",
|                             "Texto: Tipo de referencia",
|                             "Texto: Nombre del archivo",
|                             "Texto: Lo referido"
|                           ],
|                           Nodo: "Se está especificando la carpeta actual o la carpeta superior. Modificamos la referencia haciendo que la ruta sea relativa a la carpeta raíz."
                            */
                    } else {
                        Referencias[Identificador] = `${Tipo_de_referencia}: ${normalize(join(dirname(Nombre_del_archivo), Lo_referido)).replaceAll("\\", "/") }`} }
                /*
|                         }
|                       ]
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Cesto: Referencias en este archivo"
|                   ],
|                   Nodo: "Agregar",
                */
                Referencias_en_este_archivo.push({
                    /*
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Lista: Referencias",
|                         "Número: Identificador",
|                       ],
|                       Nodo: "Nombre"
                    */
                    Nombre: Referencias[Identificador],
                    /*
|                     },
|                     {
|                       Referencias: [
|                         "Número: Número de línea de las referencias"
|                       ],
|                       Nodo: "Número de línea"
                    */
                    Número_de_línea: Número_de_línea_de_las_referencias } ) } )
            /*
|                     }
|                   ]
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Nodos",
|               ],
|               Nodo: "Iterar",
            */
            Nodos.forEach(
                /*
|               Nodos: [
|                 {
|                   Nodo: "Contexto",
|                   Tipos: [
|                     "Lista"
|                   ],
|                   Nodos: [
|                     {
|                       Nodo: "Nodo",
|                       Tipos: [
|                         "Lista"
|                       ]
                */
                Nodo => {
                    /*
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Instancia recursiva: Buscar referencias"
|                   ],
|                   Nodo: "Buscar referencias",
                    */
                    Buscar_referencias({
                        /*
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Lista: Nodo",
|                       ],
|                       Nodo: "Nodo"
                        */
                        Nodo } ) } ) }
        /*
|                     }
|                   ]
|                 }
|               ]
|             }
|           ]
|         },
|         {
|           Referencias: [
|             "Instancia: Buscar referencias"
|           ],
|           Nodo: "Buscar referencias",
        */
        Buscar_referencias({
        /*
|           Nodos: [
|             {
|               Referencias: [
|                 "Lista: Circuito del archivo",
|               ],
|               Nodo: "Nodo"
        */
            Nodo: Circuito_del_archivo })
        /*
|             }
|           ]
|         },
|         {
|           Referencias: [
|             "Lista: Referencias en este archivo"
|           ],
|           Nodo: "Referencias a otros archivos",
|           Tipos: [
|             "Ramificación",
|             "Derivado",
|             "Lista"
|           ],
        */
        const Referencias_a_otros_archivos = Referencias_en_este_archivo.reduce((Referencias_a_otros_archivos, Referencia) => {
            /*
|           Nodos: [
|             {
|               Nodo: "No refiere a otro archivo. La excluimos."
            */
            if (!Referencia.Nombre.includes("archivo: ")) return Referencias_a_otros_archivos
            /*
|             },
|             {
|               Nodo: "Ya la habíamos inlcuido. La excluimos."
            */
            if (Referencias_a_otros_archivos.find(Referencia_a_otro_archivo => Referencia_a_otro_archivo.Nombre === Referencia.Nombre)) return Referencias_a_otros_archivos
            /*
|             },
|             {
|               Referencias: [
|                 "Cesto: Archivos"
|               ],
|               Nodo: "Ya se había analizado antes. La excluimos.",
            */
            if (Archivos.find(Archivo => Archivo.Nombre === Referencia.Nombre)) return Referencias_a_otros_archivos
            /*
|             },
|             {
|               Nodo: "No se había analizado antes. La incluimos."
            */
            Referencias_a_otros_archivos.push(Referencia)
            return Referencias_a_otros_archivos }, [] )
        /*
|             }
|           ]
|         },
|         {
|           Referencias: [
|             "Lista: Referencias a otros archivos"
|           ],
|           Nodo: "Iterar",
        */
        Referencias_a_otros_archivos.forEach(
            /*
|           Nodos: [
|             {
|               Nodo: "Contexto",
|               Tipos: [
|                 "Lista"
|               ],
|               Nodos: [
|                 {
|                   Nodo: "Referencia",
|                   Tipos: [
|                     "Lista"
|                   ]
            */
            Referencia => {
                /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Referencia"
|               ],
|               Nodo: "Propiedad",
|               Nodos: [
|                 {
|                   Nodo: "Nombre",
|                   Tipos: [
|                     "Texto"
|                   ]
                */
                const { Nombre } = Referencia
                /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Instancia recursiva: Analizar archivo"
|               ],
|               Nodo: "Analizar archivo",
                */
                Analizar_archivo({
                    /*
|               Nodos: [
|                 {
|                   Referencias: [
|                     "Texto: Nombre"
|                   ],
|                   Nodo: "Nombre del archivo"
                    */
                    Nombre_del_archivo: Nombre.split("archivo: ")[1] } ) } ) }
    /*
|                 }
|               ]
|             }
|           ]
|         }
|       ]
|     },
|     {
|       Referencias: [
|         "Otro archivo: ../Configuración_del_circuito.json"
|       ],
|       Nodo: "Ubicación del archivo de configuración del circuito",
|       Tipos: [
|         "Texto"
|       ]
    */
    const Ubicación_del_archivo_de_configuración_del_circuito = join(process.cwd(), "Configuración_del_circuito.json")
    /*
|     },
|     {
|       Referencias: [
|         "Texto: Ubicación del archivo de configuración del circuito"
|       ],
|       Nodo: "Configuración del circuito",
|       Tipos: [
|         "Derivado",
|         "Lista"
|       ],
    */
    let Configuración_del_circuito
    try {
        Configuración_del_circuito = JSON.parse(readFileSync(Ubicación_del_archivo_de_configuración_del_circuito, "utf8") )
        /*
|       Nodos: [
|         {
|           Nodo: "No se puede leer el archivo de configuración del circuito o tiene un error de sintaxis",
|           Tipos: [
|             "Error"
|           ],
        */
    } catch (error) {
        /*
|           Nodos: [
|             {
|               Referencias: [
|                 "Texto: Ubicación del archivo de configuración del circuito"
|               ],
|               Nodo: "Lo notificamos"
        */
        console.error(error, `\n\nNo se puede leer el archivo o tiene un error de sintaxis: «${Ubicación_del_archivo_de_configuración_del_circuito}»`)
        /*
|             },
|             {
|               Nodo: "Cancelamos la compilación"
        */
        process.exit(1) }
    /*
|             }
|           ]
|         }
|       ]
|     },
|     {
|       Referencias: [
|         "Lista: Configuración del circuito"
|       ],
|       Nodo: "Propiedad",
|       Nodos: [
|         {
|           Nodo: "Archivo de entrada",
|           Tipos: [
|             "Texto"
|           ],
    */
    const { Archivo_de_entrada } = Configuración_del_circuito
    /*
|         }
|       ]
|     },
|     {
|       Referencias: [
|         "Instancia: Analizar archivo"
|       ],
|       Nodo: "Analizar archivo",
    */
    Analizar_archivo({
    /*
|       Nodos: [
|         {
|           Referencias: [
|             "Texto: Archivo de entrada"
|           ],
|           Nodo: "Nombre del archivo"
    */
        Nombre_del_archivo: Archivo_de_entrada })
    /*
|         }
|       ]
|     },
|     {
|       Nodo: "Instrucciones para crear el circuito con todos los archivos",
|       Tipos: [
|         "Lista"
|       ],
*/
    let Instrucciones_para_crear_el_circuito_con_todos_los_archivos = Generar_instrucciones({
        /*
|       Nodos: [
|         {
|           Referencias: [
|             "Otro archivo: Generador_de_instrucciones.js"
|           ],
|           Nodo: "Generar instrucciones",
|           Tipos: [
|             "Instancia"
|           ],
|           Nodos: [
|             {
|               Referencias: [
|                 "Lista: Archivos"
|               ],
|               Nodo: "Archivos"
        */
        Archivos,
        /*
|             },
|             {
|               Referencias: [
|                 "Otro archivo: Tipos_de_nodo.js"
|               ],
|               Nodo: "Tipos de nodo",
|               Tipos: [
|                 "Lista"
|               ]
        */
        Tipos_de_nodo,
        /*
|             },
|             {
|               Referencias: [
|                 "Otro archivo: Tipos_de_referencia.js"
|               ],
|               Nodo: "Tipos de referencia",
|               Tipos: [
|                 "Lista"
|               ]
        */
        Tipos_de_referencia })
    /*
|             }
|           ]
|         }
|       ]
|     },
|     {
|       Referencias: [
|         "Externa: Terser",
|         "Lista: Instrucciones para crear el circuito con todos los archivos"
|       ],
|       Nodo: "Comprimir",
    */
    Instrucciones_para_crear_el_circuito_con_todos_los_archivos = minify_sync(Instrucciones_para_crear_el_circuito_con_todos_los_archivos).code
    /*
|       Nodos: [
|         {
|           Nodo: "Guardar en Circuito.md"
    */
    writeFileSync(join(process.cwd(), "Circuito.md"),  `<div id="Circuito"></div><script>${Instrucciones_para_crear_el_circuito_con_todos_los_archivos}</script>`) }
/*
|         }
|       ]
|     }
|   ]
| }
*/
