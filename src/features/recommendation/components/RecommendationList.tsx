import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";
import { useNavigate } from "react-router";
import type { Recommendation, CompanyInfo } from "../../../types";

interface RecommendationListProps {
    recommendations: Recommendation[];
    companyInfo?: CompanyInfo;
    onRestart: () => void;
}

export function RecommendationList({
    recommendations,
    companyInfo,
    onRestart,
}: RecommendationListProps) {
    const navigate = useNavigate();

    const handleCompleteRestart = () => {
        navigate("/");
    };

    const handleEditCompanyInfo = () => {
        navigate("/company-info", { state: companyInfo });
    };

    const groupedRecommendations = recommendations.reduce((acc, rec) => {
        if (!acc[rec.category]) {
            acc[rec.category] = [];
        }
        acc[rec.category].push(rec);
        return acc;
    }, {} as Record<string, Recommendation[]>);

    const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            {/* Company Information Header */}
            {companyInfo && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">
                            Compliance Assessment Report
                        </CardTitle>
                        <CardDescription>
                            Generated on {currentDate}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-semibold text-lg mb-3">
                                    Organization Details
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="font-medium">
                                            Company:
                                        </span>{" "}
                                        {companyInfo.companyName}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            Industry:
                                        </span>{" "}
                                        {companyInfo.industry}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            Size:
                                        </span>{" "}
                                        {companyInfo.companySize}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            Location:
                                        </span>{" "}
                                        {companyInfo.location}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-3">
                                    Contact Information
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div>
                                        <span className="font-medium">
                                            Email:
                                        </span>{" "}
                                        {companyInfo.contactEmail}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            Compliance Officer:
                                        </span>{" "}
                                        {companyInfo.complianceOfficer}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            DPO Appointed:
                                        </span>{" "}
                                        {companyInfo.hasDataProtectionOfficer
                                            ? "Yes"
                                            : "No"}
                                    </div>
                                    {companyInfo.primaryDataTypes.length >
                                        0 && (
                                        <div>
                                            <span className="font-medium">
                                                Data Types:
                                            </span>
                                            <div className="mt-1">
                                                {companyInfo.primaryDataTypes.map(
                                                    (type) => (
                                                        <span
                                                            key={type}
                                                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                                                        >
                                                            {type}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

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
                        <div className="flex gap-2 no-print">
                            <Button
                                variant="outline"
                                onClick={() => window.print()}
                            >
                                Export Report
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleEditCompanyInfo}
                            >
                                Edit Company Info
                            </Button>
                            <Button onClick={onRestart}>
                                Retake Assessment
                            </Button>
                            <Button
                                variant="outline"
                                onClick={handleCompleteRestart}
                            >
                                Start Over
                            </Button>
                        </div>
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
