import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

interface QuestionCardProps {
    question: string;
    questionNumber: number;
    totalQuestions: number;
    regulatoryBody?: string[];
    canGoBack?: boolean;
    shouldHaveInput?: boolean;
    onAnswer: (answer: "yes" | "no" | string) => void;
    onBack?: () => void;
}

export function QuestionCard({
    question,
    questionNumber,
    totalQuestions,
    regulatoryBody,
    canGoBack,
    shouldHaveInput,
    onAnswer,
    onBack,
}: QuestionCardProps) {
    const [textInput, setTextInput] = useState("");

    const handleTextSubmit = () => {
        if (textInput.trim()) {
            onAnswer(textInput.trim());
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && textInput.trim()) {
            handleTextSubmit();
        }
    };

    return (
        <Card className="flex flex-col h-[320px]">
            <CardHeader>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <CardTitle className="text-lg">
                            Question {questionNumber} of {totalQuestions}
                        </CardTitle>
                        {regulatoryBody && regulatoryBody.length > 0 && (
                            <CardDescription>
                                Regulatory Body: {regulatoryBody.join(", ")}
                            </CardDescription>
                        )}
                    </div>

                    {canGoBack && onBack && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onBack}
                            className="flex items-center gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-6 flex-1">
                <div className="flex-1 overflow-y-auto space-y-4">
                    <p className="text-base leading-relaxed">{question}</p>

                    {shouldHaveInput && (
                        <div className="w-full px-1">
                            <Input
                                type="text"
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Please provide your answer..."
                                className="w-full"
                            />
                        </div>
                    )}
                </div>

                <div className="mt-auto pt-2 flex gap-4 justify-center">
                    {shouldHaveInput ? (
                        <Button
                            onClick={handleTextSubmit}
                            disabled={!textInput.trim()}
                        >
                            Submit Answer
                        </Button>
                    ) : (
                        <>
                            <Button onClick={() => onAnswer("yes")}>Yes</Button>
                            <Button onClick={() => onAnswer("no")}>No</Button>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
