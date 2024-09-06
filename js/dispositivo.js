document.addEventListener("DOMContentLoaded", function () {
    fetchUnidadesConsumidoras();
    fetchDispositivos(); // Inicialmente vai buscar dispositivos de uma dependência padrão

    document.getElementById('dispositivoFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveDispositivo();
    });
});

// Função para carregar unidades consumidoras
function fetchUnidadesConsumidoras() {
    fetch('http://localhost:8000/unidades-consumidoras')
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById('unidadeConsumidora');
            if (select) {
                select.innerHTML = '<option value="">Selecione uma unidade consumidora</option>';
                data.unidades_consumidoras.forEach(unidade => {
                    select.innerHTML += `<option value="${unidade.id}">${unidade.nome}</option>`;
                });
            } else {
                console.error('Elemento select com id "unidadeConsumidora" não encontrado.');
            }
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao carregar unidades consumidoras. Verifique o console para mais detalhes.');
        });
}

// Função para carregar dispositivos de uma dependência específica
function fetchDispositivos(dependenciaId = 2) { // Pode ser alterado conforme a necessidade
    fetch(`http://localhost:8000/dispositivos/dependencias/${dependenciaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dispositivos: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('dispositivosList');
            if (list) {
                list.innerHTML = '<ul class="list-group border border-danger">';
                if (Array.isArray(data.dispositivos)) {
                    data.dispositivos.forEach(dispositivo => {
                        list.innerHTML += `
<li class="list-group-item m-2 p-2 border-bottom">
<div class="row d-flex justify-content-between">
<div class="col"> <strong>${dispositivo.nome}</strong> - Tipo ID: ${dispositivo.tipo_id || 'Não definido'}</div>
<div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${dispositivo.id}, '${dispositivo.nome}', '${dispositivo.consumo}', '${dispositivo.uso_diario}', '${dispositivo.unidade_consumidora_id}')">Editar</button></div>
<div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteDispositivo(${dispositivo.id})">Deletar</button></div>
</div>
</li>`;
                    });
                } else {
                    list.innerHTML += '<li class="list-group-item">Nenhum dispositivo encontrado</li>';
                }

                list.innerHTML += '</ul>';
            } else {
                console.error('Elemento com id "dispositivosList" não encontrado.');
            }
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao carregar dispositivos. Verifique o console para mais detalhes.');
        });
}

// Exibe o formulário de adicionar
function showAddForm() {
    document.getElementById('dispositivoForm').classList.remove('d-none');
    document.getElementById('dispositivoId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('consumo').value = '';
    document.getElementById('uso').value = '';
    document.getElementById('unidadeConsumidora').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Dispositivo';
}

// Exibe o formulário de edição
function showEditForm(id, nome, consumo, uso_diario, unidadeConsumidoraId) {
    document.getElementById('dispositivoForm').classList.remove('d-none');
    document.getElementById('dispositivoId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('consumo').value = consumo;
    document.getElementById('uso').value = uso_diario || '';
    document.getElementById('unidadeConsumidora').value = unidadeConsumidoraId || '';
    document.getElementById('formTitle').innerText = 'Editar Dispositivo';
}

// Salva um dispositivo (adiciona ou atualiza)
function saveDispositivo() {
    const id = document.getElementById('dispositivoId').value;
    const nome = document.getElementById('nome').value;
    const consumo = document.getElementById('consumo').value;
    const uso = document.getElementById('uso').value;
    const unidadeConsumidoraId = document.getElementById('unidadeConsumidora').value;
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/dispositivos/${id}` : 'http://localhost:8000/dispositivos';
    
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, consumo: consumo, uso_diario: uso, unidade_consumidora_id: unidadeConsumidoraId })
    })
        .then(response => response.json())
        .then(() => {
            fetchDispositivos(); // Atualiza a lista de dispositivos
            document.getElementById('dispositivoForm').classList.add('d-none');
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao salvar dispositivo. Verifique o console para mais detalhes.');
        });
}

// Deleta um dispositivo
function deleteDispositivo(id) {
    if (!confirm('Tem certeza que deseja deletar este dispositivo?')) {
        return;
    }

    fetch(`http://localhost:8000/dispositivos/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao deletar o dispositivo: ' + response.statusText);
            }
            fetchDispositivos(); // Atualiza a lista de dispositivos
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao deletar dispositivo. Verifique o console para mais detalhes.');
        });
}
