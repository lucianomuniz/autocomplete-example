import { useEffect, useState } from 'react';
import { TextField, Typography, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

import { fetchData } from '../components/utils';

export default function AutocompleteSearch() {
  const [movies, setMovies] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const movies = await fetchData();
      setMovies(movies);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log({ movies }, { inputValue }, { options }, { value });
  }, [value, inputValue, options, movies]);

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    const fetchNewData = async (inputValue) => {
      const results = await fetchData(inputValue);
      console.log({ results });

      if (active) {
        let newOptions = [];
        if (value) {
          console.log({ value });
          newOptions = [value];
        }
        if (results) {
          console.log({ newOptions }, { results });
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    };

    fetchNewData(inputValue);

    return () => {
      active = false;
    };
  }, [value, inputValue]);

  return (
    <Autocomplete
      filterOptions={(x) => x}
      options={options}
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.title
      }
      freeSolo
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText='No results'
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Search'
          fullWidth
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems='center'>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}
              >
                <Typography variant='body2' color='text.secondary'>
                  {option.title}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
      sx={{ m: 2, width: 300 }}
      size='small'
      id='search-input'
    />
  );
}

// renderInput={(params) => {
//   console.log({ params });
//   return (
//     <TextField
//       {...params}
//       placeholder={'Search by name, email or phonenumber'}
//       InputProps={{
//         ...params.InputProps,
//         startAdornment: (
//           <InputAdornment position='start'>
//             <SearchIcon />
//           </InputAdornment>
//         ),
//         endAdornment: searchText ? (
//           <IconButton
//             aria-label='clear search input text'
//             size='small'
//             onClick={handleClearText}
//           >
//             <ClearIcon />
//           </IconButton>
//         ) : undefined,
//       }}
//     />
//   );
// }}
