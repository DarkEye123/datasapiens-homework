import 'date-fns';
import React, { FC, useState } from 'react';
import {
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import { Actions } from './styles';
import { Category } from '../../types/budget';
import CreatableInput from '../CreatableInput';
import SelectCreateCategoryFeature, {
  SelectCreateCategoryFeatureProps as FeatureProps,
} from '../../features/cashflow/SelectCreateCategory';

type FormProps = {
  categories: Category[];
  defaultCategory: Category | null;
  onConfirm: (arg: CallbackProps) => void;
};

export interface CallbackProps {
  category: Category | string;
  createRequested: boolean;
}

const SelectCreateCategory: FC<FormProps & FeatureProps> = ({
  onConfirm,
  categories,
  defaultCategory,
  loading,
}) => {
  const theme = useTheme();
  const isBigScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Formik
      initialValues={{
        category: defaultCategory,
      }}
      onSubmit={(data, { setSubmitting }) => {
        let category = data.category;
        setSubmitting(false);
        if (typeof data.category === 'string') {
          onConfirm({
            category: data.category as string,
            createRequested: true,
          });
        } else {
          onConfirm({
            category: category as Category,
            createRequested: false,
          });
        }
      }}
      validate={(val) => {
        const errors: Record<string, string> = {};
        if (!val.category) {
          errors.category = 'Required';
        }
        return errors;
      }}
    >
      {({ submitForm, handleReset, isValid, dirty }) => (
        <>
          <Grid
            container
            component={Form}
            spacing={isBigScreen ? 1 : 6}
            direction={isBigScreen ? 'row' : 'column'}
            justify="center"
            alignContent="center"
          >
            <Grid item xs={12} sm="auto">
              <Field
                component={CreatableInput}
                id="category"
                name="category"
                label="Category"
                data={categories}
                defaultValue={defaultCategory}
              ></Field>
            </Grid>
          </Grid>
          <Actions>
            <Button onClick={handleReset} color="primary">
              Reset
            </Button>
            <Button
              onClick={submitForm}
              variant="contained"
              color="primary"
              disabled={loading || (!dirty && !defaultCategory) || !isValid}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Finish
            </Button>
          </Actions>
        </>
      )}
    </Formik>
  );
};

export { SelectCreateCategory };
export default SelectCreateCategoryFeature(SelectCreateCategory);
