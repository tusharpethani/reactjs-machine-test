import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "../redux/store";
import { getAllFoods } from "../redux/slices/product";
import {
  AppBar,
  Badge,
  Box,
  Container,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import SwipeableViews from "react-swipeable-views";
import Loader from "../components/Loader";
import FoodCard from "../components/FoodCard";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const FoodList = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { isLoading, allFood } = useSelector((state) => state.allFood);

  const foodObj = allFood[0];

  const selectedMenus = foodObj?.table_menu_list?.filter((menu) =>
    menu.category_dishes.some((dish) => dish.quantity)
  );

  const menuWithSelectedDishes = (selectedMenus || []).map((menu) => {
    return {
      ...menu,
      category_dishes: menu.category_dishes.filter((dish) => dish.quantity),
    };
  });

  const menuItemLength = (menuWithSelectedDishes || []).map(
    (menu) => menu.category_dishes
  );

  const finalMenuItemLength = menuItemLength.map((item) => item.length);

  const showCartLength = finalMenuItemLength.reduce(
    (total, value) => total + value,
    0
  );

  const [activeTab, setActiveTab] = useState(0);
  const [getAllFood, setGetAllFood] = useState({});

  useEffect(() => {
    dispatch(getAllFoods());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setGetAllFood(allFood[0]);
  }, [allFood]);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleChangeIndex = (index) => {
    setActiveTab(index);
  };

  return (
    <Container maxWidth={"lg"}>
      <Loader isLoading={isLoading}>
        <Box sx={{ mt: 2, mb: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography>{getAllFood?.restaurant_name}</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography>My order</Typography>
                  <IconButton>
                    <Badge badgeContent={showCartLength} color="secondary">
                      <ShoppingCartOutlinedIcon />
                    </Badge>
                  </IconButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <AppBar position="static" elevation={0} color="transparent">
                <Tabs
                  value={activeTab}
                  onChange={handleChange}
                  indicatorColor="secondary"
                  textColor="secondary"
                  variant="scrollable"
                  scrollButtons={"auto"}
                  aria-label="full width tabs example"
                >
                  {(getAllFood?.table_menu_list || []).map((obj, index) => {
                    return (
                      <Tab
                        label={
                          <Typography variant="body2">
                            {obj?.menu_category}
                          </Typography>
                        }
                        {...a11yProps(index)}
                        key={index}
                      />
                    );
                  })}
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeTab}
                onChangeIndex={handleChangeIndex}
                style={{ overflow: "hidden" }}
              >
                {(getAllFood?.table_menu_list || []).map((obj, index) => {
                  return (
                    <TabPanelStyle
                      value={activeTab}
                      index={index}
                      dir={theme.direction}
                      key={index}
                    >
                      <Grid container spacing={3}>
                        {obj?.category_dishes.map((sub, subIndex) => {
                          return (
                            <Grid item xs={12} key={subIndex}>
                              <FoodCard
                                data={sub}
                                position={subIndex}
                                activeTab={activeTab}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    </TabPanelStyle>
                  );
                })}
              </SwipeableViews>
            </Grid>
          </Grid>
        </Box>
      </Loader>
    </Container>
  );
};

export default FoodList;

const TabPanelStyle = styled(TabPanel)({
  padding: 0,
  "& div.MuiBox-root:first-child": {
    padding: 0,
  },
});
