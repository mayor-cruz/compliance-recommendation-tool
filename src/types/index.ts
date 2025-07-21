export interface Question {
    question: string;
    remediation: string;
    regulatorySpec: string;
}

export interface Answer {
    categoryIndex: number;
    questionIndex: number;
    answer: boolean;
}

export interface Recommendation {
    category: string;
    question: string;
    remediation: string;
    regulatorySpec: string;
}

export interface CompanyInfo {
    companyName: string;
    industry: string;
    companySize: string;
    location: string;
    contactEmail: string;
    complianceOfficer: string;
    hasDataProtectionOfficer: boolean;
    primaryDataTypes: string[];
}
