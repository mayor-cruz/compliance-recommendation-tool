import { useNavigate } from "react-router";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { Recommendation, CompanyInfo, Answer } from "../../../types";

interface RecommendationListProps {
    recommendations: Recommendation[];
    companyInfo?: CompanyInfo;
    onRestart: () => void;
    answers?: Answer[];
}

export function RecommendationList({
    recommendations,
    companyInfo,
    onRestart,
    answers = [],
}: RecommendationListProps) {
    const navigate = useNavigate();

    const handleCompleteRestart = () => {
        navigate("/");
    };

    const handleEditCompanyInfo = () => {
        navigate("/company-info", { state: companyInfo });
    };

    const handleViewDashboard = () => {
        navigate("/compliance-dashboard", { state: { answers, companyInfo } });
    };

    // Separate critical, high priority, and other recommendations
    const criticalRecommendations = recommendations.filter(
        (r) => r.priority === "critical"
    );
    const highPriorityRecommendations = recommendations.filter(
        (r) => r.priority === "high"
    );
    const otherRecommendations = recommendations.filter(
        (r) => r.priority !== "critical" && r.priority !== "high"
    );

    // Calculate compliance score for both pre-cloud and post-cloud
    const getComplianceScore = () => {
        if (!companyInfo?.cloudStatus || answers.length === 0) {
            return null;
        }

        const isPreCloud = companyInfo.cloudStatus === "pre-cloud";
        const totalQuestions = isPreCloud ? 30 : 40; // Pre-cloud has 30 questions, post-cloud has 40
        const yesAnswers = answers.filter(
            (answer) => !answer.isTextAnswer && answer.answer === "yes"
        ).length;

        return { yesAnswers, totalQuestions, isPreCloud };
    };

    const getComplianceRemark = (yesCount: number, isPreCloud: boolean) => {
        if (isPreCloud) {
            // Pre-cloud scoring thresholds
            if (yesCount >= 27) {
                return {
                    level: "excellent",
                    message:
                        "Excellent cloud compliance posture - maintain current controls and quarterly reviews",
                    color: "text-green-800 bg-green-50 border-green-200",
                };
            } else if (yesCount >= 24) {
                return {
                    level: "good",
                    message:
                        "Good cloud compliance - address remaining gaps within 60 days",
                    color: "text-blue-800 bg-blue-50 border-blue-200",
                };
            } else if (yesCount >= 21) {
                return {
                    level: "moderate",
                    message:
                        "Moderate compliance issues - require immediate attention (90 days maximum)",
                    color: "text-yellow-800 bg-yellow-50 border-yellow-200",
                };
            } else if (yesCount >= 18) {
                return {
                    level: "significant",
                    message:
                        "Significant compliance gaps - may face regulatory action and penalties",
                    color: "text-orange-800 bg-orange-50 border-orange-200",
                };
            } else if (yesCount >= 15) {
                return {
                    level: "major",
                    message:
                        "Major compliance failures - urgent remediation required within 30 days",
                    color: "text-red-800 bg-red-50 border-red-200",
                };
            } else {
                return {
                    level: "critical",
                    message:
                        "Critical compliance state - consider suspension of cloud operations",
                    color: "text-red-900 bg-red-100 border-red-300",
                };
            }
        } else {
            // Post-cloud scoring thresholds
            if (yesCount >= 34) {
                return {
                    level: "excellent",
                    message:
                        "Excellent cloud compliance posture - maintain current controls and quarterly reviews",
                    color: "text-green-800 bg-green-50 border-green-200",
                };
            } else if (yesCount >= 30) {
                return {
                    level: "good",
                    message:
                        "Good cloud compliance - address remaining gaps within 60 days",
                    color: "text-blue-800 bg-blue-50 border-blue-200",
                };
            } else if (yesCount >= 26) {
                return {
                    level: "moderate",
                    message:
                        "Moderate compliance issues - require immediate attention (90 days maximum)",
                    color: "text-yellow-800 bg-yellow-50 border-yellow-200",
                };
            } else if (yesCount >= 22) {
                return {
                    level: "significant",
                    message:
                        "Significant compliance gaps - may face regulatory action and penalties",
                    color: "text-orange-800 bg-orange-50 border-orange-200",
                };
            } else if (yesCount >= 18) {
                return {
                    level: "major",
                    message:
                        "Major compliance failures - urgent remediation required within 30 days",
                    color: "text-red-800 bg-red-50 border-red-200",
                };
            } else {
                return {
                    level: "critical",
                    message:
                        "Critical compliance state - consider suspension of cloud operations",
                    color: "text-red-900 bg-red-100 border-red-300",
                };
            }
        }
    };

    const complianceScore = getComplianceScore();

    const groupedRecommendations = recommendations.reduce((acc, rec) => {
        if (!acc[rec.category]) {
            acc[rec.category] = [];
        }
        acc[rec.category].push(rec);
        return acc;
    }, {} as Record<string, Recommendation[]>);

    // Sort recommendations within each category by priority (critical > high > medium)
    Object.keys(groupedRecommendations).forEach((category) => {
        groupedRecommendations[category].sort((a, b) => {
            const priorityOrder = { critical: 3, high: 2, medium: 1 };
            const aPriority = a.priority || "medium";
            const bPriority = b.priority || "medium";
            return priorityOrder[bPriority] - priorityOrder[aPriority];
        });
    });

    const getPriorityIcon = (priority?: string) => {
        switch (priority) {
            case "critical":
                return "🚨";
            case "high":
                return "⚠️";
            default:
                return "📋";
        }
    };

    const getPriorityLabel = (priority?: string) => {
        switch (priority) {
            case "critical":
                return "CRITICAL - Immediate Action Required (30 days)";
            case "high":
                return "HIGH PRIORITY - Address within 60 days";
            case "medium":
                return "Medium Priority";
            default:
                return "";
        }
    };

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case "critical":
                return "border-red-500 bg-red-50";
            case "high":
                return "border-orange-500 bg-orange-50";
            default:
                return "border-blue-500 bg-blue-50";
        }
    };

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
                                            Location:
                                        </span>{" "}
                                        {companyInfo.location}
                                    </div>
                                    <div>
                                        <span className="font-medium">
                                            Cloud Status:
                                        </span>{" "}
                                        {companyInfo.cloudStatus === "pre-cloud"
                                            ? "Pre-Cloud Migration"
                                            : "Post-Cloud Migration"}
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
                                            CISO Appointed:
                                        </span>{" "}
                                        {companyInfo.hasDataProtectionOfficer ===
                                        null
                                            ? "Not specified"
                                            : companyInfo.hasDataProtectionOfficer
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

            {/* Priority Summary for Both Pre-Cloud and Post-Cloud */}
            {recommendations.length > 0 &&
                recommendations.some((r) => r.priority) && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl text-red-600">
                                Compliance Priority Summary
                            </CardTitle>
                            <CardDescription>
                                {companyInfo?.cloudStatus === "pre-cloud"
                                    ? "Critical items requiring immediate attention before cloud migration"
                                    : "Immediate action items based on Nigerian regulatory requirements"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {(() => {
                                const criticalCount =
                                    criticalRecommendations.length;
                                const highCount =
                                    highPriorityRecommendations.length;

                                return (
                                    <div className="space-y-3">
                                        {criticalCount > 0 && (
                                            <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-md">
                                                <span className="text-2xl">
                                                    🚨
                                                </span>
                                                <div>
                                                    <div className="font-bold text-red-800">
                                                        {criticalCount} Critical
                                                        Compliance Issue
                                                        {criticalCount === 1
                                                            ? ""
                                                            : "s"}
                                                    </div>
                                                    <div className="text-sm text-red-700">
                                                        Immediate regulatory
                                                        risk - Must be addressed
                                                        within 30 days
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {highCount > 0 && (
                                            <div className="flex items-center gap-3 p-3 bg-orange-50 border border-orange-200 rounded-md">
                                                <span className="text-2xl">
                                                    ⚠️
                                                </span>
                                                <div>
                                                    <div className="font-bold text-orange-800">
                                                        {highCount} High
                                                        Priority Issue
                                                        {highCount === 1
                                                            ? ""
                                                            : "s"}
                                                    </div>
                                                    <div className="text-sm text-orange-700">
                                                        Significant compliance
                                                        gaps - Address within 60
                                                        days
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {criticalCount === 0 &&
                                            highCount === 0 && (
                                                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-md">
                                                    <span className="text-2xl">
                                                        ✅
                                                    </span>
                                                    <div>
                                                        <div className="font-bold text-green-800">
                                                            No Critical or High
                                                            Priority Issues
                                                        </div>
                                                        <div className="text-sm text-green-700">
                                                            Your compliance
                                                            posture is good for
                                                            critical
                                                            requirements
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                    </div>
                                );
                            })()}
                        </CardContent>
                    </Card>
                )}

            {/* Compliance Score for Both Pre-Cloud and Post-Cloud */}
            {complianceScore &&
                criticalRecommendations.length === 0 &&
                highPriorityRecommendations.length === 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">
                                {complianceScore.isPreCloud
                                    ? "Pre-Cloud Readiness Score"
                                    : "Cloud Compliance Score"}
                            </CardTitle>
                            <CardDescription>
                                {complianceScore.isPreCloud
                                    ? `Pre-migration readiness assessment based on ${complianceScore.totalQuestions} preparation questions`
                                    : `Overall assessment based on ${complianceScore.totalQuestions} compliance questions`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold">
                                        {complianceScore.yesAnswers}/
                                        {complianceScore.totalQuestions}
                                    </span>
                                    <span className="text-sm text-gray-600">
                                        {Math.round(
                                            (complianceScore.yesAnswers /
                                                complianceScore.totalQuestions) *
                                                100
                                        )}
                                        % Compliant
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${Math.min(
                                                (complianceScore.yesAnswers /
                                                    complianceScore.totalQuestions) *
                                                    100,
                                                100
                                            )}%`,
                                        }}
                                    ></div>
                                </div>
                                {(() => {
                                    const remark = getComplianceRemark(
                                        complianceScore.yesAnswers,
                                        complianceScore.isPreCloud
                                    );
                                    return (
                                        <div
                                            className={cn(
                                                "p-4 rounded-md border",
                                                remark.color
                                            )}
                                        >
                                            <div className="font-semibold mb-1">
                                                Compliance Level:{" "}
                                                {remark.level
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    remark.level.slice(1)}
                                            </div>
                                            <div className="text-sm">
                                                {remark.message}
                                            </div>
                                        </div>
                                    );
                                })()}
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
                            "Congratulations! You appear to be fully compliant."}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-3">
                        <div className="text-sm text-muted-foreground">
                            {recommendations.length > 0
                                ? `${recommendations.length} recommendation${
                                      recommendations.length === 1 ? "" : "s"
                                  } found`
                                : "No recommendations needed"}
                        </div>
                        <div className="flex flex-wrap gap-2 no-print">
                            <Button
                                variant="outline"
                                onClick={handleViewDashboard}
                            >
                                View Analytics
                            </Button>
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

            {/* Critical Recommendations - Separate Section */}
            {criticalRecommendations.length > 0 && (
                <Card className="border-red-200">
                    <CardHeader>
                        <CardTitle className="text-xl text-red-700">
                            🚨 Critical Actions Required
                        </CardTitle>
                        <CardDescription className="text-red-600">
                            {companyInfo?.cloudStatus === "pre-cloud"
                                ? "These items pose immediate regulatory risk and must be addressed within 30 days before cloud migration"
                                : "These items require immediate attention to meet Nigerian regulatory requirements"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {criticalRecommendations.map((rec, index) => (
                                <div
                                    key={index}
                                    className={`border-l-4 pl-4 space-y-2 py-2 ${getPriorityColor(
                                        rec.priority
                                    )}`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">
                                            {getPriorityIcon(rec.priority)}
                                        </span>
                                        <div className="text-sm font-medium text-gray-600">
                                            Question: {rec.question}
                                        </div>
                                    </div>
                                    {rec.priority &&
                                        rec.priority !== "medium" && (
                                            <div className="text-xs font-bold text-gray-800 bg-white px-2 py-1 rounded border">
                                                {getPriorityLabel(rec.priority)}
                                            </div>
                                        )}
                                    <div
                                        className={`p-3 rounded-md ${getPriorityColor(
                                            rec.priority
                                        )}`}
                                    >
                                        <div className="text-sm font-medium text-blue-900 mb-1">
                                            {rec.actions
                                                ? "Recommended Actions:"
                                                : "Remediation Steps:"}
                                        </div>
                                        <div className="text-sm text-blue-800">
                                            {rec.actions || rec.remediation}
                                        </div>
                                    </div>
                                    {(rec.regulations ||
                                        rec.regulatoryBody) && (
                                        <div className="text-xs text-gray-500">
                                            Regulatory Requirements:{" "}
                                            {(
                                                rec.regulations ||
                                                rec.regulatoryBody
                                            )?.join(", ")}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* High Priority Recommendations - Separate Section */}
            {highPriorityRecommendations.length > 0 && (
                <Card className="border-orange-200">
                    <CardHeader>
                        <CardTitle className="text-xl text-orange-700">
                            ⚠️ High Priority Actions
                        </CardTitle>
                        <CardDescription className="text-orange-600">
                            {companyInfo?.cloudStatus === "pre-cloud"
                                ? "Important items that should be addressed before cloud migration"
                                : "Significant compliance gaps that should be addressed within 60 days"}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {highPriorityRecommendations.map((rec, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        "border-l-4 pl-4 space-y-2 py-2",
                                        getPriorityColor(rec.priority)
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">
                                            {getPriorityIcon(rec.priority)}
                                        </span>
                                        <div className="text-sm font-medium text-gray-600">
                                            Question: {rec.question}
                                        </div>
                                    </div>
                                    {rec.priority &&
                                        rec.priority !== "medium" && (
                                            <div className="text-xs font-bold text-gray-800 bg-white px-2 py-1 rounded border">
                                                {getPriorityLabel(rec.priority)}
                                            </div>
                                        )}
                                    <div
                                        className={cn(
                                            "p-3 rounded-md",
                                            getPriorityColor(rec.priority)
                                        )}
                                    >
                                        <div className="text-sm font-medium text-blue-900 mb-1">
                                            {rec.actions
                                                ? "Recommended Actions:"
                                                : "Remediation Steps:"}
                                        </div>
                                        <div className="text-sm text-blue-800">
                                            {rec.actions || rec.remediation}
                                        </div>
                                    </div>
                                    {(rec.regulations ||
                                        rec.regulatoryBody) && (
                                        <div className="text-xs text-gray-500">
                                            Regulatory Requirements:{" "}
                                            {(
                                                rec.regulations ||
                                                rec.regulatoryBody
                                            )?.join(", ")}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Other Recommendations */}
            {otherRecommendations.length > 0 && (
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">
                                Other Compliance Recommendations
                            </CardTitle>
                            <CardDescription>
                                Additional areas for improvement and best
                                practices
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {(() => {
                                    // Group other recommendations by category
                                    const otherGrouped =
                                        otherRecommendations.reduce(
                                            (acc, rec) => {
                                                if (!acc[rec.category]) {
                                                    acc[rec.category] = [];
                                                }
                                                acc[rec.category].push(rec);
                                                return acc;
                                            },
                                            {} as Record<
                                                string,
                                                Recommendation[]
                                            >
                                        );

                                    return Object.entries(otherGrouped).map(
                                        ([category, recs]) => (
                                            <div
                                                key={category}
                                                className="space-y-3"
                                            >
                                                <h4 className="font-semibold text-gray-800 border-b pb-1">
                                                    {category}
                                                </h4>
                                                {recs.map((rec, index) => (
                                                    <div
                                                        key={index}
                                                        className={cn(
                                                            "border-l-4 pl-4 space-y-2 py-2",
                                                            getPriorityColor(
                                                                rec.priority
                                                            )
                                                        )}
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-lg">
                                                                {getPriorityIcon(
                                                                    rec.priority
                                                                )}
                                                            </span>
                                                            <div className="text-sm font-medium text-gray-600">
                                                                Question:{" "}
                                                                {rec.question}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={cn(
                                                                "p-3 rounded-md",
                                                                getPriorityColor(
                                                                    rec.priority
                                                                )
                                                            )}
                                                        >
                                                            {/* Check if this is a text input answer */}
                                                            {(
                                                                rec.actions ||
                                                                rec.remediation
                                                            )?.startsWith(
                                                                "Your response:"
                                                            ) ? (
                                                                <div className="text-sm text-blue-800">
                                                                    <span className="font-medium">
                                                                        Your
                                                                        response:
                                                                    </span>{" "}
                                                                    {(
                                                                        rec.actions ||
                                                                        rec.remediation
                                                                    )
                                                                        ?.replace(
                                                                            /^Your response: "|"\. .*$/g,
                                                                            ""
                                                                        )
                                                                        .replace(
                                                                            /"/g,
                                                                            ""
                                                                        )}
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <div className="text-sm font-medium text-blue-900 mb-1">
                                                                        {rec.actions
                                                                            ? "Recommended Actions:"
                                                                            : "Remediation Steps:"}
                                                                    </div>
                                                                    <div className="text-sm text-blue-800">
                                                                        {rec.actions ||
                                                                            rec.remediation}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                        {(rec.regulations ||
                                                            rec.regulatoryBody) && (
                                                            <div className="text-xs text-gray-500">
                                                                Regulatory
                                                                Requirements:{" "}
                                                                {(
                                                                    rec.regulations ||
                                                                    rec.regulatoryBody
                                                                )?.join(", ")}
                                                            </div>
                                                        )}
                                                        {rec.regulatorySpec && (
                                                            <div className="text-xs text-gray-500">
                                                                Regulatory
                                                                Specification:{" "}
                                                                {
                                                                    rec.regulatorySpec
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )
                                    );
                                })()}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
