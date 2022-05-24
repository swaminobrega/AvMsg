const form = document.getElementById('quadro11');



form.addEventListener("submit", (event) => {
  event.preventDefault();
  const listaUsuarios = JSON.parse(localStorage.getItem("usuarios") ?? "[]")  
  const login = document.getElementById("email");
  const senha = document.getElementById("password");
  const confirmaSenha = document.getElementById("confirmaSenha");

  
  const usuarioJaExiste = listaUsuarios.find (usuario => usuario.email === login.value)


  if (usuarioJaExiste) {
    alert("Usuário já cadastrado");
    return;
  }

  if (senha.value !== confirmaSenha.value) {
    alert("Os campos de senha não estão iguais");
    return;
  }

  const user = {
    email: login.value,
    senha: senha.value,
    mensagens: [],
  };

  listaUsuarios.push(user)

  localStorage.setItem("usuarios", JSON.stringify(listaUsuarios));
  alert("Usuário cadastrado com sucesso, faça seu login!");
  location.href = "./index.html";
});
