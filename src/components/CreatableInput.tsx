/* eslint-disable no-use-before-define */
import React, { useMemo } from 'react';
import { useField } from 'formik';
import { TextField, TextFieldProps } from 'formik-material-ui';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';

type Props<T extends DataShape> = {
  data: T[];
  defaultValue?: T;
};

interface DataShape {
  name: string;
}

export default function CreatableInput<T extends DataShape>({
  data,
  defaultValue,
  ...other
}: Props<T> & TextFieldProps) {
  const filter = useMemo(() => createFilterOptions<T>(), []);
  const [, , helpers] = useField<T>(other.field.name);

  return (
    <Autocomplete
      defaultValue={defaultValue || ({ name: '' } as T)}
      onInputChange={(_, value) =>
        helpers.setValue(data.find((v) => v.name === value)!)
      }
      filterOptions={(options, params) => {
        const filtered = filter(options, params) as T[];

        // Suggest the creation of a new value
        if (params.inputValue !== '') {
          filtered.push({
            inputValue: params.inputValue,
            name: params.inputValue,
          } as any);
        }

        return filtered;
      }}
      selectOnFocus
      openOnFocus
      clearOnBlur
      id="creatable-input"
      options={data}
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        return option.name;
      }}
      style={{ width: 300 }}
      freeSolo
      renderInput={(params) => {
        return <TextField {...params} variant="outlined" {...other} />;
      }}
    />
  );
}
