import { Button } from '@mui/material'
import { main } from '@popperjs/core'
import React from 'react'
import CategoryList from './components/Home/categoryLists/page'
import Hero from './components/Home/page'
import AddToCard from './components/feature/AddToCart'
import { Add } from '@mui/icons-material'
import ProductCart from './components/Cart/ProductCart'

function HomePage() {
  return (
    <main>
      <Hero/>
      <CategoryList/>
      <AddToCard/>
    
    </main>
  )
}

export default HomePage