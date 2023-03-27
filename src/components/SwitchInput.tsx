import { useId } from 'react';
import styled from 'styled-components';
import Switch from './Switch';

interface IProps extends React.ComponentProps<typeof Switch> {
  children?: any;
}

const SwitchInput = ({ children, ...rest }: IProps) => {
  const id = rest.id ?? useId();
  return (
    <Wrapper>
      <Switch {...{ ...rest, id }} />
      <label htmlFor={id}>{children}</label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export default SwitchInput;
