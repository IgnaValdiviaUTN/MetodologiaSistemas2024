import { Box, Typography } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';

const BasePie = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: '#f0f2f5', borderRadius: '8px', padding: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '20px', color: '#4D648D', fontWeight: 'bold' }}>Productos más pedidos</Typography>
      <PieChart
        colors={['#AED9E0', '#A0C8E0', '#8CB6D6']} // Personaliza los colores del gráfico de pastel
        series={[
          {
            data: [
              { id: 0, value: 10, label: 'series A' },
              { id: 1, value: 15, label: 'series B' },
              { id: 2, value: 20, label: 'series C' },
            ],
          },
        ]}
        width={400}
        height={200}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }} // Márgenes del gráfico
      />
    </Box>
  );
}

export default BasePie;
