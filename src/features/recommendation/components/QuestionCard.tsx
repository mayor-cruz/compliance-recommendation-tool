import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface QuestionCardProps {
    category: string;
    question: string;
    regulatorySpec: string;
    questionNumber: number;
    totalQuestions: number;
    onAnswer: (answer: boolean) => void;
}

export function QuestionCard({
    category,
    question,
    regulatorySpec,
    questionNumber,
    totalQuestions,
    onAnswer,
}: QuestionCardProps) {
    return (
        <Card>
            <CardHeader className="flex justify-between items-center">
                <div>
                    <CardTitle className="text-lg">
                        Question {questionNumber} of {totalQuestions}
                    </CardTitle>
                    <CardDescription>{category}</CardDescription>
                </div>

                <div>
                    <CardDescription>
                        Regulatory Body: {regulatorySpec}
                    </CardDescription>
                </div>
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
