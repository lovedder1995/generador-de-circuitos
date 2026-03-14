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
        if (nodo.sector) { hipertexto += `<div class="sector">${nodo.sector.conexión ?
        /*
        | #Nombre_del_sector Nombre del sector
        ---------------------
        - Nombre del sector -
        ---------------------
        */
        /*
        | #Nombre_del_sector_con_conexión_de_nodos (condicional) Con conexión de nodos
        [ Nombre del sector con conexión de nodos ]
        */
            Generar_hipertexto({ nodos: [nodo.sector] }) :
        /*
        | #Nombre_del_sector_simple Simple
        [ Nombre del sector simple ]
        */
            `<a ${nodo.sector.startsWith("#") ? "id" : "class"}="${nombre_del_selector({selector: nodo.sector})}"></a>`}<div>${nodo.nodos ?
        /*
        | #Nodos_en_un_sector 🔁 Nodos
        [ Nodos en un sector ]
        */
            Generar_hipertexto({ nodos: nodo.nodos }) : ""}</div></div>`
        /*
        | #Nodo Nodo
        --------
        - Nodo -
        --------
        */
        /*
        | #Nodos_conectados (condicional) Nodos conectados
        [ Nodos conectados ]
        */
        } else if (nodo.conexión) { hipertexto += `<div class="conexión">${nodo.conexión.map(conexión => `<a ${conexión.startsWith("#") ? "id" : "class"}="${nombre_del_selector({selector: conexión})}"></a>`).join("")}</div>`
        /*
        | #Nodo_simple Simple
        [ Nodo simple ]
        */
        } else if (typeof nodo === "string") { hipertexto += `<a ${nodo.startsWith("#") ? "id" : "class"}="${nombre_del_selector({selector: nodo})}"></a>`} } ); return hipertexto }; export default Generar_hipertexto
