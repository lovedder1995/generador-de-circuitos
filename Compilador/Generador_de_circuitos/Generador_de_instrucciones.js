/*
| {
|   Nodo: "Generador de instrucciones",
|   Tipos: [
|     "Procedimiento"
|   ],
*/
export default ({
/*
|   Nodos: [
|     {
|       Nodo: "Contexto",
|       Tipos: [
|         "Lista"
|       ],
|       Nodos: [
|         {
|           Nodo: "Archivos",
|           Tipos: [
|             "Lista"
|           ]
*/
    Archivos,
    /*
|         },
|         {
|           Nodo: "Tipos de nodo",
|           Tipos: [
|             "Lista"
|           ]
    */
    Tipos_de_nodo,
    /*
|         },
|         {
|           Nodo: "Tipos de referencia",
|           Tipos: [
|             "Lista"
|           ]
    */
    Tipos_de_referencia }) => {
/*
|         }
|       ]
|     },
|     {
|       Nodo: "Generar instrucciones",
|       Tipos: [
|         "Procedimiento"
|       ],
*/
    const Generar_instrucciones = ({
        /*
|       Nodos: [
|         {
|           Nodo: "Contexto",
|           Tipos: [
|             "Lista"
|           ],
|           Nodos: [
|             {
|               Nodo: "Archivos",
|               Tipos: [
|                 "Lista"
|               ]
        */
        Archivos,
        /*
|             },
|             {
|               Nodo: "Tipos de nodo",
|               Tipos: [
|                 "Lista"
|               ]
        */
        Tipos_de_nodo,
        /*
|             },
|             {
|               Nodo: "Tipos de referencia",
|               Tipos: [
|                 "Lista"
|               ]
        */
        Tipos_de_referencia } ) => {
        /*
|             }
|           ]
|         },
|         {
|           Referencias: [
|             "Lista: Documento"
|           ],
|           Nodo: "Propiedades",
|           Nodos: [
|             {
|               Nodo: "Elemento del documento",
|               Tipos: [
|                 "Lista"
|               ],
        */
        const Documento = document.documentElement
        /*
|               Nodos: [
|                 {
|                   Nodo: "Estilos",
|                   Tipos: [
|                     "Estilos"
|                   ]
        */
        /* 🎨 Estilos: */ Object.assign(Documento.style, {
            /* 🖌️ Tamaño de la tipografía: 16px. */ fontSize: "6px" } )
        /*
|                 }
|               ]
|             },
|             {
|               Nodo: "Contenido",
|               Tipos: [
|                 "Lista"
|               ],
        */
        const Contenido = document.body
        /*
|               Nodos: [
|                 {
|                   Nodo: "Estilos",
|                   Tipos: [
|                     "Estilos"
|                   ]
        */
        /* 🎨 Estilos: */ Object.assign(Contenido.style, {
            /* 🖌️ Color del fondo: Verde oscuro. */ backgroundColor: "hsl(120, 100%, 5%)",
            /* 🖌️ Anchura: La necesaria para no contraer el contenido. */ width: "max-content",
            /* 🖌️ Holgura: 1 vez el tamaño de la tipografía. */ padding: "1rem",
            /* 🖌️ Margen: 0. */ margin: "0" } )
        /*
|                 }
|               ]
|             }
|           ]
|         },
|         {
|           Nodo: "Montar nodo",
|           Tipos: [
|             "Procedimiento"
|           ],
        */
        const Montar_nodo = ({
        /*
|           Nodos: [
|             {
|               Nodo: "Contexto",
|               Tipos: [
|                 "Lista"
|               ],
|               Nodos: [
|                 {
|                   Nodo: "Archivo",
|                   Tipos: [
|                     "Texto"
|                   ]
        */
            Archivo,
            /*
|                 },
|                 {
|                   Nodo: "Circuito",
|                   Tipos: [
|                     "Lista"
|                   ]
            */
            Circuito,
            /*
|                 },
|                 {
|                   Nodo: "Elemento",
|                   Tipos: [
|                     "Lista"
|                   ]
            */
            Elemento,
            /*
|                 },
|                 {
|                   Nodo: "Nivel",
|                   Tipos: [
|                     "Número"
|                   ]
            */
            Nivel }) => {
            /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Circuito"
|               ],
|               Nodo: "Propiedades",
|               Nodos: [
|                 {
|                   Nodo: "Nodo",
|                   Tipos: [
|                     "Texto"
|                   ]
            */
            const { Nodo,
                /*
|                 },
|                 {
|                   Nodo: "Tipos",
|                   Tipos: [
|                     "Lista"
|                   ]
                */
                Tipos,
                /*
|                 },
|                 {
|                   Nodo: "Referencias",
|                   Tipos: [
|                     "Lista"
|                   ]
                */
                Referencias,
                /*
|                 },
|                 {
|                   Nodo: "Nodos",
|                   Tipos: [
|                     "Lista"
|                   ]
                */
                Nodos,
                /*
|                 },
|                 {
|                   Nodo: "Número de línea",
|                   Tipos: [
|                     "Número"
|                   ]
                */
                Número_de_línea } = Circuito
            /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Documento"
|               ],
|               Nodo: "Crear elemento",
|               Nodos: [
|                 {
|                   Nodo: "Contenedor del nodo",
|                   Tipos: [
|                     "Lista"
|                   ],
            */
            const Contenedor_del_nodo = document.createElement("div")
            /*
|                   Nodos: [
|                     {
|                       Nodo: "Estilos",
|                       Tipos: [
|                         "Estilos"
|                       ],
            */
            /* 🎨 Estilos: */ Object.assign(Contenedor_del_nodo.style, {
                /* 🖌️ Eje principal: Horizontal. */ display: "flex", flexDirection: "row",
                /* 🖌️ Holgura: 1 vez el tamaño de la tipografía. */ padding: "1rem",
                /* 🖌️ Espacio entre los hijos: 1 vez el tamaño de la tipografía. */ gap: "1rem",
                /* 🖌️ Color del fondo: Depende del tipo de nodo. */ backgroundColor:  (() => {
                    /*
|                       Nodos: [
|                         {
|                           Nodo: "El color del fondo depende del tipo de nodo"
                    */
                    if (Tipos?.includes("Procedimiento")) {
                        return `hsl(180, 100%, ${10 + (Nivel * 2)}%)`
                    }

                    if (Tipos?.includes("Visible")) {
                        return `hsl(240, 100%, ${10 + (Nivel * 2)}%)`
                    }

                    if (Tipos?.includes("Error")) {
                        return `hsl(0, 100%, ${10 + (Nivel * 2)}%)`
                    }

                    return `hsl(120, 100%, ${10 + (Nivel * 2)}%)`} )() } )
            /*
|                         }
|                       ]
|                     },
|                     {
|                       Nodo: "Estilos hay una ramificación",
|                       Tipos: [
|                         "Estilos"
|                       ]
            */
            if (Tipos?.includes("Ramificación")) {
                /* 🎨 Estilos: */ Object.assign(Contenedor_del_nodo.style, {
                    /* 🖌️ Espacio entre los hijos: 0. */ gap: "0" } ) }
            /*
|                     }
|                   ]
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Contenedor del nodo"
|               ],
|               Nodo: "Establecer como archivo",
|               Tipos: [
|                 "Ramificación"
|               ],
|               Nodos: [
|                 {
|                   Nodo: "No es un archivo. No establecemos el contenedor del nodo como uno."
|                 },
|                 {
|                   Nodo: "Es un archivo. Establecemos el contenedor del nodo como uno."
            */
            if (Elemento.id === "Circuito") {
                Contenedor_del_nodo.dataset.archivo = Archivo
                Contenedor_del_nodo.dataset.nodo = Nodo }
            /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Elemento"
|               ],
|               Nodo: "Montar",
|               Nodos: [
|                 {
|                   Referencias: [
|                     "Lista: Contenedor del nodo"
|                   ],
|                   Nodo: "Elemento"
            */
            Elemento.appendChild(Contenedor_del_nodo)
            /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Referencias"
|               ],
|               Nodo: "Procesar",
            */
            if (Referencias) {
                /*
|               Nodos: [
|                 {
|                   Referencias: [
|                     "Lista: Documento"
|                   ],
|                   Nodo: "Crear elemento",
|                   Nodos: [
|                     {
|                       Nodo: "Elemento de las referencias",
|                       Tipos: [
|                         "Lista"
|                       ],
                */
                const Elemento_de_las_referencias = document.createElement("div")
                /*
|                       Nodos: [
|                         {
|                           Nodo: "Estilos",
|                           Tipos: [
|                             "Estilos"
|                           ]
                */
                /* 🎨 Estilos: */ Object.assign(Elemento_de_las_referencias.style, {
                    /* 🖌️ Eje principal: Vertical. */ display: "flex", flexDirection: "column",
                    /* 🖌️ Espacio entre los hijos: 1 vez el tamaño de la tipografía. */ gap: "1rem" } )
                /*
|                         }
|                       ]
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Contenedor del nodo"
|                   ],
|                   Nodo: "Montar",
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Lista: Elemento de las referencias"
|                       ],
|                       Nodo: "Elemento"
                */
                Contenedor_del_nodo.appendChild(Elemento_de_las_referencias)
                /*
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Referencias"
|                   ],
|                   Nodo: "Iterar",
                */
                Referencias.forEach(
                    /*
|                   Nodos: [
|                     {
|                       Nodo: "Contexto",
|                       Tipos: [
|                         "Lista"
|                       ],
|                       Nodos: [
|                         {
|                           Nodo: "Referencia",
|                           Tipos: [
|                             "Texto"
|                           ]
                    */
                    Referencia => {
                        /*
|                         }
|                       ]
|                     },
|                     {
|                       Referencias: [
|                         "Texto: Referencia"
|                       ],
|                       Nodo: "Tipo de referencia",
|                       Tipos: [
|                         "Derivado",
|                         "Texto"
|                       ]
                        */
                        const Tipo_de_referencia = Object.keys(Tipos_de_referencia).find(tipo => Referencia.includes(`${tipo}: `))
                        /*
|                     },
|                     {
|                       Referencias: [
|                         "Texto: Referencia"
|                       ],
|                       Nodo: "Lo referido",
|                       Tipos: [
|                         "Derivado",
|                         "Texto"
|                       ]
                        */
                        const Lo_referido = Referencia.replace(`${Tipo_de_referencia}: `, "")
                        /*
|                     },
|                     {
|                       Referencias: [
|                         "Lista: Documento"
|                       ],
|                       Nodo: "Crear elemento",
|                       Nodos: [
|                         {
|                           Nodo: "Elemento de la referencia",
|                           Tipos: [
|                             "Lista"
|                           ],
                        */
                        const Elemento_de_la_referencia = document.createElement("a")
                        /*
|                           Nodos: [
|                             {
|                               Nodo: "Estilos",
|                               Tipos: [
|                                 "Estilos"
|                               ],
                        */
                        /* 🎨 Estilos: */ Object.assign(Elemento_de_la_referencia.style, {
                            /* 🖌️ Eje principal: Horizontal. */ display: "flex", flexDirection: "row",
                            /* 🖌️ Anchura máxima: 48 veces el tamaño de la tipografía. */ maxWidth: "48rem",
                            /* 🖌️ Color del texto: Blanco. */ color: "white",
                            /* 🖌️ Rayar el texto: No. */ textDecoration: "none",
                            /* 🖌️ Holgura: 1 vez el tamaño de la tipografía. */ padding: "1rem",
                            /*
|                               Nodos: [
|                                 {
|                                   Nodo: "El color del fondo depende del tipo de nodo"
                            */
                            /* 🖌️ Color del fondo: Depende del tipo de nodo. */ backgroundColor: (() => {
                                if (Referencia.includes("Externa: ")) {
                                    return `hsl(30, 100%, ${10 + (Nivel * 3)}%)`
                                } else if (Referencia.includes("archivo: ")) {
                                    return `hsl(300, 100%, ${10 + (Nivel * 3)}%)`
                                } else {
                                    return `hsl(60, 100%, ${10 + (Nivel * 3) }%)`} } )() } )
                        /*
|                                 }
|                               ]
|                             }
|                           ]
|                         }
|                       ]
|                     },
|                     {
|                       Referencias: [
|                         "Texto: Tipo de referencia"
|                       ],
|                       Nodo: "A otro archivo",
|                       Tipos: [
|                         "Ramificación"
|                       ],
|                       Nodos: [
|                         {
|                           Nodo: "No refiere a otro archivo. No hacemos nada."
|                         },
|                         {
|                           Referencias: [
|                             "Lista: Elemento de la referencia",
|                             "Texto: Lo referido",
|                           ],
|                           Nodo: "Marcamos el elemento y lo enlazamos al archivo referido",
                        */
                        if (Tipo_de_referencia === "Otro archivo") {
                            Elemento_de_la_referencia.dataset.referencia = Lo_referido
                            Elemento_de_la_referencia.href = Lo_referido
                            /*
|                           Nodos: [
|                             {
|                               Nodo: "Estilos",
|                               Tipos: [
|                                 "Estilos"
|                               ]
                            */
                            /* 🎨 Estilos: */ Object.assign(Elemento_de_la_referencia.style, {
                                /* 🖌️ Anchura máxima: No aplica. */ maxWidth: "none" } ) }
                        /*
|                             }
|                           ]
|                         }
|                       ]
|                     },
|                     {
|                       Referencias: [
|                         "Lista: Elemento de la referencia"
|                       ],
|                       Nodo: "Establecer",
                        */
                        Elemento_de_la_referencia.textContent =
                        /*
|                       Nodos: [
|                         {
|                           Referencias: [
|                             "Lista: Tipos de referencia",
|                             "Texto: Tipo de referencia",
|                             "Texto: Lo referido"
|                           ],
|                           Nodo: "Texto"
                        */
                            `${Tipos_de_referencia[Tipo_de_referencia]} ${Lo_referido}`
                        /*
|                         }
|                       ]
|                     },
|                     {
|                       Referencias: [
|                         "Lista: Elemento de las referencias"
|                       ],
|                       Nodo: "Montar",
|                       Nodos: [
|                         {
|                           Referencias: [
|                             "Lista: Elemento de la referencia"
|                           ],
|                           Nodo: "Elemento"
                        */
                        Elemento_de_las_referencias.appendChild(Elemento_de_la_referencia) } ) }
            /*
|                         }
|                       ]
|                     }
|                   ]
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Texto: Nodo"
|               ],
|               Nodo: "Procesar",
|               Nodos: [
|                 {
|                   Referencias: [
|                     "Lista: Documento"
|                   ],
|                   Nodo: "Crear elemento",
|                   Nodos: [
|                     {
|                       Nodo: "Elemento del nodo",
|                       Tipos: [
|                         "Lista"
|                       ],
            */
            const Elemento_del_nodo = document.createElement("a")
            /*
|                       Nodos: [
|                         {
|                           Nodo: "Estilos",
|                           Tipos: [
|                             "Estilos"
|                           ]
            */
            /* 🎨 Estilos: */ Object.assign(Elemento_del_nodo.style, {
                /* 🖌️ Eje principal: Horizontal. */ display: "flex", flexDirection: "row",
                /* 🖌️ Color del texto: Blanco. */ color: "white",
                /* 🖌️ Rayar el texto: No. */ textDecoration: "none",
                /* 🖌️ Anchura máxima: 48 veces el tamaño de la tipografía. */ maxWidth: "48rem",
                /* 🖌️ Holgura: 0.5 veces el tamaño de la tipografía. */ padding: "0.5rem",
                /* 🖌️ Altura: La del contenido. */ height: "fit-content" })
            /*
|                         },
|                         {
|                           Nodo: "Estilos si es la raíz de una ramificación",
|                           Tipos: [
|                             "Estilos"
|                           ]
            */
            if (Tipos?.includes("Ramificación")) {
                /* 🎨 Estilos: */ Object.assign(Elemento_del_nodo.style, {
                    /* 🖌️ Margen izquierdo: 1 vez el tamaño de la tipografía. */ marginLeft: "1rem",
                    /* 🖌️ Tipo del marco del lado inferior: Sólido. */ borderBottomStyle: "solid",
                    /* 🖌️ Color del marco del lado inferior: Verde oscuro. */ borderBottomColor: `hsl(120, 100%, ${10 + Nivel}%)`,
                    /* 🖌️ Grosor del marco del lado inferior: 0.5 veces el tamaño de la tipografía. */ borderBottomWidth: "0.5rem" } ) }
            /*
|                         }
|                       ]
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Contenedor del nodo"
|                   ],
|                   Nodo: "Montar",
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Lista: Elemento del nodo"
|                       ],
|                       Nodo: "Elemento"
            */
            Contenedor_del_nodo.appendChild(Elemento_del_nodo)
            /*
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Elemento del nodo"
|                   ],
|                   Nodo: "Establecer",
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Texto: Nodo"
|                       ],
|                       Nodo: "Texto"
            */
            Elemento_del_nodo.textContent = Nodo
            /*
|                     },
|                     {
|                       Referencias: [
|                         "Texto: Archivo",
|                         "Número: Número de línea"
|                       ],
|                       Nodo: "Enlace"
            */
            Elemento_del_nodo.href = `${Archivo}#L${Número_de_línea}`
            /*
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Tipos"
|                   ],
|                   Nodo: "Iterar",
            */
            Tipos?.reverse().forEach(
                /*
|                   Nodos: [
|                     {
|                       Nodo: "Contexto",
|                       Nodos: [
|                         {
|                           Nodo: "Tipo",
|                           Tipos: [
|                             "Texto"
|                           ]
                */
                Tipo => {
                    /*
|                         }
|                       ]
|                     },
|                     {
|                       Referencias: [
|                         "Lista: Elemento del nodo"
|                       ],
|                       Nodo: "Establecer",
|                       Nodos: [
|                         {
|                           Referencias: [
|                             "Lista: Tipos de nodo",
|                             "Texto: Tipo"
|                           ],
|                           Nodo: "Ícono"
                    */
                    Elemento_del_nodo.textContent = `${Tipos_de_nodo[Tipo]} ${Elemento_del_nodo.textContent}`} )
            /*
|                         }
|                       ]
|                     }
|                   ]
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Nodos"
|               ],
|               Nodo: "Procesar",
            */
            if (Nodos) {
                /*
|               Nodos: [
|                 {
|                   Referencias: [
|                     "Lista: Documento"
|                   ],
|                   Nodo: "Crear elemento",
|                   Nodos: [
|                     {
|                       Nodo: "Elemento de los nodos",
|                       Tipos: [
|                         "Lista"
|                       ],
                */
                const Elemento_de_los_nodos = document.createElement("div")
                /*
|                       Nodos: [
|                         {
|                           Nodo: "Estilos",
|                           Tipos: [
|                             "Estilos"
|                           ]
                */
                /* 🎨 Estilos: */ Object.assign(Elemento_de_los_nodos.style, {
                    /* 🖌️ Eje principal: Vertical. */ display: "flex", flexDirection: "column",
                    /* 🖌️ Espacio entre los hijos: 1 vez el tamaño de la tipografía. */ gap: "1rem" } )
                /*
|                         },
|                         {
|                           Nodo: "Estilos si son ramas en una ramificación",
|                           Tipos: [
|                             "Estilos"
|                           ]
                */
                if (Tipos?.includes("Ramificación")) {
                    /* 🎨 Estilos: */ Object.assign(Elemento_de_los_nodos.style, {
                        /* 🖌️ Tipo del marco del lado izquierdo: Sólido. */ borderLeftStyle: "solid",
                        /* 🖌️ Color del marco del lado izquierdo: Verde oscuro. */ borderLeftColor: `hsl(120, 100%, ${10 + Nivel}%)`,
                        /* 🖌️ Grosor del marco del lado izquierdo: 0.5 veces el tamaño de la tipografía. */ borderLeftWidth: "0.5rem" } ) }
                /*
|                         }
|                       ]
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Contenedor del nodo"
|                   ],
|                   Nodo: "Montar",
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Lista: Elemento de los nodos"
|                       ],
|                       Nodo: "Elemento",
                */
                Contenedor_del_nodo.appendChild(Elemento_de_los_nodos)
                /*
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Nodos"
|                   ],
|                   Nodo: "Iterar",
                */
                Nodos.forEach(
                    /*
|                   Nodos: [
|                     {
|                       Nodo: "Contexto",
|                       Tipos: [
|                         "Lista"
|                       ],
|                       Nodos: [
|                         {
|                           Nodo: "Nodo",
|                           Tipos: [
|                             "Lista"
|                           ]
                    */
                    Nodo => {
                        /*
|                         }
|                       ]
|                     },
|                     {
|                       Referencias: [
|                         "Instancia recursiva: Montar nodo"
|                       ],
|                       Nodo: "Montar nodo",
                        */
                        Montar_nodo({
                            /*
|                       Nodos: [
|                         {
|                           Referencias: [
|                             "Texto: Archivo"
|                           ],
|                           Nodo: "Archivo"
                            */
                            Archivo,
                            /*
|                         },
|                         {
|                           Referencias: [
|                             "Lista: Elemento de los nodos"
|                           ],
|                           Nodo: "Elemento"
                            */
                            Elemento: Elemento_de_los_nodos,
                            /*
|                         },
|                         {
|                           Referencias: [
|                             "Lista: Nodo"
|                           ],
|                           Nodo: "Circuito"
                            */
                            Circuito: Nodo,
                            /*
|                         },
|                         {
|                           Nodo: "Nivel",
|                           Tipos: [
|                             "Número"
|                           ],
                            */
                            Nivel: Nivel + 1 } ) } ) } }
        /*
|                         }
|                       ]
|                     }
|                   ]
|                 }
|               ]
|             }
|           ]
|         },
|         {
|           Referencias: [
|             "Lista: Contenido"
|           ],
|           Nodo: "Seleccionar",
|           Nodos: [
|             {
|               Nodo: "Elemento del circuito",
|               Tipos: [
|                 "Lista"
|               ]
        */
        const Elemento_del_circuito = Contenido.querySelector("#Circuito")
        /*
|             }
|           ]
|         },
|         {
|           Referencias: [
|             "Lista: Archivos"
|           ],
|           Nodo: "Iterar",
        */
        Archivos.forEach(
        /*
|           Nodos: [
|             {
|               Nodo: "Contexto",
|               Nodos: [
|                 {
|                   Nodo: "Archivo",
|                   Tipos: [
|                     "Lista"
|                   ]
        */
            Archivo => {
                /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Archivo"
|               ],
|               Nodo: "Propiedades",
|               Nodos: [
|                 {
|                   Nodo: "Nombre del archivo",
|                   Tipos: [
|                     "Texto"
|                   ],
                */
                const Nombre_del_archivo = Archivo.Archivo
                /*
|                   Nodos: [
|                     {
|                       Nodo: "Archivo"
|                     }
|                   ]
|                 },
|                 {
|                   Nodo: "Circuito",
|                   Tipos: [
|                     "Lista"
|                   ]
                */
                const Circuito = Archivo.Circuito
                /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Instancia: Montar nodo"
|               ],
|               Nodo: "Montar nodo",
                */
                Montar_nodo({
                    /*
|               Nodos: [
|                 {
|                   Referencias: [
|                     "Texto: Nombre del archivo"
|                   ],
|                   Nodo: "Archivo"
                    */
                    Archivo: Nombre_del_archivo,
                    /*
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Circuito"
|                   ],
|                   Nodo: "Circuito"
                    */
                    Circuito,
                    /*
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Elemento del circuito"
|                   ],
|                   Nodo: "Elemento"
                    */
                    Elemento: Elemento_del_circuito,
                    /*
|                 },
|                 {
|                   Nodo: "Nivel",
|                   Tipos: [
|                     "Número"
|                   ],
                    */
                    Nivel: 1 } ) } )
        /*
|                 }
|               ]
|             }
|           ]
|         },
|         {
|           Referencias: [
|             "Lista: Documento"
|           ],
|           Nodo: "Seleccionar los elementos de los archivos e iterar",
        */
        document.querySelectorAll("[data-archivo]").forEach(
            /*
|           Nodos: [
|             {
|               Nodo: "Contexto",
|               Tipos: [
|                 "Lista"
|               ],
|               Nodos: [
|                 {
|                   Nodo: "Elemento del archivo",
|                   Tipos: [
|                     "Lista"
|                   ]
            */
            Elemento_del_archivo => {
                /*
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Documento"
|               ],
|               Nodo: "Crear elemento",
|               Nodos: [
|                 {
|                   Nodo: "Elemento de los archivos anidados",
|                   Tipos: [
|                     "Cesto"
|                   ],
                */
                const Elemento_de_los_archivos_anidados = document.createElement("div")
                /*
|                   Nodos: [
|                     {
|                       Nodo: "Estilos",
|                       Tipos: [
|                         "Estilos"
|                       ]
                */
                /* 🎨 Estilos: */ Object.assign(Elemento_de_los_archivos_anidados.style, {
                    /* 🖌️ Eje principal: Vertical. */ display: "flex", flexDirection: "column",
                    /* 🖌️ Color del fondo: Verde oscuro. */ backgroundColor: "hsl(120, 100%, 10%)",
                    /* 🖌️ Espacio entre los hijos: 1 vez el tamaño de la tipografía. */ gap: "1rem",
                    /* 🖌️ Holgura: 1 vez el tamaño de la tipografía. */ padding: "1rem" } )
                /*
|                     }
|                   ]
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Elemento del archivo"
|               ],
|               Nodo: "Seleccionar los elementos de las referencias e iterar",
                */
                Elemento_del_archivo.querySelectorAll("[data-referencia]").forEach(
                    /*
|               Nodos: [
|                 {
|                   Nodo: "Contexto",
|                   Tipos: [
|                     "Lista"
|                   ],
|                   Nodos: [
|                     {
|                       Nodo: "Elemento de la referencia",
|                       Tipos: [
|                         "Lista"
|                       ]
                    */
                    Elemento_de_la_referencia => {
                        /*
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Elemento del circuito"
|                   ],
|                   Nodo: "Seleccionar",
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Lista: Elemento de la referencia"
|                       ],
|                       Nodo: "Elemento del archivo al que refiere",
|                       Tipos: [
|                         "Lista"
|                       ]
                        */
                        const Elemento_del_archivo_al_que_refiere = Array.from(Elemento_del_circuito.children).find(Archivo => Archivo.dataset.archivo === Elemento_de_la_referencia.dataset.referencia)
                        /*
|                     }
|                   ]
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Elemento del archivo al que refiere"
|                   ],
|                   Nodo: "Anidar",
|                   Tipos: [
|                     "Ramificación"
|                   ],
|                   Nodos: [
|                     {
|                       Nodo: "No lo podemos anidar porque ya se había anidado",
|                       Tipos: [
|                         "Lista"
|                       ]
|                     },
|                     {
|                       Referencias: [
|                         "Cesto: Elemento de los archivos anidados"
|                       ],
|                       Nodo: "Lo anidamos",
                        */
                        if (Elemento_del_archivo_al_que_refiere) {
                            Elemento_de_los_archivos_anidados.appendChild(Elemento_del_archivo_al_que_refiere) } } )
                /*
|                     }
|                   ]
|                 }
|               ]
|             },
|             {
|               Referencias: [
|                 "Lista: Elemento del archivo"
|               ],
|               Nodo: "Montar los archivos anidados",
|               Tipos: [
|                 "Ramificación"
|               ],
|               Nodos: [
|                 {
|                   Nodo: "No se anidó ningún archivo. No montamos nada.",
|                 },
|                 {
|                   Referencias: [
|                     "Lista: Elemento del archivo"
|                   ],
|                   Nodo: "Montar",
                */
                if (Elemento_de_los_archivos_anidados.children.length > 0) {
                    Elemento_del_archivo.appendChild(
                        /*
|                   Nodos: [
|                     {
|                       Referencias: [
|                         "Lista: Elemento de los archivos anidados"
|                       ],
|                       Nodo: "Elemento"
                        */
                        Elemento_de_los_archivos_anidados) } } ) }
    /*
|                     }
|                   ]
|                 }
|               ]
|             }
|           ]
|         }
|       ]
|     },
|     {
|       Referencias: [
|         "Texto: Generar instrucciones"
|       ],
|       Nodo: "Devolver",
    */
    return `(${Generar_instrucciones.toString()
        /*
|       Nodos: [
|         {
|           Referencias: [
|             "Lista: Archivos",
|           ],
|           Nodo: "Archivos",
        */
    })({ Archivos: ${JSON.stringify(Archivos)
        /*
|         },
|         {
|           Referencias: [
|             "Lista: Tipos de nodo",
|           ],
|           Nodo: "Tipos de nodo",
        */
    }, Tipos_de_nodo: ${JSON.stringify(Tipos_de_nodo)
        /*
|         },
|         {
|           Referencias: [
|             "Lista: Tipos de referencia"
|           ],
|           Nodo: "Tipos de referencia",
        */
    }, Tipos_de_referencia: ${JSON.stringify(Tipos_de_referencia) } } )`}
/*
|         }
|       ]
|     }
|   ]
| }
*/
