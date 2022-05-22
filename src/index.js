const form = document.querySelector("#quadro");
//parte de login
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const login = document.getElementById("email");
  const senha = document.getElementById("password");

  const listaUsuarios = localStorage.getItem(login.value);
  const listaObjetos = JSON.parse(listaUsuarios);
  console.log(listaUsuarios);
  console.log(listaObjetos);

  if (!login.value || !senha.value) {
    alert("Todos os campos são de preenchimento obrigatório");
    return;
  }
  if (!listaUsuarios || listaObjetos.senha !== senha.value) {
    alert("Usuario e/ou senha não cadastrados.");
    return;
  }

  if (
    listaObjetos.email === login.value &&
    listaObjetos.senha === senha.value
  ) {
    alert("Login realizado com sucesso!");

    location.href = "./menssagem.html";
  }
});
