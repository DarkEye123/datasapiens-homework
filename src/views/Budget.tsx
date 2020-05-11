import { FC, useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import BudgetFeature, { BudgetProps } from '../features/cashflow/Budget';
import Bar from '../components/Graphs/Bar';
import Donut from '../components/Graphs/Donut';
import { Grid, Typography } from '@material-ui/core';
import { donutDataTransformer, barDataTransformer } from '../utils/graph';
import { DonutGraphCategory, Category } from '../types/budget';
import AddButton from '../components/Buttons/Add';

const Budget: FC<BudgetProps> = ({ budget, fetchBudget, loading }) => {
  const { id } = useParams();

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchBudget(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (budget) {
      setCurrentCategory(budget.categories[0]);
    }
  }, [budget]);

  if (loading) {
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
        <AddButton></AddButton>
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

export default BudgetFeature(Budget);
