const dados = [
    {
      "id": 1,
      "titulo": "O Destino de Orion",
      "descricao": "Um épico de ficção científica sobre a luta pela sobrevivência em um planeta desconhecido.",
      "sinopse": "Após um acidente espacial, a tripulação da nave Orion precisa enfrentar criaturas hostis e encontrar uma maneira de retornar à Terra antes que seus recursos acabem.",
      "genero": "Ficção Científica",
      "diretor": "Lucas Almeida",
      "anoLancamento": 2024,
      "imagem": "/public/assets/img/orion.jpg"
    },
    {
      "id": 2,
      "titulo": "Além das Estrelas",
      "descricao": "Uma emocionante história de amor que atravessa o tempo e o espaço.",
      "sinopse": "Dois cientistas se apaixonam enquanto trabalham em uma estação espacial, mas um evento cósmico ameaça separá-los para sempre.",
      "genero": "Romance",
      "diretor": "Mariana Costa",
      "anoLancamento": 2023,
      "imagem": "/public/assets/img/estrelas.jpg"
    },
    {
      "id": 3,
      "titulo": "O Último Guardião",
      "descricao": "A batalha final entre as forças da luz e das trevas.",
      "sinopse": "Um jovem guerreiro descobre ser o último de uma linhagem ancestral encarregada de proteger o mundo de uma ameaça milenar.",
      "genero": "Fantasia",
      "diretor": "Eduardo Nogueira",
      "anoLancamento": 2025,
      "imagem": "/public/assets/img/guardiao.jpg"
    },
    {
      "id": 4,
      "titulo": "Refúgio Submerso",
      "descricao": "Um suspense claustrofóbico no fundo do oceano.",
      "sinopse": "Uma equipe de cientistas fica presa em uma estação subaquática após um terremoto e precisa encontrar uma saída antes que o oxigênio acabe.",
      "genero": "Suspense",
      "diretor": "Fernanda Ribeiro",
      "anoLancamento": 2022,
      "imagem": "/public/assets/img/refugio.jpg"
    },
    {
      "id": 5,
      "titulo": "Cidade Fantasma",
      "descricao": "Mistérios e segredos assombram uma cidade esquecida.",
      "sinopse": "Ao investigar o desaparecimento de seu irmão, uma jovem jornalista descobre uma cidade onde o tempo parece ter parado e segredos obscuros são escondidos.",
      "genero": "Terror",
      "diretor": "Bruno Silva",
      "anoLancamento": 2024,
      "imagem": "/public/assets/img/cidadefantasma.jpg"
    },
    {
      "id": 6,
      "titulo": "Corrida Contra o Tempo",
      "descricao": "Ação sem limites em uma perseguição internacional.",
      "sinopse": "Um agente secreto precisa impedir uma ameaça global enquanto é perseguido por assassinos implacáveis em várias cidades do mundo.",
      "genero": "Ação",
      "diretor": "Carlos Menezes",
      "anoLancamento": 2023,
      "imagem": "/public/assets/img/corrida.jpg"
    },
    {
      "id": 7,
      "titulo": "Notas de Outono",
      "descricao": "Uma emocionante jornada de superação e reencontro.",
      "sinopse": "Após anos afastada da família, uma jovem musicista retorna à sua cidade natal e enfrenta lembranças dolorosas enquanto tenta reconstruir sua vida.",
      "genero": "Drama",
      "diretor": "Ana Paula Souza",
      "anoLancamento": 2025,
      "imagem": "/public/assets/img/notas.jpg"
    },
    {
      "id": 8,
      "titulo": "As Sombras do Amanhã",
      "descricao": "Um thriller futurista cheio de conspirações.",
      "sinopse": "Em um mundo onde o governo controla o tempo, um homem tenta mudar seu destino e expor a verdade por trás de uma sociedade distópica.",
      "genero": "Thriller",
      "diretor": "Diego Martins",
      "anoLancamento": 2024,
      "imagem": "/public/assets/img/sombras.jpg"
    }
  ]
  
  function listarFilmes() {
    const lancamentosContainer = document.getElementById('lista-filmes')
    const maisVistosContainer = document.getElementById('lista-maisvistos')
  
    if (!lancamentosContainer || !maisVistosContainer) return
  
    dados.slice(0, 4).forEach(filme => {
      const card = document.createElement('article')
      card.classList.add('card', 'p-2', 'text-center')
  
      card.innerHTML = `
        <img src="${filme.imagem}" alt="${filme.titulo}" class="w-100 mb-2">
        <h3>${filme.titulo}</h3>
        <p>${filme.descricao}</p>
        <a href="detalhes.html?id=${filme.id}" class="btn btn-primary mt-2">Ver Detalhes</a>
      `
  
      lancamentosContainer.appendChild(card)
    })
  
    dados.slice(4, 8).forEach(filme => {
      const card = document.createElement('article')
      card.classList.add('card', 'p-2', 'text-center')
  
      card.innerHTML = `
        <img src="${filme.imagem}" alt="${filme.titulo}" class="w-100 mb-2">
        <h3>${filme.titulo}</h3>
        <p>${filme.descricao}</p>
        <a href="detalhes.html?id=${filme.id}" class="btn btn-primary mt-2">Ver Detalhes</a>
      `
  
      maisVistosContainer.appendChild(card)
    })
  }
  
  function mostrarDetalhes() {
    const container = document.getElementById('detalhes-filme')
  
    if (!container) return
  
    const params = new URLSearchParams(window.location.search)
    const id = parseInt(params.get('id'))
  
    const filme = dados.find(f => f.id === id)
  
    if (filme) {
      let imagensExtrasHTML = ''
      if (filme.imagens_complementares && filme.imagens_complementares.length > 0) {
        imagensExtrasHTML = `
          <section class="mt-5">
            <h3>Fotos do Filme</h3>
            <div class="row">
              ${filme.imagens_complementares.map(img => `
                <div class="col-6 col-md-3 mb-3">
                  <img src="${img.src}" alt="${img.descricao}" class="img-fluid rounded shadow-sm">
                  <p class="text-center mt-2">${img.descricao}</p>
                </div>
              `).join('')}
            </div>
          </section>
        `
      }
  
      container.innerHTML = `
        <section class="info-geral mb-5">
          <h2 class="mb-4">${filme.titulo}</h2>
          <div class="row">
            <div class="col-md-6 mb-3">
              <img src="${filme.imagem}" alt="${filme.titulo}" class="img-fluid rounded">
            </div>
            <div class="col-md-6">
              <p><strong>Descrição:</strong> ${filme.descricao}</p>
              <p><strong>Sinopse:</strong> ${filme.sinopse}</p>
              <p><strong>Gênero:</strong> ${filme.genero}</p>
              <p><strong>Diretor:</strong> ${filme.diretor}</p>
              <p><strong>Ano de Lançamento:</strong> ${filme.anoLancamento}</p>
            </div>
          </div>
        </section>
  
        ${imagensExtrasHTML}
  
        <div class="mt-4">
          <a href="index.html" class="btn btn-secondary">Voltar para Home</a>
        </div>
      `
    } else {
      container.innerHTML = `<p>Filme não encontrado.</p>`
    }
  }
  
  function carregarDestaque() {
    const carouselInner = document.getElementById('carousel-inner')
  
    if (!carouselInner) return
  
    dados.slice(0, 4).forEach((filme, index) => {
      const isActive = index === 0 ? 'active' : ''
      const item = document.createElement('div')
      item.className = `carousel-item ${isActive}`
  
      item.innerHTML = `
        <a href="detalhes.html?id=${filme.id}" class="text-decoration-none text-dark">
          <div class="row align-items-center g-4">
            <div class="col-md-6">
              <img src="${filme.imagem}" class="d-block w-100 destaque-img" alt="${filme.titulo}">
            </div>
            <div class="col-md-6">
              <div class="destaque-info">
                <h2 class="destaque-titulo">${filme.titulo}</h2>
                <p class="destaque-descricao">${filme.descricao}</p>
              </div>
            </div>
          </div>
        </a>
      `
  
      carouselInner.appendChild(item)
    })
  }
  
  window.onload = () => {
    listarFilmes()
    mostrarDetalhes()
    carregarDestaque()
  }