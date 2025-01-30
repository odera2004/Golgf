from flask import Blueprint, request, jsonify
from models import Player, db

player_bp = Blueprint('player_bp', __name__)


# CRUD for Player

# Add a player
@player_bp.route("/player", methods=["POST"])
def add_users():
    data = request.get_json()
    name = data['name']
    email = data['email']
    phone = data['phone']

    check_email = Player.query.filter_by(email=email).first()
    
    print ("username",check_email)
   

    if check_email and check_email:
        return jsonify({'msg': 'Player already exists'}), 400
    else:
        new_player = Player(name=name, email=email, phone=phone)
        db.session.add(new_player)
        db.session.commit()
        return jsonify({'msg': 'player created successfully'}), 201
    
# Fetch all players
@player_bp.route('/players', methods=['GET'])
def get_players():
    players = Player.query.all()
    output = []
    for player in players:
        output.append({
            'id': player.id,
            'name': player.name,
            'email': player.email,
            'phone': player.phone
        })
    return jsonify(output), 200

# Fetch a single player by ID
@player_bp.route('/players/<int:player_id>', methods=['GET'])
def get_player(player_id):
    player = Player.query.get(player_id)
    if player:
        return jsonify({
            'id': player.id,
            'name': player.name,
            'email': player.email,
            'phone': player.phone
        }), 200
    else:
        return jsonify({'msg': 'Player not found'}), 404

# Update a player
@player_bp.route('/players/<int:player_id>', methods=['PUT'])
def update_player(player_id):
    data = request.get_json()
    player = Player.query.get(player_id)

    if player:
        player.name = data.get('name', player.name)
        player.email = data.get('email', player.email)
        player.phone = data.get('phone', player.phone)
        db.session.commit()
        return jsonify({'msg': 'Player updated successfully'}), 200
    else:
        return jsonify({'msg': 'Player not found'}), 404

# Delete a player
@player_bp.route('/players/<int:player_id>', methods=['DELETE'])
def delete_player(player_id):
    player = Player.query.get(player_id)
    if player:
        db.session.delete(player)
        db.session.commit()
        return jsonify({'msg': 'Player deleted successfully'}), 200
    else:
        return jsonify({'msg': 'Player not found'}), 404
