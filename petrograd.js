window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("Siden vises");
    visProdukt();
}

function visProdukt() {
    // KLON PRODUKT_TEMPLATE
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    // INDSÆT DATA I KLON

    // APPEND KLON TIL .PRODUKTLISTE
    document.querySelector(".produktliste").appendChild(klon);
}
