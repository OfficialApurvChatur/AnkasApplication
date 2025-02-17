import React from "react";
import AboutSectionComponent from "./component/aAboutSectionComponent";
import ServiceSectionComponent from "./component/bServiceSectionComponent";

function AboutAndServiceSectionComponent({ Redux }) {
  return (
    <React.Fragment>
      <AboutSectionComponent Redux={Redux} />
      <ServiceSectionComponent Redux={Redux} />
    </React.Fragment>
  );
}

export default AboutAndServiceSectionComponent;
