function generate(){
    let pismena = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
    let dlzka = document.getElementById("dlzkaInput").value;
    let prve = document.getElementById("prveInput").value;
    let posledne = document.getElementById("posledneInput").value;
    let slovo = "";
    let dalsie = document.getElementById("dalsieInput").value;
    let specifikovanePismena = [];
    if(dalsie != ""){
        for(let pismenko of dalsie.split(",")){
            try{
                let cislo = pismenko.split(" - "[0]);
                let pismeno = pismenko.split(" - ")[1];
                if(!cislo || !pismeno) return alert("Zlý formát - ďalšie písmená");
                specifikovanePismena[parseInt(cislo)] = pismeno;
            } catch {
                return alert("Zlý formát - ďalšie písmená");
            }

        }
    }
    if(dlzka > 25) return alert("Maximálna dĺžka je 25");
    if((!pismena.includes(prve) && prve != "") || (!pismena.includes(posledne) && posledne != "")) return alert("Invalid písmeno!");
    if(prve != "") specifikovanePismena[1] = prve;
    if(posledne != "") specifikovanePismena[dlzka] = posledne
    for(let i = 0; i < dlzka; i++){
        if(specifikovanePismena[i + 1]){
            slovo += specifikovanePismena[i + 1]
        } else{
            slovo += pismena[Math.floor(Math.random() * pismena.length)]
        }
    }

    document.getElementById("vygenerovane").innerHTML = slovo;
}