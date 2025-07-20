import { Route, Routes } from "react-router";
import Recommendation from "./features/recommendation";

function App() {
    return (
        <Routes>
            <Route path="/recommendation" element={<Recommendation />} />
        </Routes>
    );
}

export default App;
