const form = document.getElementById('quadro11');

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const login = document.getElementById("email");
  const senha = document.getElementById("password");
  const confirmaSenha = document.getElementById("confirmaSenha");

  const usuarioJaExiste = localStorage.getItem(login.value);

  if (usuarioJaExiste === login.value) {
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



  localStorage.setItem(login.value, JSON.stringify(user));
  alert("Usuário cadastrado com sucesso, faça seu login!");
  location.href = "./index.html";
});
