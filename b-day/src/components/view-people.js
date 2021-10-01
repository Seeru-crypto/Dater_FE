import React from 'react';
import data from "../static/data.json"

import FilterTable from './filter-table';

const ViewPeople = () => {
  const people = data[0].users;
  // console.log(people);
  return(
    <div>
      <FilterTable />
    </div>
  )
}
export default ViewPeople;