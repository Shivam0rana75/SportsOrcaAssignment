Base url used:
https://api.sportsdata.io/v3/soccer/scores/json/Teams  : To fetch and store all teamid and corresponding team
https://api.sportsdata.io/v3/soccer/scores/json/GamesByDate/{Date} ; this returns the match from all leagues combined on that specific date 

The application shows upcoming 15 soccer games from all the leagues note that the real number of games are alot and it is not practical to 
show them all in this assignment so only first 15 are shown this may also result in some particular games not being shown as this process is completely random 

Built with:

 Express (Node.js) backend

 React (Vite) frontend

 Tailwind CSS for styling

 RESTful API calls to SportsDataIO

 Cross-Origin Resource Sharing (CORS) enabled



Features
Fetches real-time upcoming soccer matches

Displays match date, time, league, and team names

Responsive, minimal design using Tailwind CSS

Modular code with reusable components

Loading indicator while fetching data

Clean separation of backend and frontend

Backend fetches and maps team names from IDs using /Teams endpoint


How It Works
Backend (Express)
Fetches all teams (/Teams) and stores their names in a map.

Iterates through future dates until 15 upcoming games are found via /GamesByDate/{date}.

Replaces team IDs with real names using the team map.

Returns array of objects: { homeTeam, awayTeam, dateTime, league }.

Frontend (React)
Calls /upcoming-games endpoint on component mount.

Displays each match inside a responsive MatchCard component.

Includes a loading state while data is being fetched.



The Api is taken from website   https://sportsdata.io
