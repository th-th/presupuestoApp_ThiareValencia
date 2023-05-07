const finanzas = {
    presupuesto: 0,
    gastos: 0,
}

const gastos = []


function ingresarPresupuesto(presupuesto){
    finanzas.presupuesto = presupuesto;
}

function ingresarGasto(nombreGasto, valorGasto){
    gastos.push({nombre: nombreGasto, valor: valorGasto});
    let totalGastos = 0;

    //Recalcular total gastos
    gastos.forEach((gasto)=>{
        totalGastos = gasto.valor + totalGastos;
    });
    finanzas.gastos= totalGastos;
}

function obtenerSaldo(){
    return finanzas.presupuesto - finanzas.gastos;
}

function eliminarGasto(gastoEliminado){
    gastos.splice(gastoEliminado,1);
    let totalGastos = 0;

    //Recalcular total gastos
    gastos.forEach((gasto)=>{
        totalGastos = gasto.valor + totalGastos;
    });
    finanzas.gastos= totalGastos;
}

function actualizarVista(){
    const presupuestoTabla = document.getElementById("presupuestoInicial");
    presupuestoTabla.innerHTML =`$${finanzas.presupuesto}`;

    const gastoTabla = document.getElementById("totalDeGastos");
    gastoTabla.innerHTML =`$${finanzas.gastos}`;

    const saldoActualizado = document.getElementById("saldoFinal");
    saldoActualizado.innerHTML = `$${obtenerSaldo()}`;

    const detalleGasto = document.getElementById("resumenGastos");
    detalleGasto.innerHTML = ``;
    gastos.forEach((gasto, i)=>{

        const filasGasto = document.createElement("tr");
        const detalleNombre = document.createElement("td");
        const detalleValor = document.createElement("td");
        const detalleEliminar = document.createElement("td");
        const botonEliminar = document.createElement("i");

        detalleNombre.innerHTML = gasto.nombre;
        detalleValor.innerHTML = `$${gasto.valor}`;

        botonEliminar.setAttribute("class", "fas fa-trash-alt");
        detalleEliminar.append(botonEliminar);

        filasGasto.append(detalleNombre);
        filasGasto.append(detalleValor);
        filasGasto.append(detalleEliminar);
        detalleGasto.append(filasGasto);

        botonEliminar.addEventListener("click", function(e){
            eliminarGasto(i);
            actualizarVista();
        })

    });
    detalleGasto.innerHTML = filasGasto;
}

const presupuesto = document.getElementById("ingresaPresupuesto");
presupuesto.addEventListener("submit", function(e){
    e.preventDefault();
    const inputPresupuesto = document.getElementById("presupuesto");
    const presupuestoIngresado = parseInt(inputPresupuesto.value);
    ingresarPresupuesto(presupuestoIngresado);
    actualizarVista();
}) 

const gasto = document.getElementById("ingresaGastos");
gasto.addEventListener("submit", function(e){
    e.preventDefault();
    const inputNombreGasto = document.getElementById("nombreGasto");
    const nombreGastoIngresado = inputNombreGasto.value;
    const inputGasto = document.getElementById("cantidadGasto");
    const gastoIngresado = parseInt(inputGasto.value);
    ingresarGasto(nombreGastoIngresado, gastoIngresado);
    actualizarVista();
}) 

