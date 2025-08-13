export const COMPLIANCE_CHECKLIST = {
    "pre-cloud": [
        {
            question:
                "Do you understand what types of data your fintech collects and the protection requirements for each?",
            regulations: ["NDPR", "CBN"],
            actions:
                "Create comprehensive data inventory spreadsheet. Classify data as: Customer PII, Financial transactions, Internal operations, Public information.",
        },
        {
            question:
                "Have you mapped out the data that will be processed by the service provider?",
            regulations: ["NDPR"],
            actions:
                "Run an automated data-discovery scan across all systems to inventory personal and sensitive data. Classify data into “public,” “internal,” “confidential,” and “restricted” buckets. Maintain this classification in a living data-catalogue, updated quarterly, with assigned custodians for each data type.",
        },
        {
            question:
                "Have you conducted a Data Protection Impact Assessment (DPIA) for your cloud migration?",
            regulations: ["NDPR"],
            actions:
                "Complete DPIA covering all planned cloud processing activities. Assess risks to data subjects, mitigation measures, necessity and proportionality. Consult DPO throughout process. Required for high-risk processing under NDPR.",
        },
        {
            question: "Will data be processed outside the shores of Nigeria,",
            regulations: ["NITDA & CBN"],
            actions: "",
        },
        {
            question:
                "Do you understand the data residency requirements for different types of data?",
            regulations: ["CBN"],
            actions:
                "Study CBN guidelines on cross-border data transfers. Map your data types to residency requirements: Core banking data (must stay in Nigeria), Marketing data (can be global), Analytics data (depends on content). Create data residency matrix.",
        },
        {
            question:
                "If so, from which territory(ies) will the outsourced cloud services be provided and the location of the data",
            regulations: ["NDPR"],
            actions: "",
            shouldHaveInput: true,
        },
        {
            question:
                "Have you prepared Standard Contractual Clauses (SCCs) for any data that may cross borders?",
            regulations: ["NDPR"],
            actions:
                "Obtain NDPR-compliant SCC templates from legal counsel. Customize for your specific data processing activities. Include adequacy assessments for destination countries. Store templates in legal repository for vendor contracts.",
        },
        {
            question:
                "Has due diligence been performed on the choice of service provider",
            regulations: ["CBN"],
            actions:
                "Develop a vendor-risk rating model that scores each provider on security certifications, financial health, legal history, and SLA performance.",
        },
        {
            question:
                "Have you considered other risks in relation to the proposed outsourcing arrangement",
            regulations: ["CBN"],
            actions:
                "Maintain a dynamic “outsourcing risk register” that logs each risk (legal, operational, reputational, geographic, concentration) with owner, mitigation plan, and review date.",
        },
        {
            question:
                "Have you evaluated different cloud service models (IaaS, PaaS, SaaS) for your needs and have an understanding of the shared responsibility model",
            regulations: ["CBN"],
            actions:
                "Map all data flows in and out of your network using a Data Flow Diagram. Contractually restrict storage and processing to approved regions (e.g., Nigeria, ECOWAS, EU) by including explicit data-residency clauses. Audit your provider’s region settings every release cycle to ensure no inadvertent geo-drift.",
        },
        {
            question:
                "Do you have and maintain a policy relating to cloud outsourcing?",
            regulations: ["CBN"],
            actions:
                "Draft a Board-approved Outsourcing Policy covering vendor selection, monitoring cadence, risk-thresholds, exit-planning, and audit rights. Publish it to all business units, and conduct an annual training refresher with sign-off tracking.",
        },
        {
            question:
                "Do you have the right to audit your outsourcing partner (Cloud Provider)",
            regulations: ["CBN"],
            actions:
                "Embed an “Audit & Inspection” clause in every vendor contract granting: on-site visits, production of logs/documentation, and right to interview vendor staff. Keep a calendar of scheduled audits and confirm completion within 30 days of each engagement.",
        },
        {
            question:
                "Do you maintain a register of information on all outsourcing arrangements?",
            regulations: ["CBN"],
            actions:
                "Implement a living Outsourcing Register (in your GRC tool or a secured spreadsheet) listing: provider name, service scope, data categories, start/end dates, SLAs, audit-rights, and exit-plan reference. Review and reconcile it with Finance and Legal every quarter.",
        },
        {
            question:
                "Are the outsourcing arrangements contained in a documented legally binding agreement that is signed by all parties?",
            regulations: ["CBN"],
            actions:
                "Enforce a “No Service without Contract” rule: no vendor onboarding or payment until a fully executed agreement is in place. Track contract signatures in your CLM system and block any exceptions.",
        },
        {
            question:
                "Does the outsourcing agreement include a clause that allows competent authorities to access documentation and information relating to the outsourcing arrangement?",
            regulations: ["CBN"],
            actions:
                "Standardize a “Regulator Access” clause in all contract templates, referencing the exact statutory right. Have Legal verify its inclusion before every signature.",
        },
        {
            question:
                "Does the outsourcing agreement provide for data and system security requirements within the outsourcing agreement and does the financial institution monitor compliance with these requirements on an ongoing basis?",
            regulations: ["CBN"],
            actions:
                "Define a “Security Requirements Matrix” in each contract: encryption standards, DLP controls, MFA enforcement, incident-notification timelines, and pen-test frequency. Schedule quarterly compliance reviews with evidence submission from the provider.",
        },
        {
            question:
                "Are the provider’s services subject to any third-party audit?",
            regulations: ["CBN"],
            actions:
                "Mandate ISO 27001 (or equivalent) certification as a minimum. Obtain and review each audit report upon issuance, then confirm remediation of any high-risk issues within 60 days.",
        },
        {
            question:
                "How is the financial institution’s data isolated from other data held by the service provider?",
            regulations: ["NDPR"],
            actions:
                "Require proof of logical isolation: tenant-segmentation diagrams, VPC/network isolation details.",
        },
        {
            question: "How are the service provider’s access logs monitored?",
            regulations: ["CBN"],
            actions:
                "Stream provider audit logs into your centralized SIEM with role-based dashboards and automated alerts for anomalous activity. Review alerts weekly and run quarterly log-review workshops with IT Security.",
        },
        {
            question:
                "Do you have a security incident classification and escalation matrix?",
            regulations: ["CBN"],
            actions:
                "Define incident severity levels (P0-P4) with specific escalation timelines. Create communication trees for different incident types. Build compliance dashboards for senior management.",
        },
        {
            question: "How are customers authenticated?",
            regulations: ["CBN"],
            actions:
                "Mandate MFA for all user-facing and administrative access. Implement adaptive authentication (risk-based step-up) and audit authentication logs monthly for failed/suspicious attempts.",
        },
        {
            question:
                "Have you planned identity and access management for cloud resources?",
            regulations: ["CBN"],
            actions: "Design centralized identity management.",
        },
        {
            question:
                "What security controls are in place to protect the transmission and storage of confidential information such as customer data within the infrastructure of the service provider?",
            regulations: ["CBN", "NDPR"],
            actions:
                "Specify encryption-in-transit (TLS 1.2+) and encryption-at-rest (AES 256+) requirements in every contract. Quarterly test encryption compliance via packet captures and storage audits.",
        },
        {
            question:
                "Do you have endpoint detection and response (EDR) planned for all devices?",
            regulations: ["CBN"],
            actions:
                "Deploy EDR solution (CrowdStrike, Microsoft Defender, SentinelOne) on all employee devices and cloud workloads. Configure behavioral detection rules. Plan for remote device management. Integrate with SIEM for centralized monitoring.",
        },
        {
            question:
                "Have you planned vulnerability management and security patching procedures?",
            regulations: ["CBN"],
            actions:
                "Implement automated vulnerability scanning tools (Qualys, Rapid7, or cloud-native solutions). Define patching SLAs: Critical (24hrs), High (7 days), Medium (30 days). Plan for zero-day response procedures.",
        },
        {
            question:
                "Are there procedures established to securely destroy or remove the data when the need arises (for example, when the contract terminates)?",
            regulations: ["NDPR"],
            actions:
                "Define data-retention schedules and secure-deletion workflows in your Data-Lifecycle Policy. Validate deletion via forensic analysis or deletion logs within 30 days of contract end.",
        },
        {
            question:
                "Are there documented security procedures for safeguarding hardware, software and data in the datacenter?",
            regulations: ["CBN"],
            actions:
                "Obtain a hardcopy of the provider’s Physical Security Standard and ensure it includes perimeter defenses, biometric access, CCTV, and environmental controls. Commission an annual third-party physical-security audit and review findings.",
        },
        {
            question:
                "Does the financial institution have a disaster recovery or business continuity plan with regard to outsourced critical or important functions?",
            regulations: ["CBN"],
            actions:
                "Collect the provider’s DR/BCP plan, run joint tabletop scenarios annually, and measure your RTO/RPO against SLA targets.",
        },
        {
            question:
                "What are the data backup and recovery arrangements for your organisation’s data that resides with the service provider?",
            regulations: ["CBN"],
            actions:
                "Define RTO/RPO targets in your SLA. Perform quarterly restore-testing from backups in multiple regions, and document success/failure rates in your Backup Audit Report.",
        },
        {
            question:
                "What process does the financial institution have when outsourcing to service providers located in third-countries?",
            regulations: ["CBN"],
            actions:
                "Perform country-risk assessments using a standardized template (covering legal, political, infrastructure stability). Mandate contractual safeguards—SCCs, local agent appointment, and right to audit—in all third-country outsourcing agreements.",
        },
    ],

    "post-cloud": {
        "Regulatory Compliance": [
            {
                question:
                    "Are you certified to the relevant cloud regulatory requirements (ISO27017) and ISO27001",
                regulatoryBody: ["CBN"],
                remediation: "",
            },
        ],
        "Data Protection Compliance": [
            {
                question:
                    "Do actively monitoring cloud data processing activities",
                regulatoryBody: ["NDPR"],
                remediation: "",
            },
            {
                question:
                    "Are all cloud-stored personal data properly classified and tagged accordingly?",
                regulatoryBody: ["NDPR"],
                remediation:
                    "Implement automated data classification tools. Tag all PII with sensitivity levels. Create data discovery reports. Remediate unclassified data within 60 days.",
            },
            {
                question:
                    "Are Standard Contractual Clauses (SCCs) in place for all cross-border data transfers from your cloud?",
                regulatoryBody: ["NDPR"],
                remediation:
                    "Execute NDPR-compliant SCCs with all international cloud providers and processors. Conduct transfer impact assessments. Implement additional safeguards where required. Register international transfers with NDPC.",
            },
            {
                question:
                    "Have you conducted Data Protection Impact Assessments (DPIAs) for all high-risk cloud processing activities?",
                regulatoryBody: ["NDPR"],
                remediation:
                    "Complete DPIAs for AI/ML, profiling, large-scale PII processing, cross-border transfers. Implement recommended mitigation measures. Update DPIAS when processing changes. Store DPIA records for regulatory access.",
            },
        ],
        "Data Residency Compliance": [
            {
                question:
                    "Are all Nigerian customer financial records stored exclusively within Nigerian borders or approved locations?",
                regulatoryBody: ["CBN", "NDPR"],
                remediation:
                    "Immediately audit data locations using cloud provider tools. Migrate non-compliant data to Nigerian regions within 90 days. Implement geo-blocking for data outside approved regions. Document data residency evidence.",
            },
            {
                question:
                    "Do you have automated controls preventing Nigerian financial data from being stored in unauthorized regions?",
                regulatoryBody: ["CBN", "NDPR"],
                remediation:
                    "Deploy Azure Policy, AWS Organizations SCPs, or Google Cloud Organization Policies to block unauthorized regions. Set up real-time alerts for policy violations. Remove existing data from non-compliant regions.",
            },
            {
                question:
                    "Are backups and disaster recovery copies of Nigerian data stored in compliant locations?",
                regulatoryBody: ["CBN", "NDPR"],
                remediation:
                    "Audit all backup locations including automated snapshots, archive storage, and DR replicas. Configure backup policies to use only approved regions. Test restore procedures from compliant locations.",
            },
        ],
        "Cloud Security Compliance": [
            {
                question:
                    "Are all cloud-stored sensitive data encrypted at rest using strong encryption algorithms?",
                regulatoryBody: ["NDPR", "CBN"],
                remediation:
                    "Enable AES-256 encryption on all storage services. Audit existing unencrypted data and encrypt within 30 days. Document encryption key management procedures. Implement automated encryption compliance scanning.",
            },
            {
                question:
                    "Is all data in transit between cloud services and users encrypted with TLS 1.2 or higher?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Enforce TLS 1.2+ on all endpoints. Disable weak ciphers and protocols. Implement HTTP Strict Transport Security (HSTS). Conduct SSL/TLS configuration audits monthly.",
            },
            {
                question:
                    "Do you have multi-factor authentication enforced for all administrative access to cloud resources?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Enable MFA on all cloud administrator accounts. Remove SMS-based MFA for privileged accounts. Implement FIDO2 hardware keys for critical system access. Audit and remediate MFA bypass scenarios.",
            },
            {
                question:
                    "Are privileged access rights regularly reviewed and certified by business owners?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Implement quarterly access certification campaigns. Remove orphaned accounts and excessive permissions. Document business justification for all privileged access. Automate access reviews where possible.",
            },
            {
                question:
                    "Are automated compliance checks e.g., AWS Security Hub, Azure Blueprints enabled",
                regulatoryBody: ["CBN"],
                remediation: "Enable automated cloud compliance checks",
            },
            {
                question:
                    "Do you have endpoint detection and response (EDR) deployed on all devices accessing cloud resources?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Deploy EDR agents on all employee devices and cloud workloads. Configure behavioral detection rules. Integrate EDR with SIEM for centralized monitoring. Maintain 100% agent deployment and health monitoring.",
            },
        ],
        "SIEM & Monitoring Compliance": [
            {
                question:
                    "Is comprehensive security logging enabled and ingested into a SIEM solution for all cloud services?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Enable audit logging on all cloud services (CloudTrail, Activity Logs, etc.). Configure log forwarding to SIEM. Implement log retention policies (7 years minimum). Test log ingestion and parsing regularly.",
            },
            {
                question:
                    "Are you monitoring for fintech-specific threats including payment fraud, account takeover, and API abuse?",
                regulatoryBody: ["CBN", "EFCC"],
                remediation:
                    "Implement fintech threat detection rules using MITRE ATT&CK framework. Deploy User and Entity Behavior Analytics (UEBA). Create automated response playbooks. Test detection rules with simulated attacks monthly.",
            },
            {
                question:
                    "Do you have 24/7 security monitoring with documented incident response procedures?",
                regulatoryBody: ["CBN", "NDPR"],
                remediation:
                    "Establish 24/7 SOC coverage (internal or MSSP). Document incident classification and escalation procedures. Include regulatory notification requirements. Conduct tabletop exercises quarterly.",
            },
            {
                question:
                    "Are security logs retained for the required 7-year period in tamper-proof storage?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Configure automated log archiving to immutable storage (S3 Object Lock, Azure Immutable Blobs). Implement legal hold capabilities. Test log retrieval procedures quarterly. Maintain chain of custody documentation.",
            },
            {
                question:
                    "Do you have cross-service correlation rules for detecting suspicious patterns across multiple cloud services and accounts?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Implement cross-service correlation rules for: unusual login patterns, privilege escalation, data exfiltration, payment anomalies. Tune rules to reduce false positives. Document investigation procedures.",
            },
            {
                question:
                    "Are threat intelligence feeds integrated into your SIEM to detect Nigerian-specific financial threats?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Integrate Nigerian threat intelligence feeds (AfricaCERT, local financial IOCs). Configure automated threat hunting queries. Map threats to Nigerian financial crime typologies. Update feeds regularly.",
            },
        ],
        "Vulnerability Management": [
            {
                question:
                    "Do you have automated vulnerability scanning covering all cloud workloads and configurations?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Deploy vulnerability scanning tools for cloud infrastructure and applications. Configure weekly scans and real-time monitoring. Integrate with patch management systems. Maintain vulnerability dashboards.",
            },
            {
                question:
                    "Are critical security patches applied within 24 hours and other patches within defined SLAS?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Implement automated patching for critical vulnerabilities. Define patching SLAs: Critical (24hrs), High (7 days), Medium (30 days). Track patch compliance rates. Maintain emergency patching procedures.",
            },
            {
                question:
                    "Do you conduct regular penetration testing of your cloud infrastructure and applications?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Schedule quarterly penetration testing by certified firms. Include API security testing, cloud configuration reviews, and social engineering. Remediate critical findings within 30 days. Maintain penetration test reports.",
            },
            {
                question:
                    "Are cloud security configurations continuously monitored against security baselines?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Implement cloud security posture management (CSPM) tools. Define security baselines for all cloud services. Configure automated remediation for policy violations. Generate compliance reports monthly.",
            },
        ],
        "Business Continuity & DR": [
            {
                question:
                    "Are Recovery Point Objectives (RPO) and Recovery Time Objectives (RTO) being met for all critical systems?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Monitor actual backup and recovery performance against defined RPO/RTO targets. Implement automated backup verification. Conduct monthly recovery tests. Document performance metrics and improvement plans.",
            },
            {
                question:
                    "Are disaster recovery procedures tested regularly with documented results?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Conduct quarterly DR tests including full system failovers. Document test results, issues, and remediation. Update DR procedures based on test outcomes. Maintain DR runbooks in version control.",
            },
            {
                question:
                    "Do you have immutable backups that protect against ransomware and insider threats?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Implement WORM storage for critical backups. Maintain air-gapped backup copies. Test backup integrity regularly. Configure backup deletion protection and audit trails.",
            },
            {
                question:
                    "Are backup restoration procedures tested monthly with data integrity validation?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Schedule automated backup restoration tests to isolated environments. Validate data integrity using checksums and application tests. Document restoration timeframes. Maintain restoration success rates above 95%.",
            },
            {
                question:
                    "Do you have multi-region deployment capabilities for business continuity?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Implement active-passive or active-active deployment across multiple cloud regions. Configure automated failover mechanisms. Test cross-region connectivity and data synchronization. Maintain region failover procedures.",
            },
        ],
        "Third Party Risk Management": [
            {
                question:
                    "Are all cloud service providers and SaaS vendors properly vetted and under contract with appropriate security clauses?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Conduct security assessments of all cloud vendors. Ensure contracts include data protection clauses, audit rights, breach notification terms. Maintain vendor risk register. Review vendor compliance annually.",
            },
            {
                question:
                    "Do you have Business Associate Agreements (BAAs) or Data Processing Agreements (DPAs) with cloud providers?",
                regulatoryBody: ["NDPR"],
                remediation:
                    "Execute DPAs with all cloud providers processing Nigerian data. Ensure DPAs include NDPR compliance requirements. Document data processing activities and purposes. Review and update DPAs annually.",
            },
            {
                question:
                    "Are vendor security controls independently verified through certifications or assessments?",
                regulatoryBody: ["NDPR"],
                remediation:
                    "Verify cloud provider SOC 2 Type II, ISO 27001, and other relevant certifications. Request vendor security questionnaires. Conduct on-site assessments for critical vendors. Maintain certification evidence.",
            },
        ],
        "Incident Response Compliance": [
            {
                question:
                    "Are security incidents properly classified, investigated, and reported to relevant Nigerian authorities?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Implement incident classification matrix aligned with Nigerian regulations. Train staff on incident reporting requirements. Maintain direct contacts with NITDA, CBN, EFCC. Document all incidents and regulatory notifications.",
            },
            {
                question:
                    "Do you have documented procedures for notifying NDPC and CBN within 72 hours of personal data breaches?",
                regulatoryBody: ["NDPR"],
                remediation:
                    "Create automated breach notification workflows. Pre-populate NDPC notification templates. Train incident response team on NDPR notification requirements. Test notification procedures quarterly.",
            },
            {
                question:
                    "Are forensic capabilities available to support incident investigations and regulatory requirements?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Establish digital forensics capabilities (internal or contracted). Maintain forensic imaging tools and procedures. Ensure evidence chain of custody procedures. Train investigators on Nigerian legal requirements.",
            },
            {
                question:
                    "Do you have communication procedures for customer and stakeholder notification during incidents?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Develop incident communication templates for customers, regulators, media, and stakeholders. Establish communication decision trees. Pre-approve key messages with legal team. Practice crisis communications regularly.",
            },
        ],
        "Audit & Compliance Monitoring": [
            {
                question:
                    "Are all cloud activities continuously monitored for compliance with Nigerian regulations?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Implement automated compliance monitoring dashboards. Configure alerts for policy violations. Generate monthly compliance reports. Conduct quarterly self-assessments against regulatory requirements.",
            },
            {
                question:
                    "Do you maintain audit-ready documentation for all cloud governance, risk, and compliance activities?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Implement GRC platform for centralized compliance documentation. Maintain policy libraries, risk registers, and control evidence.",
            },
            {
                question:
                    "Do you have processes to stay current with evolving Nigerian fintech regulations and cloud guidance?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Subscribe to regulatory updates from NDPC, CBN, NITDA. Participate in industry compliance forums. Conduct annual regulatory impact assessments. Update policies and procedures based on regulatory changes.",
            },
        ],
        "Operational Resilience": [
            {
                question:
                    "Are key performance indicators (KPIs) and service level objectives (SLOs) monitored and reported for all critical cloud services?",
                regulatoryBody: ["CBN"],
                remediation:
                    "Define and monitor KPIs for all critical business services. Implement automated SLO monitoring and alerting. Generate monthly service performance reports. Maintain service improvement programs based on KPI trends.",
            },
        ],
    },
};
