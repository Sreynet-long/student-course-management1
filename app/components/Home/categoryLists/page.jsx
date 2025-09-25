'use client';

import CategoryCard from '../../feature/CategoryCard';
import Image from 'next/image';
import SeeAllCard from '../../feature/SeeAllCard';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa'; 
import { Stack , Grid, Typography,Box } from '@mui/material';


const categoriesData = [
  {
    id: '1',
    name: 'Vegetable',
    description: 'Local market',
    icon: '/icons/vegetable.png',                                      
    slug: 'vegetable',
  },
  {
    id: '2',
    name: 'Snacks & Breads',
    description: 'In store delivery',
    icon: '/icons/croissant.png',
    slug: 'snacks-breads',
  },
  {
    id: '3',
    name: 'Fruits',
    description: 'Chemical Free',
    icon: '/icons/fruit.png',
    slug: 'fruits',
  },
  {
    id: '4',
    name: 'Chicken legs',
    description: 'Frozen Meal',
    icon: '/icons/chicken.png',
    slug: 'chicken-legs',
  },
  {
    id: '5',
    name: 'Milk & Dairy',
    description: 'Frozen food',
    icon: '/icons/milk.png',
    slug: 'milk-dairy',
  },
];

export default function CategoryList() {
  return (
    <Box sx={{ bgcolor: '#f9fafb', p: 4, borderRadius: 2 }} className="p-6"> 
      {/* <Typography variant="h5" align="justify" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Explore Our Products    
      </Typography> */}
      <Stack direction="row" spacing={2} sx={{ overflowX: 'auto', pb: 2 }} alignItems="center" justifyContent="center">
        {categoriesData.map((category) => (
          <Box key={category.id} sx={{ minWidth: 180 }}>
            <CategoryCard category={category} />
          </Box>
        ))}
        {/* "See all" card */}
        {/* <Box sx={{ minWidth: 150 }}>
          <SeeAllCard />
        </Box> */}
      </Stack>
    </Box>

  );
}