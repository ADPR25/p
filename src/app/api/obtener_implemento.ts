export async function obtener_inplemeto() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/implementos'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener la lista de implemento. Estado de respuesta: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden cargar los datos de los implemento: ${error.message}, ${error.status}`);
    }

}
