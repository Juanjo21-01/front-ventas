const response = await fetch('http://localhost:8080/');
const clientes = await response.json();

//Por ahora solo estaba probando

export const fetchProductos = async () => {
    return(clientes);
}