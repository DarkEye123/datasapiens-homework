import 'date-fns';
import React, { FC } from 'react';
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
  category: string;
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
        let verificationNeeded = typeof data.category === 'string';
        let category = verificationNeeded
          ? ((data.category as unknown) as string)
          : String(data.category!.id);

        const existingCategory = categories.find((c) => c.name === category);
        const isReallyNew = verificationNeeded && !existingCategory;

        let id = category;
        if (existingCategory) {
          id = String(existingCategory?.id);
        }

        setSubmitting(false);
        onConfirm({
          category: isReallyNew ? category : id,
          createRequested: isReallyNew,
        });
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
