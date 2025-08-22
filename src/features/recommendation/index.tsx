import { useLocation, useNavigate } from "react-router";
import { RecommendationSystem } from "./components/RecommendationSystem";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { CompanyInfo, Answer } from "../../types";
import { useState } from "react";

type Props = {};

export default function Recommendation({}: Props) {
    const location = useLocation();
    const navigate = useNavigate();

    // Handle both direct company info and existing state with answers
    const state = location.state as any;
    const companyInfo: CompanyInfo | undefined = state?.companyInfo || state;
    const existingAnswers: Answer[] | undefined = state?.answers;
    const showRecommendationsInitially = Boolean(
        existingAnswers && existingAnswers.length > 0
    );

    const [showingRecommendations, setShowingRecommendations] = useState(
        showRecommendationsInitially
    );

    const handleBack = () => {
        navigate("/company-info", { state: companyInfo });
    };

    return (
        <div className="min-h-screen bg-gray-50 w-full">
            {!showingRecommendations && (
                <div className="px-6 py-4 border-b bg-white">
                    <Button
                        variant="ghost"
                        onClick={handleBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Company Info
                    </Button>
                </div>
            )}
            <main className="py-8">
                <RecommendationSystem
                    companyInfo={companyInfo}
                    onShowRecommendations={setShowingRecommendations}
                    existingAnswers={existingAnswers}
                    showRecommendationsInitially={showRecommendationsInitially}
                />
            </main>
        </div>
    );
}
