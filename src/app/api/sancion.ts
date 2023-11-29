const API1 = 'https://proyecto-backend-sgbienestar.onrender.com/registro/usuario/findByMail/';
const API = 'https://proyecto-backend-sgbienestar.onrender.com/sanciones';

interface Sancion {
  correo: string;
}

export const buscar_sancionado = async (usuario: Sancion) => {
  try {
    const encodedCorreo = encodeURIComponent(usuario.correo);
    const response = await fetch(`${API1}${encodedCorreo}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    });

    if (response.ok) {
      const userData = await response.json();
      return userData._id;
    } else {
      console.error('Error al buscar el usuario:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Error en la solicitud de búsqueda:', error);
    return null;
  }
};

export const Sancionar = (usuario: Sancion) =>
  fetch(`${API}`, {
    method: 'POST',
    body: JSON.stringify(usuario),
    headers: {
      'content-type': 'application/json',
    },
  });


  const API2 = 'https://proyecto-backend-sgbienestar.onrender.com/sanciones';

interface Usuario {
    id: string;
}

export const eliminar_sancion = (id:Usuario) =>
    fetch(`${API2}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });


    export async function buscar_sanciones() {
    const url = 'https://proyecto-backend-sgbienestar.onrender.com/sanciones'

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

