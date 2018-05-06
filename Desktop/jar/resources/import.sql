insert into passenger(passenger_id,firstname,lastname,age,gender,phone) values('p50','Scott','Summers',20,'Male','87654689');
insert into passenger(passenger_id,firstname,lastname,age,gender,phone) values('p51','Hank','Mccoy',23,'Male','63453782');
insert into passenger(passenger_id,firstname,lastname,age,gender,phone) values('p52','Hal','Jordan',26,'Male','23536728');
insert into passenger(passenger_id,firstname,lastname,age,gender,phone) values('p53','Jean','Grey',23,'Female','4356479');
insert into passenger(passenger_id,firstname,lastname,age,gender,phone) values('p54','Susan','Storm',24,'Female','53738940');
insert into passenger(passenger_id,firstname,lastname,age,gender,phone) values('p56','Diana','Prince',29,'Female','0836467');


insert into reservation(reservation_id,passenger_id,price) values('r20','P52',890);
insert into reservation(reservation_id,passenger_id,price) values('r21','P52',550);
insert into reservation(reservation_id,passenger_id,price) values('r22','P53',320);
insert into reservation(reservation_id,passenger_id,price) values('r23','P53',525);
insert into reservation(reservation_id,passenger_id,price) values('r24','P54',438);


insert into flight(flight_id,price,origin,destination,departure_time,arrival_time,seats_left,description,capacity,model,manufacturer,year) values('f100',520,'San Jose','New York',now(),now(),20,'Good flight',80,'Boeing-757','Company1',1895);
insert into flight(flight_id,price,origin,destination,departure_time,arrival_time,seats_left,description,capacity,model,manufacturer,year) values('f101',329,'San Francisco','Chicago',now(),now(),9,'Okay flight',50,'Boeing-339','Company2',1990);
insert into flight(flight_id,price,origin,destination,departure_time,arrival_time,seats_left,description,capacity,model,manufacturer,year) values('f102',435,'Boston','Amsterdam',now(),now(),15,'Super flight',30,'Boeing-423','Company3',1866);

--
--insert into passenger(passenger_id,firstname,lastname,age,gender,phone,flight_id) values('P50','Scott','Summers',20,'Male','87654689','F100');
--insert into passenger(passenger_id,firstname,lastname,age,gender,phone,flight_id) values('P51','Hank','Mccoy',23,'Male','63453782','F101');
--insert into passenger(passenger_id,firstname,lastname,age,gender,phone,flight_id) values('P52','Hal','Jordan',26,'Male','23536728','F100');
--insert into passenger(passenger_id,firstname,lastname,age,gender,phone,flight_id) values('P53','Jean','Grey',23,'Female','4356479','F100');
--insert into passenger(passenger_id,firstname,lastname,age,gender,phone,flight_id) values('P54','Susan','Storm',24,'Female','53738940','F102');
--insert into passenger(passenger_id,firstname,lastname,age,gender,phone,flight_id) values('P56','Diana','Prince',29,'Female','0836467','F102');

--insert into passenger_flight(passenger_id,flight_id) values('P52','F100');
--insert into passenger_flight(passenger_id,flight_id) values('P52','F102');
--insert into passenger_flight(passenger_id,flight_id) values('P53','F103');
--
--insert into reservation_flight(reservation_id,flight_id) values('R20','F100'); 
--insert into reservation_flight(reservation_id,flight_id) values('R21','F103');
--insert into reservation_flight(reservation_id,flight_id) values('R22','F101');


--    create table flight (
--       flight_id varchar(255) not null,
--        arrival_time datetime,
--        departure_time datetime,
--        description varchar(255),
--        origin varchar(255),
--        capacity integer,
--        manufacturer varchar(255),
--        model varchar(255),
--        year integer,
--        price double precision,
--        seats_left integer,
--        destination varchar(255),
--        primary key (flight_id)
--    ) engine=MyISAM
--Hibernate: 
--    
--    create table passenger (
--       passenger_id varchar(255) not null,
--        age integer,
--        firstname varchar(255),
--        gender varchar(255),
--        lastname varchar(255),
--        phone varchar(255),
--        primary key (passenger_id)
--    ) engine=MyISAM
--Hibernate: 
--    
--    create table passenger_flight (
--       passenger_id varchar(255) not null,
--        flight_id varchar(255) not null
--    ) engine=MyISAM
--Hibernate: 
--    
--    create table reservation (
--       reservation_id varchar(255) not null,
--        price double precision,
--        passenger_id varchar(255),
--        primary key (reservation_id)
--    ) engine=MyISAM
--Hibernate: 
--    
--    create table reservation_flight (
--       flight_id varchar(255) not null,
--        reservation_id varchar(255) not null
--    ) engine=MyISAM