---
title: 'PostgreSQL jsonb_strip_nulls() Function'
page_title: 'PostgreSQL json_strip_nulls() Function'
page_description: 'You will learn how to use the PostgreSQL jsonb_strip_nulls() function to recursively delete all object fields that have null values.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-json-functions/postgresql-jsonb_strip_nulls/'
ogImage: ''
updatedOn: '2024-02-24T01:33:41+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL jsonb_set() Function'
  slug: 'postgresql-json-functions/postgresql-jsonb_set'
nextLink:
  title: 'PostgreSQL jsonb_array_length() Function'
  slug: 'postgresql-json-functions/postgresql-jsonb_array_length'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `jsonb_strip_nulls()` function to recursively delete all object fields that have null values.

## Introduction to the PostgreSQL jsonb_strip_nulls() function

The `jsonb_strip_nulls()` function accepts a JSON document with the [JSONB](../postgresql-tutorial/postgresql-json) type and recursively deletes all object fields that have null values. It does not delete non\-object fields with null values.

Here’s the syntax of the `jsonb_strip_nulls()` function:

```sql
jsonb_strip_nulls(jsonb_data)
```

In this syntax, you specify a JSON document in which you want to delete all object fields with null values. The `jsonb_data` must have the type `JSONB`.

The `jsonb_strip_nulls` returns a new `jsonb_data` whose object fields with null values are removed.

If the `jsonb_data` is null, the function returns `NULL`.

## PostgreSQL jsonb_strip_nulls() function example

Let’s take some examples of using the `jsonb_strip_nulls()` function.

### 1\) Basic jsonb_strip_nulls() function example

The following example uses the `jsonb_strip_nulls()` function to remove object fields with null values:

```sql
SELECT
  jsonb_strip_nulls(
    '{"first_name": "John", "middle_name":null, "last_name": "Doe", "scores": [null, 4, 5]}'
  );
```

Output:

```text
                         jsonb_strip_nulls
--------------------------------------------------------------------
 {"scores": [null, 4, 5], "last_name": "Doe", "first_name": "John"}
(1 row)
```

In this example, the object field `middle_name` has a null value therefore the `jsonb_strip_nulls()` function removes it. The `scores` array also has null but it is a non\-object field, therefore, the `jsonb_strip_nulls()` function does not delete it.

### 2\) Using the jsonb_strip_nulls() function to recursively delete object fields with null values

First, [create a new table](../postgresql-tutorial/postgresql-create-table) called `products`:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    attributes JSONB
);
```

Second, [insert data](../postgresql-tutorial/postgresql-insert) into the `products` table:

```sql
INSERT INTO products (name, attributes)
VALUES
  (
    'Smartwatch', '{
  "id": 1,
  "name": "Laptop",
  "specs": {
    "cpu": "Intel i7",
    "ram": null,
    "gpu": "Nvidia GTX 1650",
    "extras": {
      "bluetooth": null,
      "fingerprint_reader": true,
      "webcam": null
    }
  }
}'
) RETURNING *;
```

Output:

```text
 id |    name    |                                                                                 attributes

----+------------+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  1 | Smartwatch | {"id": 1, "name": "Laptop", "specs": {"cpu": "Intel i7", "gpu": "Nvidia GTX 1650", "ram": null, "extras": {"webcam": null, "bluetooth": null, "fingerprint_reader": true}}}
(1 row)
```

Third, use the `jsonb_strip_nulls()` function to remove all fields with null values recursively from the specs object and its nested object:

```sql
SELECT jsonb_strip_nulls(attributes) AS cleaned_attributes
FROM products;
```

Output:

```text
                                                     cleaned_attributes
-----------------------------------------------------------------------------------------------------------------------------
 {"id": 1, "name": "Laptop", "specs": {"cpu": "Intel i7", "gpu": "Nvidia GTX 1650", "extras": {"fingerprint_reader": true}}}
(1 row)
```

The output indicates that the `ram` field and the entire `extras` object, as well as its nested fields with null values, have been removed from the JSONB data.

## Summary

- Use the `jsonb_strip_nulls()` function to recursively delete all object fields that have null values.
