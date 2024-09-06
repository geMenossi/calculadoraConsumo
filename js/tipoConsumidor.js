document.addEventListener("DOMContentLoaded", function () {
    fetchTiposConsumidor();

    // Adiciona o listener para o formulário de tipo de consumidor (descomente se necessário)
    // document.getElementById('tipoConsumidorForm').addEventListener('submit', function (event) {
    //     event.preventDefault();
    //     saveTipoConsumidor();
    // });
});

function fetchTiposConsumidor() {
    fetch('http://localhost:8000/tipos-consumidores')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar tipos de consumidores: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('tipoConsumidor');
            list.innerHTML = '<ul class="list-group border border-danger">';

            if (Array.isArray(data.tipos_consumidores)) {
                data.tipos_consumidores.forEach(unidade => {
                    list.innerHTML += `
<li class="list-group-item m-2 p-2 border-bottom">
<div class="row d-flex justify-content-between">
    <div class="col"> <strong>${unidade.nome}</strong> - Tipo ID: ${unidade.id}</div>
    <div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${unidade.id}, '${unidade.nome}')">Editar</button></div>
    <div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteUnidadeConsumidora(${unidade.id})">Deletar</button></div>
</div>
</li>`;
                });
            } else {
                list.innerHTML += '<li class="list-group-item">Nenhum tipo de consumidor encontrado</li>';
            }

            list.innerHTML += '</ul>';
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao carregar tipos de consumidores. Verifique o console para mais detalhes.');
        });
}

function showEditForm(id, nome) {
    const novoNome = prompt("Edite o nome do tipo de consumidor:", nome);
    if (novoNome !== null && novoNome !== "") {
        updateTipoConsumidor(id, novoNome);
    }
}

function updateTipoConsumidor(id, novoNome) {
    fetch(`http://localhost:8000/tipos-consumidores/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: novoNome })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar tipo de consumidor: ' + response.statusText);
        }
        return response.json();
    })
    .then(() => {
        alert('Tipo de consumidor atualizado com sucesso!');
        fetchTiposConsumidor(); // Atualiza a lista após a edição
    })
    .catch(error => {
        console.error(error);
        alert('Erro ao editar tipo de consumidor.');
    });
}

function deleteUnidadeConsumidora(id) {
    if (confirm("Tem certeza que deseja deletar este tipo de consumidor?")) {
        fetch(`http://localhost:8000/tipos-consumidores/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar tipo de consumidor: ' + response.statusText);
            }
            return response.json();
        })
        .then(() => {
            alert('Tipo de consumidor deletado com sucesso!');
            fetchTiposConsumidor(); // Atualiza a lista após a exclusão
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao deletar tipo de consumidor.');
        });
    }
}