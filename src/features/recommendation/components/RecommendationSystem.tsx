import { useState } from "react";
import { COMPLIANCE_CHECKLIST } from "../../../constants";
import type { Answer, Recommendation } from "../../../types";
import { RecommendationList } from "./RecommendationList";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";
import { QuestionCard } from "./QuestionCard";

export function RecommendationSystem() {
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [showRecommendations, setShowRecommendations] = useState(false);

    const categories = Object.keys(COMPLIANCE_CHECKLIST);
    const currentCategory = categories[currentCategoryIndex];
    const currentQuestions =
        COMPLIANCE_CHECKLIST[
            currentCategory as keyof typeof COMPLIANCE_CHECKLIST
        ];
    const currentQuestion = currentQuestions[currentQuestionIndex];

    const totalQuestions = Object.values(COMPLIANCE_CHECKLIST).reduce(
        (total, questions) => total + questions.length,
        0
    );
    const answeredQuestions = answers.length;
    const progress = (answeredQuestions / totalQuestions) * 100;

    const handleAnswer = (answer: boolean) => {
        const newAnswer: Answer = {
            categoryIndex: currentCategoryIndex,
            questionIndex: currentQuestionIndex,
            answer,
        };

        setAnswers((prev) => [...prev, newAnswer]);

        // Move to next question
        if (currentQuestionIndex < currentQuestions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else if (currentCategoryIndex < categories.length - 1) {
            setCurrentCategoryIndex((prev) => prev + 1);
            setCurrentQuestionIndex(0);
        } else {
            // All questions answered
            setShowRecommendations(true);
        }
    };

    const getRecommendations = (): Recommendation[] => {
        const recommendations: Recommendation[] = [];

        answers.forEach((answer) => {
            if (!answer.answer) {
                // If answer is "No"
                const categoryName = categories[answer.categoryIndex];
                const questions =
                    COMPLIANCE_CHECKLIST[
                        categoryName as keyof typeof COMPLIANCE_CHECKLIST
                    ];
                const question = questions[answer.questionIndex];

                recommendations.push({
                    category: categoryName,
                    question: question.question,
                    remediation: question.remediation,
                    regulatorySpec: question.regulatorySpec,
                });
            }
        });

        return recommendations;
    };

    const handleRestart = () => {
        setCurrentCategoryIndex(0);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setShowRecommendations(false);
    };

    if (showRecommendations) {
        return (
            <RecommendationList
                recommendations={getRecommendations()}
                onRestart={handleRestart}
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
                                    {answeredQuestions} of {totalQuestions}{" "}
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
                category={currentCategory}
                regulatorySpec={currentQuestion.regulatorySpec}
                question={currentQuestion.question}
                questionNumber={answeredQuestions + 1}
                totalQuestions={totalQuestions}
                onAnswer={handleAnswer}
            />
        </div>
    );
}
