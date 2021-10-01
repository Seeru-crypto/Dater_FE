import React from 'react';
import data from "../static/data.json"

import DataTableFilterDemo from './filter-table';

const ViewPeople = () => {
  const people = data[0].users;
  console.log(people);
  return(
    <div>
      <DataTableFilterDemo />
    </div>
  )
}
export default ViewPeople;