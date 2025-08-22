import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import type { CompanyInfo } from "../types";

export default function CompanyInfoPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Get company info from navigation state if available
    const existingCompanyInfo = location.state as CompanyInfo | undefined;

    const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(
        existingCompanyInfo || {
            companyName: "",
            industry: "Fintech",
            location: "",
            contactEmail: "",
            complianceOfficer: "",
            hasDataProtectionOfficer: null,
            primaryDataTypes: [],
            cloudStatus: "pre-cloud",
        }
    );

    const [errors, setErrors] = useState<
        Partial<Record<keyof CompanyInfo, string>>
    >({});

    const industries = ["Fintech"];

    const dataTypes = [
        "Personal Customer Data",
        "Financial Transaction Data",
        "Health Records",
        "Educational Records",
        "Employee Data",
        "Marketing Data",
        "Biometric Data",
        "Location Data",
    ];

    const validateForm = () => {
        const newErrors: Partial<Record<keyof CompanyInfo, string>> = {};

        if (!companyInfo.companyName.trim()) {
            newErrors.companyName = "Company name is required";
        }
        if (!companyInfo.industry) {
            newErrors.industry = "Industry selection is required";
        }
        if (!companyInfo.location.trim()) {
            newErrors.location = "Location is required";
        }
        if (!companyInfo.contactEmail.trim()) {
            newErrors.contactEmail = "Contact email is required";
        } else if (!/\S+@\S+\.\S+/.test(companyInfo.contactEmail)) {
            newErrors.contactEmail = "Valid email address is required";
        }
        if (!companyInfo.complianceOfficer.trim()) {
            newErrors.complianceOfficer = "Compliance officer name is required";
        }
        if (!companyInfo.cloudStatus) {
            newErrors.cloudStatus = "Cloud migration status is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Pass company info through navigation state
            navigate("/recommendation", { state: companyInfo });
        }
    };

    const handleDataTypeChange = (dataType: string, checked: boolean) => {
        setCompanyInfo((prev) => ({
            ...prev,
            primaryDataTypes: checked
                ? [...(prev.primaryDataTypes || []), dataType]
                : (prev.primaryDataTypes || []).filter(
                      (type) => type !== dataType
                  ),
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="px-6 py-4 border-b bg-white">
                <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Button>
            </div>
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Company Information
                        </h1>
                        <p className="text-gray-600">
                            Please provide some basic information about your
                            organization to personalize your compliance
                            assessment.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Organization Details</CardTitle>
                            <CardDescription>
                                This information will be included in your
                                compliance report
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Company Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Company Name *
                                    </label>
                                    <Input
                                        type="text"
                                        value={companyInfo.companyName}
                                        onChange={(e) =>
                                            setCompanyInfo((prev) => ({
                                                ...prev,
                                                companyName: e.target.value,
                                            }))
                                        }
                                        placeholder="Enter your company name"
                                        className={
                                            errors.companyName
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {errors.companyName && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.companyName}
                                        </p>
                                    )}
                                </div>

                                {/* Industry */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Industry *
                                    </label>
                                    <Select
                                        value={companyInfo.industry}
                                        onValueChange={(value) =>
                                            setCompanyInfo((prev) => ({
                                                ...prev,
                                                industry: value,
                                            }))
                                        }
                                    >
                                        <SelectTrigger
                                            className={`w-full ${
                                                errors.industry
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <SelectValue placeholder="Select your industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {industries.map((industry) => (
                                                <SelectItem
                                                    key={industry}
                                                    value={industry}
                                                >
                                                    {industry}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.industry && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.industry}
                                        </p>
                                    )}
                                </div>

                                {/* Cloud Migration Status */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cloud Migration Status *
                                    </label>
                                    <Select
                                        value={companyInfo.cloudStatus}
                                        onValueChange={(
                                            value: "pre-cloud" | "post-cloud"
                                        ) =>
                                            setCompanyInfo((prev) => ({
                                                ...prev,
                                                cloudStatus: value,
                                            }))
                                        }
                                    >
                                        <SelectTrigger
                                            className={`w-full ${
                                                errors.cloudStatus
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <SelectValue placeholder="Select your cloud status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pre-cloud">
                                                Planning to migrate to cloud
                                                (Pre-Cloud)
                                            </SelectItem>
                                            <SelectItem value="post-cloud">
                                                Already using cloud services
                                                (Post-Cloud)
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.cloudStatus && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.cloudStatus}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500 mt-1">
                                        {companyInfo.cloudStatus === "pre-cloud"
                                            ? "You'll receive guidance on preparing for cloud migration and compliance requirements."
                                            : "You'll receive recommendations for optimizing your current cloud compliance posture."}
                                    </p>
                                </div>

                                {/* Location */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Primary Location *
                                    </label>
                                    <Input
                                        type="text"
                                        value={companyInfo.location}
                                        onChange={(e) =>
                                            setCompanyInfo((prev) => ({
                                                ...prev,
                                                location: e.target.value,
                                            }))
                                        }
                                        placeholder="e.g. Lagos, Nigeria"
                                        className={
                                            errors.location
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.location}
                                        </p>
                                    )}
                                </div>

                                {/* Contact Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Contact Email *
                                    </label>
                                    <Input
                                        type="email"
                                        value={companyInfo.contactEmail}
                                        onChange={(e) =>
                                            setCompanyInfo((prev) => ({
                                                ...prev,
                                                contactEmail: e.target.value,
                                            }))
                                        }
                                        placeholder="contact@company.com"
                                        className={
                                            errors.contactEmail
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {errors.contactEmail && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.contactEmail}
                                        </p>
                                    )}
                                </div>

                                {/* Compliance Officer */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Compliance Officer *
                                    </label>
                                    <Input
                                        type="text"
                                        value={companyInfo.complianceOfficer}
                                        onChange={(e) =>
                                            setCompanyInfo((prev) => ({
                                                ...prev,
                                                complianceOfficer:
                                                    e.target.value,
                                            }))
                                        }
                                        placeholder="Name of compliance officer"
                                        className={
                                            errors.complianceOfficer
                                                ? "border-red-500"
                                                : ""
                                        }
                                    />
                                    {errors.complianceOfficer && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.complianceOfficer}
                                        </p>
                                    )}
                                </div>

                                {/* Data Protection Officer */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Do you have a CISO (Chief Information
                                        Security Officer)?
                                    </label>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={
                                                    companyInfo.hasDataProtectionOfficer ===
                                                    true
                                                }
                                                onCheckedChange={(checked) =>
                                                    setCompanyInfo((prev) => ({
                                                        ...prev,
                                                        hasDataProtectionOfficer:
                                                            checked
                                                                ? true
                                                                : null,
                                                    }))
                                                }
                                            />
                                            <label className="text-sm font-medium text-gray-700">
                                                Yes
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={
                                                    companyInfo.hasDataProtectionOfficer ===
                                                    false
                                                }
                                                onCheckedChange={(checked) =>
                                                    setCompanyInfo((prev) => ({
                                                        ...prev,
                                                        hasDataProtectionOfficer:
                                                            checked
                                                                ? false
                                                                : null,
                                                    }))
                                                }
                                            />
                                            <label className="text-sm font-medium text-gray-700">
                                                No
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Primary Data Types */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Primary Data Types Processed (Select all
                                        that apply)
                                    </label>
                                    <div className="space-y-2">
                                        {dataTypes.map((dataType) => (
                                            <div
                                                key={dataType}
                                                className="flex items-center space-x-2"
                                            >
                                                <Checkbox
                                                    checked={
                                                        companyInfo.primaryDataTypes?.includes(
                                                            dataType
                                                        ) || false
                                                    }
                                                    onCheckedChange={(
                                                        checked
                                                    ) =>
                                                        handleDataTypeChange(
                                                            dataType,
                                                            !!checked
                                                        )
                                                    }
                                                />
                                                <label className="text-sm font-medium text-gray-700">
                                                    {dataType}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-between pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate("/")}
                                    >
                                        Back
                                    </Button>
                                    <Button type="submit">
                                        Continue to Assessment
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
