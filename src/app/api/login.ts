const API = 'https://proyecto-backend-sgbienestar.onrender.com/registro/login';

interface Usuario {
    correo_inst: string;
    contrasena: string;
}

export const loguear = (usuario: Usuario) =>
    fetch(`${API}`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: {
            'content-type': 'application/json',
        },
    });
