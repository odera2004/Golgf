from flask import  jsonify, request,Blueprint
from models import Tournament, db, Player
from flask_migrate import Migrate
from flask_jwt_extended import jwt_required,get_jwt_identity


tournament_bp = Blueprint('tournament_bp', __name__)

# Add a tournament
@tournament_bp.route('/tournaments', methods=['POST'])
@jwt_required()
def add_tournament():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    name = data['name']
    date = data['date']
    location = data['location']
    player_id = data["player_id"]

    check_player_id =Player.query.get(player_id)

    if not check_player_id:
        return jsonify({"error":"player/user doesn't exists"}),406

    else:
       new_tournament = Tournament(name=name, date=date, location=location, created_by=current_user_id, player_id = player_id)
       db.session.add(new_tournament)
       db.session.commit()
    return jsonify({'msg': 'Tournament created successfully'}), 201

# Fetch all tournaments
@tournament_bp.route('/tournaments', methods=['GET'])
def get_tournaments():
    tournaments = Tournament.query.all()
    output = []
    for tournament in tournaments:
        output.append({
            'id': tournament.id,
            'name': tournament.name,
            'date': tournament.date,
            'location': tournament.location,
            'created_by': tournament.created_by,
            'player_id' : tournament.player_id
        })
    return jsonify(output), 200

# Fetch a single tournament by ID
@tournament_bp.route('/tournaments/<int:tournament_id>', methods=['GET'])
def get_tournament(tournament_id):
    tournament = Tournament.query.get(tournament_id)
    if tournament:
        return jsonify({
            'id': tournament.id,
            'name': tournament.name,
            'date': tournament.date.isoformat(),
            'location': tournament.location,
            'created_by': tournament.created_by
        }), 200
    else:
        return jsonify({'msg': 'Tournament not found'}), 404

# Update a tournament
@tournament_bp.route('/tournament/<int:tournament_id>', methods=['PUT'])
def update_tournament(tournament_id):
    data = request.get_json()
    tournament = Tournament.query.get(tournament_id)

    if tournament:
        tournament.name = data.get('name', tournament.name)
        tournament.date = data.get('date', tournament.date)
        tournament.location = data.get('location', tournament.location)
        db.session.commit()
        return jsonify({'msg': 'Tournament updated successfully'}), 200
    else:
        return jsonify({'msg': 'Tournament not found'}), 404

# Delete a tournament
@tournament_bp.route('/tournament/<int:tournament_id>', methods=['DELETE'])
def delete_tournament(tournament_id):
    tournament = Tournament.query.get(tournament_id)
    if tournament:
        db.session.delete(tournament)
        db.session.commit()
        return jsonify({'msg': 'Tournament deleted successfully'}), 200
    else:
        return jsonify({'msg': 'Tournament not found'}), 404
