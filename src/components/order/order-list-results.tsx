import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
   Avatar,
   Box,
   IconButton,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   TableSortLabel,
   Tooltip,
   Typography
} from '@mui/material'
import { SeverityPill } from 'components/severity-pill'
import { format, parseISO } from 'date-fns'
import PencilIcon from 'icons/pencil'
import { HeadCell, Order, PaginationParams } from 'models'
import { useState } from 'react'
import Link from 'next/link'

const headCells: HeadCell[] = [
   {
      id: 'name',
      align: 'left',
      label: 'Customer',
      sortable: false
   },
   {
      id: 'products',
      align: 'left',
      label: 'Products',
      sortable: false
   },
   {
      id: 'createdAt',
      align: 'center',
      label: 'Ordered Date',
      sortable: true
   },
   {
      id: 'amount',
      align: 'center',
      label: 'Price',
      sortable: true
   },
   {
      id: 'payment',
      align: 'center',
      label: 'Payment',
      sortable: false
   },
   {
      id: 'status',
      align: 'center',
      label: 'Status',
      sortable: false
   },
   {
      id: 'actions',
      align: 'center',
      label: 'Actions',
      sortable: false
   }
]

export const OrderListResults = ({
   orderList,
   onSortByColumn,
   ...rest
}: {
   orderList?: Order[]
   onRowClick?: (order: Order) => void
   onSortByColumn?: Function
}) => {
   const [order, setOrder] = useState<'asc' | 'desc'>('asc')
   const [orderBy, setOrderBy] = useState('')

   const handleSort = (property: string) => async (event: React.MouseEvent) => {
      if (onSortByColumn) {
         const isAsc = orderBy === property && order === 'asc'
         setOrder(isAsc ? 'desc' : 'asc')
         setOrderBy(property)
         onSortByColumn(`${property}-${isAsc ? 'desc' : 'asc'}`)
      }
   }
   return (
      <Table {...rest}>
         <TableHead>
            <TableRow>
               {headCells.map(cell => (
                  <TableCell
                     key={cell.id}
                     align={cell.align}
                     sortDirection={orderBy === cell.id ? order : false}
                  >
                     {cell.sortable && onSortByColumn ? (
                        <TableSortLabel
                           active={orderBy === cell.id}
                           direction={orderBy === cell.id ? order : 'asc'}
                           onClick={handleSort(cell.id)}
                        >
                           {cell.label}
                        </TableSortLabel>
                     ) : (
                        cell.label
                     )}
                  </TableCell>
               ))}
            </TableRow>
         </TableHead>
         <TableBody>
            {orderList
               ? orderList.map((order: Order) => (
                    <TableRow hover key={order.id}>
                       <TableCell align="left" sx={{ minWidth: 200 }}>
                          <Link href={`/customers/${order.user_id}`} passHref legacyBehavior>
                             <Typography
                                sx={{
                                   cursor: 'pointer',
                                   ':hover': {
                                      textDecoration: 'underline'
                                   },
                                   fontWeight: 500
                                }}
                                variant="body2"
                             >
                                {order.name}
                             </Typography>
                          </Link>
                       </TableCell>
                       <TableCell align="left">
                          <Box sx={{ display: 'flex', alignItems: 'end', gap: 1 }}>
                             {order.items.slice(0, 3).map(product => (
                                <Tooltip
                                   key={product.id}
                                   title={product?.food_origin?.name}
                                   placement="top"
                                >
                                   <Avatar
                                      variant="rounded"
                                      src={product?.food_origin?.images?.url}
                                   />
                                </Tooltip>
                             ))}
                             {order.items.length > 3 && (
                                <Tooltip title="and more..." placement="top">
                                   <Box sx={{ height: '100%' }}>
                                      <Typography>...</Typography>
                                   </Box>
                                </Tooltip>
                             )}
                          </Box>
                       </TableCell>
                       <TableCell align="center" sx={{ pr: 5 }}>
                          {format(parseISO(order.created_at), 'dd-MM-yyyy')}
                       </TableCell>
                       <TableCell align="center" sx={{ pr: 5 }}>
                          ${order.total_price.toFixed(2)}
                       </TableCell>
                       <TableCell align="center">{order.type || 'COD'}</TableCell>
                       <TableCell align="center" sx={{ minWidth: 200 }}>
                          <SeverityPill
                             color={
                                {
                                   pending: 'info',
                                   preparing: 'secondary',
                                   on_the_way: 'error',
                                   delivered: 'primary',
                                   cancel: 'warning'
                                }[order.tracking_state || 'pending']
                             }
                          >
                             {order.tracking_state === 'on_the_way'
                                ? 'Shipping'
                                : order.tracking_state}
                          </SeverityPill>
                       </TableCell>
                       <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                             <Link href={`/orders/${order.id}/edit`} passHref legacyBehavior>
                                <Tooltip title="Edit Order" placement="top">
                                   <IconButton size="small">
                                      <PencilIcon width={20} />
                                   </IconButton>
                                </Tooltip>
                             </Link>
                             <Link href={`/orders/${order.id}`} passHref legacyBehavior>
                                <Tooltip title="View Details" placement="top">
                                   <IconButton size="small">
                                      <ArrowForwardIcon fontSize="small" />
                                   </IconButton>
                                </Tooltip>
                             </Link>
                          </Box>
                       </TableCell>
                    </TableRow>
                 ))
               : Array.from(new Array(10)).map((item, idx) => (
                    <TableRow hover key={idx}>
                       <TableCell align="left">
                          <Skeleton variant="text" />
                       </TableCell>
                       <TableCell align="left">
                          <Skeleton variant="text" />
                       </TableCell>
                       <TableCell align="center">
                          <Skeleton variant="text" />
                       </TableCell>
                       <TableCell align="center">
                          <Skeleton variant="text" />
                       </TableCell>
                       <TableCell align="center">
                          <Skeleton variant="text" />
                       </TableCell>
                       <TableCell align="center">
                          <Skeleton variant="text" />
                       </TableCell>
                       <TableCell align="center">
                          <Skeleton variant="text" />
                       </TableCell>
                    </TableRow>
                 ))}
         </TableBody>
      </Table>
   )
}
