// registro.js
interface Register {
    nombres: string;
    apellidos: string;
    eps: string;
    genero: string;
    tipo_doc: string;
    n_doc: string;
    correo_inst: string;
    fecha_nacimiento: string;
    correo_pers?: string;
    rol: string;
    telefono: string;
    ficha?: string;
    rh?: string;
    direccion: string; 
    pps: boolean;
    token?: string;
    contrasena: string;
    activacion: boolean;
}
export const register = async (usuario: Register) => {
    try {
        console.log('Datos enviados:', JSON.stringify(usuario));

        const response = await fetch('https://proyecto-backend-sgbienestar.onrender.com/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        // ... (resto del código) ...
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};
