function MatchCard({ match }) {
  const date = new Date(match.dateTime).toLocaleDateString();
  const time = new Date(match.dateTime).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{match.league}</h2>
      <div className="text-lg font-medium mb-4">
        {match.homeTeam} <span className="text-gray-500">VS</span> {match.awayTeam}
      </div>
      <div className="text-sm text-gray-600">
        {date} at {time}
      </div>
    </div>
  );
}

export default MatchCard;
