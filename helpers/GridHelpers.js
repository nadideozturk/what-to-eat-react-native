import React from 'react';
import { Col, Row } from 'react-native-easy-grid';

const COLUMNS = 2;

export const itemsToGridArray = (items) => {
  if (items.length === 0) {
    return null;
  }

  let gridArray = [[]];

  let countColumns = 1;
  for (var i = 0; i < items.length; i++) {
    gridArray[gridArray.length - 1].push(items[i]);
    if (countColumns <= COLUMNS) {
      countColumns++;
    }
    if (countColumns > COLUMNS && i !== items.length - 1) {
      countColumns = 1;
      gridArray.push([]);
    }
  }

  return gridArray;
}

export const renderGrid = (gridArray) => {
  return gridArray.map(row => (
    <Row key={`row_${row[0].key}`}>
      {
        row.map(col => (
          <Col key={`col_${col.key}`}>
            {col}
          </Col>
        ))
      }
    </Row>
  ));
}
