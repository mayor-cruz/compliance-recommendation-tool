import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface QuestionCardProps {
    question: string;
    questionNumber: number;
    totalQuestions: number;
    regulatoryBody?: string[];
    onAnswer: (answer: "yes" | "no") => void;
}

export function QuestionCard({
    question,
    questionNumber,
    totalQuestions,
    regulatoryBody,
    onAnswer,
}: QuestionCardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">
                    Question {questionNumber} of {totalQuestions}
                </CardTitle>
                {regulatoryBody && regulatoryBody.length > 0 && (
                    <CardDescription>
                        Regulatory Body: {regulatoryBody.join(", ")}
                    </CardDescription>
                )}
            </CardHeader>
            <CardContent className="space-y-6">
                <p className="text-base leading-relaxed">{question}</p>

                <div className="flex gap-4 justify-center">
                    <Button onClick={() => onAnswer("yes")}>Yes</Button>
                    <Button onClick={() => onAnswer("no")}>No</Button>
                </div>
            </CardContent>
        </Card>
    );
}
