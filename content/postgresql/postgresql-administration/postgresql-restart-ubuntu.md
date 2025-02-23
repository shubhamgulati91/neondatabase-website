---
title: 'How to Restart PostgreSQL on Ubuntu'
page_title: 'How to Restart PostgreSQL on Ubuntu'
page_description: 'In this tutorial, you will how to restart PostgreSQL on Ubuntu using systemctl, service command, and pg_ctrl command.'
prev_url: 'https://www.postgresqltutorial.com/postgresql-administration/postgresql-restart-ubuntu/'
ogImage: ''
updatedOn: '2024-02-20T09:45:29+00:00'
enableTableOfContents: true
previousLink:
  title: 'How to Check PostgreSQL Version'
  slug: 'postgresql-administration/postgresql-version'
nextLink:
  title: 'How to Restart PostgreSQL on Windows'
  slug: 'postgresql-administration/restart-postgresql-windows'
---

**Summary**: in this tutorial, you will how to restart PostgreSQL on Ubuntu using `systemctl`, `service` command, and `pg_ctrl` command.

We assume that you have sufficient permissions to restart the PostgreSQL service or can use `sudo` to execute the commands with root privileges.

## Restarting PostgreSQL on Ubuntu using systemctl

First, open a terminal or SSH to the server where the PostgreSQL server is running.

Second, run the following command to restart the PostgreSQL server:

```httpsql
sudo systemctl restart postgresql

```

Third, check the status of the PostgreSQL service using the following command:

```
/etc/init.d/postgresql status

```

## Restarting PostgreSQL on Ubuntu using the service command

Alternatively, you can use the service command to restart the PostgreSQL service:

```
sudo service postgresql restart

```

## Restarting PostgreSQL on Ubuntu using the pg_ctl command

If you show more information about the restart process, you can use the `pg_ctl` command:

```
sudo -u postgres pg_ctl restart -D /var/lib/postgresql/<version>/main

```

In this command, you need to replace `<version>` with your PostgreSQL version number.

Note that the data directory is `/var/lib/postgresql/<version>/main` by default. If your PostgreSQL data directory is different, you need to adjust it accordingly.

For example, to restart PostgreSQL 16\.x, you can use the following command:

```bash
sudo -u postgres pg_ctl restart -D /var/lib/postgresql/16/main
```

If you encounter the following error, the `pg_ctl` may not be in your system’s PATH:

```bash
sudo: pg_ctl: command not found
```

To fix it, you need to create a symbolic link to pg_ctrl in `/usr/local/bin/`:

```xml
sudo ln -s /usr/lib/postgresql/<version>/bin/pg_ctl /usr/local/bin/pg_ctl
```

Replace the `<version>` with your PostgreSQL version number.

For example, the following command restarts the PostgreSQL 16\.x on Ubuntu:

```
sudo -u postgres pg_ctl restart -D /var/lib/postgresql/16/main
```

Now, you should be able to use `pg_ctl` from any directory.
