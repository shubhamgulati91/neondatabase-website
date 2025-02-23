---
title: 'PostgreSQL DISTINCT ON'
page_title: 'PostgreSQL DISTINCT ON'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL DISTINCT ON clause to retrieve distinct rows based on a specific column.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-distinct-on/'
ogImage: ''
updatedOn: '2024-01-16T09:44:44+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL EXPLAIN'
  slug: 'postgresql-tutorial/postgresql-explain'
nextLink:
  title: 'PostgreSQL vs. MySQL'
  slug: 'postgresql-tutorial/postgresql-vs-mysql'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `DISTINCT ON` clause to retrieve distinct rows based on a specific column.

## Introduction to the PostgreSQL DISTINCT ON clause

The `DISTINCT ON` clause allows you to retrieve unique rows based on specified columns. Here’s the basic syntax of the `DISTINCT ON` clause:

```phpsqlsql
SELECT
  DISTINCT ON (column1, column2,...) column1,
  column2,
  ...
FROM
  table_name
ORDER BY
  column1,
  column2,
  ...;
```

The `DISTINCT ON` clause retrieves the first unique entry from each column or combination of columns in a result set.

The key factor for determining which unique entry is selected lies in the columns that appear in the `ORDER BY` clause.

Technically, you can use the `DISTINCT ON` without the `ORDER BY` clause. However, without the `ORDER BY` clause, the “first” unique entry becomes unpredictable because the table stores the rows in an unspecified order.

Notice that you need to align the expression specified in the `DISTINCT ON` clause with the leftmost expression in the `ORDER BY` clause.

## PostgreSQL DISTINCT ON example

Let’s take an example of using the `DISTINCT ON` clause to understand it better.

First, [create a table](postgresql-create-table) called student `scores` to store the student’s scores:

```
CREATE TABLE student_scores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  subject VARCHAR(50) NOT NULL,
  score INTEGER NOT NULL
);
```

Second, [insert rows](postgresql-insert-multiple-rows) into the `student_scores` table:

```
INSERT INTO student_scores (name, subject, score)
VALUES
  ('Alice', 'Math', 90),
  ('Bob', 'Math', 85),
  ('Alice', 'Physics', 92),
  ('Bob', 'Physics', 88),
  ('Charlie', 'Math', 95),
  ('Charlie', 'Physics', 90);
```

In the table, each student has both scores in `Math` and `Physics`.

Third, retrieve the highest score for each student in either `Math` or `Physics` using the `DISTINCT ON` clause:

```sql
SELECT
  DISTINCT ON (name) name,
  subject,
  score
FROM
  student_scores
ORDER BY
  name,
  score DESC;
```

Output:

```
  name   | subject | score
---------+---------+-------
 Alice   | Physics |    92
 Bob     | Physics |    88
 Charlie | Math    |    95
(3 rows)
```

The output returns the highest score of each student in whatever subject, `Math` or `Physics`.

The result set includes a unique combination of names along with the corresponding subject and score. The `ORDER BY` clause is important because it helps determine which row to retain in case of duplicate.

In this example, the `DISTINCT ON` clause keeps the row with the highest scores because the `ORDER BY` clause sorts the names and scores in descending order.

## Summary

- Use the `DISTINCT ON` clause to keep the first unique entry from each column or combination of columns in a result set.
- Always use the `ORDER BY` clause to determine which entry to retain in the result set.
