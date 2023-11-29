const API = 'https://proyecto-backend-sgbienestar.onrender.com/implementos';

interface Usuario {
    id: string;
}

export const eliminarI = (id: Usuario) =>
    fetch(`${API}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
