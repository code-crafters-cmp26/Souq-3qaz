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

    