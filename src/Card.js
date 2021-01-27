import React from "react";
import { EuiCard, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_dark.css";

// Designing each Card
function Card({ card }) {
  const des =
    "The maximum temperature of today is: " +
    card.temperaturas.max +
    " degrees and minimum temperature is: " +
    card.temperaturas.min +
    " degrees. Humidity is: " +
    card.humedad +
    " and state of the sky is " +
    card.stateSky.description;
  return (
    <EuiFlexItem>
      <EuiCard
        key={card.municipio.ID_REL}
        layout="vertical"
        title={card.municipio.NOMBRE}
        description={des}
        onClick={() => window.alert("Card clicked")}
      />
    </EuiFlexItem>
  );
}

export default Card;
