import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '../components/Button';

export default {
  title: 'COMPONENTS/Button',
  component: Button,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'danger', 'warning'],
      control: { type: 'select' },
    },
  },
};

const Template = args => <Button {...args}>{args.label}</Button>;

//👇 Each story then reuses that template
export const Basic = Template.bind({});
Basic.args = {
  color: 'primary',
  label: 'Button',
  onClick: () => console.log('You clicked on the primary button!'),
};
