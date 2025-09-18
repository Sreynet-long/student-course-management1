import * as React from 'react';
import {Badge,Box, ButtonGroup,Button} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
    padding: '0 4px',
  },
}));


export default function ShopCart() {
    const [count, setCount] = React.useState(1);
  return (  
    <Box
      sx={{
        color: 'action.active',
        display: 'flex',
        flexDirection: 'column',
        '& > *': {
          marginBottom: 2,
        },
        '& .MuiBadge-root': {
          marginRight: 1,
        },
      }}
    >
      <div>
        <Badge color="secondary" badgeContent={0}>
          <ShoppingCartIcon />
        </Badge>
        {/* <ButtonGroup>
          <Button
            aria-label="reduce"
            onClick={() => {
              setCount(Math.max(count - 1, 0));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Button
            aria-label="increase"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup> */}
      </div>
      
    </Box>
    // <IconButton aria-label="cart">
    //   <StyledBadge badgeContent={0} color="secondary" showZero>
    //     <ShoppingCartIcon />
    //   </StyledBadge>
    // </IconButton>
  );
}
