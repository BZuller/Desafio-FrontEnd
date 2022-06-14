import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '../../../components/Section';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import UsersService from '../../../services/Users.service';
import toastMsg, { ToastType } from '../../../utils/toastMsg';
import Admin from '../../../enums/admin';

const createSchema = yup.object().shape({
  name: yup.string().min(2, 'Min. 2 caracteres').max(50, 'Máximo 50 caracteres').required('Campo obrigatório'),
  cpf: yup.string().min(2, 'Min. 2 caracteres').max(50, 'Máximo 50 caracteres').required('Campo obrigatório'),
  password: yup.string().min(2, 'Min. 2 caracteres').required('campo obrigatório'),
  observations: yup.string(),
  birthdate: yup.date().required('Campo obrigatório'),
  admin: yup.boolean().required(),
});

interface ICreate {
  name: string;
  cpf: string;
  password: string;
  observations: string;
  birthdate: Date;
  admin: boolean;
}

const defaultValue = {
  name: '',
  observations: '',
  cpf: '',
  birthdate: new Date(''),
  admin: false,
} as ICreate;

const Create: React.FunctionComponent = (): React.ReactElement => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState(defaultValue as ICreate);

  const handleSubmit = async (values: ICreate): Promise<void> => {
    try {
      setLoader(true);
      const { name, observations, cpf, password, birthdate, admin } = values;

      if (id) {
        await UsersService.update(id, admin, observations);
        toastMsg(ToastType.Success, 'Atualização realizada com sucesso!');
      } else {
        await UsersService.create(name, cpf, password, birthdate, admin, observations);
        toastMsg(ToastType.Success, 'Cadastro realizado com sucesso!');
      }

      setLoader(false);
      navigate('/List');
    } catch (error) {
      setLoader(false);
      toastMsg(ToastType.Error, (error as Error).message);
    }
  };
  useEffect(() => {
    let isCleaningUp = false;

    async function getUserById(): Promise<void> {
      try {
        if (!isCleaningUp && id) {
          const res = await UsersService.user(id);
          if (id) {
            const obj = {
              name: res.name,
              cpf: res.cpf,
              observations: res.observations,
              birthdate: res.birthdate,
              admin: res.admin,
            } as ICreate;

            setInitialValues(obj);
          }
        }
      } catch (error) {
        toastMsg(ToastType.Error, (error as Error).message);
      }
    }

    getUserById();

    return () => {
      isCleaningUp = true;
    };
  }, [id]);

  return (
    <Section
      className="create"
      title={`${id ? 'Editar' : 'Criar'} funcionário`}
      description={`${id ? 'Editar' : 'Criar'} funcionário`}
    >
      <Row className="mb-5">
        <Col md={12}>
          <Text as="h1" size="2rem" weight={700}>
            {id ? 'Editar' : 'Criar'} funcionário
          </Text>
          <Text as="small" size=".85rem" weight={400}>
            Os campos abaixo já contém validações configuradas para exemplo
          </Text>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Formik
            initialValues={initialValues}
            validationSchema={createSchema}
            enableReinitialize
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ errors, touched }) => (
              <Form autoComplete="off">
                <Row>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputName"
                      isInvalid={(errors.name && touched.name) || false}
                      msg={errors.name}
                      label="Nome do funcionário"
                      id="name"
                      name="name"
                      as="input"
                      placeholder="Insira um nome para o funcionário"
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputCpf"
                      isInvalid={(errors.cpf && touched.cpf) || false}
                      msg={errors.cpf}
                      label="Cpf"
                      id="cpf"
                      name="cpf"
                      as="input"
                      placeholder="Insira o cpf do usuario"
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputPassword"
                      isInvalid={(errors.password && touched.password) || false}
                      msg={errors.password}
                      label="Senha"
                      id="password"
                      name="password"
                      as="input"
                      type="password"
                      placeholder="Insira uma senha para o usuario"
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputObservations"
                      isInvalid={(errors.observations && touched.observations) || false}
                      msg={errors.observations}
                      label="Observações"
                      id="observations"
                      name="observations"
                      as="input"
                      placeholder="Insira uma observação para o usuário"
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputBirthdate"
                      isInvalid={!!(errors.birthdate && touched.birthdate)}
                      msg={errors.birthdate}
                      label="Data de nascimento"
                      id="birthdate"
                      name="birthdate"
                      as="input"
                      type="date"
                      placeholder="Data de nascimento"
                    />
                  </Col>
                  <Col md={12} className="mb-3">
                    <Input
                      cy="test-inputPermission"
                      isInvalid={(errors.admin && touched.admin) || false}
                      msg={errors.admin}
                      label="Permissão"
                      id="permission"
                      name="permission"
                      as="select"
                    >
                      <option>Selecione uma permissão</option>
                      <option value={Admin.Yes}>Administrador</option>
                      <option value={Admin.No}>Colaborador</option>
                    </Input>
                  </Col>
                  <Col md={12} className="mt-3">
                    <Button type="submit" disabled={loader} variant="primary" cy="test-create">
                      {id ? 'Editar informações do funcionário' : 'Cadastrar novo funcionário'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Section>
  );
};

export default Create;
