import { useEffect, useState } from 'react';
import './App.css'
import MatchCard from './components/MatchCard'

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/upcoming-games')
      .then(res => res.json())
      .then(data => {
        setMatches(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching matches:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Upcoming Matches</h1>

      {loading ? (
        <div className="text-center mt-10 text-xl font-medium text-gray-500">
          Loading matches...
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match, idx) => (
            <MatchCard key={idx} match={match} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
