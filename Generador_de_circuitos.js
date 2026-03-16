import fs from "fs"
import path from "path"
import ignore from "ignore"
import { minify_sync } from "terser"
import Estilos from "./fuente/Estilos.js"
import Generar_hipertexto from "./fuente/Generador_de_hipertexto.js"
import Tipos_de_nodos from "./fuente/Tipos_de_nodos.js"
import Generar_instrucciones from "./fuente/Generador_de_instrucciones.js"
export default () => {
    const gitignore = ignore().add(fs.existsSync(path.join(process.cwd(), ".gitignore")) ? fs.readFileSync(path.join(process.cwd(), ".gitignore"), "utf8") : "")
    const ignorado_por_el_formateador = ignore().add(fs.existsSync(path.join(process.cwd(), ".ignorado_por_el_formateador")) ? fs.readFileSync(path.join(process.cwd(), ".ignorado_por_el_formateador"), "utf8") : "")
    const archivo_del_circuito = fs.readFileSync(path.join(process.cwd(), "circuito.json"), "utf8")
    const líneas_del_archivo_del_circuito = archivo_del_circuito.split("\n").map((línea, identificador) => ({ contenido_de_texto: línea.replace(/\r$/, ""), número_de_línea: identificador + 1 }))
    const archivo_del_manifiesto = fs.readFileSync(path.join(process.cwd(), "package.json"), "utf8")
    const líneas_del_archivo_del_manifiesto = archivo_del_manifiesto.split("\n").map((línea, identificador) => ({ contenido_de_texto: línea.replace(/\r$/, ""), número_de_línea: identificador + 1 }))
    /*
    | .Generador_de_circuitos Generador de circuitos
    ==========================
    = Generador de circuitos =
    ==========================
    */
    /*
    | #Archivos_que_podrían_contener_referencias_al_circuito 📝 Archivos que</br>podrían contener</br>referencias al circuito
    ---------------------------------------------------------
    - Archivos que podrían contener referencias al circuito -
    ---------------------------------------------------------
    */
    /* Listamos todos los archivos en el directorio actual, recursivamente. */ let Archivos_que_podrían_contener_referencias_al_circuito = fs.readdirSync(process.cwd(), { recursive: true })
    /*
    | #No_es_un_archivo_JavaScript (condicional) ⏭️ No es un archivo JavaScript
    [ No es un archivo JavaScript ]
    */
    /* Si no es un archivo JavaScript, lo ignoramos. */.filter(archivo => path.extname(archivo) === ".js")
    /*
    | #Está_en_la_lista_de_archivos_que_deben_ser_ignorados (condicional) ⏭️ Está en la lista de archivos que deben ser ignorados
    [ Está en la lista de archivos que deben ser ignorados ]
    */
    /* Ignoramos los mismos archivos ignorados por Git */ .filter(archivo => !gitignore.ignores(archivo))
    /* y el formateador. */ .filter(archivo => !ignorado_por_el_formateador.ignores(archivo))
    /*
    | #Líneas 📝 Líneas
    ----------
    - Líneas -
    ----------
    */
    /* Separamos */ let Líneas_de_los_archivos_que_podrían_contener_referencias_al_circuito = Archivos_que_podrían_contener_referencias_al_circuito.map(ubicación_del_archivo =>
        /* el archivo */ fs.readFileSync(path.join(process.cwd(), ubicación_del_archivo), "utf8")
        /* por líneas. */ .split("\n").map(línea => línea.replace(/\r$/, "").trim())

        /* De las líneas nos interesa saber también */ .map((línea, identificador) => ({ contenido_de_texto: línea,
            /* el archivo del que provienen */ archivo: ubicación_del_archivo.replaceAll("\\", "/"),
                /* y su número de línea. */ número_de_línea: identificador + 1 } ) ) ).flat()
    /*
    | #No_refiere_al_circuito (condicional) ⏭️ No refiere al circuito
    [ No refiere al circuito ]
    */
    /* Si la línea */ let Líneas_con_referencias_al_circuito = Líneas_de_los_archivos_que_podrían_contener_referencias_al_circuito.filter((línea) =>
    /* no refiere al circuito, la ignoramos. */ línea.contenido_de_texto.trim().startsWith("|"))
    /*
    | #Refiere_al_circuito Refiere al circuito
    [ Refiere al circuito ]
    */
    /* A la línea */ Líneas_con_referencias_al_circuito = Líneas_con_referencias_al_circuito.map(línea =>
        /* le quitamos la marca que indica que es una referencia al circuito. */  ({...línea, contenido_de_texto: línea.contenido_de_texto.replace("|", "").trim()}))

        /* Si al quitarle la marca, la línea queda vacía, la ignoramos. */ .filter(línea => línea.contenido_de_texto !== "")
    /*
    | #Selectores_tipos_de_nodo_y_contenidos_de_texto 📝 Selectores, tipos de nodo y contenidos de texto.
    [ Selectores, tipos de nodo y contenidos de texto. ]
    */
    /* Intentamos dividir la línea */ const Selectores_tipos_de_nodo_y_contenidos_de_texto = Líneas_con_referencias_al_circuito.map(línea => {
        /* en 3 partes. */ let partes = línea.contenido_de_texto.replace("(", "<>").replace(")", "<>").split("<>").map(parte => parte.trim())

        /* Si se divide exitosamente, */ if (partes.length === 3) { return { ...línea,
            /* la primera parte será el selector, */ selector: partes[0].trim(),
            /* la segunda parte serán los tipos de nodo, */ tipos_de_nodo: partes[1].trim().split(" ").map(tipo_de_nodo => tipo_de_nodo.trim()),
            /* y la tercera parte será el contenido de texto. */ contenido_de_texto: partes[2].trim() } }

        /* Si no se pudo dividir en 3 partes, */
        /* la intentamos dividir en 2 partes */ partes =  línea.contenido_de_texto.replace(" ", "<>").split("<>").map(parte => parte.trim())
        /* Si se divide exitosamente, */ if (partes.length === 2) { return { ...línea,
            /* la primera parte será el selector, */ selector: partes[0].trim(),
            /* y la segunda parte será el contenido de texto. */ contenido_de_texto: partes[1].trim() } }

        /* Si no se pudo dividir en 2 partes, */ return { archivo: línea.archivo, número_de_línea: línea.número_de_línea,
            /* significa que solo tiene selector. */ selector: línea.contenido_de_texto } } )
    /*
    | #Generar_las_instrucciones Generar las instrucciones
    -----------------------------
    - Generar las instrucciones -
    -----------------------------
    */
    /* Generamos las instrucciones. */ let instrucciones = `(${Generar_instrucciones.toString()})({ Selectores_tipos_de_nodo_y_contenidos_de_texto: ${JSON.stringify(Selectores_tipos_de_nodo_y_contenidos_de_texto)}, líneas_del_archivo_del_circuito: ${JSON.stringify(líneas_del_archivo_del_circuito)}, líneas_del_archivo_del_manifiesto: ${JSON.stringify(líneas_del_archivo_del_manifiesto)}, Tipos_de_nodos: ${JSON.stringify(Tipos_de_nodos)} })`
    /*
    | #Comprimir Comprimir
    [ Comprimir ]
    */
    /* Comprimimos las instrucciones. */ instrucciones = minify_sync(instrucciones).code
    /*
    | #Generar_el_hipertexto Generar el hipertexto
    -------------------------
    - Generar el hipertexto -
    -------------------------
    */
    /* Generamos el hipertexto. */ const hipertexto = JSON.parse(archivo_del_circuito).map(grupo => `<div>${Generar_hipertexto({ nodos: grupo })}</div>`).join("")
    /*
    | #Generar_el_circuito Generar el circuito
    -----------------------
    - Generar el circuito -
    -----------------------
    */
    /* Agregamos los estilos, */ const circuito = `<style>${Estilos}</style>` +
    /* la sección de errores, */ "<div id=\"_Error_en_el_circuito\" class=\"sector\"><a class=\"nodo\"></a><div class=\"sector\"></div></div>" +
    /* el contenido del circuito */ `<div class="sector" style="background-color: transparent;"><div id="_Circuito" style="flex-shrink: 0;"><div class="sector">${hipertexto}</div></div></div>` +
    /* y las instrucciones. */ `<script>${instrucciones}</script>`
    /*
    | #Guardar_el_circuito Guardar el circuito
    -----------------------
    - Guardar el circuito -
    -----------------------
    */
    /* Guardamos el circuito en circuito.md */ fs.writeFileSync(path.join(process.cwd(), "circuito.md"),  circuito) }
