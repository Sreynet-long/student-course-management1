import Image from 'next/image';
import Link from 'next/link';
import {Stack, Box, Typography} from '@mui/material';

export default function CategoryCard({ category }) {
  const { name, description, icon, slug } = category;

  return (

    <Link 
    href={`/categories/${slug}`} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
            bgcolor: 'background.paper',
            borderRadius: '10px',
            boxShadow: 3,
            cursor: 'pointer',
            // textDecoration: 'none',
            // color: 'inherit',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': { transform: 'scale(1.05)' },
        }}
        >
        
        <Box
          sx={{
            position: 'relative',
            width: 58,
            height: 58,
            mb: 2,
            borderRadius: '50%',
            overflow: 'hidden',
            bgcolor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            }}
        >
            <Image src={icon} alt={name}  width={40} height={40} />
        </Box>
        <Typography className='text-name' variant="subtitle1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {name}
        </Typography>
        
        <Typography className='text-name' variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          {description}
        </Typography>
      </Box>
    </Link>   
    // <Link 
    // href={`/categories/${slug}`} className="flex flex-col items-center justify-center min-w-[150px] 
    // p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
    //   <div className="relative w-16 h-16 mb-2">
    //     <Image src={icon} alt={name} layout="fill" objectFit="contain"/>
    //   </div>
    //   <h3 className="text-sm font-semibold text-gray-800 text-center">{name}</h3>
    //   <p className="text-xs text-gray-500 text-center">{description}</p>
    // </Link>
  );
}