import * as SwitchRadix from '@radix-ui/react-switch';
import styled from 'styled-components';

interface IProps extends React.ComponentProps<typeof SwitchRadix.Root> {}

const Switch = ({ ...rest }: IProps) => {
  return (
    <Root {...rest}>
      <Thumb />
    </Root>
  );
};
export default Switch;

const Root = styled(SwitchRadix.Root)`
  width: 40px;
  height: 24px;
  border-radius: 9999px;
  position: relative;
  display: block;

  &,
  :hover {
    background-color: #ccc;
  }

  &[data-state='checked'] {
    background-color: #0072e7;
  }
`;

const Thumb = styled(SwitchRadix.Thumb)`
  position: absolute;
  left: 0;
  top: 4px;
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: white;
  transform: translateX(4px);
  transition: transform 100ms ease-out;
  will-change: transform;

  &[data-state='checked'] {
    transform: translateX(calc(40px - 16px - 4px));
  }
`;
