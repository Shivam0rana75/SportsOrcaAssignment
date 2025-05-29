import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = 3000;
const API_KEY = '8a97a5c90d8e4815b3d5b2ba7d4756c0';
app.use(cors());
app.use(bodyParser.json());

app.get('/upcoming-games', async (req, res) => {
  const games = [];
  let currentDate = new Date();
  const maxGames = 15;

  try {
    const teamsResponse = await axios.get('https://api.sportsdata.io/v3/soccer/scores/json/Teams', {
      headers: {
        'Ocp-Apim-Subscription-Key': API_KEY
      }
    });

    const teamMap = {};
    teamsResponse.data.forEach(team => {
      teamMap[team.TeamId] = team.Name;
    });

    while (games.length < maxGames) {
      const dateStr = currentDate.toISOString().split('T')[0];

      const response = await axios.get(`https://api.sportsdata.io/v3/soccer/scores/json/GamesByDate/${dateStr}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': API_KEY
        }
      });

      const data = response.data;

      data.forEach(game => {
        if (games.length < maxGames) {
          const homeName = teamMap[game.HomeTeamId] || `HomeTeamId: ${game.HomeTeamId}`;
          const awayName = teamMap[game.AwayTeamId] || `AwayTeamId: ${game.AwayTeamId}`;
          const leagueName = game.Competition?.Name || 'Unknown League';

          games.push({
            homeTeam: homeName,
            awayTeam: awayName,
            league: leagueName,
            dateTime: game.DateTime
          });
        }
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.json(games);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch upcoming games.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
