"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import { createEmployee } from "../api/employeeAPI";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

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

const AddForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    employeeId: "",
    nameWithInitials: "",
    displayName: "",
    gender: "None",
    DOB: new Date(),
    email: "",
    mobileNumber: "",
    designation: "",
    employeeType: "None",
    joinDate: "",
    experience: "None",
    salary: "",
    note: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    try {
      await createEmployee(formData);
      setFormData({
        fullName: "",
        employeeId: "",
        nameWithInitials: "",
        displayName: "",
        gender: "None",
        DOB: new Date(),
        email: "",
        mobileNumber: "",
        designation: "",
        employeeType: "None",
        joinDate: "",
        experience: "None",
        salary: "",
        note: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button sx={{ display: "flex", justifyContent: "flex-end" }} variant="contained" color="success" onClick={() => setShowModal(true)}>
        Add People
      </Button>
      {showModal && (
        <ModelBackground onClick={() => setShowModal(false)}>
          <ModalBody onClick={(e) => e.stopPropagation()}>
            <h1 style={{ paddingLeft: "30px" }}>Add People</h1>
            <Grid
              paddingLeft={4}
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 1, md: 1 }}
            >
              <Grid item xs={6} md={6}>
                <TextField
                  id="filled-basic"
                  label="Full Name"
                  variant="filled"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="Name with initials*"
                  variant="filled"
                  value={formData.nameWithInitials}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nameWithInitials: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="Preferred/Display Name"
                  variant="filled"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Gender"
                  defaultValue="None"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <MenuItem selected disabled value="None">
                    <em>None</em>
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
                    setFormData({ ...formData, DOB: date.toISOString() })
                  }
                  maxDate={moment().toDate()}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="Email"
                  variant="filled"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  type="number"
                  label="Mobile Number"
                  variant="filled"
                  value={formData.mobileNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobileNumber: Number(e.target.value),
                    })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  label="Designation"
                  variant="filled"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Employee Type"
                  defaultValue="None"
                  value={formData.employeeType}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeType: e.target.value })
                  }
                >
                  <MenuItem selected disabled value="None">
                    <em>None</em>
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
                    setFormData({ ...formData, joinDate: date.toISOString() })
                  }
                  maxDate={moment().toDate()}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Experience"
                  defaultValue="None"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                >
                  <MenuItem selected disabled value="None">
                    <em>None</em>
                  </MenuItem>
                  {experience.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="filled-basic"
                  type="number"
                  label="Salary"
                  variant="filled"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: Number(e.target.value) })
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="standard-multiline-static"
                  label="Personal Notes"
                  value={formData.note}
                  multiline
                  rows={4}
                  variant="standard"
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
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
                Add People
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </Stack>
          </ModalBody>
        </ModelBackground>
      )}
    </>
  );
};

export default AddForm;
