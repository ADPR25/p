const API = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos';

export const crearPrestamo = (prestamo) => {
    return fetch(API, {
        method: 'POST',
        body: JSON.stringify(prestamo),
        headers: {
            'Content-Type': 'application/json',
        },
    })
};


export async function buscar_prestamos() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos'

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


const API2 = 'https://proyecto-backend-sgbienestar.onrender.com/prestamos';

interface Usuario {
    id: string;
}

export const eliminar_prestamo = (id: Usuario) =>
    fetch(`${API2}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });


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
