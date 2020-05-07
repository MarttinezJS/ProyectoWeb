create table usuarios(
	id varchar(14),
	nombre varchar(50),
	correo varchar(40) not null primary key,
	pass varchar(20),
	direccion varchar(20),
	telefono varchar(11)
)

create table productos(
	id varchar(14) not null primary key,
	nombre varchar(15)
)

