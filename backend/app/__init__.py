from flask import Flask
from flask_cors import CORS

from app.api.upload import upload_bp


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(upload_bp)

    return app
