"use strict";
const form = document.querySelector("#infos_mens");
const corpoTabela = document.querySelector("#tbody");
const recuperarLocalStorage = () => {
    const recados = JSON.parse(localStorage.getItem("recados") || "[]");
    return recados;
};
const atualizarLocalStorage = (recados) => {
    localStorage.setItem("recados", JSON.stringify(recados));
};
const salvarRecado = (event) => {
    event.preventDefault();
    const descricao = form?.descricao.value;
    const recado = form?.detalhamento.value;
    const recados = recuperarLocalStorage();
    recados.push({
        id: definirID() + 1,
        descricao,
        recado
    });
    atualizarLocalStorage(recados);
    alert("Recado adicionado com sucesso");
    preencherTabela();
    form.reset();
};
const preencherTabela = () => {
    const recados = recuperarLocalStorage();
    corpoTabela.innerHTML = "";
    for (const recado of recados) {
        corpoTabela.innerHTML += `
        <tr>
            <td>${recado.id}.</td>
            <td>${recado.descricao}</td>
            <td>${recado.recado}</td>
            <td>
                <img src="./image/trash.svg" alt="imagem de lixeira" width="15" onclick="removeRecado(${recado.id})" >
                <img src="./image/edit.svg.png" alt="imagem de edição" width="15" onclick="editaRecado(${recado.id})" >
            </td>
        </tr>
      `;
    }
};
const removeRecado = (id) => {
    const recados = recuperarLocalStorage();
    const indiceRecado = recados.findIndex((recado) => recado.id === id);
    if (indiceRecado < 0)
        return;
    recados.splice(indiceRecado, 1);
    atualizarLocalStorage(recados);
    alert("Recado removido com sucesso");
    preencherTabela();
};
// const editaRecado = (id: number) => {
//   // recupera a lista do localStorage
//   const recados = recuperarLocalStorage();
//   // procura o indice do produto na lista conforme o identificado passado
//   const indiceRecado = recados.findIndex((recado) => recado.id === id);
//   // quando o findIndex não encontra ele retorna -1
//   // então por isso é verificado se o indice é menor que o 0
//   if (indiceRecado) return;
//   // remove o produto da lista
//   recados.map(recados);
//   // atualiza o localStorage
//   atualizarLocalStorage(recados);
//   alert("Recado alterado com sucesso");
//   // atualiza a tabela no html
//   preencherTabela();
// };
const definirID = () => {
    let max = 0;
    const recados = recuperarLocalStorage();
    recados.forEach((recado) => {
        if (recado.id > max) {
            max = recado.id;
        }
    });
    return max;
};
form?.addEventListener("submit", salvarRecado);
document.addEventListener("DOMContentLoaded", preencherTabela);

// Parte de logout
// document.getElementById("logouts").addEventListener("click", logout);

// function logout (){
//     sessionStorage.removeItem("logged");
//     localStorage.removeItem("session");

//     window.location.href = "index.html";
// }
