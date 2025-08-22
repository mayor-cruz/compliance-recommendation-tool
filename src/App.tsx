import { Route, Routes } from "react-router";
import Recommendation from "@/features/recommendation";
import IntroPage from "@/pages/IntroPage";
import CompanyInfoPage from "@/pages/CompanyInfoPage";
import ComplianceDashboardPage from "@/pages/ComplianceDashboardPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/company-info" element={<CompanyInfoPage />} />
            <Route path="/recommendation" element={<Recommendation />} />
            <Route
                path="/compliance-dashboard"
                element={<ComplianceDashboardPage />}
            />
        </Routes>
    );
}

export default App;
