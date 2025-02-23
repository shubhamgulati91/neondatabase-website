---
title: 'PostgreSQL DELETE CASCADE'
page_title: 'PostgreSQL DELETE CASCADE'
page_description: 'How to use the PostgreSQL DELETE CASCADE to delete related rows in child tables when a parent row is deleted from the parent table.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-delete-cascade/'
ogImage: ''
updatedOn: '2024-02-23T01:14:02+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL Foreign Key'
  slug: 'postgresql-tutorial/postgresql-foreign-key'
nextLink:
  title: 'PostgreSQL CHECK Constraints'
  slug: 'postgresql-tutorial/postgresql-check-constraint'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `DELETE CASCADE` to delete related rows in child tables when a parent row is deleted from the parent table.

## Introduction to the PostgreSQL DELETE CASCADE

In PostgreSQL, the `DELETE CASCADE` is a referential action that allows you to automatically [delete](postgresql-delete) related rows in child tables when a parent row is deleted from the parent table.

This feature helps you maintain referential integrity in the database by ensuring that dependent rows are removed when their corresponding rows are deleted.

To enable the `DELETE CASCADE` action, you need to have two related tables `parent_table` and `child_table`:

```sql
CREATE TABLE parent_table(
    id SERIAL PRIMARY KEY,
    ...
);

CREATE TABLE child_table(
    id SERIAL PRIMARY KEY,
    parent_id INT,
    FOREIGN_KEY(parent_id)
       REFERENCES parent_table(id)
       ON DELETE CASCADE
);
```

In the child table, the `parent_id` is a foreign key that references the `id` column of the `parent_table`.

The `ON DELETE CASCADE` is the action on the [foreign key](postgresql-foreign-key) that will automatically delete the rows from the `child_table` whenever corresponding rows from the `parent_table` are deleted.

Let’s take a look at an example.

## PostgreSQL DELETE CASCADE example

First, create tables `departments` and `employees` to store departments and employees:

```sql
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY(department_id)
       REFERENCES departments(id)
       ON DELETE CASCADE
);
```

In this setup, a department may have one or more employees and each employee belongs to a department.

In the `employees` table, the department_id is a foreign key that references the id column of the `departments` table.

The foreign key has the `ON DELETE CASCADE` clause that specifies the referential action to take when a row in the `departments` table is deleted.

Second, [insert rows](postgresql-insert-multiple-rows) into `departments` and `employees` tables:

```sql
INSERT INTO departments (name)
VALUES
    ('Engineering'),
    ('Sales')
RETURNING *;

INSERT INTO employees (name, department_id)
VALUES
    ('John Doe', 1),
    ('Jane Smith', 1),
    ('Michael Johnson', 2)
RETURNING *;
```

Output:

```text
 id |    name
----+-------------
  1 | Engineering
  2 | Sales
(2 rows)

 id |      name       | department_id
----+-----------------+---------------
  1 | John Doe        |             1
  2 | Jane Smith      |             1
  3 | Michael Johnson |             2
(3 rows)
```

Third, delete a department and observe the cascading effect on associated employees:

```sql
DELETE FROM departments
WHERE id = 1;
```

Once you execute this statement, it deletes all employees belonging to the department with `department_id` \= 1 due to the `DELETE CASCADE` action defined on the foreign key constraint.

Finally, retrieve data from the `employees` table to verify the employees associated with the deleted department:

```sql
SELECT * FROM employees;
```

Output:

```text
 id |      name       | department_id
----+-----------------+---------------
  3 | Michael Johnson |             2
(1 row)
```

The output indicates that the employees with department id 1 were deleted successfully.

## Summary

- Use PostgreSQL `DELETE CASCADE` action to automatically delete related rows in child tables when a parent row is deleted.
