---
title: Neon plans
subtitle: Learn about the different plans offered by Neon
enableTableOfContents: true
isDraft: false
redirectFrom:
  - /docs/introduction/billing#neon-plans
updatedOn: '2023-08-01T22:39:11Z'
---

Neon offers the following plans: **Free Tier**, **Pro**, and **Custom**. The Pro plan is _usage-based_, ensuring you never over-provision and only pay for what you use. **Custom** plans are volume-based, offering potential discounts. The table below provides an overview of plans offered by Neon. For more information about a particular plan, refer to the individual plan pages:

- [Free Tier](/docs/introduction/free-tier)
- [Pro plan](/docs/introduction/pro-plan)
- [Custom plan](/docs/introduction/custom-plan)

For information about how Neon bills for paid plans, please refer to our [Billing metrics](/docs/introduction/billing) page.

## Neon plans

|                                       | Free Tier                                                                                                                                                               | Pro (usage-based)                                          | Custom - Enterprise or Platform Partnership (volume-based)      |
| :------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- | :-------------------------------------------------------------- |
| **Best for**                          | Prototyping and personal projects                                                                                                                                       | Small to medium teams, setups with 1 to 3 active databases | Medium to large teams, Database fleets, Resale                  |
| **Projects**                          | 1                                                                                                                                                                       | Unlimited\*                                                | Unlimited                                                       |
| **Branches**                          | 10                                                                                                                                                                      | Unlimited                                                  | Unlimited                                                       |
| **Databases**                          | Unlimited                                                                                                                                                                      | Unlimited                                                  | Unlimited                                                       |
| **Active time per month**             | 100 hours per month, affecting only [non-primary branch](/docs/reference/glossary#non-primary-branch) computes. **Your primary branch compute always remains available.** | Unlimited                                                  | Unlimited                                                       |
| **Compute size**                      | 1 shared vCPU with 1 GB RAM                                                                                                                                             | Up to 7 vCPUs, each with 4 GB RAM                          | Custom                                                          |
| **Storage**                           | 3 GB per branch                                                                                                                                                         | Unlimited\*                                                | Unlimited                                                       |
| **Dedicated resources**               | -                                                                                                                                                                       | -                                                          | &check;                                                         |
| **Project sharing**                   | -                                                                                                                                                                       | &check;                                                    | &check;                                                         |
| **Auto-suspend compute**              | &check;                                                                                                                                                                 | &check;                                                    | &check;                                                         |
| **Configurable auto-suspend compute** | -                                                                                                                                                                       | &check;                                                    | &check;                                                         |
| **Autoscaling**                       | -                                                                                                                                                                       | &check;                                                    | &check;                                                         |
| **Read replicas**                       | -                                                                                                                                                                       | &check;                                                    | &check;                                                         |
| **Payment**                           | Free                                                                                                                                                                    | Credit Card, Pay As You Go with monthly invoicing          | Prepaid, Custom Contract, Volume Discounts                      |
| **Support**                           | Community, support tickets                                                                                                                                              | Community, support tickets, video chat                     | Community, support tickets, video chat, resale customer support |

**Notes:**

- The Pro plan has default limits of 20 projects, 200 GB of storage, and 20 simultaneously active computes to protect against unintended usage. To increase these limits, reach out to [support@neon.tech](mailto:support@neon.tech). The simultaneously active compute limit does not affect the primary branch compute, which always remains available.
- The Free Tier has an [Active time](/docs/reference/glossary#active-time) limit of 100 hours per month, but that limit only affects non-primary branch compute usage. Active time on all computes is counted toward the limit, but when the limit is exceeded, only non-primary branch computes are subject to suspension. **Your primary branch compute always remains available regardless of the limit, ensuring that access to data on your primary branch is never interrupted.** You can monitor _Active time_ on the **Usage** widget on the Neon **Dashboard**. The _Active time_ limit resets at the beginning of each month.

## Support

Support channels for the Free Tier, Pro, and Custom plans are outlined on our [Support](/docs/introduction/support) page.
