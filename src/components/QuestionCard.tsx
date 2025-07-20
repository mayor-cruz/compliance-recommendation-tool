import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface QuestionCardProps {
    category: string;
    question: string;
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (answer: boolean) => void;
}

export function QuestionCard({
    category,
    question,
    questionNumber,
    totalQuestions,
    onAnswer,
}: QuestionCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">
                    Question {questionNumber} of {totalQuestions}
                </CardTitle>
                <CardDescription>{category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-base leading-relaxed">{question}</p>

                <div className="flex gap-4 justify-center">
                    <Button onClick={() => onAnswer(true)}>Yes</Button>
                    <Button onClick={() => onAnswer(false)}>No</Button>
                </div>
            </CardContent>
        </Card>
    );
}
