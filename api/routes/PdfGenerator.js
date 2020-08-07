/*
  Insert QRCODE Dinamic in PDF archive.
  Date : 01/08/2020
  By : Tiago R.Santos

  Retorna dados de um arquivo JSON , dinamicamente vindo da API no Node.JS

  Email : tiago.programador@hotmail.com

  GitHub: www.github.com/tiglinux

  With : Node.JS /HTML + JavaScript;
**/

const express = require("express");
const app = express();
const fs = require("fs");


//Pega todo o objeto
let object = require("../apiJson/teste.json");
//Posição da nota JSON
let indexNote = require("../apiJson/teste.json");
//Valor do Prêmio da nota JSON
let valuePremium = require("../apiJson/teste.json");


app.use(express.static("public"));

//Generating PDF with Get method
app.get("/qrcode", (req, res) => {
  let i = 0;
  //Array de Encriptados via JSON
  let encriptadoPosition = object.map((index) => {
    return index.encripted;
  });

  //Array de Index Note
  let indexNotePosition = object.map((index) => {
    return index.indexNote;
  });

  //Array de Value Premium
  let valuePremiumPosition = object.map((index) => {
    return index.value;
  });
 
  
  //Inserção para Colocar tags TR (Novas Linhas);
  let middleLinha = ``;
  //Inserção para colocar colunas;
  let middleColunas = ``;

  //Valores de Notas indices
  //Array de index Note de 400 posições.
  let middleIndexNote = [];

  //Array de Encriptado Position
  let middleEncriptado = [];

  //Array de Valor
  let middleValuePremium = [];



  //Acrescenta um novo numero da Nota. em uma nova div num array vazio;
  for(let i = 0; i < indexNotePosition.length; i+= 1){
    middleIndexNote.push(`<div class="noteNumber">Nota nº ${i+1}</div>`); //Cada numero de nota tem um numero diferente;
  }
 //Acrescenta uma nova string hash para Valor dentro do QRCODE;
 for(let i = 0; i< encriptadoPosition.length; i+=1){
    middleEncriptado.push(encriptadoPosition[i]);
 }

 //Acrescenta um novo valor de prêmio na array ;
 for(let i = 0; i < valuePremiumPosition.length;i+=1){
   middleValuePremium.push(valuePremiumPosition[i]);
 }

  //Coluna com cada qrcode
  for (let i = 0; i < 400; i++) {
    middleColunas += `
   <td class="ColumnQRCODE" margin-top:10px;">
        <img src="https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=${middleEncriptado[i]}" class="qrcodes">
            <div class="valuePremium">R$ ${middleValuePremium[i]}</div>
             ${middleIndexNote[i]}
             <div class="campaignNumber">CAM94</div>
             <div class="storeName">Loja Teste Espírito Santo</div> 
  
      </td>`;
  }


  //Linha

  for (let i = 0; i < 1; i++) {
    middleLinha += `<tr class="lineQR">
   ${middleColunas}
    </tr>`;
  }

  let conteudoHTML = `
  
  <table>
   ${middleLinha}
                                     
                      
  </table>
                    <style>
                        img.qrcodes{
                          width:70px;
                          height:80px;
                        }
                       /*  td:first-child{
                          background:red;
                        } */
                        .ColumnQRCODE{
                          margin-bottom:150px;
                        }

                        tr{
                          display:flex;
                          flex-direction:row;
                          flex-wrap:wrap;
                        }
                       
                        
                       
                      .storeName {
                        font-family: Arial, Helvetica, sans-serif;
                        float: right;
                        position:relative;
                        top:75px;
                        left: -70px;
                        font-size: 8px;
                        font-weight: bold;
                        color: red;
                      
                                        
                      }
                      
                      .valuePremium {
                        font-family: Arial, Helvetica, sans-serif;
                        float: right;
                        position: relative;
                        top:9px;
                        left:-156px;
                        font-weight: bold;
                        font-size: 8px;
                        color: red;
                      
              
                      }
                      .noteNumber {
                        font-family: Arial, Helvetica, sans-serif;
                        float: right;
                        position:relative;
                        top:54px;
                        left:-120px;
                        font-size: 8px;
                        font-weight: bold;
                        color: red;
                      }
                      .campaignNumber {
                        font-family: Arial, Helvetica, sans-serif;
                        float: right;
                        position:relative;
                        top:40px;
                        left: -94px;
                        font-size: 8px;
                        font-weight: bold;
                        color: red;
                      }
                    </style> 
  `;
  res.type('html').send(conteudoHTML);
});

app.listen(3001, () => {
  console.log(`Servidor rodando na porta 3001`);
});

module.exports = app;

//template string
