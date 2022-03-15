import React, { memo, useEffect, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { motion } from 'framer-motion';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { EventDetails } from '../../views/event-list/event-details';
import '../../static/css-files/table.css';
import { useAppDispatch } from '../../store';
import { deleteEvents, getEvents } from '../../slicers/eventSlice';
import { errorNotification, positiveNotification } from '../../utils/notifications';
import config from '../../config.json';
import { eventList } from '../../static/animations/motion';
import { customStyle } from './event-list-style';

function EventTable(props) {
  const { dataTest, data } = props;
  const dispatch = useAppDispatch();
  const [eventData, setEventData] = useState(data);
  const [selectedEvent, setselectedEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const ref = useRef(null);
  const labels = config.LABELS;
  const toast = useRef(null);

  useEffect(() => {
    setEventData(data);
  }, [props]);

  const renderBooleanValues = (rowData, item) => (rowData[item.field] ? 'True' : 'False');

  const rowActions = (rowData) => {
    return <Button icon="pi pi-pencil" className="p-button-rounded p-button-secondary p-mr-2" onClick={() => editProduct(rowData)} />;
  };

  const editProduct = (product) => {
    setselectedEvent(product);
    setShowModal(true);
  };

  const deleteConfirmationDialog = () => {
    confirmDialog({
      message: 'Do you want to delete selected events?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => deleteSelectedEvents(),
    });
  };

  const deleteSelectedEvents = async () => {
    const eventIds = selectedEvents.map((e) => e.id);
    const res = await dispatch(deleteEvents(eventIds));
    if (res.meta.requestStatus === 'fulfilled') {
      positiveNotification(toast, labels.TOAST_EVENTS_DELETE_SUCCESS, '');
      dispatch(getEvents());
      setSelectedEvents([]);
    } else errorNotification(toast, labels.DEFAULT_ERR_MSG);
  };

  const leftToolbar = () => {
    return (
      <Button
        label="Delete"
        icon="pi pi-trash"
        onClick={() => deleteConfirmationDialog()}
        className="p-button-danger"
        disabled={selectedEvents.length === 0}
      />
    );
  };

  const rightToolbar = () => {
    return (
      <div className="header-search">
        <Button
          disabled={eventData.length === 0}
          className="p-button-outlined p-button-secondary"
          type="button"
          label="export"
          onClick={() => ref.current.exportCSV()}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            disabled={eventData.length === 0}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  return (
    <motion.div initial={eventList.initial} animate={eventList.animate} transition={eventList.transition}>
      <Toast ref={toast} />
      <Toolbar style={customStyle} left={leftToolbar} right={rightToolbar} />
      <DataTable
        sortField="name"
        sortOrder={1}
        responsiveLayout="scroll"
        selection={selectedEvents}
        onSelectionChange={(e) => setSelectedEvents(e.value)}
        paginator
        ref={ref}
        value={eventData}
        globalFilter={globalFilter}
        emptyMessage="No events found"
        paginatorClassName="ui-paginator"
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column className="table-selector" style={customStyle} selectionMode="multiple" exportable={false} />
        <Column field="name" sortable header="Event" style={customStyle} />
        <Column field="formattedDate" sortable header="Date" style={customStyle} />
        <Column sortable field="reminder" body={renderBooleanValues} header="Reminder" style={customStyle} />
        <Column field="reminderDays" sortable header="Number of days" style={customStyle} />
        <Column field="description" sortable header="Description" style={customStyle} />
        <Column field="formattedReminderDate" sortable header="date of reminder" style={customStyle} />
        <Column body={rowActions} header="Edit" style={customStyle} />
      </DataTable>
      {selectedEvent && (
        <div>
          <EventDetails
            selectedEvent={selectedEvent}
            hideModal={() => {
              setShowModal(false);
              setselectedEvent('');
            }}
            modalState={showModal}
          />
        </div>
      )}
    </motion.div>
  );
}
export default memo(EventTable);
