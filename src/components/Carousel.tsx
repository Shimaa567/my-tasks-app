import React from "react";
import Carousel from "react-material-ui-carousel";
import { useMediaQuery, makeStyles } from "@material-ui/core";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface Item {
  img: string;
  title: string;
}
interface Props {
  items: Array<Item>;
}

const ImagesCarousel: React.FC<Props> = ({ items }) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down("sm"));

  const useStyles = makeStyles({
    header: {
      fontSize: "32px",
      textAlign: "center",
      lineHeight: "55px",
      fontWeight: 900,
      padding: "0 15px",
    },
    img: {
      padding: "0 15px",
    },
    itemWrapper: {
      minHeight: "370px !important",
      maxHeight: "420px !important",
    },
  });
  const classes = useStyles();
  return (
    <Carousel
      autoPlay
      stopAutoPlayOnHover
      animation="fade"
      swipe
      navButtonsAlwaysInvisible
      IndicatorIcon={<FiberManualRecordIcon />}
      indicatorIconButtonProps={{
        style: {
          color: "#828282",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          opacity: "0.15",
        },
      }}
      interval={2000}
    >
      {items.map((item, i) => (
        <div key={i} className={classes.itemWrapper}>
          {isMobile ? (
            <div>
              <img src={item.img} alt="" />
              <p className={classes.header} style={{ fontSize: "20px" }}>
                {item.title}
              </p>
            </div>
          ) : (
            <>
              <img className={classes.img} src={item.img} alt="" />
              <p className={classes.header}>{item.title}</p>
            </>
          )}
        </div>
      ))}
    </Carousel>
  );
};

export default ImagesCarousel;
