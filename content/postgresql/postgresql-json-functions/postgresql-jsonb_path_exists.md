---
title: 'PostgreSQL jsonb_path_exists() Function'
page_title: 'PostgreSQL jsonb_path_exists() Function'
page_description: 'You will learn how to use the PostgreSQL jsonb_path_exists() function to check if a JSON path returns any item for a specified JSON document.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-json-functions/postgresql-jsonb_path_exists/'
ogImage: ''
updatedOn: '2024-02-23T14:26:51+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL jsonb_path_query_first() Function'
  slug: 'postgresql-json-functions/postgresql-jsonb_path_query_first'
nextLink:
  title: 'PostgreSQL JSONB Operators'
  slug: 'postgresql-json-functions/postgresql-jsonb-operators'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `jsonb_path_exists()` function to check if a JSON path returns any item for a specified JSON document.

## Introduction to the PostgreSQL jsonb_path_exists() function

The `jsonb_path_exists()` function allows you to check if a JSON path matches any element in a JSON document.

Here’s the syntax of the `jsonb_path_exists()` function:

```sql
jsonb_path_exists(jsonb_data, json_path)
```

In this syntax:

- `jsonb_data` is a JSON document where you want to check for a JSON path.
- `json_path` is the path that you want to check.

The `jsonb_path_exists()` function returns true if the `json_path` returns any elements in the `jsonb_data` document or false otherwise.

## PostgreSQL jsonb_path_exists() function example

Let’s take some examples of using the `jsonb_path_exists()` function.

### Setting up a sample table

First, [create a new table](../postgresql-tutorial/postgresql-create-table) called `products` that store product information:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    attributes JSONB
);
```

The `products` table has the `attributes` column whose data type is `JSONB`.

Second, [insert rows](../postgresql-tutorial/postgresql-insert-multiple-rows) into the `products` table:

```sql
INSERT INTO products (name, attributes)
VALUES
    ('Laptop', '{"brand": "Dell", "price": 1200, "specs": {"cpu": "Intel i7", "ram": "16GB"}}'),
    ('Smartphone', '{"brand": "Samsung", "price": 800, "specs": {"os": "Android", "storage": "128GB"}}')
RETURNING *;

```

Output:

```text
 id |    name    |                                     attributes

----+------------+------------------------------------------------------------------------------------
  1 | Laptop     | {"brand": "Dell", "price": 1200, "specs": {"cpu": "Intel i7", "ram": "16GB"}}
  2 | Smartphone | {"brand": "Samsung", "price": 800, "specs": {"os": "Android", "storage": "128GB"}}
(2 rows)
```

### 1\) Basic jsonb_path_exists() function example

The following example uses the `jsonb_path_exists()` function to check whether the CPU specification exists for any product:

```sql
SELECT name,
       jsonb_path_exists(attributes, '$.specs.cpu') AS cpu_exists
FROM products;
```

Output:

```text
    name    | cpu_exists
------------+------------
 Laptop     | t
 Smartphone | f
(2 rows)
```

### 2\) Using the jsonb_path_exists() function in the WHERE clause

The following example uses the `jsonb_path_exists()` function with the [`jsonb_path_query()`](postgresql-jsonb_path_query) function to retrieve the `CPU` specification of any products that have `CPU` spec:

```sql
SELECT jsonb_path_query(attributes, '$.specs.cpu') AS cpu
FROM products
WHERE jsonb_path_exists(attributes, '$.specs.cpu');
```

Output:

```text
    cpu
------------
 "Intel i7"
(1 row)
```

## Summary

- Use the `jsonb_path_exists()` function to check the existence of JSON Path expressions within JSONB data
