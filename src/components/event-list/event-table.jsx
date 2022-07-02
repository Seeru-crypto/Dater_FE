import React, { memo, useRef, useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { motion } from 'framer-motion';
import { Toolbar } from 'primereact/toolbar';
import { Toast } from 'primereact/toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { MultiSelect } from 'primereact/multiselect';
import styled from 'styled-components';
import { EventDetails } from '../../views/event-list/event-details';
import '../../static/css-files/table.css';
import { useAppDispatch } from '../../store';
import { deleteEvents, getEvents } from '../../slicers/eventSlice';
import { errorNotification, positiveNotification } from '../../utils/notifications';
import config from '../../config.json';
import { eventList } from '../../static/animations/motion';
import { customStyle } from './event-list-style';
import { renderBooleanValues, shortDateFormat, shortReminderDateFormat } from '../../utils/helper-functions';

function EventTable(props) {
  const { data: events } = props;
  const dispatch = useAppDispatch();
  const [selectedEvent, setselectedEvent] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [globalFilter, setGlobalFilter] = useState('');
  const ref = useRef(null);
  const labels = config.LABELS;
  const toast = useRef(null);

  const columns = [
    { field: 'name', header: 'Event', style: customStyle, sortable: true },
    { field: 'date', header: 'Date', sortable: true, dataType: 'date', body: shortDateFormat, style: customStyle },
    { field: 'description', header: 'Description', sortable: true, dataType: 'date', style: customStyle },
    { field: 'reminder', header: 'Reminder', sortable: true, style: customStyle, body: renderBooleanValues },
    { field: 'reminderDays', header: 'Number of days', sortable: true, style: customStyle },
    { field: 'dateNextReminder', header: 'date of reminder', sortable: true, dataType: 'date', body: shortReminderDateFormat, style: customStyle },
  ];
  const [selectedColumns, setSelectedColumns] = useState(columns);

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

  const onColumnsToggle = (event) => {
    const selectedColumn = event.value;
    const orderedSelectedColumns = columns.filter((col) => selectedColumn.some((sCol) => sCol.field === col.field));
    setSelectedColumns(orderedSelectedColumns);
  };

  const renderedColumns = selectedColumns.map((col) => {
    return (
      <Column
        key={col.field}
        style={col.style}
        dataType={col.dataType}
        field={col.field}
        header={col.header}
        sortable={col.sortable}
        body={col.body}
      />
    );
  });

  const leftToolbar = () => {
    return (
      <>
        <Button
          label="Delete"
          icon="pi pi-trash"
          onClick={() => deleteConfirmationDialog()}
          className="p-button-danger"
          disabled={selectedEvents.length === 0}
        />
        <MultiSelect
          className="column-selector"
          selectedItemsLabel={columns.label}
          value={selectedColumns}
          appendTo="self"
          options={columns}
          optionLabel="header"
          onChange={onColumnsToggle}
        />
      </>
    );
  };

  const rightToolbar = () => {
    return (
      <div className="header-search">
        <Button
          disabled={events.length === 0}
          className="p-button-outlined p-button-secondary"
          type="button"
          label="export"
          onClick={() => ref.current.exportCSV()}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            disabled={events.length === 0}
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };

  const rowClass = () => {
    return {
      'event-row-ui': true,
    };
  };

  return (
    <motion.div initial={eventList.initial} animate={eventList.animate} transition={eventList.transition}>
      <Toast ref={toast} />
      <ToolbarStyles style={customStyle} left={leftToolbar} right={rightToolbar} />
      <DataTable
        sortField="name"
        sortOrder={1}
        responsiveLayout="scroll"
        size="small"
        selection={selectedEvents}
        onSelectionChange={(e) => setSelectedEvents(e.value)}
        paginator
        ref={ref}
        value={events}
        globalFilter={globalFilter}
        emptyMessage="No events found"
        paginatorClassName="ui-paginator"
        rowClassName={rowClass}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
        rows={10}
        rowsPerPageOptions={[10, 20, 50]}
      >
        <Column className="table-selector" style={customStyle} selectionMode="multiple" exportable={false} />
        {renderedColumns}
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

const ToolbarStyles = styled(Toolbar)`
  // class ToolbarStyles extends Toolbar
  @media (max-width: 425px) {
    .someDropDown {
      max-widht: 80%;
    }

    .p-toolbar-group-left,
    .p-toolbar-group-right {
      flex-flow: column wrap;
    }

    .p-toolbar-group-left {
      margin-bottom: 1.5rem;
    }
  }
`;
