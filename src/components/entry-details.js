import React, { useEffect } from "react";

import { Dialog } from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import { InputNumber } from "primereact/inputnumber";

const EntryDetails = (props) => {
  let { entryName } = props;
  let { date } = props;
  let { reminderInDays } = props;
  let { reminder } = props;

  useEffect(() => {
    console.log(entryName);
    console.log(date);
    console.log(reminderInDays);
    console.log(reminder);
  });

  return (
    <div>
      <Dialog
        //visible={productDialog}
        style={{ width: "450px" }}
        header="Product Details"
        modal
        className="p-fluid"
        //onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="name">Entry name</label>
        </div>

        <div className="p-formgrid p-grid">
          <div className="p-field p-col">
            <label htmlFor="price">Price</label>
            <InputNumber
              id="reminderInDays"
              value={reminderInDays}
              onValueChange={(e) => (reminderInDays = e.value)}
            />
          </div>
          <div className="p-field p-col">
            <label htmlFor="quantity">Quantity</label>
            <InputSwitch onValueChange={(e) => (reminder = e.value)} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};
export default EntryDetails;
