export async function marca() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/marca'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden cargar: ${error.message}, ${error.status}`);
    }

}