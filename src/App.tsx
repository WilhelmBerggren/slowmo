import {
  Card,
} from "@mui/material";
import { AnalysisCache } from "./hooks/useAnalysis";
import { TextAnalysis } from "./TextAnalysis";

function App() {
  return (
    <AnalysisCache.Provider value={new Map()}>
      <Card sx={{ width: "100%", minWidth: "80vw", minHeight: "40vh", alignItems: "center", justifyContent: 'center', display: 'flex', flexDirection: "column" }}>
        <TextAnalysis />
      </Card>
    </AnalysisCache.Provider >
  )
}

export default App;
