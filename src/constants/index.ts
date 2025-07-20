export const COMPLIANCE_CHECKLIST = {
    "Governance & Policy": [
        {
            question:
                "Do you maintain a written Data Protection Policy that meets NDPR requirements?",
            remediation:
                "Draft and publish an NDPR-aligned policy covering processing, retention, DPIA, breach response, etc.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Have you formally appointed a Data Protection Officer (DPO) with budget and authority?",
            remediation:
                "Define the DPO role, secure independent budget and authority, and document in org chart.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Is there a Data Protection & Compliance Committee that meets regularly?",
            remediation:
                "Establish a cross-functional committee, set meeting cadence, and record minutes.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you keep a central register of all applicable regulations (NDPR, CBN circulars, Cybercrimes Act)?",
            remediation:
                "Compile all relevant laws into a living register; assign owners for quarterly review.",
            regulatorySpec: "NDPR/CBN/Cybercrimes Act",
        },
        {
            question:
                "Has senior management signed off on a company-wide privacy governance framework?",
            remediation:
                "Present framework to execs, obtain formal sign-off, and communicate to all staff.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you have a DPIA policy covering what, how, and why you process personal data?",
            remediation:
                "Write a DPIA policy template including scope, triggers, and approval process; distribute to project teams.",
            regulatorySpec: "NDPR",
        },
    ],
    "Risk, Audit & Review": [
        {
            question:
                "Are quarterly compliance reviews scheduled and documented?",
            remediation:
                "Create recurring calendar events, assign reviewers, and log findings in your compliance dashboard.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you have an annual audit plan covering NDPR, CBN and NITDA requirements?",
            remediation:
                "Draft a 12-month audit schedule, map each regulator’s scope, and assign audit leads.",
            regulatorySpec: "NITDA/CBN",
        },
        {
            question:
                "Have you performed a full privacy/security audit of your fintech platforms in the last 12 months?",
            remediation:
                "Engage an internal or external audit team to run assessments; document and remediate gaps.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you maintain a compliance dashboard that tracks incidents, DPIAs, and training completion?",
            remediation:
                "Build or procure a dashboard; integrate data sources for real-time KPI reporting.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you auto-ingest regulatory updates from CBN and NITDA into your compliance roadmap?",
            remediation:
                "Set up email/webhook subscriptions to regulator RSS feeds; pipe updates into your issue-tracker.",
            regulatorySpec: "NITDA/CBN",
        },
    ],
    "Data Inventory & Classification": [
        {
            question:
                "Have you mapped every place you collect or store personal data (apps, forms, email, CCTV, backups)?",
            remediation:
                "Run a discovery exercise; document all collection/storage touchpoints in your data-inventory tool.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you track where each dataset lives (on-prem, cloud provider, region)?",
            remediation:
                "Inventory all data stores; tag each with location metadata in your CMDB.",
            regulatorySpec: "NDPR/CBN",
        },
        {
            question:
                "Have you classified all datasets by sensitivity (Public, Internal, Confidential, PII)?",
            remediation:
                "Define sensitivity tiers, apply labels in your data-catalogue or CMDB, and remediate unclassified assets.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you record the legal basis (consent, contract, legal obligation) for each processing activity?",
            remediation:
                "Update your processing register with lawful-basis field; train teams to fill it on project kickoff.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Is your CMDB up to date with data-classification labels and regional tags?",
            remediation:
                "Run automated scans, reconcile drift, and require tag compliance in CI/CD.",
            regulatorySpec: "NDPR/CBN",
        },
    ],
    "Data-Subject Rights & Consent": [
        {
            question:
                "Is there a public portal for users to request access, correction, or deletion of their data?",
            remediation:
                "Build or integrate a self-service portal; publish its URL on your website.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you have SLA-backed procedures for subject-access, correction, and erasure requests?",
            remediation:
                "Draft runbooks with SLAs (e.g. 30 days); train support to follow and log every request.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Is every cross-border data transfer preceded by an explicit, auditable opt-in?",
            remediation:
                "Update collection flows to require checkbox consent; log timestamped receipts.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you review consent withdrawals and erasure requests at least quarterly?",
            remediation:
                "Schedule quarterly reviews and reconcile any pending requests.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Are your privacy notices written in clear, local-language terms?",
            remediation:
                "Rewrite notices in simple English or local language; test with user groups.",
            regulatorySpec: "NDPR",
        },
    ],
    "Data Residency & Sovereignty": [
        {
            question:
                "Is all sensitive PII and transaction data stored in Nigerian data centres?",
            remediation:
                "Migrate any offshore databases to in-country regions; block cross-region replication.",
            regulatorySpec: "CBN/NDPR",
        },
        {
            question:
                "Have you identified which datasets must remain in-country under CBN/NDPR rules?",
            remediation:
                "Conduct data-sovereignty assessment; tag and lock down regulated datasets.",
            regulatorySpec: "CBN/NDPR",
        },
        {
            question:
                "Do you automatically tag resources requiring in-Nigeria residency via your IaC?",
            remediation:
                "Update IaC modules (Terraform/ARM) to add residency:ng tags; enforce via policy-as-code.",
            regulatorySpec: "CBN/NDPR",
        },
        {
            question:
                "Are you blocking any off-shore replication of regulated data?",
            remediation:
                "Implement network/security group rules to deny cross-region copies for tagged resources.",
            regulatorySpec: "CBN/NDPR",
        },
        {
            question:
                "For offshore transfers, do you maintain Standard Contractual Clauses or documented derogations?",
            remediation:
                "Store SCC templates and derogation logs in your contract repository; link to each transfer.",
            regulatorySpec: "NDPR",
        },
    ],
    "DPIA & Privacy-by-Design": [
        {
            question:
                "Do you complete a DPIA for every new product launch or major cloud migration?",
            remediation:
                "Add DPIA as a mandatory template in your project intake; block releases without DPIA sign-off.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Have you evaluated DPIA automation tools (e.g. OpenRMF, Conftest)?",
            remediation:
                "Run a proof-of-concept on OpenRMF or Conftest; document fit/gap analysis.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you embed privacy checkpoints and threat modeling into your sprint process?",
            remediation:
                "Insert “privacy review” tickets in each sprint; train devs on threat-modeling templates.",
            regulatorySpec: "NDPR",
        },
    ],
    "Encryption & Key Management": [
        {
            question:
                "Do you enforce TLS 1.2+ (or TLS 1.3) for all network traffic?",
            remediation:
                "Update load-balancer and API gateway configs to disable TLS <1.2.",
            regulatorySpec: "NITDA/NDPR",
        },
        {
            question:
                "Is AES-256 (or stronger) enabled on all databases and storage buckets?",
            remediation:
                "Enable at-rest encryption in RDS/S3/Blob settings; rotate keys annually.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Are encryption keys stored in a KMS/HSM within Nigeria and tagged for audit?",
            remediation:
                "Migrate keys to Nigeria-region KMS/HSM; apply tags (region:ng,purpose).",
            regulatorySpec: "CBN/NDPR",
        },
        {
            question:
                "Do you offer client-side encryption so data is encrypted before leaving your app?",
            remediation:
                "Integrate mobile/web SDKs for client crypto; manage keys via secure API.",
            regulatorySpec: "NDPR",
        },
    ],
    "Access Control & Authentication": [
        {
            question:
                "Is multi-factor authentication (MFA) required for every user, especially admins?",
            remediation:
                "Enforce MFA via AD/OIDC policies; block console/API access without MFA.",
            regulatorySpec: "NITDA/NDPR",
        },
        {
            question:
                "Do you enforce role-based access control (RBAC) on all sensitive systems and data?",
            remediation:
                "Define least-privilege roles; remediate any user over-privilege.",
            regulatorySpec: "NDPR/NITDA",
        },
        {
            question: "Is your IAM centrally managed and reviewed quarterly?",
            remediation:
                "Implement Azure AD/AWS IAM centralized policies; schedule quarterly reviews.",
            regulatorySpec: "NITDA",
        },
        {
            question:
                "Do you log all privileged-user actions (console/API) and forward them to your SIEM?",
            remediation:
                "Enable CloudTrail/Azure Monitor; set up SIEM ingestion with immutable logs.",
            regulatorySpec: "NITDA",
        },
    ],
    "Logging & Monitoring": [
        {
            question:
                "Are audit trails enabled for every personal-data operation in your cloud?",
            remediation:
                "Turn on audit logging for all DBs, buckets, and services handling PII.",
            regulatorySpec: "NDPR/NITDA",
        },
        {
            question:
                "Do you aggregate logs (app, infra, network) in a secure SIEM and retain them for ≥ 1 year?",
            remediation:
                "Configure log-shipper agents; enforce retention policies ≥ 1 year.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you run real-time compliance alerts for policy violations and abnormal behavior?",
            remediation:
                "Define SIEM alerts on IAM anomalies, data-exfil patterns, and control failures.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Are your log-retention policies mapped to NDPR and Cybercrimes Act requirements?",
            remediation:
                "Update retention settings in SIEM/storage to align with regulatory minima.",
            regulatorySpec: "NDPR/Cybercrimes Act",
        },
    ],
    "Incident Response & Recovery": [
        {
            question:
                "Do you have a documented breach-response plan with clear roles, escalation paths, and SLAs?",
            remediation:
                "Draft and publish an incident playbook; train teams and define SLAs (e.g. 72 hrs to notify NITDA).",
            regulatorySpec: "NDPR/CBN",
        },
        {
            question:
                "Have you run at least one tabletop exercise in the past 12 months?",
            remediation:
                "Schedule and conduct a breach-drill simulating NDPR-required scenarios.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you maintain a breach registry capturing dates, impacts, root causes, and remediation steps?",
            remediation:
                "Build an incident log in your CMDB or ITSM tool; require post-mortem for each event.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Have you tested your disaster-recovery failover procedures for critical cloud workloads?",
            remediation:
                "Perform DR drills on core services; document RTO/RPO results and gaps.",
            regulatorySpec: "NITDA",
        },
    ],
    "Retention & Deletion": [
        {
            question:
                "Are retention schedules defined for every data category and communicated to data owners?",
            remediation:
                "Draft a retention matrix; implement lifecycle rules in your storage and DLP.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Is automated secure deletion configured to run when retention expires?",
            remediation:
                "Configure auto-purge rules (S3 Lifecycle, DB purge jobs); log each deletion event.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you perform periodic reviews of data accuracy and opportunities for minimization?",
            remediation:
                "Schedule data-quality audits; report findings and delete obsolete records.",
            regulatorySpec: "NDPR",
        },
    ],
    "Vendor & Contract Management": [
        {
            question:
                "Do you maintain a vendor registry of all third-party data processors and their compliance status?",
            remediation:
                "Compile a processor list in your GRC tool; update annually.",
            regulatorySpec: "NDPR/CBN",
        },
        {
            question:
                "Are NDPR-compliant clauses (residency, breach notice, audit rights) included in every contract?",
            remediation:
                "Amend all active contracts; add clause templates to legal playbook.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do your cloud vendors hold ISO 27001 (or equivalent) and prove in-country data residency?",
            remediation:
                "Request and store proof of certification and region-specific hosting.",
            regulatorySpec: "NITDA/CBN",
        },
        {
            question:
                "Do you reevaluate RegTech and cloud-service vendors annually for Nigerian-law compatibility?",
            remediation:
                "Conduct annual vendor scorecard reviews; document any gaps and remediation plans.",
            regulatorySpec: "NDPR/NITDA",
        },
    ],
    "Training & Awareness": [
        {
            question:
                "Have you trained all staff on NDPR, CBN/NITDA cloud guidelines, and breach protocols in the last year?",
            remediation:
                "Roll out e-learning modules; track completions; schedule make-ups for non-attendees.",
            regulatorySpec: "NDPR/NITDA",
        },
        {
            question:
                "Do you run annual NDPR workshops or seminars for fintech teams and external partners?",
            remediation:
                "Schedule and record workshops; collect feedback for continuous improvement.",
            regulatorySpec: "NDPR",
        },
        {
            question: "Is DPO training refreshed annually and documented?",
            remediation:
                "Enroll DPO in refresher courses; log certifications and renewal dates.",
            regulatorySpec: "NDPR",
        },
    ],
    "Continuous Improvement": [
        {
            question:
                "Do you review policies, registers, and procedures at least once a year?",
            remediation:
                "Create a policy-review calendar; assign owners and track completion.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Are compliance KPIs and audit findings fed back into your project backlog?",
            remediation:
                "Integrate audit tickets into your issue tracker; assign remediation tasks.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you conduct tabletop drills for new threat scenarios every year?",
            remediation:
                "Plan and execute tabletop exercises covering emerging NDPR/Cyberthreat cases.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Is your cloud security policy updated whenever you add a new service or region?",
            remediation:
                "Require policy update tickets in your change-management process.",
            regulatorySpec: "NITDA/NDPR",
        },
    ],
    "Final Sanity Checks": [
        {
            question:
                "Do you collect and process personal data only via approved, secure channels?",
            remediation:
                "Disable legacy collection methods; standardize on secure forms and APIs.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Have you documented all your processing activities in a central log or tool?",
            remediation:
                "Consolidate processing records into a single registry; enforce updates on project close.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you regularly reclassify data as it ages or as use cases change?",
            remediation:
                "Schedule annual reclassification; archive or delete outdated data.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Are you clear on whether you act as a Data Controller or Data Processor for each system?",
            remediation:
                "Run a role-mapping exercise; document in policies and contracts.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you enforce least-privilege on every new service account and API key?",
            remediation:
                "Implement automated IAM scans; revoke unnecessary privileges.",
            regulatorySpec: "NITDA",
        },
        {
            question:
                "Have you tested capacity-planning to avoid outages under peak load?",
            remediation:
                "Run load/stress tests; update capacity plans in your DR documentation.",
            regulatorySpec: "NITDA",
        },
        {
            question:
                "Is your CI/CD pipeline integrated with automated compliance checks (policy-as-code)?",
            remediation:
                "Add linting, schema validations, and policy-as-code gates to your pipeline.",
            regulatorySpec: "NITDA/NDPR",
        },
        {
            question:
                "Do you maintain a list of all outbound transfers and the legal basis for each?",
            remediation:
                "Document transfer registry with dates, destinations, and lawful basis.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Have you built a self-service portal for data-subject requests with audit trails?",
            remediation:
                "Develop or integrate a portal; log every user action for audit.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Do you run phishing and social-engineering simulations at least twice a year?",
            remediation:
                "Plan simulation exercises; capture metrics and remediate low-scoring areas.",
            regulatorySpec: "NDPR",
        },
        {
            question:
                "Have you documented the zero-trust controls you apply (micro-segmentation, identity proxies)?",
            remediation:
                "Create a controls catalogue; map each control to its implementation and review quarterly.",
            regulatorySpec: "NITDA",
        },
    ],
};
