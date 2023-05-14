"use client";

import AddForm from "@/components/AddForm";
import React, { useEffect, useState } from "react";
import { getEmployees } from "../../api/employeeAPI";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "displayName", headerName: "Display Name", flex: 1 },
  {
    field: "employeeId",
    headerName: "Emp ID",
    type: "number",
    flex: 1,
    type: "number",
  },
  { field: "designation", headerName: "Designation", flex: 1 },
  {
    field: "employeeType",
    headerName: "Emp. Type",
    flex: 1,
  },
  {
    field: "experience",
    headerName: "Experience",
    flex: 1
  },
];

const people = () => {
  const [page, setPage] = useState(1);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees(page)
      .then((employees) => {
        setEmployees(employees);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const rows = employees.map(({ _id, ...rest}) => rest);

  console.log(rows);

  return (
    <div>
      <AddForm />
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        sx={{margin: 10}}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.employeeId}
        initialState={{
          pagination: {
            paginationModel: { page: 1, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
      />
    </div>
    </div>
  );
};

export default people;
