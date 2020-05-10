import { FC, useEffect, useState } from 'react';
import React from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '@material-ui/lab/Skeleton';
import BudgetFeature, { BudgetProps } from '../features/cashflow/Budget';
import Bar from '../components/Graphs/Bar';
import Donut from '../components/Graphs/Donut';
import { Grid, Typography } from '@material-ui/core';
import { donutDataTransformer } from '../components/Graphs/Donut/utils';
import { DonutGraphCategory, Category } from '../types/budget';

const Budget: FC<BudgetProps> = ({ budget, fetchBudget, loading }) => {
  const { id } = useParams();

  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  useEffect(() => {
    fetchBudget(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">
            You have {budget.categories.length} categories
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Donut
            // selected={donutDataCreator([currentCategory])}
            onOpen={(data: DonutGraphCategory) =>
              setCurrentCategory(data.category)
            }
            data={donutDataTransformer(budget.categories)}
          ></Donut>
        </Grid>
        <Grid item xs={12}>
          <Donut
            onOpen={(data: DonutGraphCategory) =>
              setCurrentCategory(data.category)
            }
            data={donutDataTransformer(budget.categories)}
          ></Donut>
        </Grid>
      </Grid>
    );
  }
  return <div>budget {id}</div>;
};

export default BudgetFeature(Budget);
