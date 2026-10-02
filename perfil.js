document.addEventListener("DOMContentLoaded", function () {

    const botaoEditar = document.getElementById("botaoEditar");
    const botaoCancelar = document.getElementById("botaoCancelar");
    const formPerfil = document.getElementById("formPerfil");
    const acoesFormulario = document.getElementById("acoesFormulario");

    const campos = document.querySelectorAll(
        "#formPerfil input[type='text'], #formPerfil input[type='email'], #formPerfil input[type='tel']"
    );

    const nome = document.getElementById("nome");
    const nomeExibido = document.getElementById("nomeExibido");

    function ativarEdicao() {
        campos.forEach(function (campo) {
            campo.disabled = false;
        });

        acoesFormulario.classList.add("visivel");
        botaoEditar.style.display = "none";
    }

    function cancelarEdicao() {
        campos.forEach(function (campo) {
            campo.disabled = true;
        });

        acoesFormulario.classList.remove("visivel");
        botaoEditar.style.display = "inline-block";
    }

    botaoEditar.addEventListener("click", ativarEdicao);
    botaoCancelar.addEventListener("click", cancelarEdicao);

    formPerfil.addEventListener("submit", function (evento) {
        evento.preventDefault();

        nomeExibido.textContent = nome.value.trim() || "Seu Nome";

        campos.forEach(function (campo) {
            campo.disabled = true;
        });

        acoesFormulario.classList.remove("visivel");
        botaoEditar.style.display = "inline-block";

        mostrarMensagem("Perfil atualizado com sucesso!");
    });

    // ALTERAR FOTO
    const fotoInput = document.getElementById("fotoInput");
    const fotoPerfil = document.getElementById("fotoPerfil");

    fotoInput.addEventListener("change", function () {
        const arquivo = this.files[0];

        if (!arquivo) {
            return;
        }

        if (!arquivo.type.startsWith("image/")) {
            mostrarMensagem("Escolha uma imagem válida.");
            return;
        }

        const leitor = new FileReader();

        leitor.onload = function (evento) {
            fotoPerfil.innerHTML = "";

            const imagem = document.createElement("img");
            imagem.src = evento.target.result;
            imagem.alt = "Foto do perfil";

            fotoPerfil.appendChild(imagem);
        };

        leitor.readAsDataURL(arquivo);
    });

    // CONFIGURAÇÕES
    const notificacoes = document.getElementById("notificacoes");
    const perfilPublico = document.getElementById("perfilPublico");

    notificacoes.addEventListener("change", function () {
        mostrarMensagem(
            this.checked
                ? "Notificações ativadas."
                : "Notificações desativadas."
        );
    });

    perfilPublico.addEventListener("change", function () {
        mostrarMensagem(
            this.checked
                ? "Seu perfil está público."
                : "Seu perfil está privado."
        );
    });

    document.getElementById("alterarSenha").addEventListener("click", function () {
        mostrarMensagem("A alteração de senha ficará disponível quando houver sistema de login.");
    });

    document.getElementById("sairConta").addEventListener("click", function () {
        mostrarMensagem("A função de sair depende de um sistema de login.");
    });

    function mostrarMensagem(texto) {
        const mensagemAnterior = document.querySelector(".mensagem-perfil");

        if (mensagemAnterior) {
            mensagemAnterior.remove();
        }

        const mensagem = document.createElement("div");
        mensagem.className = "mensagem-perfil";
        mensagem.textContent = texto;

        document.body.appendChild(mensagem);

        setTimeout(function () {
            mensagem.remove();
        }, 2500);
    }
});