---
title: Neon usage metrics
subtitle: Monitor usage metrics for your account and projects from the console or API
enableTableOfContents: true
---

Neon exposes usage metrics in the Neon Console and through the Neon API. These metrics can answer questions like:

- How much storage am I using?
- How many compute hours have I used?
- How many projects do I have?
- How many branches do I have?

## View usage metrics in the Neon Console

Usage metrics in the console can be found on the **Project Dashboard**, the **Billing**, and the **Branches** page. 

### Project Dashboard 

The **Usage** widget on the Neon Dashboard shows a snapshot of project usage.

![Monitor usage widget](/docs/introduction/monitor_usage_widget.png)

Usage metrics include:

- **Storage**: The total volume of data and history for your project, measured in gibibytes (GiB). Data refers to the logical data size. History consists of  Write-Ahead Logging (WAL) records capturing the data’s change history that is used to enable branching-related features. 
- **Data transfer**: The total volume of data transferred out of Neon (known as "egress") during the current billing period.
- **Written data**: The total volume of data written from compute to storage during the current billing period, measured in gigibytes (GiB).
- **Compute**: The total number of compute hours used during the current billing period.
- **Active computes**: The current number of active computes in your project.
- **Branches**: The number of branches in your project.

The **Branches** widget shows a **Data size** metric, which is the size of the actual data on your branch. It does not include history.

![Monitor branches widget](/docs/introduction/monitor_branches_widget.png)

You can select a branch in the [Neon SQL Editor](/docs/get-started-with-neon/query-with-neon-sql-editor) and run this query to get the same data (rounded):

```sql
SELECT pg_size_pretty(sum(pg_database_size(datname)))
FROM pg_database;
```

### Billing page

You can monitor usage metrics for your Neon account from the **Billing** page in the Neon Console. Usage metrics include:

- **Storage**: Storage is total volume of data and history for your project, measured in gibibytes (GiB). Data refers to the logical data size. History consists of  Write-Ahead Logging (WAL) records capturing the data’s change history that is used to enable branching-related features.
- **Compute**: The total number of compute hours used during the current billing period.
- **Projects**: Number of projects currently active in your account.
- **Branches** (Free Tier only) Number of database branches currently active in your account. On The Free Tier, there is a 10-branch limit.

![Monitor billing and usage](/docs/introduction/monitor_billing_usage.png)

For more information, see [Monitoring billing and usage](/docs/introduction/how-billing-works#monitoring-billing-and-usage).

### Branches page

The **Branches** page in the Neon Console provides branch-specific metrics, including:

- **Active time**: The active time for the branch compute.
- **Data size**: The size of the actual data on your branch, not including history.
- **Last active**: The data and time the branch was last active.

To view the branches in your Neon project:

1. In the Neon Console, select a project.
2. Select **Branches** to view the branches for the project.

You can select a branch from the table to view additional details about the branch.

## Retrieve usage metrics with the Neon API

Using the Neon API, you can retrieve a variety of usage metrics, which are highlighted in the [Get branch details](#get-branch-details) and [Get project details](#get-project-details) examples below. 

### Get branch details

This example shows how to retrieve branch details using the [Get branch details](https://api-docs.neon.tech/reference/getprojectbranch) API method. Usage data is highlighted. Refer to the response body section of the [Get branch details](https://api-docs.neon.tech/reference/getprojectbranch) documentation for descriptions.

```curl
curl --request GET \
     --url https://console.neon.tech/api/v2/projects/summer-bush-30064139/branches/br-polished-flower-a5tq1sdv \
     --header 'accept: application/json' \
     --header 'authorization: Bearer $NEON_API_KEY' | jq
```

**Response body**

```json {7,11-15}
{
  "branch": {
    "id": "br-polished-flower-a5tq1sdv",
    "project_id": "summer-bush-30064139",
    "name": "main",
    "current_state": "ready",
    "logical_size": 427474944,
    "creation_source": "console",
    "primary": true,
    "protected": false,
    "cpu_used_sec": 2505,
    "compute_time_seconds": 2505,
    "active_time_seconds": 9924,
    "written_data_bytes": 1566733560,
    "data_transfer_bytes": 40820887,
    "created_at": "2024-04-02T12:54:33Z",
    "updated_at": "2024-04-10T17:43:21Z"
  }
}
```

### Get project details

This example shows how to retrieve project details using the [Get project details](https://api-docs.neon.tech/reference/getproject) API method. Usage data is highlighted. Refer to the response body section of the [Get project details](https://api-docs.neon.tech/reference/getproject) documentation for descriptions.

```curl
curl --request GET \
     --url https://console.neon.tech/api/v2/projects/summer-bush-30064139 \
     --header 'accept: application/json' \
     --header 'authorization: Bearer $NEON_API_KEY' |jq
```

**Response body**

```json {3-8,36}
{
  "project": {
    "data_storage_bytes_hour": 113808080168,
    "data_transfer_bytes": 40821459,
    "written_data_bytes": 1566830744,
    "compute_time_seconds": 2785,
    "active_time_seconds": 11024,
    "cpu_used_sec": 2785,
    "id": "summer-bush-30064139",
    "platform_id": "aws",
    "region_id": "aws-us-east-2",
    "name": "summer-bush-30064139",
    "provisioner": "k8s-neonvm",
    "default_endpoint_settings": {
      "autoscaling_limit_min_cu": 0.25,
      "autoscaling_limit_max_cu": 0.25,
      "suspend_timeout_seconds": 0
    },
    "settings": {
      "allowed_ips": {
        "ips": [],
        "protected_branches_only": false,
        "primary_branch_only": false
      },
      "enable_logical_replication": false
    },
    "pg_version": 16,
    "proxy_host": "us-east-2.aws.neon.tech",
    "branch_logical_size_limit": 204800,
    "branch_logical_size_limit_bytes": 214748364800,
    "store_passwords": true,
    "creation_source": "console",
    "history_retention_seconds": 86400,
    "created_at": "2024-04-02T12:54:33Z",
    "updated_at": "2024-04-10T17:26:07Z",
    "synthetic_storage_size": 492988552,
    "consumption_period_start": "2024-04-02T12:54:33Z",
    "consumption_period_end": "2024-05-01T00:00:00Z",
    "quota_reset_at": "2024-05-01T00:00:00Z",
    "owner_id": "8d5f604c-d04e-4795-baf7-e87909a5d959",
    "owner": {
      "email": "alex@domain.com",
      "branches_limit": -1,
      "subscription_type": "launch"
    },
    "compute_last_active_at": "2024-04-10T17:26:05Z"
  }
}
```

For related information, see [Retrieving details about a project](/docs/guides/partner-billing#retrieving-details-about-a-project).