import React from 'react';
import classNames from 'classnames';
import { FastField, FormikErrors } from 'formik';
import Text from '../Text';

interface IInput {
  cy: string;
  isInvalid?: boolean;
  msg?: string | FormikErrors<Date>;
  className?: string;
  label?: string;
  id: string;
  name: string;
  as: string;
  placeholder?: string;
  type?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

const Input = ({
  cy,
  isInvalid,
  msg,
  className,
  label,
  id,
  name,
  as,
  placeholder,
  type,
  children,
  disabled,
}: IInput): React.ReactElement => (
  <label htmlFor={id} className="w-100">
    {label}
    <FastField
      cy={cy}
      id={id}
      as={as}
      name={name}
      placeholder={placeholder}
      type={type || 'text'}
      className={classNames(`form-control ${isInvalid ? 'is-invalid' : ''} ${className}`)}
      disabled={disabled}
    >
      {children}
    </FastField>
    {isInvalid ? (
      <Text as="span" color="var(--red-500)" weight={500}>
        {msg}
      </Text>
    ) : null}
  </label>
);

Input.defaultProps = { isInvalid: false, msg: '', className: '', label: '', placeholder: '' };

export default Input;
