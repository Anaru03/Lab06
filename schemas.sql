create table IF not exists Post_Content ( 
    id int AUTO_INCREMENT primary key,
    title varchar(225) not null,
    content text not null,
    created_at timestamp default CURRENT_TIMESTAMP
    images_content varchar(225)
    author_name varchar(225) not null
);