--for testing--
IF EXISTS "chessapp"
    DELETE DATABASE "chessapp";

CREATE DATABASE "chessapp";

CREATE TABLE 
    game(
        game_id SERIAL PRIMARY KEY NOT NULL,
        white INTEGER NOT NULL, --the ERD states this is FK, what does it relate to?
        black INTEGER NOT NULL, --the ERD states this is FK, what does it relate to?
        owner INTEGER NOT NULL,
        event VARCHAR(15) NOT NULL,
        site VARCHAR(15) NOT NULL,
        date VARCHAR(10) NOT NULL,
        round SMALLINT NOT NULL,
        result VARCHAR(7) NOT NULL,
        time_control VARCHAR(15) NOT NULL,
        FOREIGN KEY (white) REFERENCES account(account_id) ON DELETE CASCADE,
        FOREIGN KEY (black) REFERENCES account(account_id) ON DELETE CASCADE,
        FOREIGN KEY (owner) REFERENCES account(account_id) ON DELETE CASCADE
    )


INSERT INTO game 
    (black, white, owner, site, date, event, round, result, time_control) 
VALUES 
    (2, 1, 1 , '6A-Software-Coursework.com', '6/6/2024', 'Live Chess', 63, 'Lose', 'Bullet'), -- Time control incorrect // deal with later
    (2, 1, 1, '6A-Software-Coursework.com', '3/11/2025', 'Live Chess', 51, 'Lose', 'Rapid'),
    (2, 1, 1, '6A-Software-Coursework.com', '9/13/2024', 'Live Chess', 18, 'Win', 'Blitz'),
    (2, 1, 2, '6A-Software-Coursework.com', '12/24/2024', 'Live Chess', 81, 'Draw', 'Bullet'),
    (2, 1, 2, '6A-Software-Coursework.com', '4/25/2024', 'Live Chess', 19, 'Draw', 'Bullet');



CREATE TABLE 
    tag(
        tag_id SERIAL PRIMARY KEY NOT NULL,
        tag VARCHAR(15) NOT NULL
    )

INSERT INTO tag
    (tag_id, tag)
VALUES
    (1,'E4 Opening'),
    (2,'Early Checkmate'),
    (3,'Missed Wins');


CREATE TABLE 
    game_tag(
        game_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (game_id, tag_id),
        FOREIGN KEY (game_id) REFERENCES game(game_id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tag(tag_id) ON DELETE CASCADE
    )

INSERT INTO game_tag
    (game_id, tag_id)
VALUES
    (1,1),
    (1,3),
    (2,1),
    (3,1),
    (3,2),
    (5,3);


CREATE TABLE 
    move(
        move_id SERIAL PRIMARY KEY NOT NULL,
        game_id INTEGER NOT NULL,
        player VARCHAR(5) NOT NULL,
        move_notation VARCHAR(10) NOT NULL,
        clock VARCHAR(10) NOT NULL,
        move_number SMALLINT NOT NULL,
        FOREIGN KEY (game_id) REFERENCES game(game_id) ON DELETE CASCADE
    )

INSERT INTO move
    (game_id, player, move_notation, clock, move_number)
VALUES
    (1,1,"e4", "10.00",1),
    (1,2,"e5", "9.00",2),
    (2,1,"e3", "5.00",1),
    (1,1,"Nf3", "4.50",3);


CREATE TABLE
    account(
        account_id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(24) NOT NULL,
        password_hash VARCHAR(60) NOT NULL,
        email VARCHAR(254)
    )



INSERT INTO account
    (username, password_hash, email)
VALUES
    ("White","notKnown","WhiteTeam@hotmail.com"),
    ("Black","notKnown","BlackTeam@gmail.com");

CREATE TABLE
    theme(
        theme_id SERIAL PRIMARY KEY NOT NULL,
        primary VARCHAR(7) NOT NULL,
        secondary VARCHAR(7) NOT NULL,
        tertiary VARCHAR(7) NOT NULL;
    )

INSERT INTO theme
    (primary, secondary, tertiary)  
VALUES  
    ('#FF5733', '#33FF57', '#3357FF'),  
    ('#F4A261', '#2A9D8F', '#264653'),  
    ('#E76F51', '#8AB17D', '#4A5759');  

CREATE TABLE
    account_theme(
        account_id INTEGER NOT NULL,
        theme_id INTEGER NOT NULL,
        PRIMARY KEY (account_id, theme_id),
        FOREIGN KEY (account_id) REFERENCES account(account_id) ON DELETE CASCADE,
        FOREIGN KEY (theme_id) REFERENCES theme(theme_id) ON DELETE CASCADE
    )

INSERT INTO account_theme
    (account_id, theme_id)
VALUES
    (1,1),
    (1,2),
    (2,3),
    (2,1);

--functions library?--