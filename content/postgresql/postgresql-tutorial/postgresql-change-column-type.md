---
title: 'PostgreSQL Change Column Type'
page_title: 'PostgreSQL Change Column Type'
page_description: 'This tutorial shows you step by step how to change the data type of a column by using the ALTER TABLE ALTER COLUMN SET DATA TYPE statement.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-change-column-type/'
ogImage: ''
updatedOn: '2024-01-25T05:13:35+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL DROP COLUMN: Remove One or More Columns of a Table'
  slug: 'postgresql-tutorial/postgresql-drop-column'
nextLink:
  title: 'PostgreSQL RENAME COLUMN: Renaming a column'
  slug: 'postgresql-tutorial/postgresql-rename-column'
---

**Summary**: this tutorial shows you step\-by\-step how to change the data type of a column by using the `ALTER TABLE... ALTER COLUMN` statement.

## PostgreSQL change column type statement

To change the [data type](postgresql-time) of a column, you use the [`ALTER TABLE`](postgresql-alter-table) statement as follows:

```sqlsql
ALTER TABLE table_name
ALTER COLUMN column_name
[SET DATA] TYPE new_data_type;
```

In this syntax:

- First, specify the name of the table to which the column you want to change after the `ALTER TABLE` keywords.
- Second, provide the name of the column that you want to change the data type after the `ALTER COLUMN` clause.
- Third, supply the new data type for the column after the `TYPE` keyword. The `SET DATA TYPE` and `TYPE` are equivalent.

To change the data types of multiple columns in a single statement, you use multiple `ALTER COLUMN` clauses like this:

```sql
ALTER TABLE table_name
ALTER COLUMN column_name1 [SET DATA] TYPE new_data_type,
ALTER COLUMN column_name2 [SET DATA] TYPE new_data_type,
...;
```

In this syntax, you add a comma (`,`) after each `ALTER COLUMN` clause.

PostgreSQL allows you to convert the values of a column to the new ones while changing its data type by adding a `USING` clause as follows:

```sql
ALTER TABLE table_name
ALTER COLUMN column_name TYPE new_data_type USING expression;
```

The `USING` clause specifies an expression that allows you to convert the old values to the new ones.

If you omit the `USING` clause, PostgreSQL will cast the values to the new ones implicitly. If the cast fails, PostgreSQL will issue an error and recommend you provide the `USING` clause with an expression for the data conversion.

The expression after the `USING` keyword can be as simple as `column_name::new_data_type` such as `price::numeric` or as complex as a custom function.

## PostgreSQL change column type examples

Let’s take some examples of changing column type.

### Setting up a sample table

The following [creates a new table](postgresql-create-table) called `assets` and [insert](postgresql-insert) some rows into the table:

```sql
CREATE TABLE assets (
    id serial PRIMARY KEY,
    name TEXT NOT NULL,
    asset_no VARCHAR NOT NULL,
    description TEXT,
    location TEXT,
    acquired_date DATE NOT NULL
);

INSERT INTO assets(name,asset_no,location,acquired_date)
VALUES('Server','10001','Server room','2017-01-01'),
      ('UPS','10002','Server room','2017-01-01')
RETURNING *;
```

Output:

```text
 id |  name  | asset_no | description |  location   | acquired_date
----+--------+----------+-------------+-------------+---------------
  1 | Server | 10001    | null        | Server room | 2017-01-01
  2 | UPS    | 10002    | null        | Server room | 2017-01-01
(2 rows)
```

### 1\) Changing one column example

The following example uses the `ALTER TABLE ... ALTER COLUMN` statement to change the data type of the `name` column to [`VARCHAR`](postgresql-char-varchar-text):

```
ALTER TABLE assets
ALTER COLUMN name TYPE VARCHAR(255);
```

Output:

```sql
ALTER TABLE
```

The output indicates that the statement successfully changed the type of the column.

### 2\) Changing multiple columns example

The following statement changes the data types of `description` and `location` columns from [`TEXT`](postgresql-char-varchar-text) to `VARCHAR`:

```
ALTER TABLE assets
    ALTER COLUMN location TYPE VARCHAR(255),
    ALTER COLUMN description TYPE VARCHAR(255);
```

Output:

```sql
ALTER TABLE
```

### 3\) Changing a column from VARCHAR to INT example

The following example uses the `ALTER TABLE ... ALTER COLUMN` statement to change the data type of the `asset_no` column to [integer](postgresql-integer):

```
ALTER TABLE assets
ALTER COLUMN asset_no TYPE INT;
```

PostgreSQL issued an error and a helpful hint:

```sql
ERROR:  column "asset_no" cannot be cast automatically to type integer
HINT:  You might need to specify "USING asset_no::integer".
```

To both change the type of a column and cast data from `VARCHAR` to `INT`, you can use the `USING` clause:

```sql
ALTER TABLE assets
ALTER COLUMN asset_no TYPE INT
USING asset_no::integer;
```

Output:

```
ALTER TABLE
```

## Summary

- Use the `ALTER TABLE ... ALTER COLUMN` statement to change the data type of a column.
