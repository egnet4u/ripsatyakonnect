import React from "react";

import { Box } from "@material-ui/core";

import FiltersMediaEngagement from "../FiltersMediaEngagement/FiltersMediaEngagement";
import FiltersCategory from "../FiltersCategory/FiltersCategory";
import FiltersLocation from "../FiltersLocation/FiltersLocation";
import FiltersDemographic from "../FiltersDemographic/FiltersDemographic";

export default function FiltersTab() {
  const [openFirst, setOpenFirst] = React.useState(true);
  const [openSecond, setOpenSecond] = React.useState(false);
  const [openThird, setOpenThird] = React.useState(false);
  const [openFourth, setOpenFourth] = React.useState(false);
  return (
    <Box>
      <FiltersCategory setOpenFirst={setOpenFirst} openFirst={openFirst} />
      <FiltersLocation setOpenSecond={setOpenSecond} openSecond={openSecond} />
      <FiltersDemographic setOpenThird={setOpenThird} openThird={openThird} />
      <FiltersMediaEngagement
        openFourth={openFourth}
        setOpenFourth={setOpenFourth}
      />
    </Box>
  );
}
