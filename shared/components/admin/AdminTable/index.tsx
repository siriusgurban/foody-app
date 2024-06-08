import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Image,
    IconButton,
    ButtonGroup,
    useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

interface Item {
    id: number;
    cover_url: string;
    title: string;
    desc: string;
}

interface TableComponentProps {
    data: Item[];
}

const TableComponent: React.FC<TableComponentProps> = ({ data }) => {
    const { onOpen } = useDisclosure();
    const [currentItem, setCurrentItem] = React.useState<Item | null>(null);

    return (
        <TableContainer width={1000}>
            <Table colorScheme="whatsapp" size="lg" >
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Customer Id </Th>
                        <Th>Time </Th>
                        <Th>Deliver Address</Th>
                        <Th>Amount</Th>
                        <Th>Payment Method</Th>
                        <Th>Contact</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {data
                        ?.filter((item) => item.id > 100)
                        ?.map((item) => (
                            <Tr key={`item-${item.id}`}>
                                <Td>
                                  Lorem ipsum dolor sit.
                                </Td>
                                <Td>{item.title}</Td>
                                <Td>{item.desc}</Td>
                                <Td>
                                    <ButtonGroup>
                                        <IconButton
                                            colorScheme="teal"
                                            aria-label="Edit"
                                            icon={<EditIcon />}
                                        />
                                        <IconButton
                                            colorScheme="red"
                                            aria-label="Delete"
                                            icon={<DeleteIcon />}
                                            onClick={() => {
                                                setCurrentItem(item);
                                                onOpen();
                                            }}
                                        />
                                    </ButtonGroup>
                                </Td>
                            </Tr>
                        ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default TableComponent;
