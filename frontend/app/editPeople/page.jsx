"use client";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import DatePicker from "react-datepicker";
import moment from "moment";
import Link from "next/link";
import FormLabel from "@mui/material/FormLabel";


import "react-datepicker/dist/react-datepicker.css";
import { getEmployeeById, updateEmployee } from "@/api/employeeAPI";

const ModelBackground = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBody = styled.div`
  background-color: #fefefe;
  margin: 10px auto;
  border: 1px solid #888;
  width: 50%;
  height: 90vh;
`;

const gender = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Female",
  },
];

const employeeType = [
  {
    value: "Full Time",
    label: "Full Time",
  },
  {
    value: "Part Time",
    label: "Part Time",
  },
  {
    value: "Contract",
    label: "Contract",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const experience = [
  {
    value: "1 Year",
    label: "1 Year",
  },
  {
    value: "2 Year",
    label: "2 Year",
  },
  {
    value: "3 Year",
    label: "3 Year",
  },
  {
    value: "4 Year",
    label: "4 Year",
  },
  {
    value: "5 Year",
    label: "5 Year",
  },
];
import { useRouter } from "next/navigation";


const editPeople = (data) => {

  const [employee, setEmployee] = useState({});

  useEffect(() => {
    getEmployeeById(data.searchParams.data)
      .then((res) => {
        setEmployee(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [startDate, setStartDate] = useState(new Date());
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    await updateEmployee(data.searchParams.data, employee);
    router.push('http://localhost:3000/people')
  };

  return (
    <>
      <ModelBackground>
        <ModalBody onClick={(e) => e.stopPropagation()}>
          <h1 style={{ paddingLeft: "30px" }}>Add People</h1>
          <Grid
            paddingLeft={4}
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 1, md: 1 }}
          >
            <Grid item xs={6} md={6}>
              <FormLabel component="legend">Full Name</FormLabel>
              <TextField
                id="filled-basic"
                variant="filled"
                value={employee.fullName}
                onChange={(e) =>
                  setEmployee({ ...employee, fullName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Name With Initials</FormLabel>
              <TextField
                id="filled-basic"
                variant="filled"
                value={employee.nameWithInitials}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    nameWithInitials: e.target.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Display Name</FormLabel>
              <TextField
                id="filled-basic"
                variant="filled"
                value={employee.displayName}
                onChange={(e) =>
                  setEmployee({ ...employee, displayName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Gender</FormLabel>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue="None"
                value={employee.gender}
                onChange={(e) =>
                  setEmployee({ ...employee, gender: e.target.value })
                }
              >
                <MenuItem selected disabled value="None">
                  <em>{employee.gender}</em>
                </MenuItem>
                {gender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <label>Date of Birth</label>
              <DatePicker
                selected={startDate}
                onChange={(date) =>
                  setEmployee({ ...employee, DOB: date.toISOString() })
                }
                maxDate={moment().toDate()}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Email</FormLabel>
              <TextField
                id="filled-basic"
                variant="filled"
                value={employee.email}
                onChange={(e) =>
                  setEmployee({ ...employee, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Mobile Number</FormLabel>
              <TextField
                id="filled-basic"
                type="number"
                variant="filled"
                value={employee.mobileNumber}
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    mobileNumber: Number(e.target.value),
                  })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Designation</FormLabel>
              <TextField
                id="filled-basic"
                variant="filled"
                value={employee.designation}
                onChange={(e) =>
                  setEmployee({ ...employee, designation: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Employee Type</FormLabel>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue="None"
                value={employee.employeeType}
                onChange={(e) =>
                  setEmployee({ ...employee, employeeType: e.target.value })
                }
              >
                <MenuItem selected disabled value="None">
                  <em>{employee.employeeType}</em>
                </MenuItem>
                {employeeType.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <label>Joined Date</label>
              <DatePicker
                selected={startDate}
                onChange={(date) =>
                  setEmployee({ ...employee, joinDate: date.toISOString() })
                }
                maxDate={moment().toDate()}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Experience</FormLabel>
              <TextField
                id="outlined-select-currency"
                select
                defaultValue="None"
                value={employee.experience}
                onChange={(e) =>
                  setEmployee({ ...employee, experience: e.target.value })
                }
              >
                <MenuItem selected disabled value="None">
                  <em>{employee.experience}</em>
                </MenuItem>
                {experience.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Salary</FormLabel>
              <TextField
                id="filled-basic"
                type="number"
                variant="filled"
                value={employee.salary}
                onChange={(e) =>
                  setEmployee({ ...employee, salary: Number(e.target.value) })
                }
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel component="legend">Note</FormLabel>
              <TextField
                id="standard-multiline-static"
                value={employee.note}
                multiline
                rows={4}
                variant="standard"
                onChange={(e) =>
                  setEmployee({ ...employee, note: e.target.value })
                }
              />
            </Grid>
          </Grid>
          <Stack
            direction="row-reverse"
            justifyContent="right"
            paddingRight={2}
            spacing={2}
          >
            <Button variant="contained" color="success" onClick={onSubmit}>
              Update People
            </Button>
            <Link href="http://localhost:3000/people">
              <Button variant="outlined" color="error">
                Cancel
              </Button>
            </Link>
          </Stack>
        </ModalBody>
      </ModelBackground>
    </>
  );
};

export default editPeople;
