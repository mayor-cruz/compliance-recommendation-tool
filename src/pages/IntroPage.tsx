import { Link } from "react-router";
import { Button } from "../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import {
    CircleQuestionMark,
    FileBadge2,
    Lightbulb,
    MoveRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function IntroPage() {
    return (
        <>
            <div className="w-full">
                <div className="container mx-auto">
                    <div className="flex gap-8 py-20 items-center justify-center flex-col">
                        <div className="flex gap-4 flex-col">
                            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                                Compliance Assessment Tool
                            </h1>
                            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                                Evaluate your organization's compliance with
                                Nigerian Data Protection Regulation (NDPR),
                                Central Bank of Nigeria (CBN), and Nigeria
                                Information Technology Development Agency
                                (NITDA) requirements.
                            </p>
                        </div>
                        <div className="flex flex-row gap-3">
                            <Link to="/company-info">
                                <Button size="lg" className="gap-4">
                                    Start Assessment{" "}
                                    <MoveRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="container mx-auto">
                    <div className="flex gap-4 py-20 px-4 lg:px-20 flex-col items-start">
                        <div>
                            <Badge>Features</Badge>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
                                Comprehensive Assessment
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
                                70+ carefully crafted questions covering all
                                aspects of Nigerian compliance requirements.
                            </p>
                        </div>
                        <div className="flex gap-10 pt-12 flex-col w-full">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <span className="text-2xl">📋</span>
                                            <span>
                                                Comprehensive Assessment
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            70+ carefully crafted questions
                                            covering all aspects of Nigerian
                                            compliance requirements
                                        </CardDescription>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <span className="text-2xl">🎯</span>
                                            <span>
                                                Personalized Recommendations
                                            </span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            Get tailored remediation steps based
                                            on your specific compliance gaps
                                        </CardDescription>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-2">
                                            <span className="text-2xl">📊</span>
                                            <span>Detailed Reporting</span>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription>
                                            Receive comprehensive reports with
                                            actionable insights for your
                                            compliance team
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Regulatory Coverage */}
            <div className="w-full">
                <div className="container mx-auto">
                    <div className="flex gap-4 py-20 px-4 lg:px-20  flex-col items-start">
                        <div>
                            <Badge>Coverage</Badge>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
                                Regulatory Coverage
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
                                This assessment covers compliance requirements
                                from multiple Nigerian regulatory bodies.
                            </p>
                        </div>
                        <div className="flex gap-10 pt-12 flex-col w-full">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-blue-600">
                                            NDPR
                                        </span>
                                    </div>
                                    <h3 className="font-semibold mb-2">
                                        Nigerian Data Protection Regulation
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Data privacy, processing, and subject
                                        rights compliance
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-green-600">
                                            CBN
                                        </span>
                                    </div>
                                    <h3 className="font-semibold mb-2">
                                        Central Bank of Nigeria
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Financial data security and residency
                                        requirements
                                    </p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-purple-600">
                                            NITDA
                                        </span>
                                    </div>
                                    <h3 className="font-semibold mb-2">
                                        Nigeria IT Development Agency
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        IT security standards and cybersecurity
                                        frameworks
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* What to Expect */}
            <div className="w-full">
                <div className="container mx-auto">
                    <div className="flex gap-4 px-4 lg:px-20 flex-col items-start">
                        <div>
                            <Badge>Process</Badge>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
                                What to Expect
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
                                Here's what the assessment process looks like.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pt-12 w-full">
                            <div className="flex items-start space-x-4">
                                <Lightbulb className="w-10 h-10" />
                                <div>
                                    <h4 className="font-semibold">
                                        Company Information
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Provide basic details about your
                                        organization
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <CircleQuestionMark className="w-10 h-10" />
                                <div>
                                    <h4 className="font-semibold">
                                        Assessment Questions
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Answer 70+ questions across 14
                                        compliance categories
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start space-x-4">
                                <FileBadge2 className="w-10 h-10" />
                                <div>
                                    <h4 className="font-semibold">
                                        Personalized Report
                                    </h4>
                                    <p className="text-muted-foreground">
                                        Receive detailed recommendations and
                                        remediation steps
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full py-20 lg:py-40">
                <div className="container mx-auto">
                    <div className="flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center">
                        <div>
                            <Badge>Get started</Badge>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
                                Ready to get started?
                            </h3>
                            <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
                                Start your compliance assessment today and get
                                personalized recommendations to improve your
                                organization's regulatory compliance.
                            </p>
                        </div>
                        <div className="flex flex-row gap-4">
                            <Link to="/company-info">
                                <Button className="gap-4">
                                    Start Assessment{" "}
                                    <MoveRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
