import React from 'react'
import {Box, Typography, Grid , Stack , Avatar, Card, CardActionArea, CardMedia, CardContent} from "@mui/material";
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import styles from '../styles/featureStore.module.css';
import { purple } from '@mui/material/colors';
import { ArrowRight } from 'iconsax-react';

function FeatureStore() {
  return (
    <Stack justifyContent="center" sx={{ p: 2, bgcolor: '#f9fafb',  }} alignItems="justify"  >
        <Stack direction="row" justifyContent="space-between">
            <Typography className='text-featureStore' style={{ fontSize: 20}} spacing={2} variant="h5" align="justify" gutterBottom sx={{ fontWeight: 'bold', mb: 4 , mx: 4}}>Featured Store</Typography>
            <Link href="/" style={{ textDecoration: purple}}> 
            <Typography>
                Visit all Stores 
                <ArrowRight size="20" color="#ba68c8"/>
            </Typography>   
            </Link>
        </Stack>

        {/* <Stack direction="row" justifyContent="space-between" className={styles["feature-store-card"]} display="flex"> */}
            <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: "1200px"}}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 345 }} className={styles['card-feature']}>
                        <CardActionArea position="relative">
                            <CardMedia
                            component="img"
                            height="140"
                            image="/logos/j&t.jpg"
                            alt="j&t"
                            />
                                <Avatar
                                alt='J&T Express' 
                                src='/logos/j&t.jpg' 
                                className='card-avatar' 
                                sx={{
                                    width: 56, 
                                    height: 56 ,
                                    position: 'absolute', 
                                    top: '55%',          
                                    left: '25%',         
                                    transform: 'translate(-50%, -50%)', 
                                    border: '3px solid white' 
                                    }}
                                />
                            <CardContent>
                            
                                <Typography gutterBottom variant="h5" component="div">
                                    J&T Express
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    <Image src='/icons/light.png' width={24} height={24} alt="Light icon"/>
                                    delivery in 12 minute
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            

                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 345 }} className={styles['card-feature']}>
                        <CardActionArea position="relative">
                            <CardMedia
                            component="img"
                            height="140"
                            image="/logos/grab.png"
                            alt="j&t"
                            />
                                <Avatar
                                alt='J&T Express' 
                                src='/logos/grab.png' 
                                sx={{
                                    width: 56, 
                                    height: 56 ,
                                    position: 'absolute', 
                                    top: '55%',          
                                    left: '25%',         
                                    transform: 'translate(-50%, -50%)', 
                                    border: '3px solid white' 
                                    }}
                                className='card-avatar'/>
                            <CardContent>
                            
                                <Typography gutterBottom variant="h5" component="div">
                                    Grab
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    <Image src='/icons/light.png' width={24} height={24} alt="Light icon" />
                                    delivery in 12 minute
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Card sx={{ maxWidth: 345 }} className={styles['card-feature']}>
                        <CardActionArea position="relative">
                            <CardMedia
                            component="img"
                            height="140"
                            image="/logos/fedex.jpg"
                            alt="j&t"
                            />
                                <Avatar
                                alt='J&T Express' 
                                src='/logos/fedex.jpg' 
                                sx={{
                                    width: 56, 
                                    height: 56 ,
                                    position: 'absolute', 
                                    top: '55%',          
                                    left: '25%',         
                                    transform: 'translate(-50%, -50%)', 
                                    border: '3px solid white' 
                                    }}
                                className='card-avatar'/>
                            <CardContent>
                            
                                <Typography gutterBottom variant="h5" component="div">
                                    FedEx
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    <Image src='/icons/light.png' width={24} height={24} alt="Light icon" />
                                    delivery in 12 minute
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        {/* </Stack> */}
        

        
    </Stack>
  )
}

export default FeatureStore