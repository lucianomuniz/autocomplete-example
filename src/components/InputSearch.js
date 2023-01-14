import { useMemo, useState } from 'react';
import { InputAdornment, TextField, IconButton } from '@mui/material';
import debounce from 'lodash.debounce';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const InputSearch = ({ placeholder, onChange, enableClear = false }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    debouncedInputHandler(e.target.value);
  };

  const handleClearText = () => {
    setSearchInput('');
    debouncedInputHandler('');
  };

  const debouncedInputHandler = useMemo(
    () =>
      debounce((input) => {
        onChange(input);
      }, 300),
    []
  );

  return (
    <TextField
      size='small'
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment:
          enableClear && searchInput ? (
            <IconButton
              aria-label='clear search input text'
              size='small'
              onClick={handleClearText}
            >
              <ClearIcon />
            </IconButton>
          ) : undefined,
      }}
      value={searchInput}
      onChange={handleInputChange}
    />
  );
};

export default InputSearch;
