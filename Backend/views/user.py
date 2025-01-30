from flask import  jsonify, request,Blueprint
from models import User, db 
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash
from flask_jwt_extended import jwt_required,get_jwt_identity

user_bp = Blueprint('user_bp', __name__)

#register user
@user_bp.route('/users', methods=['POST'])
def add_users():
    data = request.get_json()
    username = data['username']
    email = data['email']
    password = generate_password_hash(data['password'])
   


    check_username = User.query.filter_by(username=username).first()
    check_email = User.query.filter_by(email=email).first()
    
    print ("username",check_username)
    print ("email",check_email)

    if check_username and check_email:
        return jsonify({'msg': 'User already exists'}), 400
    else:
        new_user = User(username=username, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'msg': 'User created successfully'}), 201
    
#Fetching sigle User
@user_bp.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({'user_id':1 }), 200
    else:
        return jsonify({'message': 'User not found'}), 404
    
#Fetch users
@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    output = []
    for user in users:
        output.append({'username': user.username, 
                       'email':user.email, 
                       "password":user.password
                       })
        return jsonify(output), 200
    
# **UPDATE USER PROFILE**
@user_bp.route('/update_profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    data = request.get_json()

    # Check if new username/email already exists
    if "username" in data:
        existing_user = User.query.filter_by(username=data["username"]).first()
        if existing_user and existing_user.id != user_id:
            return jsonify({'error': 'Username already taken'}), 400
        user.username = data["username"]

    if "email" in data:
        existing_email = User.query.filter_by(email=data["email"]).first()
        if existing_email and existing_email.id != user_id:
            return jsonify({'error': 'Email already in use'}), 400
        user.email = data["email"]

    if "password" in data and data["password"]:
        user.password = generate_password_hash(data["password"])

    db.session.commit()
    return jsonify({'msg': 'Profile updated successfully'}), 200


    
