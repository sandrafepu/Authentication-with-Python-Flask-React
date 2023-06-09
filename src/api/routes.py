"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
import os, bcrypt
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token, jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/login', methods=['POST'])
def create_token():
    username = request.json.get("email", None)
    password = request.json.get("password", None)

    userInfo = User.query.filter_by(email=username, password=password).first()

    if not userInfo:
        return jsonify({"msg": "Bad email or password", "code": 401}), 401
    
    token = create_access_token(identity=userInfo.id)
    return jsonify({"token": token, "code": 200}), 200

@api.route("/private", methods=["GET"])
@jwt_required()
def private():
    userId = get_jwt_identity()
    user = User.query.get(userId)

    return jsonify({"email": user.email, "code": 200 }), 200

@api.route('/token', methods=['POST'])
def registerUser():
    username = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User(email = username, password = password, is_active=True)
    
    db.session.add(user)
    db.session.commit()
    
    return jsonify({"email": username, "code": 200}), 200
    