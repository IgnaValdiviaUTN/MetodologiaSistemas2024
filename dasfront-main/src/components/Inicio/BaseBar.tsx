import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

const BaseBar = () => {
  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: '#f0f2f5', borderRadius: '8px', padding: '20px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '20px', color: '#4D648D', fontWeight: 'bold' }}>Promociones más pedidas</Typography>
      <BarChart
        colors={['#AEEEEE']} // Personaliza el color de las barras
        xAxis={[
          {
            id: 'barCategories',
            data: ['bar A', 'bar B', 'bar C'],
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: [2, 5, 3],
          },
        ]}
        width={500}
        height={300}
        margin={{ top: 20, right: 20, bottom: 120, left: 20 }} // Márgenes del gráfico
      />
    </Box>
  );
}

export default BaseBar;
