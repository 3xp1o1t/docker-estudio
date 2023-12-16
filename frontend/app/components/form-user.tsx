import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import axios from 'axios';
import { MailIcon, UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { API, User } from '../constants';

interface ModalUserProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  user?: User;
  action?: string;
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

export default function ModalUser({
  isOpen,
  onOpenChange,
  user,
  action,
}: ModalUserProps) {
  const createUser = async (values: { name: string; email: string }) => {
    try {
      const response = await axios.post(`${API}/users`, values);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (userId?: number) => {
    try {
      await axios.delete(`${API}/users/${userId}`);
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (
    userId: number,
    values: { name: string; email: string },
  ) => {
    try {
      await axios.put(`${API}/users/${userId}`, values);
    } catch (error) {
      console.error(error);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    switch (action) {
      case 'add':
        createUser(values);
        break;
      case 'edit':
        if (user?.id) updateUser(user.id, values);
        break;
      case 'delete':
        if (user?.id) deleteUser(user.id);
        break;
    }
    onOpenChange(false);
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                User {user?.id}
              </ModalHeader>
              <ModalBody>
                {action === 'delete' ? (
                  <h1>
                    Are you sure you want to eliminate user
                    <p className="font-medium text-rose-500">
                      {user?.name}
                    </p>{' '}
                    from the database?
                    <Input
                      defaultValue={user?.email}
                      {...register('email')}
                      disabled
                    />
                    <Input
                      defaultValue={user?.name}
                      {...register('name')}
                      disabled
                    />
                  </h1>
                ) : (
                  <>
                    <Input
                      autoFocus
                      endContent={
                        <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Name"
                      placeholder="Enter your name"
                      type="text"
                      variant="bordered"
                      defaultValue={user?.name}
                      {...register('name')}
                    />

                    <Input
                      endContent={
                        <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                      }
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      defaultValue={user?.email}
                      {...register('email')}
                    />
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" variant="shadow" type="submit">
                  Save
                </Button>
                {errors.name && (
                  <p className="text-rose-500">{errors.name.message}</p>
                )}
                {errors.email && (
                  <p className="text-rose-500">{errors.email.message}</p>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </form>
    </Modal>
  );
}
