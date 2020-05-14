import { FC, useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import BudgetFeature, { BudgetProps } from '../features/cashflow/Budget';
import Bar from '../components/Graphs/Bar';
import Donut from '../components/Graphs/Donut';
import { Grid, Typography } from '@material-ui/core';
import { donutDataTransformer, barDataTransformer } from '../utils/graph';
import {
  DonutGraphCategory,
  Category,
  Entry,
  CreateCategoryPayload,
  AddEntryToCategoryInputPayload,
} from '../types/budget';
import AddButton from '../components/Buttons/Add';
import Dialog from '../components/Dialog';
import Stepper, { StepperLabel } from '../components/Stepper';
import EntryForm from '../components/Forms/CreateEntry';
import CreateForm, {
  CallbackProps,
} from '../components/Forms/SelectCreateCategory';

type StepperInput = {
  activeIndex: number;
  labels: StepperLabel[];
  forms: React.FC<any>[];
};

const Budget: FC<BudgetProps> = ({
  budget,
  fetchBudget,
  loading,
  createCategory,
  taskDone,
  addEntryToCategory,
}) => {
  const { id } = useParams();
  const [editedEntry, setEditedEntry] = useState<Partial<Entry>>({});
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  // in ideal world thous would be probably managed via ctx
  const handlers = [handleEntryForm, handleCreateForm];
  const [steps, setSteps] = useState<StepperInput>({
    activeIndex: 0,
    labels: [
      { completed: false, isOptional: false, text: 'Create Entry' },
      { completed: false, isOptional: false, text: 'Select/Create Category' },
    ],
    forms: [
      ({ onConfirm }) => <EntryForm onConfirm={onConfirm} />,
      ({ onConfirm, currentCategory, categories }) => (
        <CreateForm
          onConfirm={onConfirm}
          defaultCategory={currentCategory}
          categories={categories}
        />
      ),
    ],
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  function handleEntryForm(data: Partial<Entry>) {
    setEditedEntry({ ...data });
    setSteps({ ...steps, activeIndex: steps.activeIndex + 1 });
  }

  function handleCreateForm({ category, createRequested }: CallbackProps) {
    const entry = {
      date: editedEntry.date!,
      value: Math.abs(editedEntry.value!),
    };
    const isExpense = editedEntry.value! < 0;
    if (createRequested) {
      const payload: CreateCategoryPayload = {
        categoryName: category,
        entry,
        type: isExpense ? 'expense' : 'income',
      };
      createCategory({ budgetID: budget!.id, payload });
    } else {
      const payload: AddEntryToCategoryInputPayload = {
        entry,
        type: isExpense ? 'expense' : 'income',
      };
      addEntryToCategory({ categoryID: Number(category), payload });
      handleDialogClose();
    }
  }

  function handleDialogClose() {
    setDialogOpen(false);
    setSteps({ ...steps, activeIndex: 0 });
    setEditedEntry({});
  }

  useEffect(() => {
    fetchBudget(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (budget) {
      setCurrentCategory(budget.categories[0]);
    }
  }, [budget]);
  useEffect(() => {
    if (taskDone) {
      handleDialogClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskDone]);

  if (loading && !dialogOpen) {
    return (
      <div>
        <Skeleton>
          <Skeleton height={30} animation="wave" />
          <Skeleton height={30} animation="wave" />
          <Skeleton height={30} animation="wave" />
          <Skeleton height={30} animation="wave" />
          <Skeleton height={30} animation="wave" />
          <Skeleton height={30} animation="wave" />
          <Skeleton variant="circle" width={30} height={30} />
        </Skeleton>
      </div>
    );
  }

  if (budget) {
    return (
      <>
        <AddButton onClick={() => setDialogOpen(true)}></AddButton>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          title={
            <Stepper
              activeIndex={steps.activeIndex}
              labels={steps.labels}
            ></Stepper>
          }
        >
          {currentCategory &&
            steps.forms[steps.activeIndex]({
              onConfirm: handlers[steps.activeIndex],
              currentCategory,
              categories: budget.categories,
            })}
        </Dialog>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h2">
              You have {budget.categories.length} categories
            </Typography>
          </Grid>
          {currentCategory && (
            <>
              <Grid item xs={12}>
                <Donut
                  selected={donutDataTransformer(currentCategory)}
                  onOpen={(data: DonutGraphCategory) =>
                    setCurrentCategory(data.category)
                  }
                  data={donutDataTransformer(budget.categories)}
                ></Donut>
              </Grid>
              <Grid item xs={12}>
                <Bar
                  legendLabel={currentCategory.name}
                  data={barDataTransformer(currentCategory)}
                ></Bar>
              </Grid>
            </>
          )}
        </Grid>
      </>
    );
  }
  return null;
};

export { Budget };
export default BudgetFeature(Budget);
