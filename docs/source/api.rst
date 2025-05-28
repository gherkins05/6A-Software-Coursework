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

localhost:3000/login
--------------------

**Description**:
This endpoint is used to load a game based on the provided `gameId`.

**Request**:
   - **Method**: POST
   - **URL**: `localhost:3000/login`
   - **Headers**:
   - `Authorization`:
   - **Parameters**:
      - `username` (string): The username.
      - `password` (string): The password.

   **Response**:
   - **Status Code**: 200 OK
   - **Headers**:
   - **Body**:
   .. code-block:: json
      {
         "token": "string"
      }

localhost:3000/register
-----------------------

localhost:3000/OTBEditor/:gameId/loadGame
-----------------------------------------



localhost:3000/OTBEditor/:gameId/saveGame
-----------------------------------------



localhost:3000/OTBEditor/createGame
-----------------------------------



localhost:3000/OTBEditor/getAllMoves
------------------------------------


