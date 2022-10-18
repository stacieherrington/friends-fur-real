import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import SmokeFreeSharpIcon from "@mui/icons-material/SmokeFreeSharp";
import SmokingRoomsSharpIcon from "@mui/icons-material/SmokingRoomsSharp";
import DoneOutlineSharpIcon from "@mui/icons-material/DoneOutlineSharp";

export default function AppCheckbox() {
  const [checkboxValues, setCheckboxValues] = React.useState({
    has_small_children: false,
    has_dogs: false,
    has_cats: false,
    wants_prepproval: false,
    agrees_to_terms: false,
    residence_owned: false,
    smoker: true,
  });

  const handleChange = (event) => {
    setCheckboxValues({
      ...checkboxValues,
      [event.target.name]: event.target.checked,
    });
  };
  const {
    has_small_children,
    smoker,
    has_dogs,
    has_cats,
    wants_prepproval,
    agrees_to_terms,
    residence_owned,
  } = checkboxValues;

  const error = [wants_prepproval, agrees_to_terms].filter((v) => v).length < 1;

  return (
    <>
      <Box sx={{ display: "flex", m: 3 }}>
        <FormControl component='fieldset' variant='standard'>
          <FormLabel component='legend'>Select all that apply:</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={has_dogs}
                  onChange={handleChange}
                  name='has_dogs'
                />
              }
              label='Own dogs'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={has_cats}
                  onChange={handleChange}
                  name='has_cats'
                />
              }
              label='Own cats'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={smoker}
                  onChange={handleChange}
                  name='smoker'
                  checkedIcon={<SmokingRoomsSharpIcon color='error' />}
                  icon={<SmokeFreeSharpIcon color='success' />}
                />
              }
              label='Smoker'
            />
          </FormGroup>
        </FormControl>
        <FormControl component='fieldset' variant='standard'>
          <FormLabel component='legend'>
            <br></br>
          </FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={has_small_children}
                  onChange={handleChange}
                  name='has_small_children'
                />
              }
              label='Have small children'
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={residence_owned}
                  onChange={handleChange}
                  name='residence_owned'
                />
              }
              label='Residence Owned'
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={wants_prepproval}
                  onChange={handleChange}
                  name='wants_prepproval'
                />
              }
              label='Pre-Approval?'
            />
          </FormGroup>
        </FormControl>
      </Box>
      <Box sx={{ m: 3 }}>
        <FormControl
          required
          error={error}
          component='fieldset'
          variant='standard'
        >
          <FormLabel>Required*</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checkedIcon={<DoneOutlineSharpIcon color='success' />}
                checked={agrees_to_terms}
                onChange={handleChange}
                name='agrees_to_terms'
              />
            }
            label='I have read and accept the Terms and Conditions* *'
          />
        </FormControl>
      </Box>
    </>
  );
}
