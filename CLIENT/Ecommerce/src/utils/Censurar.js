export const censurarNumero = (numero) => {
    let arreglo = numero.split("");
    
    for(let i = 0; i < arreglo.length; i++){
        if(i % 2 !== 0){
            arreglo[i] = "*"
        }
    }

    let cadena_modificada = arreglo.join("");
    return cadena_modificada
}

export const censurarTexto = (texto, porcentajeCensurar) => {
    const cantidadCensurar = Math.floor((porcentajeCensurar / 100) * texto.length);

    const posicionesCensuradas = [];
    while (posicionesCensuradas.length < cantidadCensurar) {
      const posicion = Math.floor(Math.random() * (texto.length - 1)) + 1; // Excluir la primera posición
      if (!posicionesCensuradas.includes(posicion) && texto[posicion] !== ' ') {
        posicionesCensuradas.push(posicion);
      }
    }

    const textoCensurado = texto.split('').map((caracter, index) => {
      if (index === 0 || (index > 0 && texto[index - 1] === ' ')) {
        return caracter;
      } else {
        return posicionesCensuradas.includes(index) ? '*' : caracter;
      }
    }).join('');

    return textoCensurado;
  };