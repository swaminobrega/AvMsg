"use strict";
const form = document.querySelector("#infos_mens");
const corpoTabela = document.querySelector("#tbody");
const usuariologado = JSON.parse(localStorage.getItem("usuariologado") ?? "");
console.log(usuariologado);
let editarMenssagem = false;
let indiceEditar = 0;
const recuperarLocalStorage = () => {
    const recados = JSON.parse(localStorage.getItem(usuariologado) || "[]");
    return recados;
};
const atualizarLocalStorage = (recados) => {
    localStorage.setItem(usuariologado, JSON.stringify(recados));
};
const salvarRecado = (event) => {
    event.preventDefault();
    const descricao = form?.descricao.value;
    const recado = form?.detalhamento.value;
    const recados = recuperarLocalStorage();
    if (editarMenssagem === true) {
        recados[indiceEditar].descricao = descricao;
        recados[indiceEditar].recado = recado;
        alert("Edição de menssagem realizada");
        editarMenssagem = false;
    }
    else {
        recados.push({
            id: definirID() + 1,
            descricao,
            recado,
        });
        alert("Recado adicionado com sucesso");
    }
    atualizarLocalStorage(recados);
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

            <td><img src="./image/trash.svg" alt="imagem de lixeira" width="15" onclick="removeRecado(${recado.id})" >
            </td>

            <td><img src="./image/edit.svg.png" alt="imagem de edição" width="15" onclick="editarRecado(${recado.id})" >
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
const editarRecado = (id) => {
    const listarecados = recuperarLocalStorage();
    const indiceRecado1 = listarecados.findIndex((recado) => recado.id === id);
    if (indiceRecado1 < 0)
        return;
    console.log(listarecados[indiceRecado1]);
    form.descricao.value = listarecados[indiceRecado1].descricao;
    form.detalhamento.value = listarecados[indiceRecado1].recado;
    editarMenssagem = true;
    indiceEditar = indiceRecado1;
};
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
