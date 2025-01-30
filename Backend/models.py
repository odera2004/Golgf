from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# User model for managing system users
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(512), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)  # Admin to manage the system

    tournaments = db.relationship("Tournament", backref="user", lazy=True)
    scores = db.relationship("Score", backref="user", lazy=True)


# Tournament model for managing golf tournaments
class Tournament(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    date = db.Column(db.String, nullable=False)
    location = db.Column(db.String(128), nullable=False)

    created_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)  # Created by admin or user
    player_id = db.Column(db.Integer, db.ForeignKey('player.id', ondelete='CASCADE'), nullable=True)
    players = db.relationship("Player", backref="tournament", lazy=True)
    scores = db.relationship("Score", backref="tournament", lazy=True, cascade="all, delete")


# Player model for managing player details
class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(128), nullable=True)
    phone = db.Column(db.String(15), nullable=True)

    tournaments = db.relationship("Tournament", backref="player", lazy=True)
    scores = db.relationship("Score", backref="player", lazy=True, cascade="all, delete")


# Score model for tracking scores of players in tournaments
class Score(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    timestamp = db.Column(db.String, nullable=False)

    tournament_id = db.Column(db.Integer, db.ForeignKey('tournament.id', ondelete="CASCADE"), nullable=False)
    player_id = db.Column(db.Integer, db.ForeignKey('player.id', ondelete="CASCADE"), nullable=False)
    recorded_by = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # User who recorded the score


# TokenBlocklist for managing token revocation
class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)
