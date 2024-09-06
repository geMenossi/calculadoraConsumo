document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('consumoForm').addEventListener('submit', function (event) {
        event.preventDefault();
        calcularConsumo();
    });
});

function calcularConsumo() {
    const origem_do_consumo = document.getElementById('origem_do_consumo').value;
    const item_id = document.getElementById('item_id').value;

    if (!item_id) {
        alert('Por favor, insira um ID válido.');
        return;
    }

    fetch(`http://localhost:8000/consumos?origem_do_consumo=${origem_do_consumo}&item_id=${item_id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao calcular o consumo: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('resultadoConsumo').classList.remove('d-none');
            document.getElementById('consumo_diario').innerText = data.consumo_diario.toFixed(2);
            document.getElementById('consumo_mensal').innerText = data.consumo_mensal.toFixed(2);
            document.getElementById('consumo_anual').innerText = data.consumo_anual.toFixed(2);
        })
        .catch(error => {
            console.error(error);
            alert('Erro ao calcular o consumo. Verifique o console para mais detalhes.');
        });
}
