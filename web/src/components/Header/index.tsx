import { Container, Content } from './styles';

export function Header() {
  return (
    <Container>
      <Content>
        <div className="page-details">
          <h1>Orders</h1>
          <h2>Keep track of customer orders</h2>
        </div>

        {/* <img src={logo} alt="WaiterApp Logo" /> */}
      </Content>
    </Container>
  );
}

