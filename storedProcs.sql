CREATE PROCEDURE public."AddToAuction"(IN p_seller_id integer, IN p_product_id integer, IN p_auction_date timestamp without time zone, IN p_initial_price real, IN p_quantity smallint)
LANGUAGE 'sql'
AS $BODY$
INSERT INTO auction (seller_id, product_id, auction_date, initial_price, quantity)
  VALUES (p_seller_id, p_product_id, p_auction_date, p_initial_price, p_quantity);
$BODY$;
ALTER PROCEDURE public."AddToAuction"(integer, integer, timestamp without time zone, real, smallint)
    OWNER TO postgres;



CREATE OR REPLACE PROCEDURE public."UpdateProductQty"(
	IN p_quantity smallint,
	IN p_id integer)
LANGUAGE 'sql'
AS $BODY$
UPDATE product SET quantity = quantity - p_quantity WHERE id = p_id;
$BODY$;
ALTER PROCEDURE public."UpdateProductQty"(smallint, integer)
    OWNER TO postgres;

CREATE OR REPLACE PROCEDURE public."AddToBarter"(
	IN req_seller_id integer,
	IN rec_seller_id integer,
	IN offered_p_id integer,
	IN requested_p_id integer,
	IN req_date timestamp without time zone,
	IN offered_p_qty smallint,
	IN requested_p_qty smallint)
LANGUAGE 'sql'
AS $BODY$
INSERT INTO barter VALUES(default,req_seller_id,rec_seller_id, offered_p_id,requested_p_id,req_date,offered_p_qty,requested_p_qty,false);
$BODY$;
ALTER PROCEDURE public."AddToBarter"(integer, integer, integer, integer, timestamp without time zone, smallint, smallint)
    OWNER TO postgres;



CREATE OR REPLACE PROCEDURE public."getAllProducts"(
	)
LANGUAGE 'sql'
AS $BODY$
SELECT p.*, s.firstname, s.lastname, COUNT(r.rating) AS num_ratings, COALESCE(AVG(r.rating), -1) AS avg_rating
  FROM product AS p
  JOIN "User" AS s ON p.sellerid = s.id
  LEFT JOIN review AS r ON r.productid = p.id
  GROUP BY p.id, s.id;
$BODY$;
ALTER PROCEDURE public."getAllProducts"()
    OWNER TO postgres;


CREATE OR REPLACE PROCEDURE public."getMinLoadWarehouse"(
	)
LANGUAGE 'sql'
AS $BODY$
SELECT w.id , w.maxquantity , COALESCE(SUM(p.quantity), 0) AS current_capacity FROM warehouse w
	  LEFT JOIN product p ON w.id = p.storedin
	  GROUP BY w.id
	  ORDER BY current_capacity ASC
	  LIMIT 1;
$BODY$;
ALTER PROCEDURE public."getMinLoadWarehouse"()
    OWNER TO postgres;

CREATE OR REPLACE PROCEDURE public."getProductById"(
	IN p_id integer)
LANGUAGE 'sql'
AS $BODY$
 SELECT p.*, s.firstname, s.lastname, COUNT(r.rating) AS num_ratings, COALESCE(AVG(r.rating), -1) AS avg_rating
    FROM product AS p
    JOIN "User" AS s ON p.sellerid = s.id
    LEFT JOIN review AS r ON r.productid = p.id
    WHERE p.id = p_id
    GROUP BY p.id, s.id;
$BODY$;
ALTER PROCEDURE public."getProductById"(integer)
    OWNER TO postgres;



CREATE OR REPLACE PROCEDURE public."getProductByName"(
	IN p_name character varying)
LANGUAGE 'sql'
AS $BODY$
SELECT p.*, s.firstname, s.lastname, COUNT(r.rating) AS num_ratings, COALESCE(AVG(r.rating), -1) AS avg_rating
    FROM product AS p
    JOIN "User" AS s ON p.sellerid = s.id
    LEFT JOIN review AS r ON r.productid = p.id
    WHERE name LIKE 'p_name%'
    GROUP BY p.id, s.id; 
$BODY$;
ALTER PROCEDURE public."getProductByName"(character varying)
    OWNER TO postgres;


CREATE OR REPLACE PROCEDURE public."getProductBySellerId"(
	IN seller_id integer)
LANGUAGE 'sql'
AS $BODY$
SELECT p.*, s.firstname, s.lastname, COUNT(r.rating) AS num_ratings, COALESCE(AVG(r.rating), -1) AS avg_rating
    FROM product AS p
    JOIN "User" AS s ON p.sellerid = s.id
    LEFT JOIN review AS r ON r.productid = p.id
    WHERE p.sellerid = seller_id
    GROUP BY p.id, s.id; 
$BODY$;
ALTER PROCEDURE public."getProductBySellerId"(integer)
    OWNER TO postgres;


CREATE OR REPLACE PROCEDURE public."getSellerById"(
	IN s_id integer)
LANGUAGE 'sql'
AS $BODY$
select * from seller
where seller.id = s_id
$BODY$;
ALTER PROCEDURE public."getSellerById"(integer)
    OWNER TO postgres;


CREATE OR REPLACE PROCEDURE public."getUserById"(
	IN u_id integer)
LANGUAGE 'sql'
AS $BODY$
select * from "User"
where "User".id = u_id 
$BODY$;
ALTER PROCEDURE public."getUserById"(integer)
    OWNER TO postgres;

