INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');
INSERT INTO roles(name) VALUES('ROLE_LEADER');

INSERT INTO users (address, cellphone, code, email, email_verified, image_url, name, personal_email, provider, provider_id, id_rol) VALUES ('cll 4 # 4 - 78 San Luis', '3222003339', '1151193', 'elvaleli@gmail.com', 0, 'https://lh6.googleuserconten', 'Elian Nahun Zapata Alfonso', NULL, 'google', '105035634800495666210', 2);
INSERT INTO users (address, cellphone, code, email, email_verified, image_url, name, personal_email, provider, provider_id, id_rol) VALUES ('cll 4 # 4 - 79 Libertadores', '3222103339', '1151194', 'juliana@ufps.edu.co', 0, 'https://lh6.googleuserconten', 'Juliana Andrea Ortega Castillo', NULL, 'google', '105035634800495666211', 1);
INSERT INTO users (address, cellphone, code, email, email_verified, image_url, name, personal_email, provider, provider_id, id_rol) VALUES ('cll 10 # 34 - 80 Guaimaral', '3222203339', '1151195', 'jhorman@ufps.edu.co', 0, 'https://lh6.googleuserconten', 'Jhorman Jesus Botello', NULL, 'google', '105035634800495666213', 3);
INSERT INTO users (address, cellphone, code, email, email_verified, image_url, name, personal_email, provider, provider_id, id_rol) VALUES ('av 4 # 4 - 10 Quinta oriental', '3222103339', '1151194', 'pedroandres@ufps.edu.co', 0, 'https://lh6.googleuserconten', 'Pedro Andres ', NULL, 'google', '105035634800495666221', 1);

INSERT INTO project (start_date) VALUE("2020-11-05")

INSERT INTO project_user(id_project, id_user) VALUES(1,3)