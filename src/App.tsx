import React, {useState} from 'react';
import './App.css';
import {Row, Col, Button} from "reactstrap"

function App() {
  const [jsonWord, setJasonWord] = useState("")
  const [CSVFinal, setCSVFinal] = useState("")

  function convert (){

    // Validação de JSON
    if(jsonWord.length === 0){
      alert("Por favor, insira um JSON.");
      return false;
    }
  
    try{
      var validado = JSON.parse(jsonWord);
    }
    catch(e){
      alert("O JSON inserido é inválido!");
      return false;
    }

    // Passando JSON para String
    var dados = JSON.parse(jsonWord)

    // pegando as propriedades da tabela
    var propriedades = [];
    var primeiraLinha = JSON.stringify(dados[0]).split(",");
    for(let item of primeiraLinha){
      let nomes = item.split('"');
      propriedades.push(nomes[1]);
    }
    
    // Alinhando as propriedades na primeira linha
    var prototipo_csv = [];
    prototipo_csv[0] = '';
    for(let prop of propriedades){
      prototipo_csv[0] += '"' + prop + '",';
    }
    console.log(prototipo_csv)
  
    // Adicionando os dados do array
    for(var i=0; i < dados.length; i++){
      prototipo_csv[i+1] = '';
      for(let prop of propriedades){
        prototipo_csv[i+1] += '"' + dados[i][prop] + '",';
      }
    }
  
    // Alinhando no formato CSV
    var resultado = '';
    for(let item of prototipo_csv){
      resultado += item + "\n"
    }
    
  setCSVFinal(resultado)
    console.log(resultado)
  }

  function limparCaixas() {
    setJasonWord("")
    setCSVFinal("")
  }
  return (
    <div className="App">
      <h1>Conversor JSON2CSV</h1>

      <div className="ContainerInput">
        <Row>
          <Col md={6}>
            <h3>JSON</h3>
            <textarea className="inputs" rows={20} value={jsonWord} onChange={(e) => setJasonWord(e.target.value)} />

            </Col>
          <Col md={6}>
          <h3>CSV</h3>
            <textarea className="inputs" onFocus={() => alert("Digite no outro campo")} rows={20} value={CSVFinal} />
          </Col>
        </Row>
        <Button className="mr-2" color="info" onClick={convert}> Converter </Button>
        <Button color="danger" onClick={limparCaixas}> Limprar </Button>
      </div>
    </div>
  );
}

export default App;

// json de exemplo

// [
//   {
//   "nome": "Hugo",
//   "ocupacao": "dev",
//   "idade": "24 anos"
//   },
//   {
//   "nome": "Lucas",
//   "ocupacao": "dev2",
//   "idade": "26 anos"
//   }
//   ]