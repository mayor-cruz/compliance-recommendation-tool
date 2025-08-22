import { useState, useEffect } from "react";
import { COMPLIANCE_CHECKLIST } from "@/constants";
import type {
    Answer,
    Recommendation,
    CompanyInfo,
    PreCloudQuestion,
    PostCloudQuestion,
} from "../../../types";
import { RecommendationList } from "./RecommendationList";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { QuestionCard } from "./QuestionCard";

interface RecommendationSystemProps {
    companyInfo?: CompanyInfo;
    onShowRecommendations: (showing: boolean) => void;
    existingAnswers?: Answer[];
    showRecommendationsInitially?: boolean;
}

export function RecommendationSystem({
    companyInfo,
    onShowRecommendations,
    existingAnswers,
    showRecommendationsInitially = false,
}: RecommendationSystemProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>(existingAnswers || []);
    const [showRecommendations, setShowRecommendations] = useState(
        showRecommendationsInitially
    );
    const [currentCategory, setCurrentCategory] = useState("");

    // Get questions based on cloud status
    const getQuestionsData = () => {
        if (!companyInfo?.cloudStatus) return { questions: [], categories: [] };

        if (companyInfo.cloudStatus === "pre-cloud") {
            return {
                questions: COMPLIANCE_CHECKLIST["pre-cloud"],
                categories: ["Pre-Cloud Assessment"],
            };
        } else {
            const postCloudData = COMPLIANCE_CHECKLIST["post-cloud"];
            const categories = Object.keys(postCloudData);
            const questions = categories.flatMap((category) =>
                postCloudData[category as keyof typeof postCloudData].map(
                    (q) => ({
                        ...q,
                        category,
                        priority: (q as any).priority as
                            | "critical"
                            | "high"
                            | "medium"
                            | undefined,
                    })
                )
            );
            return { questions, categories };
        }
    };

    const { questions, categories } = getQuestionsData();
    const totalQuestions = questions.length;

    useEffect(() => {
        if (questions.length > 0) {
            const firstQuestion = questions[0];
            setCurrentCategory(
                companyInfo?.cloudStatus === "pre-cloud"
                    ? "Pre-Cloud Assessment"
                    : (firstQuestion as any).category || categories[0]
            );
        }
    }, [questions, categories, companyInfo?.cloudStatus]);

    // Handle existing answers - if we have answers, show recommendations immediately
    useEffect(() => {
        if (existingAnswers && existingAnswers.length > 0) {
            setAnswers(existingAnswers);
            setShowRecommendations(true);
            onShowRecommendations(true);
        }
    }, [existingAnswers, onShowRecommendations]);

    const currentQuestion = questions[currentQuestionIndex];
    const progress =
        totalQuestions > 0 ? (answers.length / totalQuestions) * 100 : 0;

    const handleAnswer = (answer: "yes" | "no" | string) => {
        const isTextAnswer =
            typeof answer === "string" && answer !== "yes" && answer !== "no";

        const newAnswer: Answer = {
            questionId: currentQuestion.id || `INDEX_${currentQuestionIndex}`, // Use ID from constants
            questionIndex: currentQuestionIndex,
            category:
                companyInfo?.cloudStatus === "pre-cloud"
                    ? "Pre-Cloud Assessment"
                    : (currentQuestion as any).category || currentCategory,
            answer,
            question: currentQuestion.question,
            isTextAnswer,
        };

        const newAnswers = [...answers, newAnswer];
        setAnswers(newAnswers);

        if (currentQuestionIndex < totalQuestions - 1) {
            const nextQuestionIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextQuestionIndex);

            // Update category for post-cloud questions
            if (companyInfo?.cloudStatus === "post-cloud") {
                const nextQuestion = questions[nextQuestionIndex];
                setCurrentCategory(
                    (nextQuestion as any).category || currentCategory
                );
            }
        } else {
            // All questions completed
            setShowRecommendations(true);
            onShowRecommendations(true);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            // Remove the last answer and go back to previous question
            const newAnswers = answers.slice(0, -1);
            setAnswers(newAnswers);

            const previousQuestionIndex = currentQuestionIndex - 1;
            setCurrentQuestionIndex(previousQuestionIndex);

            // Update category for the previous question (post-cloud)
            if (companyInfo?.cloudStatus === "post-cloud") {
                const previousQuestion = questions[previousQuestionIndex];
                setCurrentCategory(
                    (previousQuestion as any).category || currentCategory
                );
            }
        }
    };

    const generateRecommendations = (): Recommendation[] => {
        // For text answers, we include them in recommendations if they have content
        // For yes/no answers, we only include "no" answers
        const relevantAnswers = answers.filter((answer) => {
            if (answer.isTextAnswer) {
                return true; // Include all text answers for informational purposes
            }
            return answer.answer === "no"; // Include only "no" answers for yes/no questions
        });

        const recommendations = relevantAnswers.map((answer) => {
            const question = questions[answer.questionIndex];
            const questionId = question.id || `INDEX_${answer.questionIndex}`;

            if (companyInfo?.cloudStatus === "pre-cloud") {
                const preCloudQ = question as PreCloudQuestion;

                return {
                    category: answer.category,
                    question: answer.question,
                    questionId, // Add for debugging
                    regulations: preCloudQ.regulations,
                    actions: answer.isTextAnswer
                        ? `Your response: "${answer.answer}". ${preCloudQ.actions}`
                        : preCloudQ.actions,
                    priority: preCloudQ.priority || "medium",
                };
            } else {
                const postCloudQ = question as PostCloudQuestion;

                return {
                    category: answer.category,
                    question: answer.question,
                    questionId, // Add for debugging
                    regulatoryBody: postCloudQ.regulatoryBody,
                    remediation: answer.isTextAnswer
                        ? `Your response: "${answer.answer}". ${postCloudQ.remediation}`
                        : postCloudQ.remediation,
                    priority: postCloudQ.priority || "medium",
                };
            }
        });

        return recommendations;
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setShowRecommendations(false);
        onShowRecommendations(false);
        if (questions.length > 0) {
            const firstQuestion = questions[0];
            setCurrentCategory(
                companyInfo?.cloudStatus === "pre-cloud"
                    ? "Pre-Cloud Assessment"
                    : (firstQuestion as any).category || categories[0]
            );
        }
    };

    if (!companyInfo || questions.length === 0) {
        return (
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="pt-6">
                    <p className="text-center text-gray-600">
                        No questions available. Please check your company
                        information.
                    </p>
                </CardContent>
            </Card>
        );
    }

    if (showRecommendations) {
        return (
            <RecommendationList
                recommendations={generateRecommendations()}
                companyInfo={companyInfo}
                onRestart={handleRestart}
                answers={answers}
            />
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Compliance Assessment</CardTitle>
                    <CardDescription>
                        Answer the following questions to receive personalized
                        compliance recommendations
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm text-muted-foreground mb-2">
                                <span>Progress</span>
                                <span>
                                    {answers.length} of {totalQuestions}{" "}
                                    questions
                                </span>
                            </div>
                            <Progress value={progress} className="w-full" />
                        </div>

                        <div className="text-sm text-muted-foreground">
                            Category:{" "}
                            <span className="font-medium">
                                {currentCategory}
                            </span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <QuestionCard
                question={currentQuestion.question}
                questionNumber={answers.length + 1}
                totalQuestions={totalQuestions}
                regulatoryBody={
                    companyInfo?.cloudStatus === "pre-cloud"
                        ? (currentQuestion as PreCloudQuestion).regulations
                        : (currentQuestion as PostCloudQuestion).regulatoryBody
                }
                shouldHaveInput={
                    companyInfo?.cloudStatus === "pre-cloud"
                        ? (currentQuestion as PreCloudQuestion).shouldHaveInput
                        : (currentQuestion as PostCloudQuestion).shouldHaveInput
                }
                canGoBack={currentQuestionIndex > 0}
                onAnswer={handleAnswer}
                onBack={handleBack}
            />
        </div>
    );
}
