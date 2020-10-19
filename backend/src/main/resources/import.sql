INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
INSERT INTO roles(name) VALUES('ROLE_LEADER');

INSERT INTO users (address, cellphone, code, email, email_verified, image_url, name, personal_email, provider, provider_id) VALUES ('cll 4 # 4 - 78 San Luis', '3222003339', '1151193', 'elvaleli@gmail.com', 0, 'https://lh6.googleuserconten', 'Elian Nahun Zapata Alfonso', NULL, 'google', '105035634800495666210');

INSERT INTO user_roles(user_id, role_id) VALUES (1, 2);