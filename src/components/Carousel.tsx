import React from "react";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core";
// import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface Item {
  img: string;
  title: string;
}
interface Props {
  items: Array<Item>;
}
const ImagesCarousel: React.FC<Props> = ({ items }) => {
  const useStyles = makeStyles({
    header: {
      fontSize: "32px",
      textAlign: "center",
      lineHeight: "55px",
      fontWeight: 900,
      width: "420px",
      padding: "0 15px",
    },
    img: {
      width: "400px",
      padding: "0 15px",
    },
  });
  const classes = useStyles();
  return (
    <Carousel
      autoPlay
      animation="fade"
      swipe
      fullHeightHover
      IndicatorIcon={<FiberManualRecordIcon />}
    >
      {items.map((item, i) => (
        <div key={i}>
          <img className={classes.img} src={item.img} alt="img" />

          <p className={classes.header}>{item.title}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default ImagesCarousel;
