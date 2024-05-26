async function buscarEstados(defaultEstado) {
    try {
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const estados = await response.json();
        const selectEstado = document.getElementById('estado');

        estados.sort((a, b) => a.nome.localeCompare(b.nome));

        estados.forEach(estado => {
            const option = document.createElement('option');
            option.value = estado.sigla;
            option.textContent = estado.sigla;
            if (estado.sigla === defaultEstado) {
                option.selected = true;
            }
            selectEstado.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar estados:', error);
    }
}

async function buscarCidades(defaultCidade, uf) {
    try {
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const cidades = await response.json();
        const selectCidade = document.getElementById('cidades');

        selectCidade.innerHTML = '<option value="">Cidade</option>';

        cidades.sort((a, b) => a.nome.localeCompare(b.nome));

        cidades.forEach(cidade => {
            const option = document.createElement('option');
            option.value = cidade.nome;
            option.textContent = cidade.nome;
            if (cidade.nome === defaultCidade) {
                option.selected = true;
            }
            selectCidade.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao buscar cidades:', error);
    }
}