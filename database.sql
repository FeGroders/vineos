-- Criar a tabela principal
create table vinhos(id serial primary key, nome varchar(200) not null, descricao varchar(200), ano int not null, preco decimal(10,2) not null, imagem text not null, disponivel boolean not null);
create table usuarios(id serial primary key, nome varchar(200) not null, email varchar(200) not null, senha varchar(200) not null, admin boolean not null);

-- Inserir alguns dados
insert into vinhos(nome, descricao, ano, preco, imagem, disponivel) values('Cabernet Sauvignon', 'Tinto', 2013, 77.77, 'aHR0cHM6Ly80NjE3Mi5jZG4uc2ltcGxvNy5uZXQvc3RhdGljLzQ2MTcyL3NrdS92aW5ob3MtdGludG9zLXNvY2llZGFkZS1jb29wZXJhdGl2YS12aW5pY29sYS1yaW8tZ3JhbmRlbnNlLWNhYmVybmV0LWZyYW5jLTE5NTEtMTYyMTI5MTc2MzYyNi5qcGc=', true);
insert into vinhos(nome, descricao, ano, preco, imagem, disponivel) values('Merlot', 'Tinto', 2012, 74.33, 'aHR0cHM6Ly9pbWFnZXMudGNkbi5jb20uYnIvaW1nL2ltZ19wcm9kLzgwOTcxMC92aW5ob19kZV9tZXNhX3RpbnRvX3N1YXZlXzJsXzIxXzFfMjAyMDA4MDYxMzE5MjguanBn', true);
insert into vinhos(nome, descricao, ano, preco, imagem, disponivel) values('Chardonnay', 'Docinho', 2001, 180.00, 'aHR0cHM6Ly80NjE3Mi5jZG4uc2ltcGxvNy5uZXQvc3RhdGljLzQ2MTcyL3NrdS92aW5ob3MtdmluaG9zLXRpbnRvcy1hdnZvY2F0by1ibGVuZC1kZS1tZXJsb3QtMTYwMzIzMTQxMTc3Ni5qcGc=', true);
insert into vinhos(nome, descricao, ano, preco, imagem, disponivel) values('Sauvignon Blanc', 'Docinho', 1986, 45.00, 'aHR0cHM6Ly92aW5ob3N6YW5yb3Nzby5jb20uYnIvd3AtY29udGVudC91cGxvYWRzLzIwMjEvMDQvVmluaG8tRmluby1UaW50by1TZWNvLU1lcmxvdC00NS1saXRyb3MtNjAweDc4NC5qcGc=', false);
insert into vinhos(nome, descricao, ano, preco, imagem, disponivel) values('Pinot Grigio', 'Branco', 1999, 80.00,'aHR0cHM6Ly9zdGF0aWMucGFvZGVhY3VjYXIuY29tL2ltZy91cGxvYWRzLzEvOTgxLzEzMTIzOTgxLnBuZw==', true);

-- Inserir usuário admin
insert into usuarios(nome, email, senha, admin) values('admin', 'admin@admin.com', 'admin', true);