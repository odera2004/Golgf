import React, { useContext, useState } from 'react';
import { TournamentContext } from '../context/TournamentContext';
import './Addtournament.css'; // Import the CSS file

export default function AddTournament() {
  const { players, addTournament } = useContext(TournamentContext);

  const [name, setName] = useState('');
  const [player_id, setPlayerId] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTournament(name, location, date, parseInt(player_id));

    setName('');
    setLocation('');
    setPlayerId('');
    setDate('');
  };

  return (
    <div className="tournament-form-container"> {/* Use class from CSS */}
      <h2 className="tournament-form-title">Add Tournament</h2> {/* Use class from CSS */}
      <form onSubmit={handleSubmit} className="tournament-form"> {/* Use class from CSS */}
        <div className="form-group"> {/* Use class from CSS */}
          <label htmlFor="title" className="form-label">
            Tournament
          </label>
          <input
            id="title"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group"> {/* Use class from CSS */}
          <label htmlFor="player" className="form-label">
            player
          </label>
          <select
            id="player"
            onChange={(e) => setPlayerId(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select</option>
            {players && players.map((player) => (
              <option value={player.id} key={player.id}>{player.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group"> {/* Use class from CSS */}
          <label htmlFor="description" className="form-label">
            Location
          </label>
          <textarea
            id="description"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
            rows="2"
            required
          ></textarea>
        </div>

        <div className="form-group"> {/* Use class from CSS */}
          <label htmlFor="deadline" className="form-label">
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Add Tournament
          </button>
        </div>
      </form>
    </div>
  );
}