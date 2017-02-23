window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("Siden vises");

    // LÆS PRODUKTLISTE
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);

    visProdukt();
}

function visProduktListe(listen) {
    console.table(listen);
    listen.forEach(visProdukt);
}

function visProdukt(produkt) {
    console.log(produkt);
    // KLON PRODUKT_TEMPLATE
    var klon = document.querySelector("#produkt_template").content.cloneNode(true);

    // INDSÆT DATA I KLON

    // APPEND KLON TIL .PRODUKTLISTE
    document.querySelector(".produktliste").appendChild(klon);
}
