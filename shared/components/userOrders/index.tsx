import { DeleteIcon, ViewIcon } from '@chakra-ui/icons'
import { ButtonGroup, IconButton } from '@chakra-ui/react'
import React from 'react'

function UserOrders() {
  return <div>

    <table className="bg-white m-5"  >
      <thead className='h-[50px] border-b-2'>
        <tr className='p-8'>
          <th className='w-[100px] text-center'>ID</th>
          <th className='w-[100px] text-center'>Customer ID</th>
          <th className='w-[120px] text-center'>Time</th>
          <th className='w-[200px] text-center'>Delivery Address</th>
          <th className='w-[150px] text-center'>Amount</th>
          <th className='w-[150px] text-center'>Payment Method</th>
          <th className='w-[150px] text-center'>Contact</th>

        </tr>
      </thead>
      <tbody >
        <tr className='h-[60px] border-b-2 p-8'>
          <td className='w-[100px] text-center'>
            9177
          </td>
          <td className='w-[100px] text-center'>
            022401
          </td> <td className='w-[100px] text-center'>
            25 Dec 2021
          </td> <td className='w-[200px] text-center'>
            29 Eve Street,543 Evenue Road,Ny 87876
          </td> <td className='w-[100px] text-center'>
            $249.7
          </td> <td className='w-[100px] text-center'>
            Cash On Delivery
          </td>
          <td className='w-[100px] text-center'>
            994-51-410-3130
          </td> <td className='w-[140px] text-center'>
            <ButtonGroup>
              <IconButton
                colorScheme="teal"
                aria-label="Edit"
                icon={<ViewIcon />}
              />
              <IconButton
                colorScheme="red"
                aria-label="Delete"
                icon={<DeleteIcon />}

              />
            </ButtonGroup>
          </td>
        </tr>
        <tr className='h-[60px] border-b-2 p-8'>
          <td className='w-[100px] text-center'>
            9177
          </td>
          <td className='w-[100px] text-center'>
            022401
          </td> <td className='w-[100px] text-center'>
            25 Dec 2021
          </td> <td className='w-[200px] text-center'>
            29 Eve Street,543 Evenue Road,Ny 87876
          </td> <td className='w-[100px] text-center'>
            $249.7
          </td> <td className='w-[100px] text-center'>
            Cash On Delivery
          </td>
          <td className='w-[100px] text-center'>
            994-51-410-3130
          </td> <td className='w-[140px] text-center'>
            <ButtonGroup>
              <IconButton
                colorScheme="teal"
                aria-label="Edit"
                icon={<ViewIcon />}
              />
              <IconButton
                colorScheme="red"
                aria-label="Delete"
                icon={<DeleteIcon />}

              />
            </ButtonGroup>
          </td>
        </tr>
      </tbody>
    </table >
  </div>
}

export default UserOrders
