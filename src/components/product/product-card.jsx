import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import {
   Avatar,
   Box,
   Card,
   CardContent,
   CardMedia,
   Divider,
   Grid,
   IconButton,
   Skeleton,
   Tooltip,
   Typography
} from '@mui/material'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { ConfirmDialog } from './confirm-dialog'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const ProductCard = ({ product, onEditClick, onDeleteClick, ...rest }) => {
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
   return product ? (
      <Card
         sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
         }}
         {...rest}
         elevation={6}
      >
         <Typography
            sx={{
               position: 'absolute',
               margin: 2,
               marginTop: 1
            }}
            variant="h6"
         >
            ${product.price}
         </Typography>
         <CardMedia
            sx={{ marginTop: 2 }}
            component="img"
            height="220"
            image={product.images.url}
            alt={product.name}
         />
         <CardContent>
            <Tooltip title={product.name || false} placement="top">
               <Typography align="center" noWrap color="textPrimary" gutterBottom variant="h6">
                  {product.name}
               </Typography>
            </Tooltip>
            <Tooltip title={product.description || false} placement="top">
               <Typography noWrap align="center" color="textPrimary" variant="body1">
                  {product.description}
               </Typography>
            </Tooltip>
         </CardContent>

         <Box sx={{ flexGrow: 1 }} />
         <Divider />
         <Box sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
               <Grid
                  item
                  sx={{
                     alignItems: 'center',
                     display: 'flex'
                  }}
               >
                  <Inventory2Icon color="action" />
                  <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                     {product.quantity} In Stocks
                  </Typography>
               </Grid>
               <Grid
                  item
                  sx={{
                     alignItems: 'center',
                     display: 'flex'
                  }}
               >
                  <Tooltip title="Edit" placement="top">
                     <IconButton
                        color="primary"
                        onClick={() => {
                           if (onEditClick) onEditClick(product)
                        }}
                     >
                        <EditIcon />
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top">
                     <IconButton color="error" onClick={() => setIsDeleteDialogOpen(true)}>
                        <DeleteIcon />
                     </IconButton>
                  </Tooltip>
               </Grid>
            </Grid>
         </Box>

         <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            title="Are you sure?"
            body="Are you sure to delete this order?"
            onClose={() => setIsDeleteDialogOpen(false)}
            onSubmit={async () => {
               if (onDeleteClick) await onDeleteClick(product._id)
               setIsDeleteDialogOpen(false)
            }}
            icon={
               <Avatar sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: 'rgb(209, 67, 67)' }}>
                  <ReportProblemIcon />
               </Avatar>
            }
         />
      </Card>
   ) : (
      <Card
         sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
         }}
         {...rest}
      >
         <Skeleton variant="rectangular" height={220} />
         {/* <CardMedia component="img" height="220" component={<Skeleton variant="rectangular" />} /> */}
         <CardContent>
            <Typography align="center" color="textPrimary" gutterBottom variant="h6">
               <Skeleton variant="text" />
            </Typography>
            <Typography noWrap align="center" color="textPrimary" variant="body1">
               <Skeleton variant="text" />
            </Typography>
         </CardContent>

         <Box sx={{ flexGrow: 1 }} />
         <Divider />
         <Box sx={{ p: 2 }}>
            <Skeleton variant="text" />
         </Box>
      </Card>
   )
}

ProductCard.propTypes = {
   product: PropTypes.object.isRequired
}

export default ProductCard
