import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

export default function Table({ data }: any) {
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    "Org Name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "Oppor Name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    Location: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "Date of Event": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    // OpporType: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    "What is the suggested age group?": {
      value: null,
      matchMode: FilterMatchMode.STARTS_WITH,
    },
  });

  type RowData = {
    ID: number;
    "Org Name": string;
    "Oppor Name": string;
    Location: string;
    "Opportunity Type": string;
    " What is the suggested age group?": string;
    "City, State": string;
    "Zip Code": string;
    "Industry Tags": string;
    Email: string;
    "First Name": string;
    "Last Name": string;
    "Date of Event": Date;
    "Time of Event": Date;
    "Detailed description of the event": string;
    Link: string;
    // Add other properties if necessary
  };

  const [contactInfo, setContactInfo] = useState();
  const [rowData, setRowData] = useState<RowData>();
  const [contactVisible, setContactVisible] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);
  const [moreInfoVisible, setMoreInfoVisible] = useState(false);

  return (
    <div>
      <DataTable
        value={data}
        className="table-auto"
        filters={filters}
        rowHover
        filterDisplay="row"
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50, 100]}
      >
        <Column field="ID" header="ID" className="border px-4 py-2"></Column>
        <Column
          field="Org Name"
          header="Organizer"
          filter
          filterPlaceholder="Enter Keyword"
          className="border px-4 py-2"
        ></Column>
        <Column
          field="Oppor Name"
          header="Opportunity Name"
          filter
          filterPlaceholder="Enter Keyword"
          body={(rowData) => (
            <div
              onClick={() => {
                setRowData(rowData);
                setContactVisible(true);
              }}
            >
              <div className="flex flex-row justify-between items-center">
                {rowData["Oppor Name"]}
                <FaPlusCircle color="#511660" />
              </div>
            </div>
          )}
          className="border px-4 py-2 hover:cursor-pointer pb-5"
        ></Column>
        <Column
          field="Location"
          header="Location"
          filter
          filterPlaceholder="Enter Keyword"
          body={(rowData) => (
            <div
              onClick={() => {
                if (rowData.Location !== "" && rowData["City, State"] !== "") {
                  setRowData(rowData);
                  setLocationVisible(true);
                }
              }}
            >
              <div className="flex flex-row justify-between items-center">
                {rowData.Location !== ""
                  ? rowData.Location
                  : rowData["City, State"] !== ""
                  ? rowData["City, State"]
                  : "Online"}
                {rowData.Location !== "" && rowData["City, State"] !== "" ? (
                  <FaPlusCircle color="#511660" />
                ) : (
                  <TbWorld color="#0da3d1" />
                )}
              </div>
            </div>
          )}
          className="border px-4 py-2 hover:cursor-pointer pb-5"
        ></Column>
        <Column
          field="Date of Event"
          header="Date / Time"
          body={(rowData) => (
            <div>{`${new Date(
              rowData["Date of Event"]
            ).toLocaleDateString()} ${new Date(
              rowData["Time of Event"]
            ).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}`}</div>
          )}
          filter
          filterPlaceholder="Enter Keyword"
          className="border px-4 py-2"
        ></Column>
        <Column
          field="Opportunity Type"
          header="More Info"
          // filter
          // filterPlaceholder="Enter Keyword"
          body={(rowData) => (
            <div
              onClick={() => {
                console.log(rowData);
                setRowData(rowData);
                setMoreInfoVisible(true);
              }}
            >
              <p className="text-blue-700 font-semibold">More Info</p>
            </div>
          )}
          className="border px-4 py-2 hover:cursor-pointer pb-5"
        ></Column>
        <Column
          field="What is the suggested age group?"
          header="Age Group"
          filter
          filterPlaceholder="Enter Keyword"
          className="border px-4 py-2"
        ></Column>
      </DataTable>

      {/* Contact Information Dialog */}
      <Dialog
        header={() => {
          return (
            <div>
              <p className="text-xs ">{`${
                rowData ? rowData["Org Name"] : ""
              } : ${rowData ? rowData["Oppor Name"] : ""}`}</p>
              <p>Contact Information</p>
            </div>
          );
        }}
        visible={contactVisible}
        style={{ width: "50vw" }}
        onHide={() => setContactVisible(false)}
      >
        <p className="py-2">
          Contact Name :{" "}
          <b>{`${rowData ? rowData["First Name"] : ""} ${
            rowData ? rowData["Last Name"] : ""
          }`}</b>
        </p>
        <p>
          Contact Email : <b>{`${rowData?.Email}`}</b>
        </p>
      </Dialog>
      {/* Contact Information Dialog */}

      {/* Location Information Dialog */}
      <Dialog
        header={() => {
          return (
            <div>
              <p className="text-xs ">{`${
                rowData ? rowData["Org Name"] : ""
              } : ${rowData ? rowData["Oppor Name"] : ""}`}</p>
              <p>Address</p>
            </div>
          );
        }}
        visible={locationVisible}
        style={{ width: "50vw" }}
        onHide={() => setLocationVisible(false)}
      >
        <p>{`${rowData?.Location},`}</p>
        <p>{`${rowData ? rowData["City, State"] : ""},`}</p>
        <p>{`${rowData ? rowData["Zip Code"] : ""} `}</p>
      </Dialog>
      {/* Location Information Dialog */}

      {/* More Information Dialog */}
      <Dialog
        header={() => {
          return (
            <div>
              <p className="text-xs ">{`${
                rowData ? rowData["Org Name"] : ""
              } : ${rowData ? ["Oppor Name"] : ""}`}</p>
              <div className="flex flex-col gap-2">
                <p>Description</p>
                <p className="text-sm font-semibold">
                  {rowData ? rowData["Detailed description of the event"] : ""}
                </p>
                <p>
                  <a className="text-sm font-medium text-blue-900" href={rowData?rowData["Link"]:""}>
                    Link to More Info
                  </a>
                </p>
              </div>
            </div>
          );
        }}
        visible={moreInfoVisible}
        style={{ width: "50vw" }}
        onHide={() => setMoreInfoVisible(false)}
      >
        {/* <p>{`${rowData?.Location},`}</p> */}

        <p></p>

        <p>
          Opportunity Type :{" "}
          <b>{`${rowData ? rowData["Opportunity Type"] : ""}`}</b>
        </p>
        <p>
          Industry Tags : <b>{`${rowData ? rowData["Industry Tags"] : ""}`}</b>
        </p>
      </Dialog>
      {/* More Information Dialog */}
    </div>
  );
}
