import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from 'store/actions/userActions'

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: 'pre',
  '& thead': {
    '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
  },
  '& tbody': {
    '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
  }
}))

const SimpleTable = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const { users } = useSelector((action) => action)

  const fetchData = async () => {
    await dispatch(fetchUsers())
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return <h1 style={{ textAlign: 'center' }}>Loading...</h1>
  }

  console.log(users)

  return (
    <Box width="100%" overflow="auto">
      {users.length > 0 ? (
        <StyledTable>
          <TableHead>
            <TableRow>
              <TableCell align="left">username</TableCell>
              <TableCell align="center">FirstName</TableCell>
              <TableCell align="center">LastName</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.payload.length > 0 &&
              users.payload.map((user, index) => (
                <TableRow key={index}>
                  <TableCell align="left">{user.username}</TableCell>
                  <TableCell align="center">{user.firstName}</TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.mobile}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <Icon color="error">deleteForever</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </StyledTable>
      ) : (
        <h1 className="text-center">No users found right now</h1>
      )}
    </Box>
  )
}

export default SimpleTable
