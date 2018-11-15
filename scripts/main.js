var submitButton=document.getElementById('submit-button');
var resetButton=document.getElementById('reset-button');
var showLeadButton=document.getElementById('show-leads-button');
var nome=document.getElementById('input-nome');
var database=firebase.database();

function writeData(id,data){

    database.ref('meta/').set({
        qtd: id+1
    });  

     var updates = {};
     updates['leads/' + (id+1)] = {
         nome: data
     };
     

    return firebase.database().ref().update(updates);



}

function getTamanho(){

    return firebase.database().ref('/meta/').once('value').then(function(snapshot) {
        
        let quant = snapshot.val().qtd;
        document.getElementById('tamanho').textContent=quant;

    });

}

submitButton.onclick = function(){
    // console.log(nome.value);

    // return firebase.database().ref('/meta/').once('value').then(function(snapshot) {
    //     console.log(snapshot.val().qtd);

    //     writeData(Number(snapshot.val().qtd),nome.value);

    //   });

    alert('função desabilitada')

    
}

resetButton.onclick = function(){

    // database.ref('leads/').set({
        
    // });  
    // database.ref('meta/').set({
    //     qtd: 0
    // });  

    alert('função desabilitada');

}


function resetDB() {

    var pwd = prompt('certeza jovem? digite a senha:');

    if (pwd=='resetaaijovem'){

        database.ref('leads/').set({
        
        });  
        database.ref('meta/').set({
            qtd: 0
        });  


    }

}


showLeadButton.onclick = function(){

    

    return firebase.database().ref('/meta/').once('value').then(function(snapshot) {
        
        var quant = snapshot.val().qtd;

        if (quant ==0){
            alert('DB vazia!')
            return;
        }

        showLeadButton.hidden = true;

        return firebase.database().ref('/leads/').once('value').then(function(snapshot) {
        
            var i=1;
            var leads=snapshot.val()[i];
            var csv="email,nome,ip,tipo,hora,interesse\n"

            for (i=1;i<=quant;i++){

                leads=snapshot.val()[i];
        
                var paragrafo = document.createElement("P");
                var atrib = document.createAttribute("id");
                atrib.value="p"+i;
                paragrafo.setAttributeNode(atrib);
                var text = document.createTextNode(leads.email + ',' + leads.nome + ',' + leads.ip + ',' + leads.tipo + ',' + leads.hora + ',' + leads.interesse);
                csv=csv+leads.email + ',' + leads.nome + ',' + leads.ip + ',' + leads.tipo + ',' + leads.hora + ',' + leads.interesse + "\n";


                paragrafo.appendChild(text);
                document.body.appendChild(paragrafo);
            }
            
            //console.log(csv);

            var downloadLink = document.createElement("a");
            var blob = new Blob(["\ufeff", csv]);
            var url = URL.createObjectURL(blob);
            downloadLink.href = url;
            downloadLink.download = "LeadsExport.csv";  //Name the file here
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

        });

    });

}
