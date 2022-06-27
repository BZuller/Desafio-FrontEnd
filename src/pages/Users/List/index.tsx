/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import DataTable from '../../../components/DataTable';
import { IUser } from '../../../interfaces';
import UsersService from '../../../services/Users.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import Button from '../../../components/Button';
import { AuthContext } from '../../../contexts/AuthContext';

const columns = [
  { label: 'Observations', key: 'observations', isCenter: true },
  { label: 'Nome', key: 'name' },
  { label: 'Data de Nascimento', key: 'birthdate', isDate: true },
  { label: 'CPF', key: 'cpf' },
  { label: 'Permissão', key: 'admin', isBool: true },
];

const Users: React.FunctionComponent = (): React.ReactElement => {
  const [users, setUsers] = useState<IUser[]>([]);

  const navigate = useNavigate();

  const { token, signOut } = useContext(AuthContext);

  const fetchUsers = async (): Promise<void> => {
    try {
      const data = await UsersService.users();
      setUsers(data);
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    try {
      const res = await UsersService.delete(id);
      toastMsg(ToastType.Success, 'Deletado com sucesso!');
      fetchUsers();
    } catch (error) {
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };

  useEffect(() => {
    let isCleaningUp = false;

    if (!isCleaningUp) {
      fetchUsers();
    }
    return () => {
      isCleaningUp = true;
    };
  }, []);

  return (
    <Section className="users" title="Listagem de funcionários" description="Listagem de funcionários">
      <Row>
        <Col md={12}>
          <Text as="h1" size="2rem" weight={700}>
            Usuários
          </Text>
        </Col>
      </Row>
      <Row>
        <Col md={12} className="mt-3 mb-2">
          <Button type="button" variant="primary" onClick={() => navigate('/Actions')} cy="test-create">
            Cadastrar usuário
          </Button>
          <p />
          <Button type="button" variant="danger" onClick={() => signOut()} cy="test-create">
            Sair
          </Button>
        </Col>
        <Col md={12}>
          <DataTable
            data={users}
            columns={columns}
            hasActions
            deleteAction={(id) => deleteUser(id)}
            editAction={(id) => navigate(`/Actions/${id}`)}
          />
        </Col>
      </Row>
    </Section>
  );
};

export default Users;
