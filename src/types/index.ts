export interface Question {
    question: string;
    remediation: string;
    regulatorySpec: string;
}

// Pre-cloud question structure
export interface PreCloudQuestion {
    id: string;
    question: string;
    regulations: string[];
    actions: string;
    shouldHaveInput?: boolean;
    priority?: "critical" | "high" | "medium";
}

// Post-cloud question structure
export interface PostCloudQuestion {
    id: string;
    question: string;
    regulatoryBody: string[];
    remediation: string;
    shouldHaveInput?: boolean;
    priority?: "critical" | "high" | "medium";
}

export interface Answer {
    questionId: string; // Changed from questionIndex to questionId
    questionIndex: number; // Keep for backward compatibility during transition
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
    priority?: "critical" | "high" | "medium"; // Priority level for post-cloud recommendations
}

export interface CompanyInfo {
    companyName: string;
    industry: string;
    location: string;
    contactEmail: string;
    complianceOfficer: string;
    hasDataProtectionOfficer: boolean | null;
    primaryDataTypes: string[];
    cloudStatus: "pre-cloud" | "post-cloud";
}
