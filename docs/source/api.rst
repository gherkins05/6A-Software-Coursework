API
===

.. contents:: Endpoints
   :depth: 2
   :local:


Static Endpoints
================

localhost:3000/
---------------

This is the default endpoint for the application. It serves the purpose of imedietly redirecting the users to `localhost:3000/login <#localhost3000login>`_.

localhost:3000/login
--------------------

This is the login page, it will fetch `client/login/login.html <https://github.com/gherkins05/6A-Software-Coursework/blob/main/client/login/login.html>`_.

localhost:3000/register
-----------------------

This is the registration page, it will fetch `client/register/register.html <https://github.com/gherkins05/6A-Software-Coursework/blob/main/client/register/register.html>`_.

localhost:3000/OTBEditor
------------------------

This is the OTB Editor page, it will fetch `client/OTBEditor/OTBEditor.html <https://github.com/gherkins05/6A-Software-Coursework/blob/main/client/OTBEditor/OTBEditor.html>`_.

localhost:3000/gameHistory
--------------------------

This is the game history page, it will fetch `client/gameHistory/gameHistory.html <https://github.com/gherkins05/6A-Software-Coursework/blob/main/client/gameHistory/gameHistory.html>`_.

localhost:3000/gameAnalysis
---------------------------

This is the game analysis page, it will fetch `client/gameAnalysis/gameAnalysis.html <https://github.com/gherkins05/6A-Software-Coursework/blob/main/client/gameAnalysis/gameAnalysis.html>`_.


API Endpoints
=============

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