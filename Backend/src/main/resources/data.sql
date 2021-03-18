INSERT INTO tb_product (name, price, image_Uri, description, inventory) VALUES ('Hamburguer Bacon', 49.9, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/pizza_bacon.jpg', 'Pizza de bacon com mussarela, orégano, molho especial e tempero da casa.', true);
INSERT INTO tb_product (name, price, image_Uri, description, inventory) VALUES ('Hamburguer Moda da Casa', 59.9, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/pizza_moda.jpg', 'Pizza à moda da casa, com molho especial e todos ingredientes básicos, e queijo à sua escolha.', false);
INSERT INTO tb_product (name, price, image_Uri, description, inventory) VALUES ('Hamburguer Portuguesa', 45.0, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/pizza_portuguesa.jpg', 'Pizza Portuguesa com molho especial, mussarela, presunto, ovos e especiarias.', true);
INSERT INTO tb_product (name, price, image_Uri, description, inventory) VALUES ('Pizza de Carne', 52.0, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/risoto_carne.jpg', 'Risoto de carne com especiarias e um delicioso molho de acompanhamento.', true);
INSERT INTO tb_product (name, price, image_Uri, description, inventory) VALUES ('Pizza Funghi', 59.95, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/risoto_funghi.jpg', 'Risoto Funghi feito com ingredientes finos e o toque especial do chef.', true);
INSERT INTO tb_product (name, price, image_Uri, description, inventory) VALUES ('Batata Espaguete', 35.9, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/macarrao_espaguete.jpg', 'Macarrão fresco espaguete com molho especial e tempero da casa.', false);
INSERT INTO tb_product (name, price, image_Uri, description, inventory) VALUES ('Batata Fusili', 38.0, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/macarrao_fusili.jpg', 'Macarrão fusili com toque do chef e especiarias.', true);
INSERT INTO tb_product (name, price, image_Uri, description, inventory) VALUES ('Batata Penne', 37.9, 'https://raw.githubusercontent.com/devsuperior/sds2/master/assets/macarrao_penne.jpg', 'Macarrão penne fresco ao dente com tempero especial.', false);

INSERT INTO tb_category (name) VALUES ('Hamburguer');
INSERT INTO tb_category (name) VALUES ('Pizza');
INSERT INTO tb_category (name) VALUES ('Enroladinho');
INSERT INTO tb_category (name) VALUES ('Bolo');
INSERT INTO tb_category (name) VALUES ('Espetinho');
INSERT INTO tb_category (name) VALUES ('Refrigerantes');
INSERT INTO tb_category (name) VALUES ('Pastel');

INSERT INTO tb_category_product (category_id, product_id) VALUES (1 , 1);
INSERT INTO tb_category_product (category_id, product_id) VALUES (1 , 4);
INSERT INTO tb_category_product (category_id, product_id) VALUES (2 , 2);
INSERT INTO tb_category_product (category_id, product_id) VALUES (2 , 5);
INSERT INTO tb_category_product (category_id, product_id) VALUES (2 , 8);
INSERT INTO tb_category_product (category_id, product_id) VALUES (3 , 3);
INSERT INTO tb_category_product (category_id, product_id) VALUES (3 , 4);
INSERT INTO tb_category_product (category_id, product_id) VALUES (4 , 2);
INSERT INTO tb_category_product (category_id, product_id) VALUES (4 , 6);
INSERT INTO tb_category_product (category_id, product_id) VALUES (5 , 4);
INSERT INTO tb_category_product (category_id, product_id) VALUES (5 , 6);
INSERT INTO tb_category_product (category_id, product_id) VALUES (6 , 5);
INSERT INTO tb_category_product (category_id, product_id) VALUES (6 , 1);
INSERT INTO tb_category_product (category_id, product_id) VALUES (7 , 7);
INSERT INTO tb_category_product (category_id, product_id) VALUES (7 , 5);

INSERT INTO tb_client (name, email, password, phones, number_validation) VALUES ('Joãozinho','email@gmail.com', '12345', '(88) 9 9876-5432', null);


INSERT INTO tb_order (latitude, longitude, address, moment, status, paymant_to_card) VALUES (-23.561680, -46.656139, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T10:00:00Z', 0, true);
INSERT INTO tb_order (latitude, longitude, address, moment, status, paymant_to_card) VALUES (-22.946779, -43.217753, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T15:00:00Z', 0, false);
INSERT INTO tb_order (latitude, longitude, address, moment, status, paymant_to_card) VALUES (-25.439787, -49.237759, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T16:00:00Z', 0, true);
INSERT INTO tb_order (latitude, longitude, address, moment, status, paymant_to_card) VALUES (-23.561680, -46.656139, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T12:00:00Z', 1, false);
INSERT INTO tb_order (latitude, longitude, address, moment, status, paymant_to_card) VALUES (-23.561680, -46.656139, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T08:00:00Z', 0, false);
INSERT INTO tb_order (latitude, longitude, address, moment, status, paymant_to_card) VALUES (-23.561680, -46.656139, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T14:00:00Z', 1, true);
INSERT INTO tb_order (latitude, longitude, address, moment, status, paymant_to_card) VALUES (-23.561680, -46.656139, 'Avenida Paulista, 1500', TIMESTAMP WITH TIME ZONE '2021-01-01T09:00:00Z', 0, false);

INSERT INTO tb_order_product (order_id, product_id) VALUES (1 , 1);
INSERT INTO tb_order_product (order_id, product_id) VALUES (1 , 4);
INSERT INTO tb_order_product (order_id, product_id) VALUES (2 , 2);
INSERT INTO tb_order_product (order_id, product_id) VALUES (2 , 5);
INSERT INTO tb_order_product (order_id, product_id) VALUES (2 , 8);
INSERT INTO tb_order_product (order_id, product_id) VALUES (3 , 3);
INSERT INTO tb_order_product (order_id, product_id) VALUES (3 , 4);
INSERT INTO tb_order_product (order_id, product_id) VALUES (4 , 2);
INSERT INTO tb_order_product (order_id, product_id) VALUES (4 , 6);
INSERT INTO tb_order_product (order_id, product_id) VALUES (5 , 4);
INSERT INTO tb_order_product (order_id, product_id) VALUES (5 , 6);
INSERT INTO tb_order_product (order_id, product_id) VALUES (6 , 5);
INSERT INTO tb_order_product (order_id, product_id) VALUES (6 , 1);
INSERT INTO tb_order_product (order_id, product_id) VALUES (7 , 7);
INSERT INTO tb_order_product (order_id, product_id) VALUES (7 , 5);

INSERT INTO tb_order_user (order_id, user_id) VALUES (1 , 1);
INSERT INTO tb_order_user (order_id, user_id) VALUES (2 , 1);
INSERT INTO tb_order_user (order_id, user_id) VALUES (3 , 1);
INSERT INTO tb_order_user (order_id, user_id) VALUES (4 , 1);
INSERT INTO tb_order_user (order_id, user_id) VALUES (5 , 1);
INSERT INTO tb_order_user (order_id, user_id) VALUES (6 , 1);
INSERT INTO tb_order_user (order_id, user_id) VALUES (7 , 1);

