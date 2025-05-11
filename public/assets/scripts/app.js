async function buscarFilmes() {
  try {
    const resposta = await fetch('http://localhost:3000/filmes');
    if (!resposta.ok) throw new Error('Erro ao buscar dados da API');
    return await resposta.json();
  } catch (erro) {
    console.error('Erro ao buscar filmes:', erro);
    return [];
  }
}

function listarFilmes(dados) {
  const lancamentosContainer = document.getElementById('lista-filmes');
  const maisVistosContainer = document.getElementById('lista-maisvistos');

  if (!lancamentosContainer || !maisVistosContainer) return;

  lancamentosContainer.innerHTML = '';
  maisVistosContainer.innerHTML = '';

  dados.slice(0, 4).forEach(filme => {
    const card = document.createElement('article');
    card.classList.add('card', 'p-2', 'text-center');

    card.innerHTML = `
      <img src="${filme.imagem}" alt="${filme.titulo}" class="w-100 mb-2">
      <h3>${filme.titulo}</h3>
      <p>${filme.descricao}</p>
      <a href="detalhes.html?id=${filme.id}" class="btn btn-primary mt-2">Ver Detalhes</a>
    `;

    lancamentosContainer.appendChild(card);
  });

  dados.slice(4, 8).forEach(filme => {
    const card = document.createElement('article');
    card.classList.add('card', 'p-2', 'text-center');

    card.innerHTML = `
      <img src="${filme.imagem}" alt="${filme.titulo}" class="w-100 mb-2">
      <h3>${filme.titulo}</h3>
      <p>${filme.descricao}</p>
      <a href="detalhes.html?id=${filme.id}" class="btn btn-primary mt-2">Ver Detalhes</a>
    `;

    maisVistosContainer.appendChild(card);
  });
}

function mostrarDetalhes(dados) {
  const container = document.getElementById('detalhes-filme');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id'); // Mantém como string

  const filme = dados.find(f => f.id == id); // Comparação fraca resolve o problema

  if (filme) {
    let imagensExtrasHTML = '';
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
      `;
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
    `;
  } else {
    container.innerHTML = `<p>Filme com ID "${id}" não encontrado.</p>`;
  }
}

function carregarDestaque(dados) {
  const carouselInner = document.getElementById('carousel-inner');
  if (!carouselInner) return;

  carouselInner.innerHTML = '';

  dados.slice(0, 4).forEach((filme, index) => {
    const isActive = index === 0 ? 'active' : '';
    const item = document.createElement('div');
    item.className = `carousel-item ${isActive}`;

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
    `;

    carouselInner.appendChild(item);
  });
}

window.onload = async () => {
  const dados = await buscarFilmes();
  listarFilmes(dados);
  mostrarDetalhes(dados);
  carregarDestaque(dados);
};
