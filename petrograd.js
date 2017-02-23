window.addEventListener("load", sidenVises);

function sidenVises() {
    console.log("Siden vises");

    // LÆS PRODUKTLISTE
    $.getJSON("http://petlatkea.dk/2017/dui/api/productlist?callback=?", visProduktListe);
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
    klon.querySelector(".data_navn").innerHTML = produkt.navn;
    klon.querySelector(".data_pris").innerHTML = produkt.pris;

    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    // APPEND KLON TIL .PRODUKTLISTE
    document.querySelector(".produktliste").appendChild(klon);
}
