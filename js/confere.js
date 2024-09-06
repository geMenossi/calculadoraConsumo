const urls = {
    bandeiras: 'http://localhost:8000/bandeiras',
    calcular: 'http://localhost:8000/calcular',
    dependencias: 'http://localhost:8000/dependencias',
    dispositivos: 'http://localhost:8000/dispositivos',
    tipos_consumidores: 'http://localhost:8000/tipos-consumidores',
    tipos_dispositivos: 'http://localhost:8000/tipos-dispositivos',
    unidades_consumidoras: 'http://localhost:8000/unidades-consumidoras'
};
async function checkRouteStatus(url, elementId) {
    try{
        const response = await fetch(url);
        if (response.ok){
            document.getElementById(elementId).innerText = `${url} - OK`
        }else{
            document.getElementById(elementId).innerText = `${url} - Falhou(${response.statusText})`
        }
    }catch (error){
        document.getElementById(elementId).innerText = `${url} - Erro(${error.message})`
    }
}
window.onload = function(){
    checkRouteStatus(urls.bandeiras, 'bandeiras-status');
    checkRouteStatus(urls.calcular, 'calcular-status');
    checkRouteStatus(urls.dependencias, 'dependencias-status');
    checkRouteStatus(urls.dispositivos, 'dispositivos-status');
    checkRouteStatus(urls.tipos_consumidores, 'tipos_consumidores-status');
    checkRouteStatus(urls.tipos_dispositivos, 'tipos_dispositivos-status');
    checkRouteStatus(urls.unidades_consumidoras, 'unidades_consumidoras-status');
}