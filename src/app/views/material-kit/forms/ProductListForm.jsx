import { Box, Icon, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteProductById } from 'store/actions/productActions'

function ProductListForm() {

    const { products } = useSelector(state => state)
    const dispatch = useDispatch()

    // const handleEdit = () => {

    // }

    const handleDelete = (_id) => {
        dispatch(deleteProductById(_id))
    }
    // console.log("products are -> ", products);
    return (
        <Box>
            {
                products?.payload?.length > 0
                    ?
                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">sr. no</TableCell>
                                <TableCell align="center">Product Name</TableCell>
                                <TableCell align="center">Product Category</TableCell>
                                <TableCell align="center">Product Brand</TableCell>
                                <TableCell align="center">Product Image</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                            products.payload.map((singleProduct, index) => {
                                return (
                                    <TableBody>
                                        <TableCell align="center" key={index}>{index + 1}</TableCell>
                                        <TableCell align="center">{singleProduct.productName}</TableCell>
                                        <TableCell align="center">{singleProduct.categoryName}</TableCell>
                                        <TableCell align="center">{singleProduct.brandName}</TableCell>
                                        <TableCell align="center">
                                            <img src={`http://localhost:3003/uploads/product/${singleProduct.image}`} style={{ borderRadius: '10px' }} height={'60px'} width={'60px'} alt="image comes here" />
                                        </TableCell>
                                        <TableCell align="center">{singleProduct.status}</TableCell>
                                        <TableCell align="center">
                                            {/* <Link onClick={() => handleEdit()}><Icon className="mx-2 text-secondary">edit</Icon></Link> */}
                                            <Link onClick={() => handleDelete(singleProduct._id)}><Icon className="mx-2 text-danger">delete</Icon></Link>
                                        </TableCell>
                                    </TableBody>
                                )
                            })

                        }
                    </Table>
                    :
                    <h1 className="text-center">No Products found..</h1>
            }

        </Box>
    )
}

export default ProductListForm