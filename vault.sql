create database vault;

use vault;

create table accounts
(
	id integer identity primary key,
    software varchar(40),
    login varchar(50),
    password varchar(256),
    lastDate datetime
);

insert into accounts values ('Steam', 'Leozin18', 'minhasenha123', getdate());

select * from accounts

delete from accounts where id =1;

create login usuario with password='senha';
create user usuario from login usuario;
exec sp_addrolemember 'DB_DATAREADER', 'usuario';
exec sp_addrolemember 'DB_DATAWRITER', 'usuario';