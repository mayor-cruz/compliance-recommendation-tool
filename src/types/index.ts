export interface Question {
    question: string;
    remediation: string;
    regulatorySpec: string;
}

// Pre-cloud question structure
export interface PreCloudQuestion {
    question: string;
    regulations: string[];
    actions: string;
    shouldHaveInput?: boolean;
}

// Post-cloud question structure
export interface PostCloudQuestion {
    question: string;
    regulatoryBody: string[];
    remediation: string;
    shouldHaveInput?: boolean;
}

export interface Answer {
    questionIndex: number;
    category: string;
    answer: "yes" | "no" | string; // Now supports text answers
    question: string;
    isTextAnswer?: boolean; // Flag to indicate if this is a text answer
}
export interface Recommendation {
    category: string;
    question: string;
    regulations?: string[]; // For pre-cloud
    regulatoryBody?: string[]; // For post-cloud
    actions?: string; // For pre-cloud
    remediation?: string; // For post-cloud
    regulatorySpec?: string; // Legacy support
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
    cloudStatus: "pre-cloud" | "post-cloud";
}
