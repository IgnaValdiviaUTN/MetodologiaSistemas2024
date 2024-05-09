import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const InicioCard = ({ content }) => {
  const { url, title, content: cardContent } = content;

  return (
    <Card sx={{ maxWidth: 345, textAlign: 'center' }}>
      <CardMedia
        component="img"
        height="140"
        image={url}
        alt={title}
      />
      <CardContent>
        <Typography variant="h6" component="div" color="primary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {cardContent}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'center' }}>
        <Link to={`/${title}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Button size="small" color="primary">
            Ver más
          </Button>
        </Link>
        <Button size="small" color="primary">
          Crear
        </Button>
      </CardActions>
    </Card>
  );
}

export default InicioCard;
