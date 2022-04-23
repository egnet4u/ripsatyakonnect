import { Box, Button, CircularProgress, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { parseHandles } from "../../utils/parseHandles";
import { getInfluencersDataFromHandles } from "../../redux/filterResultSlice";
import { useSelector } from "react-redux";

export default function AddFromListTab() {
  const dispatch = useDispatch();
  const [influencersList, setInfluencersList] = useState("");
  let handles = parseHandles(influencersList);
  handles = new Set(handles);
  handles = Array.from(handles);
  const status = useSelector((state) => state.filterResultData.status);

  const handleClick = () => {
    dispatch(getInfluencersDataFromHandles({ influencer_handles: handles }));
  };
  return (
    <Box padding="0 1rem">
      <Box>
        <TextField
          onChange={(e) => setInfluencersList(e.target.value)}
          style={{ width: "100%", backgroundColor: "white" }}
          rows={12}
          multiline
          label="Influencers list"
          variant="outlined"
          size="small"
          type="text"
          InputProps={{
            style: { fontSize: 11 },
            inputProps: { min: 0 },
          }}
          value={influencersList}
          InputLabelProps={{ style: { fontSize: 11 } }}
        />
      </Box>
      <Box padding="1rem 0">
        <Button
          onClick={handleClick}
          disabled={influencersList.length === 0}
          style={{ width: "100%", fontSize: "12px" }}
          size="small"
          variant="contained"
          color="primary"
        >
          Add Influencers{" "}
          {status === "loading" && (
            <CircularProgress
              style={{ marginLeft: "0.3rem", color: "#fff" }}
              size={13}
            />
          )}
        </Button>
      </Box>
    </Box>
  );
}
