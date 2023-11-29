    const API = 'https://proyecto-backend-sgbienestar.onrender.com/informe';

    export const informes = (informe) => {
        return fetch(API, {
            method: 'POST',
            body: JSON.stringify(informe),
            headers: {
                'Content-Type': 'application/json', // Cambiado 'content-type' a 'Content-Type'
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud'); // Puedes personalizar el mensaje de error
                }
                return response.json();
            });
    };
