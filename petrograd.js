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

    // VIS RABAT
    var rabatpris = Math.ceil(produkt.pris - (produkt.pris * produkt.rabatsats / 100));
    klon.querySelector(".data_rabatpris").innerHTML = rabatpris;

    // VIS BILLEDE
    klon.querySelector(".data_billede").src = "/imgs/small/" + produkt.billede + "-sm.jpg";

    // MODALKNAP
    klon.querySelector("button").dataset.id = produkt.id;
    klon.querySelector("button").addEventListener("click", knapKlikketPå)

    // UDSOLGT
    if (produkt.udsolgt == false) {
        // PRODUKTET ER IKKE UDSOLGT
        // UDSOLGTTEKST SKAL FJERNES
        var udsolgttekst = klon.querySelector(".udsolgttekst");
        udsolgttekst.parentNode.removeChild(udsolgttekst);
    } else {
        klon.querySelector(".pris").classList.add("udsolgt");
    }

    // DER ER IKKE RABAT. RABATPRISEN SKAL FJERNES
    if (produkt.udsolgt == true || produkt.rabatsats == 0) {
        var rabatpris = klon.querySelector(".rabatpris");
        rabatpris.parentNode.removeChild(rabatpris);
    } else {
        klon.querySelector(".pris").classList.add("rabat");
    }

    // APPEND KLON TIL .PRODUKTLISTE
    //document.querySelector(".produktliste").appendChild(klon);
    document.querySelector(".forretter").appendChild(klon);
    console.log("." + produkt.kategori)
        // document.querySelector("." + produkt.kategori).appendChild(klon);

    /*if (produkt.kategori == "forretter") {
        document.querySelector(".forretter").appendChild(klon);
    } else if ()*/

}

function knapKlikketPå(oplysningerOmEventet) {
    document.querySelector("#myModalLabel").textContent = "Loader...";
    document.querySelector("#myModal .modal-body p").textContent = "...";

    var produktId = oplysningerOmEventet.target.dataset.id;

    // SEND FORESPØRGSEL TIL http://petlatkea.dk/2017/dui/api/product?callback=?&id=21 MED DET RIGTIGE ID
    $.getJSON("http://petlatkea.dk/2017/dui/api/product?callback=?&id=" + produktId, visModalIndhold);

}

function visModalIndhold(mereInfo) {
    console.log(mereInfo);

    document.querySelector("#myModalLabel").textContent = mereInfo.navn;
    document.querySelector("#myModal .modal-body p").textContent = mereInfo.langbeskrivelse;
}
