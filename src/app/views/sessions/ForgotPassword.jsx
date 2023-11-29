import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { restablecer } from '../../api/rest_pasword.ts';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    margin: '1rem',
    borderRadius: 12,
  },
}));

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await restablecer({ correo: email });
      // Aquí puedes manejar la respuesta de la API, como mostrar un mensaje de éxito, etc.
      console.log(response);

      // Redirige o muestra un mensaje según la respuesta de la API
      navigate('/'); // Cambia '/'' según tu necesidad
    } catch (error) {
      // Maneja los errores, muestra mensajes de error, etc.
      console.error('Error al restablecer la contraseña:', error);
    }
  };

  return (
    <ForgotPasswordRoot>
      <Card className="card">
        <Grid container>
          <Grid item xs={12}>
            <JustifyBox p={4}>
              <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
            </JustifyBox>

            <ContentBox>
              <form onSubmit={handleFormSubmit}>
                <TextField
                  type="email"
                  name="email"
                  size="small"
                  label="Email"
                  variant="outlined"
                  sx={{ mb: 3, width: '100%' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button fullWidth variant="contained" color="primary" type="submit">
                  Reset Password
                </Button>

                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{ mt: 2 }}
                >
                  Go Back
                </Button>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </ForgotPasswordRoot>
  );
};

export default ForgotPassword;
