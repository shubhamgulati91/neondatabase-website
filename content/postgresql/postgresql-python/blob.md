---
title: 'PostgreSQL Python: Handling Binary Data'
page_title: 'PostgreSQL Python: Handling Binary Data'
page_description: 'In this tutorial, you will learn how to store binary data in the PostgreSQL database using Python.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-python/blob/'
ogImage: '/postgresqltutorial/parts_part_drawings_tables.png'
updatedOn: '2024-04-20T13:39:35+00:00'
enableTableOfContents: true
previousLink:
  title: 'PostgreSQL Python: Call Stored Procedures'
  slug: 'postgresql-python/call-stored-procedures'
nextLink:
  title: 'PostgreSQL Python: Delete Data from Tables'
  slug: 'postgresql-python/delete'
---

**Summary**: in this tutorial, you will learn how to store binary data in the PostgreSQL database using Python.

This tutorial picks up from where the [Call Stored Procedures Tutorial](call-stored-procedures) left off.

Standard SQL defines a `BLOB` as the binary large object for storing binary data in the database. Using the `BLOB` data type, you can store binary data such as images, documents, and so on in a table.

PostgreSQL does not support BLOB data type. Instead, it uses the [`BYTEA` data type](../postgresql-tutorial/postgresql-bytea-data-type) for storing binary data.

Let’s take a look at the `part_drawings` table.

![parts_part_drawings_tables](/postgresqltutorial/parts_part_drawings_tables.png)The `part_drawings` table stores the pictures of parts in the `drawing_data` column. We will show you how to insert binary data into this column and read it back.

## Insert binary data into a table

To insert binary data into a table, you use the following steps:

1. First, read data from a file.
2. Next, [connect to the PostgreSQL database](connect) by creating a new connection object from the `connect()` function.
3. Then, create a `cursor` object from the `Connection` object.
4. After that, execute the [INSERT](../postgresql-tutorial/postgresql-insert) statement with the input values. For binary data, use the `Binary` object of the `psycopg2` module
5. Finally, commit the changes permanently to the PostgreSQL database by calling the `commit()` method of the `connection` object.

The following `write_blob()` function reads binary data from a file specified by the `path_to_file` parameter and inserts it into the `part_drawings` table.

```python
import psycopg2
from config import load_config


def write_blob(part_id, path_to_file, file_extension):
    """ Insert a BLOB into a table """
    # read database configuration
    params = load_config()

    # read data from a picture
    data = open(path_to_file, 'rb').read()


    try:
        # connect to the PostgresQL database
        with psycopg2.connect(**params) as conn:
            # create a new cursor object
            with  conn.cursor() as cur:
                # execute the INSERT statement
                cur.execute("INSERT INTO part_drawings(part_id,file_extension,drawing_data) " +
                            "VALUES(%s,%s,%s)",
                            (part_id, file_extension, psycopg2.Binary(data)))

            conn.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

if __name__ == '__main__':
    write_blob(1, 'images/input/simtray.png', 'png')
    write_blob(2, 'images/input/speaker.png', 'png')
```

## Read binary data from a table

The steps of reading binary data from a table are similar to the steps of querying data from a table. After fetching binary data from the table, you can save it to a file, output it to the web browser, and so on.

The following `read_blob()` function selects BLOB data from the `part_drawings` table based on a specified part id and saves the binary data to a file.

```python
import psycopg2
from config import load_config

def read_blob(part_id, path_to_dir):
    """ Read BLOB data from a table """
    # read database configuration
    config = load_config()

    try:
        # connect to the PostgresQL database
        with  psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                # execute the SELECT statement
                cur.execute(""" SELECT part_name, file_extension, drawing_data
                                FROM part_drawings
                                INNER JOIN parts on parts.part_id = part_drawings.part_id
                                WHERE parts.part_id = %s """,
                            (part_id,))

                blob = cur.fetchone()

                # write blob data into file
                open(path_to_dir + blob[0] + '.' + blob[1], 'wb').write(blob[2])
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)

if __name__ == '__main__':
    read_blob(1, 'images/output/')
    read_blob(2, 'images/output/')
```

The following snippet reads the binary data of the parts with id values 1 and 2 and saves the binary data to the `images/output` directory.

[Download the project source code](/postgresqltutorial/blob.zip)

In this tutorial, you have learned how to write binary data to a table and read it back using Python.
