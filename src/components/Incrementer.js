import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Box, IconButton, Typography } from "@mui/material";

const Incrementer = ({
  quantity,
  onIncrementQuantity,
  onDecrementQuantity,
  dishAvailability,
}) => {
  return (
    <Box
      sx={{
        py: 0,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        borderColor: "grey.50032",
        width: "fit-content",
        background: "#00AB55",
      }}
    >
      <IconButton
        size="small"
        color="inherit"
        disabled={quantity <= 0}
        onClick={onDecrementQuantity}
      >
        <RemoveIcon />
      </IconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{ width: 40, textAlign: "center" }}
      >
        {quantity}
      </Typography>
      <IconButton
        size="small"
        color="inherit"
        disabled={dishAvailability}
        onClick={onIncrementQuantity}
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default Incrementer;
