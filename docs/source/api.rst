API
===

.. contents:: Endpoints
   :depth: 1
   :local:


Routes
------

loadGames
---------

Documentation for `loadGames`. *


Non-Routes
----------

OTBEditorLoad
-------------

Decodes the PGN string of a given gameId


OTBEditorSave
-------------

Documentation for `OTBEditorSave`. *


createNewGame
-------------

Creates a new game with the user and the standard setup for the start of a chess game.


getAllMoves
-----------

Takes the position of the game as well as the player's turn and returns all possible legal moves for the user, then stores them locally to highlight board squares when the user clicks on a piece.


login
-----

Takes username and password, checks they match a user in the database and returns a login token lasting an hour, allowing the user to access their account.


register
--------

Takes username as well as password and confirm password of 8 characters or more, checks passwords match then creates a new account in the accounts table with the stored username and password.


saveGame
--------

Saves the game position as a PGN string detailing each move that has been played to get to that position from the original chess position.


validateMove
------------