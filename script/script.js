var dadosTeste={
    "codigoProduto": 111,
    "descricaoProduto": "Produto 1 teste",
    "taxaJuros": 0.0179,
    "resultadoSimulacao": 
    [
    {
    "tipo": "SAC",
    "parcelas": [
    {
    "numero": 1,
    "valorAmortizacao": 180.00,
    "valorJuros": 16.11,
    "valorPrestacao": 196.11
    },
    {
    "numero": 2,
    "valorAmortizacao": 180.00,
    "valorJuros": 12.89,
    "valorPrestacao": 192.89
    },
    {
    "numero": 3,
    "valorAmortizacao": 180.00,
    "valorJuros": 9.67,
    "valorPrestacao": 189.67
    },
    {
    "numero": 4,
    "valorAmortizacao": 180.00,
    "valorJuros": 6.44,
    "valorPrestacao": 186.44
    },
    {
    "numero": 5,
    "valorAmortizacao": 180.00,
    "valorJuros": 3.22,
    "valorPrestacao": 183.22
    }
    ]
    },
    {
    "tipo": "PRICE",
    "parcelas": [
    {
    "numero": 1,
    "valorAmortizacao": 173.67,
    "valorJuros": 16.11,
    "valorPrestacao": 189.78
    },
    {
    "numero": 2,
    "valorAmortizacao": 176.78,
    "valorJuros": 13.00,
    "valorPrestacao": 189.78
    },
    {
    "numero": 3,
    "valorAmortizacao": 179.94,
    "valorJuros": 9.84,
    "valorPrestacao": 189.78
    },
    {
    "numero": 4,
    "valorAmortizacao": 183.16,
    "valorJuros": 6.62,
    "valorPrestacao": 189.78
    },
    {
    "numero": 5,
    "valorAmortizacao": 186.44,
    "valorJuros": 3.34,
    "valorPrestacao": 189.78
    }
    ]
    }
    ]
    }

document.getElementById('apiForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var valorDesejado = document.getElementById('valor').value;
    var prazo = document.getElementById('prazo').value;

    var requestData = {
        valorDesejado: parseInt(valorDesejado),
        prazo: parseInt(prazo)
    };
    enviaDadosApi(requestData);
   
});



function enviaDadosApi(requestData){
   
    

    fetch( "https://apphackaixades.azurewebsites.net/api/Simulacao",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body : JSON.stringify(requestData),
    }).then((response)=>response.json())
    .then((dados)=>{
      
        console.log("API não respondendo como esperado! Usando dados Teste");
        
         modelaResposta(dados);
    }).catch((err=>{
        console.log("no no recebimento de dados  com fetch");
        
    }));
}

function modelaResposta(dados){
     document.getElementById("simulacoes").classList.remove("d-none");//classList.add("")

    dados=dadosTeste;
   
    document.getElementById("descricaoProduto").innerHTML=dados.descricaoProduto;
    document.getElementById("codigoProduto").innerHTML=dados.codigoProduto;
    document.getElementById("taxaJuros").innerHTML=dados.taxaJuros;
    
    for(let i=0;i<dados.resultadoSimulacao.length;i++){
       var tabela;
        if(dados.resultadoSimulacao[i].tipo=="SAC") {
             tabela=document.getElementById("tabelaSAC");
             renovaTabela(tabela);
             
            alert("entrou SAC")
        }else if(dados.resultadoSimulacao[i].tipo=="PRICE"){
            alert("entrou price")
            tabela=document.getElementById("tabelaPRICE"); 
            renovaTabela(tabela);
        }
       let numeroParcelas=dados.resultadoSimulacao[i].parcelas.length;   
       alert("parcelas:"+numeroParcelas);
       console.log(tabela);
       for(let j=0;j<numeroParcelas;j++){
            const tr=document.createElement("tr");
            const td1=document.createElement("td");
            td1.innerHTML=dados.resultadoSimulacao[i].parcelas[j].numero;
            const td2=document.createElement("td");
            td2.innerHTML=dados.resultadoSimulacao[i].parcelas[j].valorAmortizacao;
            const td3=document.createElement("td");
            td3.innerHTML=dados.resultadoSimulacao[i].parcelas[j].valorJuros;
            const td4=document.createElement("td");
            td4.innerHTML=dados.resultadoSimulacao[i].parcelas[j].valorPrestacao;

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3); 
            tr.appendChild(td4);

            
            var tabelaCorpo=tabela.lastElementChild;
            tabelaCorpo.appendChild(tr);
            console.log(tabelaCorpo);

        }
    }
}
function renovaTabela(tabela){
            tabela.lastElementChild.remove();
            const novoCorpo=document.createElement("tbody");
            tabela.appendChild(novoCorpo);
}
function criaLinhaTabela(dados){
        const tr=document.createElement("tr");
        const td1=document.createElement("td");
        td1.innerHTML="10";
        const td2=document.createElement("td");
        td2.innerHTML="200";
        const td3=document.createElement("td");
        td3.innerHTML="30";
        const td4=document.createElement("td");
        td4.innerHTML="40";
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3); 
        tr.appendChild(td4);

        const table=document.getElementById("tableSAC");
        console.log(table);
        const tabelaCorpo=table.lastElementChild;
        tabelaCorpo.appendChild(tr);
        console.log(tabelaCorpo);
    
}