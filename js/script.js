document.addEventListener("DOMContentLoaded", function () {
    fetchtipos_dispositivos();
    document.getElementById('tipos_dispositivoFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        savetipos_dispositivo();
    });
});
 
function fetchtipos_dispositivos() {
    fetch('http://localhost:8000/tipos-dispositivos')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('tipos_dispositivosList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            data.tipos_dispositivos.forEach(tipos_dispositivo => {
                list.innerHTML += `
                <li class="list-group-item m-2 p-2 border-bottom">
                <div class="row d-flex justify-content-between">
                <div class="col"> <strong>${tipos_dispositivo.nome}</strong></div>
                <div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${tipos_dispositivo.id}, '${tipos_dispositivo.nome}')">Editar</button></div>
                <div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deletetipos_dispositivo(${tipos_dispositivo.id})">Deletar</button></div>
                </div>
                </li>`;
            });
            list.innerHTML += '</ul>';
        })
        .catch(error => console.error('Erro ao buscar tipos_dispositivos:', error));
}
 
function showAddForm() {
    document.getElementById('tipos_dispositivoForm').classList.remove('d-none');
    document.getElementById('tipos_dispositivoId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar tipos_dispositivo';
}
 
function showEditForm(id, nome, tarifa) {
    document.getElementById('tipos_dispositivoForm').classList.remove('d-none');
    document.getElementById('tipos_dispositivoId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('formTitle').innerText = 'Editar tipos_dispositivo';
 
}
function savetipos_dispositivo() {
    const id = document.getElementById('tipos_dispositivoId').value;
    const nome = document.getElementById('nome').value;
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/tipos-dispositivos/${id}` : 'http://localhost:8000/tipos-dispositivos';
    
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome })
    })
        .then(response => response.json())
        .then(() => {
            fetchtipos_dispositivos();
            document.getElementById('tipos_dispositivoForm').classList.add('d-none');
        })
        .catch(error => console.error('Erro ao salvar tipos_dispositivo:', error));
 
}
function deletetipos_dispositivo(id) {
    fetch(`http://localhost:8000/tipos-dispositivos/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchtipos_dispositivos())
        .catch(error => console.error('Erro ao deletar tipos_dispositivo:', error));
}
 




