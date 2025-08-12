import { useLocation, useNavigate } from "react-router";
import { RecommendationSystem } from "./components/RecommendationSystem";
import { Button } from "../../components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { CompanyInfo } from "../../types";
import { useState } from "react";

type Props = {};

export default function Recommendation({}: Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const companyInfo = location.state as CompanyInfo | undefined;
    const [showingRecommendations, setShowingRecommendations] = useState(false);

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
                />
            </main>
        </div>
    );
}
