import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import {useSelector} from 'react-redux'
import { useListRescuesQuery} from '../store/api'




function SearchBar() {
  const search = useSelector((state) => state.search);
  const {data, error, isLoading } = useListRescuesQuery(search)
  if (isLoading) {
    return <div> Loading...</div>
  }
  if ('message' in data){
    return <div>Hello</div>
  }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%' }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        inputProps={{ 'aria-label': 'search' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchBar;