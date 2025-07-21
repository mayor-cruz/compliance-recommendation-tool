import { Route, Routes } from "react-router";
import Recommendation from "./features/recommendation";
import IntroPage from "./pages/IntroPage";
import CompanyInfoPage from "./pages/CompanyInfoPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/company-info" element={<CompanyInfoPage />} />
            <Route path="/recommendation" element={<Recommendation />} />
        </Routes>
    );
}

export default App;
