create table usuarios(
	id varchar(14),
	nombre varchar(50),
	correo varchar(40) not null primary key,
	pass varchar(20),
	direccion varchar(20),
	telefono varchar(11)
)

create table productos(
	id varchar(3) not null primary key,
	nombre varchar(15)not null,
	precio int not null,
	presentacion varchar(15) not null,
	descripcion varchar(50) default (''),
	id_provedor varchar(2),
	id_servicio varchar(2)
)

