import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import * as React from 'react';
import useSWR from 'swr';

import Navbar from '@/components/app-bar';
import ErrorPage from '@/components/error';
import Loading from '@/components/loading';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';

type Meal = {
  id: string;
  title: string;
  image: string;
  extendedIngredients: { id: number; name: string }[];
  steps: string[];
  readyInMinutes: number;
  calories: number;
  pricePerServing: number;
};

function HealthyMeals() {
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [bmi, setBmi] = React.useState<number | null>(null);
  const [meals, setMeals] = React.useState<Meal[]>([]);
  const [loading, setLoading] = React.useState(false);

  const calculateBMI = () => {
    const heightInMeters = parseInt(height, 10) / 100;
    const calculatedBmi =
      parseInt(weight, 10) / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(2)));
  };

  const fetchMeals = async () => {
    setLoading(true);

    const apiKey = 'db6833bd3b9c4109ba277369cce816d5';
    const randomOffset = Math.floor(Math.random() * 100);
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${
        bmi! < 18.5 ? 'high-protein' : 'low-carb'
      }&number=5&offset=${randomOffset}`
    );

    const detailedMeals = await Promise.all(
      response.data.results.map(async (meal: { id: number }) => {
        const mealDetails = await axios.get(
          `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${apiKey}`
        );

        const steps = mealDetails.data.analyzedInstructions[0]?.steps.map(
          (step: { step: string }) => step.step
        );

        const nutritionResponse = await axios.get(
          `https://api.spoonacular.com/recipes/${meal.id}/nutritionWidget.json?apiKey=${apiKey}`
        );

        const calories = nutritionResponse.data?.calories || 0;

        return {
          ...mealDetails.data,
          steps,
          readyInMinutes: mealDetails.data.readyInMinutes,
          calories,
          // pricePerServing: mealDetails.data.pricePerServing,
        };
      })
    );

    setMeals(detailedMeals);
    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    calculateBMI();
    fetchMeals();
  };
  const getBmiDescription = (bmiValue: number) => {
    if (bmiValue < 18.5) {
      return 'Underweight';
    }
    if (bmiValue < 24.9) {
      return 'Normal weight';
    }
    if (bmiValue < 29.9) {
      return 'Overweight';
    }
    return 'Obesity';
  };

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_DB_URI}/admin/profile`,
    async (url) => {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data;
    }
  );

  if (error) {
    return <ErrorPage />;
  }

  return (
    <Main meta={<Meta title="Healthy Meals" description="healthy meals" />}>
      <Navbar username={data?.user?.username} />
      <Box>
        <div className="main-container">
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Calculate BMI & Fetch Meals
                </Button>
              </Grid>
            </Grid>
          </Box>
          {bmi && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h5">Your BMI: {bmi}</Typography>
              <Typography variant="h6">{getBmiDescription(bmi)}</Typography>
            </Box>
          )}
          {loading ? (
            <Loading text="Loading Meals" />
          ) : (
            meals.length > 0 && (
              <Box sx={{ my: 4 }}>
                <Typography variant="h4">Meal Suggestions:</Typography>
                <Grid container spacing={6} sx={{ mt: 2 }}>
                  {meals.map((meal) => (
                    <Grid item xs={12} sm={6} lg={4} key={meal.id}>
                      <Card
                        className="shadow max-h-[70vh] !overflow-auto"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          minHeight: '100%',
                          borderRadius: '6px',
                          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            // maxHeight: 300,
                            objectFit: 'cover',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px',
                          }}
                          image={meal.image}
                          alt={meal.title}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {meal.title}
                          </Typography>
                          <Typography variant="h6">Ingredients:</Typography>
                          <ul>
                            {meal.extendedIngredients.map((ingredient) => (
                              <li key={ingredient.id}>
                                <Typography
                                  variant="body1"
                                  sx={{ lineHeight: '1.5' }}
                                >
                                  {ingredient.name}
                                </Typography>
                              </li>
                            ))}
                          </ul>
                          <Typography variant="h6">
                            Preparation Time:
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {meal.readyInMinutes} minutes
                          </Typography>
                          {/* <Typography variant="h6">Price:</Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 'bold' }}
                          >
                            ${meal.pricePerServing.toFixed(2)} per serving
                          </Typography> */}
                          <Typography variant="h6">Calories:</Typography>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 'bold' }}
                          >
                            {meal.calories} kcal
                          </Typography>
                          <Typography variant="h6">Steps:</Typography>
                          <ol>
                            {meal.steps?.map((step, index) => (
                              <li key={index}>
                                <Typography
                                  variant="body1"
                                  sx={{ lineHeight: '1.5' }}
                                >
                                  {step}
                                </Typography>
                              </li>
                            ))}
                          </ol>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )
          )}
        </div>
      </Box>
    </Main>
  );
}

export default HealthyMeals;
export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
