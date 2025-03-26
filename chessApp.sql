--for testing--
IF EXISTS "chessapp"
    DELETE DATABASE "chessapp";

CREATE DATABASE "chessapp";



CREATE TABLE 
    game(
        game_id SERIAL PRIMARY KEY NOT NULL,
        white INTEGER NOT NULL, --the ERD states this is FK, what does it relate to?
        black INTEGER NOT NULL, --the ERD states this is FK, what does it relate to?
        event VARCHAR(15) NOT NULL,
        site VARCHAR(15) NOT NULL,
        date VARCHAR(10) NOT NULL,
        round SMALLINT NOT NULL,
        result VARCHAR(7) NOT NULL,
        time_control VARCHAR(15) NOT NULL,
        FOREIGN KEY (white) REFERENCES account(account_id) ON DELETE CASCADE,
        FOREIGN KEY (black) REFERENCES account(account_id) ON DELETE CASCADE
        )

insert into game (game, black, white, site, date, event, round, result, time_control) values (1, 2, 1, '6A-Software-Coursework.com', '6/6/2024', 'Live Chess', 63, 'Lose', 'Bullet');
insert into game (game, black, white, site, date, event, round, result, time_control) values (2, 2, 1, '6A-Software-Coursework.com', '3/11/2025', 'Live Chess', 51, 'Lose', 'Rapid');
insert into game (game, black, white, site, date, event, round, result, time_control) values (3, 2, 1, '6A-Software-Coursework.com', '9/13/2024', 'Live Chess', 18, 'Win', 'Blitz');
insert into game (game, black, white, site, date, event, round, result, time_control) values (4, 2, 1, '6A-Software-Coursework.com', '4/25/2024', 'Live Chess', 19, 'Draw', 'Bullet');
insert into game (game, black, white, site, date, event, round, result, time_control) values (5, 2, 1, '6A-Software-Coursework.com', '12/24/2024', 'Live Chess', 81, 'Draw', 'Bullet');



CREATE TABLE 
    tag(
        tag_id SERIAL PRIMARY KEY NOT NULL,
        tag VARCHAR(15) NOT NULL
    )

CREATE TABLE 
    game_tag(
        game_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        PRIMARY KEY (game_id, tag_id),
        FOREIGN KEY (game_id) REFERENCES games(game_id) ON DELETE CASCADE,
        FOREIGN KEY (tag_id) REFERENCES tag(tag_id) ON DELETE CASCADE
    )

CREATE TABLE 
    move(
        move_id SERIAL PRIMARY KEY NOT NULL,
        game_id INTEGER NOT NULL,
        player VARCHAR(5) NOT NULL,
        move_notation VARCHAR(10) NOT NULL,
        clock VARCHAR(10) NOT NULL,
        move_number SMALLINT NOT NULL
    )

CREATE TABLE
    account(
        account_id SERIAL PRIMARY KEY NOT NULL,
        username VARCHAR(24) NOT NULL,
        password_hash VARCHAR(60) NOT NULL,
        email VARCHAR(254)
    )

CREATE TABLE
    theme(
        theme_id SERIAL PRIMARY KEY NOT NULL,
        primary VARCHAR(7) NOT NULL,
        secondary VARCHAR(7) NOT NULL,
        tertiary VARCHAR(7) NOT NULL
    )

CREATE TABLE
    account_theme(
        account_id INTEGER NOT NULL,
        theme_id INTEGER NOT NULL,
        PRIMARY KEY (account_id, theme_id),
        FOREIGN KEY (account_id) REFERENCES account(account_id) ON DELETE CASCADE,
        FOREIGN KEY (theme_id) REFERENCES theme(theme_id) ON DELETE CASCADE
    )


--functions library?--