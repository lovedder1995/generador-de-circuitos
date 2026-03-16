export default ({ Selectores_tipos_de_nodo_y_contenidos_de_texto, líneas_del_archivo_del_circuito, líneas_del_archivo_del_manifiesto, Tipos_de_nodos }) => {
    const documento = document.documentElement
    documento.style.overflow = "hidden"
    documento.style.fontSize = "5px"
    documento.style.userSelect = "none"
    /*
    | .Generador_de_instrucciones Generador de instrucciones
    ==============================
    = Generador de instrucciones =
    ==============================
    */
    /*
    | #Nodos_que_hay_en_el_circuito 📝 Nodos que hay en el circuito
    [ Nodos que hay en el circuito ]
    */
    /* Buscamos en el circuito, */ const Nodos_que_hay_en_el_circuito = líneas_del_archivo_del_circuito.map(({ contenido_de_texto, número_de_línea }) => {
        /* línea por línea, */ const partes_de_la_línea = contenido_de_texto.split("\"")
        /* para encontrar todos los nodos. */ let selector; if (partes_de_la_línea.length === 3 && !contenido_de_texto.includes(":")) { selector = partes_de_la_línea[1] } else if (partes_de_la_línea.length === 5) { selector = partes_de_la_línea[3] }

        /* Si encontramos un nodo en una línea, lo agregamos a la lista de nodos que hay en el circuito. */ if (selector) { return { selector, número_de_línea, archivo: "circuito.json" } } } ).filter(Boolean)
    /*
    | #Error_en_el_circuito (condicional) Error en el circuito
    ------------------------
    - Error en el circuito -
    ------------------------
    */
    /* Si hay un error en el circuito, */ const Error_en_el_circuito = ({ mensaje, nodos }) => {
        /* mostramos el mensaje de error */ document.querySelector("#_Error_en_el_circuito a").textContent = mensaje
        /* y las líneas que lo provocan. */ document.querySelector("#_Error_en_el_circuito div:nth-child(2)").innerHTML = nodos.map(nodo => `<a class="nodo error" href="./${nodo.archivo}#L${nodo.número_de_línea}">${nodo.selector}</a>`).join(""); throw new Error(mensaje) }
    /*
    | #Selectores Selectores
    --------------
    - Selectores -
    --------------
    */
    /*
    | #Sin_tipos_de_nodo_ni_contenido_de_texto ❌ Sin tipos de nodo ni contenido de texto
    [ Sin tipos de nodo ni contenido de texto ]
    */
    /* Si un selector no tiene tipos de nodos ni contenido de texto, */ const Selectores_sin_tipos_de_nodo_ni_contenido_de_texto = Selectores_tipos_de_nodo_y_contenidos_de_texto.filter(({ tipos_de_nodo, contenido_de_texto }) => (tipos_de_nodo === undefined) && (contenido_de_texto === undefined))
    /* lo consideramos como un error. */ if (Selectores_sin_tipos_de_nodo_ni_contenido_de_texto.length > 0) { Error_en_el_circuito({ mensaje: "Hay selectores sin tipos de nodo ni contenido de texto", nodos: Selectores_sin_tipos_de_nodo_ni_contenido_de_texto }) }
    /*
    | #Duplicados ❌ Duplicados
    [ Duplicados ]
    */
    /* Contamos */ const número_de_apariciones_de_cada_selector = {}; Selectores_tipos_de_nodo_y_contenidos_de_texto.forEach(({ selector }) => {
        /* el número de veces */ if (Object.keys(número_de_apariciones_de_cada_selector).includes(selector)) { número_de_apariciones_de_cada_selector[selector]++
        /* que aparece un selector */ } else { número_de_apariciones_de_cada_selector[selector] = 1 } } )
    /* para ver si hay selectores duplicados. */ const selectores_duplicados = Selectores_tipos_de_nodo_y_contenidos_de_texto.filter(({ selector }) => número_de_apariciones_de_cada_selector[selector] > 1)

    /* Si hay selectores duplicados, lo consideramos como un error. */ if (selectores_duplicados.length > 0) { Error_en_el_circuito({ mensaje: "Hay selectores duplicados", nodos: selectores_duplicados } ) }
    /*
    | #Con_tipos_de_nodo_desconocido ❌ Con tipos de nodo desconocido
    [ Con tipos de nodo desconocido ]
    */
    /* Si hay un selector con algún tipo de nodo desconocido, */ const selectores_con_tipo_de_nodo_desconocido = Selectores_tipos_de_nodo_y_contenidos_de_texto.filter(({ tipos_de_nodo }) => tipos_de_nodo?.find(tipo_de_nodo => !Tipos_de_nodos.includes(tipo_de_nodo)))
    /* lo consideramos como un error. */ if (selectores_con_tipo_de_nodo_desconocido.length > 0) { Error_en_el_circuito({ mensaje: "Hay selectores con tipos de nodo desconocido", nodos: selectores_con_tipo_de_nodo_desconocido } ) }
    /*
    | #No_seleccionan_nada ❌ No seleccionan nada
    [ No seleccionan nada ]
    */
    /* Comparamos los selectores */ const selectores_que_no_seleccionan_nada = Selectores_tipos_de_nodo_y_contenidos_de_texto.filter(({ selector }) =>
        /* con los nodos que hay en el circuito para ver si hay algún selector que no está seleccionado nada. */ Nodos_que_hay_en_el_circuito.find(nodo => nodo.selector === selector) === undefined)

    /* Si un selector no selecciona nada, lo consideramos como un error. */ if (selectores_que_no_seleccionan_nada.length > 0) { Error_en_el_circuito({ mensaje: "Hay selectores que no seleccionan nada", nodos: selectores_que_no_seleccionan_nada } ) }
    /*
    | #Error-Nodos Nodos
    ---------
    - Nodos -
    ---------
    */
    /*
    | #Duplicados_que_deberían_ser_únicos ❌ Duplicados que deberían ser únicos
    [ Duplicados que deberían ser únicos ]
    */
    /* Si hay nodos duplicados que deberían ser únicos, */ const nodos_duplicados = Nodos_que_hay_en_el_circuito.filter(({ selector }) => Nodos_que_hay_en_el_circuito.filter(nodo => nodo.selector === selector).length > 1).filter(({ selector }) => selector.startsWith("#"))
    /* lo consideramos como un error. */ if (nodos_duplicados?.length > 0) { Error_en_el_circuito({ mensaje: "Hay nodos duplicados</br>que deberían ser únicos", nodos: nodos_duplicados }) }
    /*
    | #No_seleccionados ❌ No seleccionados
    [ No seleccionados ]
    */
    /* Comparamos los nodos que hay en el circuito */ const Nodos_no_seleccionados_incluidas_las_referencias_externas = Nodos_que_hay_en_el_circuito.filter(({ selector }) =>
        /* con los selectores que hay entre los archivos para ver si hay algún nodo que no está siendo seleccionado. */ !Selectores_tipos_de_nodo_y_contenidos_de_texto.find(({ selector: selector_que_selecciona }) => selector_que_selecciona === selector))

    /* Las referencias externas no se seleccionan, solo se referencian en el circuito. */  const Nodos_no_seleccionados = Nodos_no_seleccionados_incluidas_las_referencias_externas.filter(({ selector }) => !líneas_del_archivo_del_manifiesto.find(({ contenido_de_texto }) => contenido_de_texto.includes(`"${selector.replace(".", "")}":`)))

    /* Si hay nodos no seleccionados */ if (Nodos_no_seleccionados.length > 0) {
    /* lo consideramos como un error. */ Error_en_el_circuito({ mensaje: "Hay nodos no seleccionados", nodos: Nodos_no_seleccionados } ) }
    /*
    | #Referencias_externas 📝 Referencias externas
    [ Referencias externas ]
    */
    /* Las referencias externas son */ const Referencias_externas = Nodos_no_seleccionados_incluidas_las_referencias_externas
    /* los nodos no seleccionados con el nombre de clase igual que el nombre de algún módulo en el manifiesto. */ .filter(({ selector }) => líneas_del_archivo_del_manifiesto.find(({ contenido_de_texto }) => contenido_de_texto.includes(`"${selector.replace(".", "")}":`)))

    /* Debemos marcar que las referencias externas */ .map(({ selector }) => ({ selector: selector.replaceAll("@", "").replaceAll("/", ""), contenido_de_texto: selector.replace(".", ""), tipos_de_nodo: ["referencia-externa"],
        /* provienen del manifiesto, */ archivo: "package.json",
            /* así como de cuál línea. */ número_de_línea: líneas_del_archivo_del_manifiesto.findIndex(({ contenido_de_texto }) => contenido_de_texto.includes(`"${selector.replace(".", "")}":`)) + 1 }))

    /* Incluímos las referencias externas en los selectores, tipos de nodo y contenidos de texto. */ Selectores_tipos_de_nodo_y_contenidos_de_texto = [...Selectores_tipos_de_nodo_y_contenidos_de_texto, ...Referencias_externas]
    /*
    | #Nodos_seleccionados 📝 Nodos seleccionados
    -----------------------
    - Nodos seleccionados -
    -----------------------
    */
    const Nodos_seleccionados = Selectores_tipos_de_nodo_y_contenidos_de_texto.map(({ archivo, número_de_línea, selector, tipos_de_nodo, contenido_de_texto }) => Array.from(document.querySelectorAll(selector)).map(nodo => ({ elemento: nodo, selector, archivo, número_de_línea, tipos_de_nodo, contenido_de_texto }))).flat()
    /*
    | #Aplicación_de_las_propiedades Aplicación de las propiedades
    ---------------------------------
    - Aplicación de las propiedades -
    ---------------------------------
    */
    Nodos_seleccionados.forEach(({ elemento, archivo, número_de_línea, selector, tipos_de_nodo, contenido_de_texto }) => {
        /* A todos los nodos hay que agregarlas la clase «nodo». */ elemento.classList.add("nodo")
        /*
        | #Archivo_y_número_de_línea Archivo y número de línea
        [ Archivo y número de línea ]
        */
        elemento.setAttribute("href", `./${archivo}#L${número_de_línea}`)
        /*
        | #Tipos_de_nodo Tipos de nodo
        [ Tipos de nodo ]
        */
        if (tipos_de_nodo) elemento.classList.add(...tipos_de_nodo)
        /* Si el selector empieza con un punto, es una referencia. */ if (selector.startsWith(".")) elemento.classList.add("referencia")
        /*
        | #Contenido_de_texto Contenido de texto
        [ Contenido de texto ]
        */
        if (contenido_de_texto && contenido_de_texto.trim() !== "") { elemento.innerHTML = contenido_de_texto } } )
    /*
    | #Resaltar_todos_los_que_están_siendo_seleccionados_desde_el_mismo_archivo Resaltar todos los que están siendo seleccionados desde el mismo archivo
    [ Resaltar todos los que están siendo seleccionados desde el mismo archivo ]
    */
    Nodos_seleccionados.forEach(({ elemento, archivo }) => {
        /* Todos los nodos que están siendo seleccionados desde el mismo archivo, */ elemento.addEventListener("mouseenter", function() { document.querySelectorAll(`a.nodo[href^="./${archivo}"]`).forEach(nodo => nodo.classList.add("resaltado") ) } )
        /* deben ser resaltados cuando el cursor se mueva sobre alguno de ellos. */ elemento.addEventListener("mouseleave", function() { document.querySelectorAll(`a.nodo[href^="./${archivo}"]`).forEach(nodo => nodo.classList.remove("resaltado") ) } ) } )
    /*
    | #Navegación Navegación
    --------------
    - Navegación -
    --------------
    */
    /*
    | #Configuración_del_alejamiento_y_acercamiento 📝 Configuración del alejamiento y acercamiento
    ------------------------------------------------
    - Configuración del alejamiento y acercamiento -
    ------------------------------------------------
    */
    /* Medimos la altura */ const altura_de_la_ventana = window.innerHeight
    /* y anchura de la ventana. */ const anchura_de_la_ventana = window.innerWidth

    /* Medimos el. */ const circuito = document.querySelector("#_Circuito"); circuito.style.transformOrigin = "0 0"
    /* ancho y alto del circuito */ const anchura_del_circuito = circuito.clientWidth; const altura_del_circuito = circuito.clientHeight
    /*
    | #Pixeles_por_cada_entero_de_escala ⚙️ Pixeles por cada entero de escala
    [ Pixeles por cada entero de escala ]
    */
    /* - 6 */ const pixeles_por_cada_entero_de_escala = 6; let factor_de_escala = 1
    /*
    | #Altura_del_circuito ⚙️ Altura del circuito
    [ Altura del circuito ]
    */
    /* Hacemos que la altura del circuito sea igual a la altura de la ventana. */ factor_de_escala = (altura_de_la_ventana / altura_del_circuito - 1) * (100 / pixeles_por_cada_entero_de_escala); circuito.style.transform = `scale(${1 + (factor_de_escala * (pixeles_por_cada_entero_de_escala / 100)) } )`
    /*
    | #Anchura_del_circuito ⚙️ Anchura del circuito
    [ Anchura del circuito ]
    */
    /* Si al ajustar la altura, el ancho del circuito es mayor que el ancho de la ventana, */ if (anchura_del_circuito * (1 + (factor_de_escala * (pixeles_por_cada_entero_de_escala / 100))) > anchura_de_la_ventana) {
        /* calculamos el factor de escala necesario para que el ancho del circuito sea igual al ancho de la ventana. */ factor_de_escala = (anchura_de_la_ventana / anchura_del_circuito - 1) * (100 / pixeles_por_cada_entero_de_escala); circuito.style.transform = `scale(${1 + (factor_de_escala * (pixeles_por_cada_entero_de_escala / 100))})`}
    /*
    | #Factor_de_escala_relativo_a_la_ventana 📝 Factor de escala relativo a la ventana
    [ Factor de escala relativo a la ventana ]
    */
    const factor_de_escala_relativo_a_la_ventana = 1 + (factor_de_escala * (pixeles_por_cada_entero_de_escala / 100)); let desplazamiento_horizontal = 0; let desplazamiento_vertical = 0
    /*
    | #Acercamiento_y_alejamiento Acercamiento y alejamiento
    ------------------------------
    - Acercamiento y alejamiento -
    ------------------------------
    */
    /*
    | #Cálculo_del_factor_de_escala Cálculo del factor de escala
    --------------------------------
    - Cálculo del factor de escala -
    --------------------------------
    */
    /* Cuando se gire la rueda del ratón (o se haga lo equivalente con la almohadilla táctil), */ window.addEventListener("wheel", (evento) => { evento.preventDefault()
        /* ubicamos la posición del cursor */const límites_del_cicuito = circuito.getBoundingClientRect(); const posición_horizontal_del_cursor = evento.clientX - límites_del_cicuito.left; const posición_vertical_del_cursor = evento.clientY - límites_del_cicuito.top
        /* y calculamos el factor de escala actual */ const factor_de_escala_actual = 1 + (factor_de_escala * (pixeles_por_cada_entero_de_escala / 100))
        /*
        | #Acercamiento (condicional) Acercamiento
        [ Acercamiento ]
        */
        if (evento.deltaY < 0) { factor_de_escala += 1
        /*
        | #Alejamiento Alejamiento
        [ Alejamiento ]
        */
        } else if (evento.deltaY > 0 && (factor_de_escala_relativo_a_la_ventana / 2) < factor_de_escala_actual) { factor_de_escala -= 1 }

        /* Calculamos cual debe ser el nuevo factor de escala */ const nuevo_factor_de_escala = 1 + (factor_de_escala * (pixeles_por_cada_entero_de_escala / 100))
        /*
        | #Aplicación_del_factor_de_escala Aplicación del factor de escala
        [ Aplicación del factor de escala ]
        */
        /* Calculamos el desplazamiento necesario del circuito para que se mantenga en la misma posición relativa al cursor. */ const desplazamiento_necesario_para_mantener_el_cursor_en_el_mismo_punto = nuevo_factor_de_escala / factor_de_escala_actual

        /* Teniendo calculado el desplazamiento */ desplazamiento_horizontal += posición_horizontal_del_cursor - (posición_horizontal_del_cursor * desplazamiento_necesario_para_mantener_el_cursor_en_el_mismo_punto); desplazamiento_vertical += posición_vertical_del_cursor - (posición_vertical_del_cursor * desplazamiento_necesario_para_mantener_el_cursor_en_el_mismo_punto)
        /* y la escala, los aplicamos al circuito. */ circuito.style.transform = `translate(${desplazamiento_horizontal}px, ${desplazamiento_vertical}px) scale(${nuevo_factor_de_escala})`}, { passive: false } )
    /*
    | #Arrastre Arrastre
    ------------
    - Arrastre -
    ------------
    */
    /* Para arrastrar el circuito, */ let está_arrastrando = false; let posición_del_ratón = { x: 0, y: 0 }; let posición_del_circuito = { horizontal: 0, vertical: 0 }
    /* usamos el botón izquierdo del ratón. */ circuito.addEventListener("mousedown", (evento) => { está_arrastrando = true

        /*
        | #Cálculo_del_desplazamiento Cálculo del desplazamiento
        [ Cálculo del desplazamiento ]
        */
        /* Antes de empezar a arrastrar, ubicamos la posición del ratón */ posición_del_ratón = { x: evento.clientX, y: evento.clientY }
        /* y del circuito. */ posición_del_circuito = { horizontal: desplazamiento_horizontal, vertical: desplazamiento_vertical } } )

    /* Al arrastrar, */ window.addEventListener("mousemove", (evento) => { if (está_arrastrando) {
        /* calculamos el desplazamiento del ratón */ const desplazamiento_del_ratón = { horizontal: evento.clientX - posición_del_ratón.x, vertical: evento.clientY - posición_del_ratón.y }
        /* y el desplazamiento que hay que aplicar al circuito. */ desplazamiento_horizontal = posición_del_circuito.horizontal + desplazamiento_del_ratón.horizontal; desplazamiento_vertical = posición_del_circuito.vertical + desplazamiento_del_ratón.vertical
        /*
        | #Aplicación_del_desplazamiento Aplicación del desplazamiento
        [ Aplicación del desplazamiento ]
        */
        /* Aplicamos el desplazamiento al circuito, manteniendo el factor de escala. */ const factor_de_escala_actual = 1 + (factor_de_escala * (pixeles_por_cada_entero_de_escala / 100)); circuito.style.transform = `translate(${desplazamiento_horizontal}px, ${desplazamiento_vertical}px) scale(${factor_de_escala_actual})` } } )
    /*
    | #Dejar_de_arrastrar Dejar de arrastrar
    [ Dejar de arrastrar ]
    */
    /* Al soltar el botón del ratón */ window.addEventListener("mouseup", () => {
        /* dejamos de arrastrar. */ if (está_arrastrando) está_arrastrando = false } ) }
