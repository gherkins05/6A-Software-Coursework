from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define a model
class Game(db.Model):
    game_id = db.Column(db.Integer, primary_key=True)
    white = db.Column(db.Integer, nullable=False)
    black = db.Column(db.Integer, nullable=False)
    event = db.Column(db.String(15), nullable=False)
    site = db.Column(db.String(15), nullable=False)
    date = db.Column(db.String(10), nullable=False)
    round = db.Column(db.Integer,  nullable=False)
    result = db.Column(db.String(7), nullable=False)
    time_control = db.Column(db.String(15), nullable=False)


@app.route('/game/<int:game_id>', methods=['GET'])
def get_game(game_id):
    game = Game.query.filter_by(game_id=game_id).first()
    
    if game is None:
        return jsonify({"error": "Game not found"}), 404

    return jsonify(game)


if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True)