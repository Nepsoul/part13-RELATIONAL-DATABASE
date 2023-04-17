--create note table
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content text NOT NULL,
    important boolean,
    date time
);

-- select the blog table
   select * from notes

 -- data insert into blog table
insert into notes (content, important) values ('Relational databases rule the world', true);
insert into notes (content, important) values ('MongoDB is webscale', false);

-- to delete blog
drop table blogs

--to see the information of table
SELECT TABLE_NAME FROM INFORMATION_SCHEMA. TABLES

--table structure in SQL server query
select * 
from INFORMATION_SCHEMA.COLUMNS
where TABLE_NAME='notes'