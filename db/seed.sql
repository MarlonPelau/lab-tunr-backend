
\c tuner;

INSERT INTO tunes (name, artist, album, time, is_favorite) VALUES
('Hey Ma', 'Cam"ron', 'COME HOME WITH ME', '3:40', true),
('Pass The Dutchie', 'Musical Youth', 'THE YOUTH OF TODAY', '3:23', false),
('Falling in Love', 'Surface', NULL, '6:25', true),
('Mary Mary', 'Run-Dmc', 'TOUGHER THAN LEATHER', '3:13', true);

\c spinners;

INSERT INTO spinners (tunes_id, performer, playlist, titles, DJ, content)
VALUES
('1', 'Cam"ron', 'COME HOME CLUE', 'Hey Ma, Oh Boy, Welcome to New York City', 'DJ Clue', 'The type of Killa Cam armory I had to have in my crate before walking into the club!'),
('2', 'Musical Youth', 'THE RASTA OF TODAY', 'Pass The Dutchie, Youth of Today, Heartbreaker', 'Don Letts', 'I would really be a punk not to have these UK reggae classics in my selections.'),
('3', 'Surface', 'PARADISE GARAGE', 'Falling in Love, Shower Me with Your Love, The First Time', 'Larry Levan', 'These songs had elements that appealed to the diverse crowd at Paradise Garage, making them suitable choices for my playlists at the club.'),
('4', 'Run-Dmc', 'TOUGHER THAN JMJ', 'Run"s House, Mary Mary, Beats to the Rhyme', 'Jam Master Jay', 'Yo, my role in these songs was integral to our signature sound, with scratching and turntablism adding layers of depth and energy.')