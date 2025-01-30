from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from datetime import timedelta
from models import db
from flask_cors import CORS
app = Flask(__name__)

CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://tournamentdb_pzsj_user:fcyiB7JtAOKQs052AbMFT6dCeaOxLEJE@dpg-cudtjt1u0jms73958t1g-a.oregon-postgres.render.com/tournamentdb_pzsj'

migrate = Migrate(app, db)
db.init_app(app)

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "vghsdvvsjvy436u4wu37118gcd#"  # Change this!
app.config["JWT_ACCESS_TOKEN_EXPIRES"] =  timedelta(hours=1)
jwt = JWTManager(app)
jwt.init_app(app)

from views import *

app.register_blueprint(user_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(player_bp)
app.register_blueprint(score_bp)
app.register_blueprint(tournament_bp)


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()

    return token is not None