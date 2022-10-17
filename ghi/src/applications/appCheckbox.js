import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export default function AppCheckbox() {
  const [state, setState] = React.useState({
    children: false,
    dogs: false,
    cats: false,
    preApproval: false,
    terms: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const { children, dogs, cats, preApproval, terms } = state;
  const error = [preApproval, terms].filter((v) => v).length !== 2;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        <FormLabel component='legend'>Please select all that apply</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={dogs} onChange={handleChange} name='dogs' />
            }
            label='Dogs'
          />
          <FormControlLabel
            control={
              <Checkbox checked={cats} onChange={handleChange} name='cats' />
            }
            label='Cats'
          />
        </FormGroup>
      </FormControl>
      <FormControl sx={{ m: 3 }} component='fieldset' variant='standard'>
        <FormLabel component='legend'>
          <br></br>
          <br></br>
        </FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={children}
                onChange={handleChange}
                name='children'
              />
            }
            label='Children'
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={preApproval}
                onChange={handleChange}
                name='preApproval'
              />
            }
            label='Pre-Approval?'
          />
        </FormGroup>
      </FormControl>
      <FormControl
        required
        error={error}
        component='fieldset'
        sx={{ m: 3 }}
        variant='standard'
      >
        <FormLabel>Required</FormLabel>
        <br></br>
        <FormControlLabel
          control={
            <Checkbox checked={terms} onChange={handleChange} name='terms' />
          }
          label='Terms and Conditions'
        />
      </FormControl>
    </Box>
  );
}
