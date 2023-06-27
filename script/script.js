/*var dadosTesteSemApi={  //****VARIÁVEL PARA TESTE RÁPIDO DE LAYOUT, COM PADRÃO DE RECEBIMENTO VIA API
    "codigoProduto": 1,     //***SETA A VARIAVEL (dados) na linha 146 deste aquivo, NECESSITA RECARREGAR PAGINA...
    "descricaoProduto": "Produto 1", // POIS O LOOP DE LAYOUT DEPENDE DA RESPOSTA DA API
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
    }*/

    document.querySelector("#valor").addEventListener('input',function(){// layout amigável para frontEnd
                                                                        //processa a cada digito novo no input #valor(event input)
    this.value=this.value.replace(/[^\d]/g,"");//excui tudo que Não é dígito(0-9) da entrada
    this.value=this.value.replace(/^[0]+/g,"");//exclui zeros a esquerda
    switch (this.value.length){
        case 0:break;
        case 1:
            this.value="0,0"+this.value;
            break;
        case 2:
            this.value="0,"+this.value;
            break; 
        case 3:case 4:case 5:
            this.value=this.value.replace(/(\d{1,3})(\d{2})/g, '$1,$2');
            break;    
        case 6:case 7:case 8:
            this.value=this.value.replace(/(\d{1,3})(\d{3})(\d{2})/g, '$1.$2,$3');
            break;  
        case 9:case 10:case 11:
            this.value=this.value.replace(/(\d{1,3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3,$4');
             break;  
        case 12:case 13:case 14:
            this.value=this.value.replace(/(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3.$4,$5');
            break;
        case 15:case 16:case 17:
            this.value=this.value.replace(/(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{3})(\d{2})/g,'$1.$2.$3.$4.$5,$6');
            break;    
        default:        
            alert("Valor Acima dos parâmetros estabelecidos para o produto");
            this.value=this.value.replace(/[\d]$/,"");
            this.value=this.value.replace(/(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{3})(\d{2})/g,'$1.$2.$3.$4.$5,$6');
    }
});

    document.getElementById('apiForm').addEventListener('submit', function(event) {
    event.preventDefault();//aborta comportamento de envio padão do form

    var valorDesejado = document.getElementById('valor').value;//espera somente digitos, filto na linha 80 a 111
    var prazo = document.getElementById('prazo').value; //validação no próprio input(#prazo) no arquivo index.html 
    valorDesejado=parseFloat(valorDesejado.replace(/[^\d]/g,"")/100);//conversão em number com 2 casas decimais após filtrar somente os digitos(númericos)
      
    var requestData = {
        valorDesejado: valorDesejado,
        prazo: parseInt(prazo) //prazo validado no próprio formulário html
    };
    if(!isNaN( valorDesejado)){ //teste de validade
     enviaDadosApi(requestData);
     
    }else {
        alert("O Valor Desejado digitado é INVÁLIDO, tente novamente");
    }
});

function enviaDadosApi(requestData){
   
    
    fetch( "https://apphackaixades.azurewebsites.net/api/Simulacao",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body : JSON.stringify(requestData),
    }).then((response)=>{
        response.json();
       
    }).then((dados)=>{
    //  dados=dadosTesteSemApi;//dados para teste sem concexão com api
        if(dados!=undefined) modelaResposta(dados);
        
    }).catch((err=>{
        console.log("erro no recebimento de dados  com fetch");
        
    }));
}

function modelaResposta(dados){
    document.querySelector("#alertaSucesso").classList.add("show");
    document.querySelector("#novaSimulacao").classList.remove("show");
     document.getElementById("simulacoes").classList.remove("d-none");
     document.getElementById("descricaoProduto").innerHTML=dados.descricaoProduto;
    document.getElementById("codigoProduto").innerHTML=dados.codigoProduto;
    document.getElementById("taxaJuros").innerHTML=dados.taxaJuros;
    
    for(let i=0;i<dados.resultadoSimulacao.length;i++){
       var tabela;
        if(dados.resultadoSimulacao[i].tipo=="SAC") {
             tabela=document.getElementById("tabelaSAC");
             renovaTabela(tabela);
             
            
        }else if(dados.resultadoSimulacao[i].tipo=="PRICE"){
           
            tabela=document.getElementById("tabelaPRICE"); 
            renovaTabela(tabela);
        }
       let numeroParcelas=dados.resultadoSimulacao[i].parcelas.length;   
       
     //  console.log(tabela);
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
          //  console.log(tabelaCorpo);

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
        const tabelaCorpo=table.lastElementChild;
        tabelaCorpo.appendChild(tr);
      
    
}
function fechaAlertaSucesso(){
    if( document.querySelector('#alertaSucesso')!=null){
        document.querySelector('#alertaSucesso').classList.remove("show");
    }
   document.getElementById("simulacoes").classList.add("d-none");
   
}