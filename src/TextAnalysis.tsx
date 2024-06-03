import { useState } from "react";
import {
  Box,
  Button, CardActions,
  CardContent,
  CircularProgress,
  TextField,
  Typography
} from "@mui/material";
import { useAnalysis } from "./hooks/useAnalysis";

export function TextAnalysis() {
  const [state, setState] = useState<"showResult" | "showInput">("showInput");
  const [text, setText] = useState("");
  const { error, loading, result, performAnalysis } = useAnalysis();

  if (loading) {
    return <CardContent sx={{ alignContent: "center" }}><CircularProgress /></CardContent>;
  }

  if (error) {
    return (
      <Box width="100%">
        <CardContent sx={{ height: "100%" }}>
          <Typography textAlign="center" color="red">{error}</Typography>
        </CardContent>
        <CardActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setState("showInput")} variant="outlined">Return</Button>
        </CardActions>
      </Box>
    );
  }

  if (state === "showResult" && result) {
    return (
      <Box width="100%">
        <CardContent>
          <Typography textAlign="center">
            Your text consists of {result?.numWords} words ({result?.numLetters} letters)
          </Typography>
        </CardContent>
        <CardActions sx={{ direction: "rtl" }}>
          <Button onClick={() => setState("showInput")} variant="outlined">Return</Button>
        </CardActions>
      </Box>
    );
  }

  return (
    <Box width="100%">
      <CardContent>
        <TextField
          sx={{ width: "100%" }}
          multiline
          minRows={3}
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          variant="outlined"
          placeholder="Text to be analysed" />
      </CardContent>
      <CardActions sx={{ direction: "rtl" }}>
        <Button onClick={() => {
          if (text !== "") {
            performAnalysis(text);
            setState("showResult");
          }
        }} variant="outlined">Submit</Button>
      </CardActions>
    </Box>
  );
}
