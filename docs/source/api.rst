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

localhost:3000/analysisPage
---------------------------

This is the game analysis page, it will fetch `client/analysisPage/analysisPage.html <https://github.com/gherkins05/6A-Software-Coursework/blob/main/client/analysisPage/analysisPage.html>`_.


API Endpoints
=============

localhost:3000/login
--------------------

**Description**:
This `endpoint <https://github.com/gherkins05/6A-Software-Coursework/blob/main/server/endpoints/login.js>`_ is used to authenticate a user and return an auth token.

**Request**:
   - **Method**: POST
   - **URL**: `localhost:3000/login`
   - **Body**:
   .. code-block:: json

      {
         "username": "string",
         "password": "string"
      }

**Response**:
   - **Status Code**: 200 OK
   - **Body**:
   .. code-block:: json

      {
         "token": "string"
      }

localhost:3000/register
-----------------------

**Description**:
This `endpoint <https://github.com/gherkins05/6A-Software-Coursework/blob/main/server/endpoints/register.js>`_ is used to register a new user.

**Request**:
   - **Method**: POST
   - **URL**: `localhost:3000/register`
   - **Body**:
   .. code-block:: json

      {
         "username": "string",
         "password": "string"
      }

**Response**:
   - **Status Code**: 200 OK
   - **Body**:
   .. code-block:: json

      {
         "message": "Registration successful"
      }

localhost:3000/OTBEditor/:gameId/loadGame
-----------------------------------------

**Description**:
This `endpoint <https://github.com/gherkins05/6A-Software-Coursework/blob/main/server/endpoints/loadGame.js>`_ is used to load a game.

**Request**:
   - **Method**: GET
   - **URL**: `localhost:3000/OTBEditor/:gameId/loadGame`
   - **Authorization**: Bearer token

**Response**:
   - **Status Code**: 200 OK
   - **Body**:
   .. code-block:: json

      {
         "gameData": "JSON OBJECT"
      }

localhost:3000/OTBEditor/:gameId/saveGame
-----------------------------------------

**Description**:
This `endpoint <https://github.com/gherkins05/6A-Software-Coursework/blob/main/server/endpoints/saveGame.js>`_ is used to save a game.

**Request**:
   - **Method**: POST
   - **URL**: `localhost:3000/OTBEditor/:gameId/saveGame`
   - **Authorization**: Bearer token
   - **Body**:
   .. code-block:: json

      {
         "gameData": "JSON OBJECT"
      }

**Response**:
   - **Status Code**: 200 OK
   - **Body**:
   .. code-block:: json

      {
         "message": "Game saved successfully"
      }

localhost:3000/OTBEditor/createGame
-----------------------------------

**Description**:
This `endpoint <https://github.com/gherkins05/6A-Software-Coursework/blob/main/server/endpoints/createNewGame.js>`_ is used to create a new game.

**Request**:
   - **Method**: POST
   - **URL**: `localhost:3000/OTBEditor/createGame`
   - **Authorization**: Bearer token
   - **Body**:
   .. code-block:: json

      {
         "gameData": "JSON OBJECT"
      }

**Response**:
   - **Status Code**: 200 OK
   - **Body**:
   .. code-block:: json

      {
         "message": "New game created successfully"
      }

localhost:3000/OTBEditor/getAllMoves
------------------------------------

**Description**:
This `endpoint <https://github.com/gherkins05/6A-Software-Coursework/blob/main/server/endpoints/getAllMoves.js>`_ is used to get a list of all the possible moves from a given game position.

**Request**:
   - **Method**: POST
   - **URL**: `localhost:3000/OTBEditor/createGame`
   - **Authorization**: Bearer token
   - **Body**:
   .. code-block:: json

      {
         "pgn": "String"
      }

**Response**:
   - **Status Code**: 200 OK
   - **Body**:
   .. code-block:: json

      {
         "moves": "[JSON OBJECT]"
      }