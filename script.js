// Aguarda o HTML carregar completamente antes de rodar o script
document.addEventListener("DOMContentLoaded", function() {

    // ====== SELEÇÃO DE CATEGORIAS ======
    const categorias = document.querySelectorAll(".categoria");
    if (categorias.length > 0) {
        categorias.forEach(function(categoria) {
            categoria.addEventListener("click", function() {
                categorias.forEach(function(item) {
                    item.classList.remove("selecionada");
                });
                categoria.classList.add("selecionada");
            });
        });
    }

    // ====== BUSCA DE ITENS ======
    const campoBusca = document.querySelector(".campo-busca input");
    const cards = document.querySelectorAll(".card");
    const gridItens = document.querySelector(".grid-itens");

    if (campoBusca && cards.length > 0 && gridItens) {
        const mensagemBusca = document.createElement("p");
        mensagemBusca.className = "mensagem-busca";
        mensagemBusca.setAttribute("aria-live", "polite");
        gridItens.parentNode.insertBefore(mensagemBusca, gridItens.nextSibling);

        campoBusca.addEventListener("input", function() {
            const termo = this.value.trim().toLowerCase();
            let itensEncontrados = 0;

            cards.forEach(function(card) {
                const textoCard = card.textContent.toLowerCase();
                const match = !termo || textoCard.includes(termo);

                card.style.display = match ? "" : "none";

                if (match) {
                    itensEncontrados++;
                }
            });

            if (termo && itensEncontrados === 0) {
                mensagemBusca.textContent = "Nenhum item encontrado para sua busca.";
                mensagemBusca.style.display = "block";
            } else {
                mensagemBusca.textContent = "";
                mensagemBusca.style.display = "none";
            }
        });
    }

    // ====== PARTE VISUAL DA FOTO ======
    const areaFoto = document.querySelector(".area-foto");

    if (areaFoto) {
        // 1. Cria o campo de arquivo invisível e joga dentro da área tracejada
        const inputFoto = document.createElement("input");
        inputFoto.type = "file";
        inputFoto.accept = "image/png, image/jpeg, image/jpg";
        inputFoto.style.display = "none";
        areaFoto.appendChild(inputFoto);

        // 2. Faz o clique na área tracejada abrir a janela de escolher foto
        areaFoto.addEventListener("click", function(evento) {
            // Evita abrir duas vezes se clicar no próprio input
            if (evento.target !== inputFoto) {
                inputFoto.click();
            }
        });

        // 3. Mostra a foto na tela assim que o usuário seleciona o arquivo
        inputFoto.addEventListener("change", function() {
            const arquivo = this.files[0];

            if (arquivo) {
                const leitor = new FileReader();

                leitor.onload = function(e) {
                    // Limpa totalmente os textos e ícones antigos da caixa
                    areaFoto.innerHTML = ""; 
                    
                    // Cria uma tag <img> do zero com a foto escolhida
                    const novaImagem = document.createElement("img");
                    novaImagem.src = e.target.result;
                    
                    // Estiliza para preencher todo o espaço tracejado perfeitamente
                    novaImagem.style.width = "100%";
                    novaImagem.style.height = "100%";
                    novaImagem.style.objectFit = "cover";
                    novaImagem.style.borderRadius = "11px";
                    
                    // Coloca a imagem na tela e guarda o campo de arquivo de volta
                    areaFoto.appendChild(novaImagem);
                    areaFoto.appendChild(inputFoto);
                };

                leitor.readAsDataURL(arquivo);
            }
        });
    }
});

