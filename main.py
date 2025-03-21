from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define a model
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(200), nullable=True)


# Create tables and seed data using app context
with app.app_context():
    db.create_all()
    # Seed data only if the table is empty
    if not Item.query.first():
        db.session.add(Item(name="Sample Item", description="This is a sample item"))
        db.session.commit()



# Define a route to fetch all items
@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([{"id": item.id, "name": item.name, "description": item.description} for item in items])

@app.route('/game/<int:game_id>', methods=['GET'])
def get_game(game_id):
    game = Game.query.filter_by(game_id=game_id).first()
    

if __name__ == '__main__':
    app.run(debug=True)