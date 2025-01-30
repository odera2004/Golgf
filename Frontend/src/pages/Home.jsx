import React, { useContext } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import { UserContext } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { tournaments = [], deleteTournament, updateTournament } = useContext(TournamentContext);
  const { current_user } = useContext(UserContext);

  console.log(tournaments);

  return (
    <div className="container mt-5">
      <h1 className="text-center text-gradient mb-4">🎉 Your Tournaments ({tournaments.length})</h1>

      {current_user ? (
        <div>
          {tournaments.length === 0 && (
            <div className="alert alert-info text-center">
              <p className="mb-1">You don't have any tournaments yet!</p>
              <Link to="/addtournament" className="btn btn-primary btn-sm">+ Create Tournament</Link>
            </div>
          )}

          <div className="row g-4">
            {tournaments.map((tournament) => (
              <div key={tournament.id} className="col-md-4">
                <div className="card tournament-card h-100 shadow-sm border-0">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-primary p-2">{tournament.person?.name}</span>
                      <p className="text-muted small">{tournament.date}</p>
                    </div>

                    <h5 className="card-title">
                      <Link to={`/tournament/${tournament.id}`} className="text-decoration-none text-dark">
                        {tournament.name}
                      </Link>
                    </h5>

                    <div className="d-flex justify-content-between mt-3">
                      <button
                        onClick={() => deleteTournament(tournament.id)}
                        className="btn btn-danger btn-sm rounded-pill px-3"
                      >
                        ❌ Delete
                      </button>
                      <button
                        onClick={() => {
                          const newName = prompt("Enter new tournament name:", tournament.name);
                          const newLocation = prompt("Enter new location:", tournament.location);
                          const newDate = prompt("Enter new date:", tournament.date);

                          if (newName && newLocation && newDate) {
                            updateTournament(tournament.id, newName, newLocation, newDate);
                          }
                        }}
                        className="btn btn-warning btn-sm rounded-pill px-3"
                      >
                        ✏️ Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mt-4">
          <div className="alert alert-warning d-inline-block px-4 py-3">
            <p className="mb-0">🚀 <Link to="/login" className="alert-link">Login</Link> to access your tournaments.</p>
          </div>
        </div>
      )}
    </div>
  );
}
