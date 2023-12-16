'use client';
import { Button, Spinner, Tooltip, useDisclosure } from '@nextui-org/react';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import axios from 'axios';
import { Delete, Edit, Plus } from 'lucide-react';
import { Key, useCallback, useEffect, useState } from 'react';
import ModalUser from './components/form-user';
import { User } from './constants';

const columns = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'actions',
    label: 'Actions',
  },
];

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState<User>();
  const [userAction, setUserAction] = useState<string | undefined>('add');

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API}/users`);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [API]);

  const handleActionClick = useCallback(
    (user?: User, action?: string) => {
      setUserInfo(user);
      setUserAction(action);
      onOpen();
    },
    [onOpen],
  );

  const renderCell = useCallback(
    (user: User, columnKey: Key) => {
      const cellValue = user[columnKey as keyof User];
      switch (columnKey) {
        case 'id':
          return user.id;
        case 'name':
          return user.name;
        case 'email':
          return user.email;
        case 'actions':
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="Update">
                <span className="text-lg text-success cursor-pointer active:opacity-50">
                  <Edit onClick={() => handleActionClick(user, 'edit')} />
                </span>
              </Tooltip>
              <Tooltip content="Delete">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <Delete onClick={() => handleActionClick(user, 'delete')} />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [handleActionClick],
  );

  return loading ? (
    <div className="flex items-center justify-center">
      <Spinner
        label="Loading..."
        color="warning"
        labelColor="warning"
        size="lg"
      />
    </div>
  ) : (
    <>
      <div className="flex justify-end py-2">
        <Button
          variant="shadow"
          onClick={() => handleActionClick(undefined, 'add')}
        >
          Add new
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Table aria-label="User table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ModalUser
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        user={userInfo}
        action={userAction}
      />
    </>
  );
}
