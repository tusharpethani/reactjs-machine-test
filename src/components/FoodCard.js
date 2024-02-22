import { Box, Typography } from "@mui/material";
import React from "react";
import Image from "./Image";
import VegImage from "../assets/veg.svg";
import NonVegImage from "../assets/non-veg.svg";
import Incrementer from "./Incrementer";
import { useDispatch } from "../redux/store";
import { decreaseQuantity, increaseQuantity } from "../redux/slices/product";

const FoodCard = ({ data, position, activeTab }) => {
  const dispatch = useDispatch();

  const onIncrementQuantity = () => {
    dispatch(increaseQuantity({ activeTab, position, data }));
  };
  const onDecrementQuantity = () => {
    dispatch(decreaseQuantity({ activeTab, position, data }));
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        borderTop: position !== 0 ? "1px solid" : "none",
        borderColor: "grey.50032",
        pt: "24px !important",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 1.5,
            width: "100%",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Box
                component={"img"}
                src={data?.dish_Type === 2 ? VegImage : NonVegImage}
                alt="veg"
              />
              <Typography sx={{ fontSize: { xs: 14, md: 18 } }} variant="h6">
                {data?.dish_name}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                sx={{ fontSize: { xs: 14, md: 16 } }}
                variant="subtitle1"
              >
                {data?.dish_currency} {data.dish_price}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: 14, md: 16 } }}
                variant="subtitle1"
              >
                {data?.dish_calories} Calories
              </Typography>
            </Box>
          </Box>
          <Typography
            sx={{
              color: "rgb(89 97 113)",
              my: 2,
              fontSize: { xs: 14, md: 16 },
            }}
          >
            {data?.dish_description}
          </Typography>
          {console.log("!data?.dish_Availability", !data?.dish_Availability)}

          <Incrementer
            quantity={data?.quantity}
            onIncrementQuantity={onIncrementQuantity}
            onDecrementQuantity={onDecrementQuantity}
            dishAvailability={!data?.dish_Availability}
          />
          {data?.addonCat?.length ? (
            <Typography sx={{ color: "rgb(220 35 35)" }}>
              Customization available
            </Typography>
          ) : null}
          {!data?.dish_Availability && (
            <Typography sx={{ color: "rgb(220 35 35)" }}>
              Not available
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            height: { xs: "80px", sm: "120px", md: "200px" },
            width: { xs: "80px", sm: "120px", md: "220px" },
            borderRadius: 2,
            overflow: "hidden",
            minWidth: { xs: "80px", sm: "120px", md: "220px" },
          }}
        >
          <Image src={data?.dish_image} ratio="3/4" />
        </Box>
      </Box>
    </Box>
  );
};

export default FoodCard;
