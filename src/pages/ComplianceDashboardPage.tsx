import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, CartesianGrid, PieChart, Pie } from "recharts";
import { TrendingUp } from "lucide-react";
import { COMPLIANCE_CHECKLIST } from "@/constants";

export default function ComplianceDashboardPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { answers = [], companyInfo } = location.state || {};

    const handleBackToResults = () => {
        navigate("/recommendation", { state: { answers, companyInfo } });
    };

    const handleStartOver = () => {
        navigate("/");
    };

    // Calculate compliance by regulatory organization
    const calculateRegulatoryCompliance = () => {
        if (!companyInfo?.cloudStatus || answers.length === 0) {
            return { barData: [], pieData: [], totalOrgs: 0 };
        }

        const isPreCloud = companyInfo.cloudStatus === "pre-cloud";
        const checklistData =
            COMPLIANCE_CHECKLIST[isPreCloud ? "pre-cloud" : "post-cloud"];

        // Create a map to track compliance for each regulatory organization
        const regulatoryMap = new Map<
            string,
            { total: number; compliant: number }
        >();

        // Handle different data structures for pre-cloud vs post-cloud
        const allQuestions: any[] = [];

        if (isPreCloud) {
            // Pre-cloud has direct array structure
            allQuestions.push(...(checklistData as any[]));
        } else {
            // Post-cloud has categorized structure
            Object.values(checklistData as Record<string, any[]>).forEach(
                (category) => {
                    allQuestions.push(...category);
                }
            );
        }

        allQuestions.forEach((question: any) => {
            const answer = answers.find(
                (a: any) => a.questionId === question.id
            );
            const isCompliant =
                answer && !answer.isTextAnswer && answer.answer === "yes";

            // Handle both 'regulations' (pre-cloud) and 'regulatoryBody' (post-cloud)
            const regulations = question.regulations || question.regulatoryBody;

            if (regulations) {
                regulations.forEach((regulation: any) => {
                    // Normalize regulation names
                    const normalizedReg = regulation.includes("&")
                        ? regulation.split("&").map((r: any) => r.trim())
                        : [regulation.trim()];

                    normalizedReg.forEach((reg: any) => {
                        const current = regulatoryMap.get(reg) || {
                            total: 0,
                            compliant: 0,
                        };
                        regulatoryMap.set(reg, {
                            total: current.total + 1,
                            compliant:
                                current.compliant + (isCompliant ? 1 : 0),
                        });
                    });
                });
            }
        });

        // Convert to chart data
        const barData = Array.from(regulatoryMap.entries()).map(
            ([org, data]) => ({
                organization: org,
                total: data.total,
                compliant: data.compliant,
                nonCompliant: data.total - data.compliant,
                complianceRate: Math.round((data.compliant / data.total) * 100),
            })
        );

        // Sort by compliance rate for better visualization
        barData.sort((a, b) => b.complianceRate - a.complianceRate);

        // Pie chart data for overall compliance
        const pieData = barData.map((item, index) => ({
            organization: item.organization,
            complianceRate: item.complianceRate,
            compliant: item.compliant,
            total: item.total,
            fill: `var(--chart-${(index % 5) + 1})`, // Cycle through chart colors
        }));

        return { barData, pieData, totalOrgs: regulatoryMap.size };
    };

    const { barData, pieData, totalOrgs } = calculateRegulatoryCompliance();

    // Color scheme for charts
    const getComplianceColor = (rate: number) => {
        if (rate >= 90) return "#10b981"; // Green
        if (rate >= 75) return "#3b82f6"; // Blue
        if (rate >= 60) return "#f59e0b"; // Yellow
        if (rate >= 40) return "#f97316"; // Orange
        return "#ef4444"; // Red
    };

    const chartConfig = {
        compliant: {
            label: "Compliant",
            color: "var(--chart-2)",
        },
        nonCompliant: {
            label: "Non-Compliant",
            color: "var(--chart-1)",
        },
        complianceRate: {
            label: "Compliance Rate %",
            color: "var(--chart-3)",
        },
    } satisfies ChartConfig;

    if (!answers.length || !companyInfo) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Card>
                    <CardContent className="text-center py-12">
                        <h2 className="text-xl font-semibold mb-4">
                            No Data Available
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Complete a compliance assessment to view your
                            regulatory compliance dashboard.
                        </p>
                        <Button onClick={handleStartOver}>
                            Start Assessment
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 space-y-6">
            {/* Header */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">
                        Regulatory Compliance Dashboard
                    </CardTitle>
                    <CardDescription>
                        Compliance status across Nigerian regulatory
                        organizations
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                            Analyzing compliance across {totalOrgs} regulatory
                            organizations
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={handleBackToResults}
                            >
                                Back to Results
                            </Button>
                            <Button variant="outline" onClick={handleStartOver}>
                                Start Over
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-4 gap-4">
                {barData.map((item) => (
                    <Card key={item.organization}>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg">
                                {item.organization}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold mb-1">
                                {item.complianceRate}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                                {item.compliant}/{item.total} requirements met
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div
                                    className="h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${item.complianceRate}%`,
                                        backgroundColor: getComplianceColor(
                                            item.complianceRate
                                        ),
                                    }}
                                ></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Bar Chart - Compliance by Organization */}
            <Card>
                <CardHeader>
                    <CardTitle>
                        Compliance Status by Regulatory Organization
                    </CardTitle>
                    <CardDescription>
                        Detailed breakdown of compliant vs non-compliant
                        requirements for{" "}
                        {companyInfo.cloudStatus === "pre-cloud"
                            ? "pre-cloud"
                            : "post-cloud"}{" "}
                        assessment
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={barData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="organization"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    value.length > 10
                                        ? value.slice(0, 10) + "..."
                                        : value
                                }
                            />
                            <ChartTooltip
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar
                                dataKey="compliant"
                                stackId="a"
                                fill="var(--color-compliant)"
                                radius={[0, 0, 4, 4]}
                            />
                            <Bar
                                dataKey="nonCompliant"
                                stackId="a"
                                fill="var(--color-nonCompliant)"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 leading-none font-medium">
                        {(() => {
                            const avgCompliance = Math.round(
                                barData.reduce(
                                    (sum, item) => sum + item.complianceRate,
                                    0
                                ) / barData.length
                            );
                            const trend =
                                avgCompliance >= 75
                                    ? "Strong compliance posture"
                                    : avgCompliance >= 50
                                    ? "Moderate compliance status"
                                    : "Needs improvement";
                            return (
                                <>
                                    {trend} - {avgCompliance}% average
                                    compliance
                                    <TrendingUp className="h-4 w-4" />
                                </>
                            );
                        })()}
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Showing compliance status across {totalOrgs} Nigerian
                        regulatory organizations
                    </div>
                </CardFooter>
            </Card>

            {/* Pie Chart - Overall Compliance Distribution */}
            <Card className="flex flex-col">
                <CardHeader className="items-center pb-0">
                    <CardTitle>Compliance Rate Distribution</CardTitle>
                    <CardDescription>
                        {companyInfo.cloudStatus === "pre-cloud"
                            ? "Pre-cloud"
                            : "Post-cloud"}{" "}
                        compliance across regulatory organizations
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[350px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={pieData}
                                dataKey="complianceRate"
                                nameKey="organization"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 leading-none font-medium">
                        {(() => {
                            const avgCompliance = Math.round(
                                pieData.reduce(
                                    (sum, item) => sum + item.complianceRate,
                                    0
                                ) / pieData.length
                            );
                            const trend =
                                avgCompliance >= 75
                                    ? "Strong compliance posture"
                                    : avgCompliance >= 50
                                    ? "Moderate compliance status"
                                    : "Needs improvement";
                            return (
                                <>
                                    {trend} - {avgCompliance}% average
                                    compliance
                                    <TrendingUp className="h-4 w-4" />
                                </>
                            );
                        })()}
                    </div>
                    <div className="text-muted-foreground leading-none">
                        Showing compliance distribution across {totalOrgs}{" "}
                        Nigerian regulatory organizations
                    </div>
                </CardFooter>
            </Card>

            {/* Compliance Level Analysis */}
            <Card>
                <CardHeader>
                    <CardTitle>Compliance Level Analysis</CardTitle>
                    <CardDescription>
                        Risk assessment based on compliance rates
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold mb-4">
                                Risk Categories
                            </h4>
                            <div className="space-y-3">
                                {[
                                    {
                                        range: "90-100%",
                                        level: "Excellent",
                                        color: "bg-green-100 text-green-800 border-green-200",
                                        description: "Full compliance achieved",
                                    },
                                    {
                                        range: "75-89%",
                                        level: "Good",
                                        color: "bg-blue-100 text-blue-800 border-blue-200",
                                        description: "Minor gaps to address",
                                    },
                                    {
                                        range: "60-74%",
                                        level: "Moderate",
                                        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
                                        description:
                                            "Significant improvement needed",
                                    },
                                    {
                                        range: "40-59%",
                                        level: "Poor",
                                        color: "bg-orange-100 text-orange-800 border-orange-200",
                                        description: "Major compliance issues",
                                    },
                                    {
                                        range: "0-39%",
                                        level: "Critical",
                                        color: "bg-red-100 text-red-800 border-red-200",
                                        description:
                                            "Immediate action required",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.range}
                                        className={`p-3 rounded-md border ${item.color}`}
                                    >
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">
                                                {item.level}
                                            </span>
                                            <span className="text-sm">
                                                {item.range}
                                            </span>
                                        </div>
                                        <div className="text-sm mt-1">
                                            {item.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">
                                Your Compliance Summary
                            </h4>
                            <div className="space-y-3">
                                {barData.map((item) => {
                                    const level =
                                        item.complianceRate >= 90
                                            ? "Excellent"
                                            : item.complianceRate >= 75
                                            ? "Good"
                                            : item.complianceRate >= 60
                                            ? "Moderate"
                                            : item.complianceRate >= 40
                                            ? "Poor"
                                            : "Critical";

                                    const colorClass =
                                        item.complianceRate >= 90
                                            ? "bg-green-50 border-green-200"
                                            : item.complianceRate >= 75
                                            ? "bg-blue-50 border-blue-200"
                                            : item.complianceRate >= 60
                                            ? "bg-yellow-50 border-yellow-200"
                                            : item.complianceRate >= 40
                                            ? "bg-orange-50 border-orange-200"
                                            : "bg-red-50 border-red-200";

                                    return (
                                        <div
                                            key={item.organization}
                                            className={`p-3 rounded-md border ${colorClass}`}
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">
                                                    {item.organization}
                                                </span>
                                                <span className="text-sm font-bold">
                                                    {level}
                                                </span>
                                            </div>
                                            <div className="text-sm mt-1">
                                                {item.complianceRate}%
                                                compliance rate (
                                                {item.compliant}/{item.total}{" "}
                                                requirements)
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
