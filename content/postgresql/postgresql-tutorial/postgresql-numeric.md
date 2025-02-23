---
title: 'PostgreSQL NUMERIC Type'
page_title: 'PostgreSQL NUMERIC Data Type'
page_description: 'You will learn about the PostgreSQL NUMERIC data type and how to use the NUMERIC column for storing values that precision is required.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-numeric/'
ogImage: ''
updatedOn: '2024-04-18T12:27:09+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL Character Types: CHAR, VARCHAR, and TEXT'
  slug: 'postgresql-tutorial/postgresql-char-varchar-text'
nextLink:
  title: 'PostgreSQL DOUBLE PRECISION Data Type'
  slug: 'postgresql-tutorial/postgresql-double-precision-type'
---

**Summary**: in this tutorial, you will learn about the PostgreSQL `NUMERIC` type for storing numeric data.

## Introduction to PostgreSQL NUMERIC data type

The `NUMERIC` type can store numbers with a lot of digits. Typically, you use the `NUMERIC` type for storing numbers that require exactness such as monetary amounts or quantities.

Here’s the syntax for declaring a column with the `NUMERIC` type:

```shellsqlsql
column_name NUMERIC(precision, scale)
```

In this syntax:

- The `precision` is the total number of digits
- The `scale` is the number of digits in the fraction part.

The storage type of the numeric type depends on the `precision` and `scale`.

The `NUMERIC` type can hold a value of up to `131,072` digits before the decimal point `16,383` digits after the decimal point.

The scale of the `NUMERIC` type can be zero, positive, or negative.

PostgreSQL 15 or later allows you to declare a numeric column with a negative scale.

The following declares the price column with the numeric type that can store total numbers with 7 digits, 5 before the decimal points and 2 digits after the decimal point:

```sql
price NUMERIC(7,2)
```

If you use a negative scale, you can store up to precision \+ scale digits on the left and no digits on the right of the decimal point. For example:

```
amount NUMERIC(5,-2)
```

In this example, you can store up to 7 digits before and 0 digits after the decimal point.

The following example shows how to declare a column of type numeric with a zero scale:

```
quantity NUMERIC(5, 0)
```

It’s equivalent to the following declaration that does not explicitly specify the zero scale:

```sql
quantity NUMERIC(5)
```

If you omit precision and scale, they will default to 131072 and 16383, respectively.

```
NUMERIC
```

### NUMERIC, DECIMAL, and DEC types

In PostgreSQL, the `NUMERIC` and `DECIMAL` types are synonyms so you can use them interchangeably:

```sql
DECIMAL(p,s)
```

If you prefer a shorter name, you can use the name DEC because DEC and DECIMAL are the same type:

```
DEC(p,s)
```

If precision is not required, you should not use the `NUMERIC` type because calculations on `NUMERIC` values are typically slower than [integers](postgresql-integer), float, and double precisions.

### Special values

Besides the ordinal numeric values, the `numeric` type has several special values:

- `Infinity`
- `-Infinity`
- `NaN`

These values represent “infinity”, “negative infinity”, and “not\-a\-number”, respectively.

## PostgreSQL NUMERIC data type examples

Let’s take some examples of using the PostgreSQL `NUMERIC` type.

### 1\) Storing numeric values

If you store a value with a scale greater than the declared scale of the `NUMERIC` column, PostgreSQL will [round](../postgresql-math-functions/postgresql-round) the value to a specified number of fractional digits. For example:

First, [create a new table](postgresql-create-table) called `products`:

```
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(5,2)
);
```

Second, [insert](../postgresql-python/insert) some products with prices whose scales exceed the scale declared in the `price` column:

```sql
INSERT INTO products (name, price)
VALUES ('Phone',500.215),
       ('Tablet',500.214);
```

Because the scale of the `price` column is 2, PostgreSQL rounds the value `500.215` up to `500.22` and rounds the value `500.214` down to `500.21` :

The following [query](postgresql-select) returns all rows of the `products` table:

```sql
SELECT * FROM products;
```

Output:

```text
 id |  name  | price
----+--------+--------
  1 | Phone  | 500.22
  2 | Tablet | 500.21
(2 rows)
```

If you store a value whose precision exceeds the declared precision, PostgreSQL will raise an error as shown in the following example:

```
INSERT INTO products (name, price)
VALUES('Phone',123456.21);
```

PostgreSQL issued the following error:

```sql
ERROR:  numeric field overflow
DETAIL:  A field with precision 5, scale 2 must round to an absolute value less than 10^3.
```

### 2\) PostgreSQL NUMERIC type and NaN

In addition to holding numeric values, the `NUMERIC` type can also hold a special value called `NaN` which stands for not\-a\-number.

The following example updates the price of product id 1 to `NaN` :

```
UPDATE products
SET price = 'NaN'
WHERE id = 1;
```

Notice that you must use single quotes to wrap the `NaN` as shown in the [`UPDATE`](postgresql-update) statement above.

The following query returns the data of the `products` table:

```sql
SELECT * FROM products;
```

Output:

```
 id |  name  | price
----+--------+--------
  2 | Tablet | 500.21
  1 | Phone  |    NaN
(2 rows)
```

Typically, the `NaN` is not equal to any number including itself. It means that the expression `NaN = NaN` returns `false`. You’ll find this implementation [in JavaScript for [NaN](https://www.javascripttutorial.net/javascript-nan/)](https://www.javascripttutorial.net/javascript-nan/).

But in PostgreSQL, two `NaN` values are equal. Also, `NaN` values are greater than regular numbers such as 1, 2, 3\. This implementation allows PostgreSQL to sort `NUMERIC` values and use them in tree\-based [indexes](../postgresql-indexes).

The following query [sorts](postgresql-order-by) the products based on prices from high to low:

```sql
SELECT * FROM products
ORDER BY price DESC;
```

Output:

```
 id |  name  | price
----+--------+--------
  1 | Phone  |    NaN
  2 | Tablet | 500.21
(2 rows)
```

The output indicates that the `NaN` is greater than `500.21`

## Summary

- Use the PostgreSQL `NUMERIC` data type to store numbers that require exactness.
