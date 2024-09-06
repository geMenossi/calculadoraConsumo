document.addEventListener("DOMContentLoaded", function () {
    fetchBandeiras();
    document.getElementById('bandeiraFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveBandeira();
    });
});

function fetchBandeiras() {
    fetch('http://localhost:8000/bandeiras')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const list = document.getElementById('bandeirasList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            data.bandeiras.forEach(bandeiras => {
                list.innerHTML += `
                <li class="list-group-item m-2 p-2 border-bottom">
                    <div class="row d-flex justify-content-between">
                        <div class="col"> <strong>${bandeiras.nome}</strong></div>
                        <div class="col"> <strong>${bandeiras.tarifa}</strong></div>
                        <div class="col"> 
                            <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${bandeiras.id}, '${bandeiras.nome}', '${bandeiras.tarifa}')">Editar</button>
                            <button class="btn btn-danger btn-sm float-end" onclick="deleteBandeira(${bandeiras.id})">Deletar</button>
                        </div>
                    </div>
                </li>`;
            });
            list.innerHTML += '</ul>';
        })
        .catch(error => console.error('Erro ao buscar bandeiras:', error));
}

function showAddForm() {
    document.getElementById('bandeiraForm').classList.remove('d-none');
    document.getElementById('bandeiraId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('tarifa').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Bandeira';
}

function showEditForm(id, nome, tarifa) {
    document.getElementById('bandeiraForm').classList.remove('d-none');
    document.getElementById('bandeiraId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('tarifa').value = tarifa;
    document.getElementById('formTitle').innerText = 'Editar Bandeira';
}

function saveBandeira() {
    const id = document.getElementById('bandeiraId').value;
    const nome = document.getElementById('nome').value;
    const tarifa = document.getElementById('tarifa').value;
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/bandeiras/${id}` : 'http://localhost:8000/bandeiras';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, tarifa: tarifa })
    })
        .then(response => response.json())
        .then(() => {
            fetchBandeiras();
            document.getElementById('bandeiraForm').classList.add('d-none');
        })
        .catch(error => console.error('Erro ao salvar bandeira:', error));
}

function deleteBandeira(id) {
    fetch(`http://localhost:8000/bandeiras/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchBandeiras())
        .catch(error => console.error('Erro ao deletar bandeira:', error));
}