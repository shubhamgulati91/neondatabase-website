---
title: 'PostgreSQL jsonb_object_keys() Function'
page_title: 'PostgreSQL jsonb_object_keys() Function'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL jsonb_object_keys() function to extract the keys from a JSON object.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-json-functions/postgresql-jsonb_object_keys/'
ogImage: ''
updatedOn: '2024-02-24T09:28:45+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL jsonb_each_text() Function'
  slug: 'postgresql-json-functions/postgresql-jsonb_each_text'
nextLink:
  title: 'PostgreSQL jsonb_to_record() Function'
  slug: 'postgresql-json-functions/postgresql-jsonb_to_record'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `jsonb_object_keys()` function to extract the keys from a JSON object.

## Introduction to the PostgreSQL jsonb_object_keys() function

The `jsonb_object_keys()` function allows you to extract the keys of a [JSON](../postgresql-tutorial/postgresql-json) object into a set of text values.

Here’s the basic syntax of the `jsonb_object_keys()` function:

```phpsqlsql
jsonb_object_keys(json_object)
```

In this syntax:

- `json_object` is the JSON object of type JSONB that you want to extract the keys.

The `jsonb_object_keys()` function returns a set of text values representing the keys in the `json_object`.

If the `json_object` is not a JSON object, the `jsonb_object_keys()` function will issue an error.

If the `json_object` is `NULL`, the function will return an empty set.

## PostgreSQL jsonb_object_keys() function examples

Let’s take some examples of using the `jsonb_object_keys()` function.

### 1\) Basic the jsonb_object_keys() function examples

The following example uses the `jsonb_object_keys()` function to extract the keys of a JSON object as a set of text values:

```sql
SELECT
  jsonb_object_keys(
    '{"name": "Joe", "age": 18, "city": "New York"}'
  );
```

Output:

```text
 jsonb_object_keys
-------------------
 age
 city
 name
(3 rows)
```

### 2\) Using the PostgreSQL jsonb_object_keys() function with table data

First, [create a table](../postgresql-tutorial/postgresql-create-table) called `person`:

```sql
CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    info JSONB
);
```

In the `person` table, the `info` column has the type JSONB that stores various information about each person.

Second, [insert rows](../postgresql-tutorial/postgresql-insert-multiple-rows) into the `person` table:

```sql
INSERT INTO person (info)
VALUES
    ('{"name": "John", "age": 30, "city": "New York"}'),
    ('{"name": "Alice", "city": "Los Angeles"}'),
    ('{"name": "Bob", "age": 35 }');
```

Third, get the keys of the objects in the `info` column:

```sql
SELECT jsonb_object_keys(info)
FROM person;
```

Output:

```text
 jsonb_object_keys
-------------------
 age
 city
 name
 city
 name
 age
 name
(7 rows)
```

To get unique keys from all the stored JSON objects in the info column, you can use the `DISTINCT` operator:

```sql
SELECT DISTINCT jsonb_object_keys(info)
FROM person;
```

Output:

```text
 jsonb_object_keys
-------------------
 age
 city
 name
(3 rows)
```

### 3\) Dynamically accessing keys

The following example shows how to dynamically access values corresponding to each key retrieved using `jsonb_object_keys()`:

```
SELECT
    id,
    key,
    info->key AS value
FROM
    person,
    jsonb_object_keys(info) AS key;

```

Output:

```
 id | key  |     value
----+------+---------------
  1 | age  | 30
  1 | city | "New York"
  1 | name | "John"
  2 | city | "Los Angeles"
  2 | name | "Alice"
  3 | age  | 35
  3 | name | "Bob"
(7 rows)
```

In this example, the query returns each key along with its corresponding value from the `info` column of the `person` table.

## Summary

- Use the `jsonb_object_keys()` function to extract the keys from a JSON object.
