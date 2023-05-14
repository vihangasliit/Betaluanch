"use client";

import React, { useEffect, useState } from "react";
import {
  getEmployees,
  getEmployeesByFilter,
  deleteEmployees,
} from "../../api/employeeAPI";
import { DataGrid } from "@mui/x-data-grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button, FormControl, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    flex: 1,
  },
];

const people = () => {
  const [employees, setEmployees] = useState([]);
  const [category, setCategory] = useState("");
  const [selectemployees, setSelectEmployees] = useState({});
  const router = useRouter();
  useEffect(() => {
    getEmployees()
      .then((employees) => {
        setEmployees(employees);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [employees]);

  const handleChange = async (event) => {
    const employeeType = event.target.value;
    setCategory(employeeType);
    await getEmployeesByFilter(employeeType)
      .then((employees) => {
        setEmployees(employees);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const employeeId = selectemployees.row._id;
    await deleteEmployees(employeeId)
      .then((employees) => {})
      .catch((error) => {
        console.error(error);
      });
  };

  function isObjectNotEmpty(obj) {
    return Object.keys(obj).length !== 0;
  }

  const rows = employees;

  return (
    <div>
      <Link href="http://localhost:3000/addPeople">
        <Button
          sx={{ display: "flex", justifyContent: "flex-start" }}
          variant="contained"
          color="success"
        >
          Add People
        </Button>
      </Link>
      <FormControl style={{ minWidth: 200, marginTop: 20 }}>
        <InputLabel id="demo-simple-select-label">Employee Types</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Employee Types"
          onChange={handleChange}
        >
          <MenuItem value="Full Time">Full Time</MenuItem>
          <MenuItem value="Part Time">Part Time</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </Select>
      </FormControl>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          sx={{ margin: 10 }}
          rows={rows}
          columns={columns}
          getRowId={(row) => row.employeeId}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          disableMultipleRowSelection={true}
          onRowClick={(row) => {
            setSelectEmployees(row);
          }}
        />
        <Stack
          direction="row-reverse"
          justifyContent="right"
          paddingRight={2}
          spacing={2}
        >
          <Link
            href={{
              pathname: "http://localhost:3000/editPeople",
              query: {
                data: selectemployees?.row?._id
              }
            }}
          >
            <Button
              variant="contained"
              color="success"
              disabled={!isObjectNotEmpty(selectemployees)}
            >
              Edit
            </Button>
          </Link>

          <Button
            variant="outlined"
            color="error"
            onClick={(e) => handleDelete(e)}
            disabled={!isObjectNotEmpty(selectemployees)}
          >
            Delete
          </Button>
        </Stack>
      </div>
    </div>
  );
};

export default people;
