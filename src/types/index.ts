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
