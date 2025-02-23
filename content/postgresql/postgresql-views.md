---
title: 'PostgreSQL Views'
page_title: 'PostgreSQL Views'
page_description: 'This section introduces you to PostgreSQL views and shows you how to manage views in the PostgreSQL database server.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-views/'
ogImage: ''
updatedOn: '2024-03-16T08:31:02+00:00'
enableTableOfContents: true
previousLink:
  title: 'Creating a PostgreSQL Trigger with a When Condition'
  slug: 'postgresql-triggers/postgresql-trigger-when-condition'
nextLink:
  title: 'PostgreSQL CREATE VIEW'
  slug: 'postgresql-views/managing-postgresql-views'
---

![PostgreSQL Views](/postgresqltutorial/PostgreSQL-View.png?alignright)
A view is a named query stored in the PostgreSQL database server. A view is defined based on one or more tables which are known as base tables, and the query that defines the view is referred to as a defining query.

After [creating a view](postgresql-views/managing-postgresql-views), you can query data from it as you would from a regular table. Behind the scenes, PostgreSQL will rewrite the query against the view and its defining query, executing it to retrieve data from the base tables.

Views do not store data except the [materialized views](postgresql-views/postgresql-materialized-views). In PostgreSQL, you can create special views called materialized views that store data physically and periodically refresh it from the base tables.

The materialized views are handy in various scenarios, providing faster data access to a remote server and serving as an effective caching mechanism.

## Advantages of PostgreSQL views

Views offer many advantages:

### 1\) Simplifying complex queries

Views help simplify complex queries. Instead of dealing with [joins](postgresql-tutorial/postgresql-joins), [aggregations](postgresql-aggregate-functions), or [filtering conditions](postgresql-tutorial/postgresql-where), you can query from views as if they were regular tables.

Typically, first, you create views based on complex queries and store them in the database. Then, you can use simple queries based on views instead of using complex queries.

### 2\) Security and access control

Views enable fine\-grained control over data access. You can create views that expose subsets of data in the base tables, hiding sensitive information.

This is particularly useful when you have applications that require access to distinct portions of the data.

### 3\) Logical data independence

If your applications use views, you can freely modify the structure of the base tables. In other words, views enable you to create a layer of abstraction over the underlying tables.

## Section 1\. Basic PostgreSQL views

In this section, you’ll learn about the fundamentals of PostgreSQL views including creating new views and removing existing views. These essential operations lay the strong foundation for using views effectively.

- [Create View](postgresql-views/managing-postgresql-views 'Managing PostgreSQL Views') – show you how to create a new view in your database.
- [Drop view](postgresql-views/postgresql-drop-view) – learn to drop one or more views from the database.

## Section 2\. Updatable views

In this section, you’ll learn how to create updatable views, which allow you to modify data through them. Additionally, you’ll learn how to enforce data modification using the `WITH CHECK OPTION` clause.

- [Create updatable views](postgresql-views/postgresql-updatable-views) – show how to create updatable views.
- [WITH CHECK OPTION](postgresql-views/postgresql-views-with-check-option) – guide you on how to enforce the data modification through a view based on a condition of the defining query.

## Section 3\. Materialized views

- [Materialized views](postgresql-views/postgresql-materialized-views 'PosgreSQL Materialized Views')  – introduce you to materialized views and provide you with the steps of creating and refreshing data for materialized views.

## Section 4\. Recursive views

- [Create recursive views](postgresql-views/postgresql-recursive-view) – explain the recursive view and show you how to create a recursive view in PostgreSQL.

## Section 5\. Managing views

This section discusses the management of the PostgreSQL views including altering views and listing views in the current database.

- [Alter view](postgresql-views/postgresql-alter-view) – learn how to rename a view, modify the check option, change a column, and set a new schema for a view.
- [List views in the current database](postgresql-views/postgresql-list-views) – show you how to list views in the current database using the `\dv` command in psql or querying from the `information_schema.views` view.
