export async function obtenerEPS() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/eps'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener la lista de EPS. Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden cargar los datos de las eps: ${error.message}, ${error.status}`);
    }

}
