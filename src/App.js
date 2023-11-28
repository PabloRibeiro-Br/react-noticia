import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core'; // Substitua pelo componente de botão adequado para a web
import moment from 'moment';
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'; // Substitua pelos componentes adequados para a web

const NewsCard = ({ title, description, image, date, onViewMoreClick }) => {
  const shortenedDate = moment(date).format('DD-MM-YYYY');

  return (
    <Card>
      <CardMedia component="img" alt={title} height="200" image={image} />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {shortenedDate}
        </Typography>
        <Typography variant="body1" paragraph>
          {description}
        </Typography>
        <Button variant="contained" color="primary" onClick={onViewMoreClick}>
          Ver Mais
        </Button>
      </CardContent>
    </Card>
  );
};

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    // Simule a chamada de API para obter dados de notícias
    const fetchData = async () => {
      try {
        const response = await fetch('https://airepair.com.br/dtc/wp-json/wp/v2/posts');
        const data = await response.json();
        setNewsData(data);
      } catch (error) {
        console.error('Erro ao obter notícias:', error);
      }
    };
   
    fetchData();
  }, []);

  const handleViewMoreClick = (news) => {
    setSelectedNews(news);
  };

  const handleBackButtonClick = () => {
    setSelectedNews(null);
  };

  return (
    <div>
      {selectedNews ? (
        <div>
          <Button variant="contained" color="primary" onClick={handleBackButtonClick}>
            Voltar
          </Button>
          <div className="full-news-content">
            <Typography variant="h4" gutterBottom>
              {selectedNews.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" paragraph>
              {moment(selectedNews.date).format('DD-MM-YYYY')}
            </Typography>
            <Typography variant="body1" paragraph>
              {selectedNews.content}
            </Typography>
          </div>
        </div>
      ) : (
        <div className="news-list">
          {newsData.map((news) => (
            <NewsCard
              key={news.id}
              title={news.title}
              description={news.description}
              image={news.image}
              date={news.date}
              onViewMoreClick={() => handleViewMoreClick(news)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsPage;



