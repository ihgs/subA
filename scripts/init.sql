-- データベースの作成
CREATE DATABASE testdb;

-- ユーザーの作成
CREATE USER testuser WITH PASSWORD 'password';

-- ユーザーに対するデータベースの全権限付与
GRANT ALL PRIVILEGES ON DATABASE testdb TO testuser;

\c testdb

-- テーブルの作成
CREATE TABLE public.books(
  id integer,
  name varchar(10)
);
GRANT ALL PRIVILEGES ON TABLE public.books TO testuser;

-- データの追加
INSERT INTO public.books (id, name) VALUES
(1, 'Book One'),
(2, 'Book Two'),
(3, 'Book Three');

