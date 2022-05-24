const form = document.querySelector("#quadro");
//parte de login
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const login = document.getElementById("email");
  const senha = document.getElementById("password");

  const listaUsuarios = JSON.parse(localStorage.getItem("usuarios") ?? "[]")
  
  if (!login.value || !senha.value) {
    alert("Todos os campos são de preenchimento obrigatório");
    return;
  }

  const usuarioExistente = listaUsuarios.find(usuario => usuario.email === login.value && usuario.senha === senha.value)

  if (!usuarioExistente) {
    alert("Usuario e/ou senha não cadastrados.");
    return;
  }

  localStorage.setItem("usuariologado", JSON.stringify(login.value))

    alert("Login realizado com sucesso!");

    location.href = "./menssagem.html";
  
});
