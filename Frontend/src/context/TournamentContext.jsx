import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export const TournamentContext = createContext();

export const TournamentProvider = ({ children }) => {
  const navigate = useNavigate();
  const { authToken } = useContext(UserContext);

  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [onChange, setOnChange] = useState(true);

  // ================================ PLAYERS =====================================
  useEffect(() => {
    fetch("http://127.0.0.1:5000/players", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setPlayers(response);
      });
  }, []);

  // ================================ TOurnamentS ====================================
  // Fetch Tournaments
  console.log("hello",tournaments)
  useEffect(() => {
    fetch("http://127.0.0.1:5000/tournaments", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setTournaments(response);
      });
  }, [onChange]);

  // Add Tournament
  const addTournament = (name, location, date, player_id) => {
    toast.loading("Adding tournament ...");
    fetch("http://127.0.0.1:5000/tournaments", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        name,
        location, 
        date,
        player_id,
      }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        toast.dismiss();
        if (response.msg) {
          toast.success(response.msg);
          setOnChange(!onChange);
        } else if (response.error) {
          toast.error(response.error);
        } else {
          toast.error("Failed to add");
        }
      });
  };

  
  // Update Tournament
const updateTournament = (id, name, location, date) => {
  toast.loading("Updating tournament ...");

  fetch(`http://127.0.0.1:5000/tournament/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      name,
      location,
      date,
    }),
  })
    .then((resp) => resp.json())
    .then((response) => {
      toast.dismiss();
      if (response.msg) {
        toast.success(response.msg);
        setOnChange(!onChange);
      } else if (response.error) {
        toast.error(response.error);
      } else {
        toast.error("Failed to update tournament");
      }
    })
    .catch((error) => {
      toast.dismiss();
      toast.error("Error updating tournament");
      console.error("Update Error:", error);
    });
};

  // Delete Tournament
  const deleteTournament = (id) => {
    toast.loading("Deleting tournament ...");
    fetch(`http://127.0.0.1:5000/tournament/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((resp) => resp.json())
      .then((response) => {
        toast.dismiss();
        if (response.msg) {
          toast.success(response.msg);
          setOnChange(!onChange);
          navigate("/");
        } else if (response.error) {
          toast.error(response.error);
        } else {
          toast.error("Failed to delete");
        }
      });
  };

  // Context data
  const data = {
    tournaments,
    players,
    addTournament,
    updateTournament,
    deleteTournament,
  };

  // Provider
  return (
    <TournamentContext.Provider value={data}>
      {children}
    </TournamentContext.Provider>
  );
};
