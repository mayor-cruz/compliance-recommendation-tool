import type { Recommendation } from "../types";
import { Button } from "./ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface RecommendationListProps {
    recommendations: Recommendation[];
    onRestart: () => void;
}

export function RecommendationList({
    recommendations,
    onRestart,
}: RecommendationListProps) {
    const groupedRecommendations = recommendations.reduce((acc, rec) => {
        if (!acc[rec.category]) {
            acc[rec.category] = [];
        }
        acc[rec.category].push(rec);
        return acc;
    }, {} as Record<string, Recommendation[]>);

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Your Compliance Recommendations</CardTitle>
                    <CardDescription>
                        Based on your responses, here are the areas that need
                        attention and recommended actions.
                        {recommendations.length === 0 &&
                            " Congratulations! You appear to be fully compliant."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                            {recommendations.length > 0
                                ? `${recommendations.length} recommendation${
                                      recommendations.length === 1 ? "" : "s"
                                  } found`
                                : "No recommendations needed"}
                        </div>
                        <Button onClick={onRestart}>Start Over</Button>
                    </div>
                </CardContent>
            </Card>

            {recommendations.length > 0 && (
                <div className="space-y-6">
                    {Object.entries(groupedRecommendations).map(
                        ([category, recs]) => (
                            <Card key={category}>
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        {category}
                                    </CardTitle>
                                    <CardDescription>
                                        {recs.length} recommendation
                                        {recs.length === 1 ? "" : "s"}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {recs.map((rec, index) => (
                                            <div
                                                key={index}
                                                className="border-l-4 border-blue-500 pl-4 space-y-2"
                                            >
                                                <div className="text-sm font-medium text-gray-600">
                                                    Question: {rec.question}
                                                </div>
                                                <div className="bg-blue-50 p-3 rounded-md">
                                                    <div className="text-sm font-medium text-blue-900 mb-1">
                                                        Recommended Action:
                                                    </div>
                                                    <div className="text-sm text-blue-800">
                                                        {rec.remediation}
                                                    </div>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Regulatory Specification:{" "}
                                                    {rec.regulatorySpec}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    )}
                </div>
            )}

            {recommendations.length === 0 && (
                <Card>
                    <CardContent className="text-center py-12">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-xl font-semibold mb-2">
                            Excellent Compliance!
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            Based on your responses, your organization appears
                            to be meeting all compliance requirements. Keep up
                            the great work!
                        </p>
                        <Button onClick={onRestart}>
                            Take Assessment Again
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
