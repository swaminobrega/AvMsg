const form = document.querySelector("#infos_mens") as HTMLFormElement;
const corpoTabela = document.querySelector("#tbody") as HTMLElement;

interface Recado {
  id: number;
  descricao: string;
  recado: string;
}

const recuperarLocalStorage = (): Array<Recado> => {
  const recados = JSON.parse(
    localStorage.getItem("recados") || "[]"
  ) as Array<Recado>;

  return recados;
};

const atualizarLocalStorage = (recados: Array<Recado>) => {
  localStorage.setItem("recados", JSON.stringify(recados));
};

const salvarRecado = (event: Event) => {
  event.preventDefault();

  const descricao = form?.descricao.value;
  const recado = form?.detalhamento.value;

  const recados = recuperarLocalStorage();

  recados.push({
    id: definirID() + 1,
    descricao,
    recado,
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

const removeRecado = (id: number) => {
  const recados = recuperarLocalStorage();

  const indiceRecado = recados.findIndex((recado) => recado.id === id);

  if (indiceRecado < 0) return;

  recados.splice(indiceRecado, 1);

  atualizarLocalStorage(recados);

  alert("Recado removido com sucesso");

  preencherTabela();
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
