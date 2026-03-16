const nombre_del_selector = ({ selector }) => selector.replace("#", "").replace(".", "").replaceAll("@", "").replaceAll("/", "")
const Generar_hipertexto = ({ nodos }) => { let hipertexto = ""
    /*
    | .Generador_de_hipertexto Generador de hipertexto
    ===========================
    = Generador de hipertexto =
    ===========================
    */
    /*
    | #Nodos Nodos
    ---------
    - Nodos -
    ---------
    */
    nodos.forEach(nodo => {
        /*
        | #Sector (condicional) Sector
        ----------
        - Sector -
        ----------
        */
        if (nodo.sector) { hipertexto += `<div class="sector">${Generar_hipertexto({ nodos: (Array.isArray(nodo.sector) ? nodo.sector : [nodo.sector]) })}` +

        /*
        | #Nodos_en_un_sector 🔁 Nodos
        [ Nodos en un sector ]
        */
        `${nodo.nodos ? `<div>${Generar_hipertexto({ nodos: Array.isArray(nodo.nodos) ? nodo.nodos : [nodo.nodos] })}</div>` : ""}</div>`

        /*
        | #Nodos_conectados (condicional) 🔁 Nodos conectados
        --------------------
        - Nodos conectados -
        --------------------
        */
        } else if (nodo.conexión) { hipertexto += `<div class="conexión">${Generar_hipertexto({ nodos: nodo.conexión })}</div>`
        /*
        | #Nodo Nodo
        --------
        - Nodo -
        --------
        */
        } else if (typeof nodo === "string") { hipertexto += `<a ${nodo.startsWith("#") ? "id" : "class"}="${nombre_del_selector({selector: nodo})}"></a>`} } ); return hipertexto }; export default Generar_hipertexto
