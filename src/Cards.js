import React, { Fragment } from "react";
import { EuiCard, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import Card from "./Card";

function Cards({ cards }) {
  return cards.map((card) => (
    <EuiFlexGroup gutterSize="s">
      <Card card={card} />
    </EuiFlexGroup>
  ));
}

export default Cards;
