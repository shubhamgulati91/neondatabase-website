---
title: 'PostgreSQL GRANT'
page_title: 'PostgreSQL GRANT Statement'
page_description: 'In this tutorial, you will learn how to use the PostgreSQL GRANT statement to grant privileges on database objects to a role.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-administration/postgresql-grant/'
ogImage: ''
updatedOn: '2024-02-22T00:47:34+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL CREATE ROLE Statement'
  slug: 'postgresql-administration/postgresql-roles'
nextLink:
  title: 'PostgreSQL REVOKE Statement'
  slug: 'postgresql-administration/postgresql-revoke'
---

**Summary**: in this tutorial, you will learn how to use the PostgreSQL `GRANT` statement to grant privileges on database objects to a role.

## Introduction to PostgreSQL GRANT statement

After [creating a role](postgresql-roles) with the `LOGIN` attribute, the role can log in to the PostgreSQL database server.

However, it cannot do anything to the database objects like tables, [views](../postgresql-views), [functions](../postgresql-plpgsql/postgresql-create-function), etc. For example, the role cannot [select data from a table](../postgresql-tutorial/postgresql-select) or execute a specific function.

To allow a role to interact with database objects, you need to grant privileges on the database objects to the role using the `GRANT` statement.

The following shows the simple form of the `GRANT` statement that grants one or more privileges on a table to a role:

```sql
GRANT privilege_list | ALL
ON  table_name
TO  role_name;
```

In this syntax:

- First, specify the `privilege_list` that can be [`SELECT`](../postgresql-tutorial/postgresql-select), [`INSERT`](../postgresql-tutorial/postgresql-insert),[`UPDATE`](../postgresql-tutorial/postgresql-update), [`DELETE`](../postgresql-tutorial/postgresql-delete),[`TRUNCATE`](../postgresql-tutorial/postgresql-truncate-table), etc. Use the `ALL` option to grant all privileges on a table to the role.
- Second, provide the name of the table after the `ON` keyword.
- Third, indicate the name of the role to which you want to grant privileges.

## PostgreSQL GRANT statement examples

First, use the `postgres` user to connect to the PostgreSQL server using any client tool of your choice, for example, psql:

```bash
psql -U postgres
```

Second, [create a new user role](postgresql-roles) called `joe` that can log in to the PostgreSQL server:

```
create role joe
login
password 'YourPassword';
```

Replace the `YourPassword` with the one you want.

Third, [create a new table](../postgresql-tutorial/postgresql-create-table) called `candidates`:

```sql
create table candidates (
    candidate_id int generated always as identity,
    first_name varchar(100) not null,
    last_name varchar(100) not null,
    email varchar(255) not null unique,
    phone varchar(25) not null,
    primary key(candidate_id)
);
```

Fourth, use the role `joe` to log in to the PostgreSQL server in a separate session.

Fifth, attempt to select data from the `candidates` table from the `joe`‘s session:

```sql
SELECT * FROM candidates;
```

PostgreSQL issued an error:

```sql
ERROR:  permission denied for table candidates
```

The output indicates that the role joe does not have the privilege of retrieving data from the `candidates` table.

To grant the `SELECT` privilege on the `candidates` table to the role `joe`, you execute the following `GRANT` statement in the `postgres`‘ session:

```sql
GRANT SELECT
ON candidates
TO joe;
```

Sixth, execute the `SELECT` statement from the `joe`‘s session:

```sql
SELECT * FROM candidates;
```

PostgreSQL returns an empty result set instead of an error.

Seventh, execute the following [`INSERT`](../postgresql-tutorial/postgresql-insert) statement:

```sql
INSERT INTO candidates(first_name, last_name, email, phone)
VALUES('Joe','Com','[[email protected]](../cdn-cgi/l/email-protection.html)','408-111-2222');
```

PostgreSQL issued the following error because `joe` does not have the `INSERT` privilege on the `candidates` table:

```sql
ERROR:  permission denied for table candidates
```

Eighth, grant `INSERT`, `UPDATE`, and `DELETE` privileges on the `candidates` table to the role `joe`:

```sql
GRANT INSERT, UPDATE, DELETE
ON candidates
TO joe;
```

Ninth, execute the `INSERT` statement again from the `joe`‘s session:

```sql
INSERT INTO candidates(first_name, last_name, email, phone)
VALUES('Joe','Com','[[email protected]](../cdn-cgi/l/email-protection.html)','408-111-2222');
```

Now, `joe` can insert data into the `candidates` table. Additionally, it can update or delete data from the table.

## More PostgreSQL GRANT statement examples

Let’s take some more examples of using the `GRANT` statement.

### 1\) Grant all privileges on a table to a role

The following statement grants all privileges on the `candidates` table to the role `joe`:

```sql
GRANT ALL
ON candidates
TO joe;
```

### 2\) Grant all privileges on all tables in a schema to a role

The following statement grants all privileges on all tables in the `public` schema of the `dvdrental` sample database to the role `joe`:

```sql
GRANT ALL
ON ALL TABLES
IN SCHEMA "public"
TO joe;
```

### 3\) Grant SELECT on all tables

Sometimes, you want to create a readonly role that can only select data from all tables in a specified schema.

To do that, you can grant the `SELECT` privilege on all tables in the `public` schema like this:

```sql
GRANT SELECT
ON ALL TABLES
IN SCHEMA "public"
TO reader;
```

So far, you have learned how to grant privileges on tables. To grant privileges to a role on other database objects, check [the `GRANT` statement syntax](https://www.postgresql.org/docs/current/sql-grant.html).

## Summary

- Use the `GRANT` statement to grant privileges on database objects to a role.
