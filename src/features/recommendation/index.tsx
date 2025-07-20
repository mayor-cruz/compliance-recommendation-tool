import { RecommendationSystem } from "./components/RecommendationSystem";

type Props = {};

export default function Recommendation({}: Props) {
    return (
        <div className="min-h-screen bg-gray-50 w-full">
            <header className="bg-white border-b px-6 py-4 w-full">
                <h1 className="text-2xl font-bold text-gray-900">
                    Compliance Assessment Tool
                </h1>
                <p className="text-gray-600 mt-1">
                    Evaluate your organization's compliance with NDPR, CBN, and
                    NITDA requirements
                </p>
            </header>

            <main className="py-8">
                <RecommendationSystem />
            </main>
        </div>
    );
}
