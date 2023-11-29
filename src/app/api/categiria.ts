
export async function categoria() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/categoria'

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(`no se pueden: ${error.message}, ${error.status}`);
    }

}