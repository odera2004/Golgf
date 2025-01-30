from flask import Blueprint, request, jsonify
from models import  Score, db


score_bp = Blueprint('score_bp', __name__)
# Add a score for a player in a tournament
@score_bp.route('/scores', methods=['POST'])
def add_score():
    data = request.get_json()
    score_value = data['score_value']
    timestamp = data['timestamp']
    tournament_id = data['tournament_id']
    player_id = data['player_id']
    recorded_by = data['recorded_by']

    score = Score(score=score_value, timestamp=timestamp, tournament_id=tournament_id, player_id=player_id, recorded_by=recorded_by)
    db.session.add(score)
    db.session.commit()
    return jsonify({'msg': 'Score added successfully'}), 201

# Fetch all scores
@score_bp.route('/scores', methods=['GET'])
def get_scores():
    scores = Score.query.all()
    output = []
    for score in scores:
        output.append({
            'id': score.id,
            'score': score.score,
            'timestamp': score.timestamp.isoformat(),
            'tournament_id': score.tournament_id,
            'player_id': score.player_id,
            'recorded_by': score.recorded_by
        })
    return jsonify(output), 200

# Fetch scores by tournament
@score_bp.route('/scores/tournament/<int:tournament_id>', methods=['GET'])
def get_scores_by_tournament(tournament_id):
    scores = Score.query.filter_by(tournament_id=tournament_id).all()
    output = []
    for score in scores:
        output.append({
            'id': score.id,
            'score': score.score,
            'timestamp': score.timestamp.isoformat(),
            'player_id': score.player_id,
            'recorded_by': score.recorded_by
        })
    return jsonify(output), 200

# Update a score
@score_bp.route('/scores/<int:score_id>', methods=['PUT'])
def update_score(score_id):
    data = request.get_json()
    score = Score.query.get(score_id)

    if score:
        score.score = data.get('score', score.score)
        score.timestamp = data.get('timestamp', score.timestamp)
        db.session.commit()
        return jsonify({'msg': 'Score updated successfully'}), 200
    else:
        return jsonify({'msg': 'Score not found'}), 404

# Delete a score
@score_bp.route('/scores/<int:score_id>', methods=['DELETE'])
def delete_score(score_id):
    score = Score.query.get(score_id)
    if score:
        db.session.delete(score)
        db.session.commit()
        return jsonify({'msg': 'Score deleted successfully'}), 200
    else:
        return jsonify({'msg': 'Score not found'}), 404
