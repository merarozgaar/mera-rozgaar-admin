// @flow
import React from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import Input from '../../../components/Input/Input';
import type { FormProps } from '../../../hooks/useForm';

type LoginType = ({ ...FormProps, loading: boolean }) => React$Node;

const Login: LoginType = ({
  values: { mobile_number, otp },
  onChange,
  onSubmit,
  getErrors,
  loading,
}) => {
  return (
    <main className="d-flex align-items-center min-vh-100">
      <Container>
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card className="p-md-5">
              <Card.Body>
                <h1 className="pt-0 h3 text-primary">Sign in</h1>
                <Form onSubmit={onSubmit}>
                  <Input
                    type="tel"
                    name="mobile_number"
                    value={mobile_number}
                    placeholder="Mobile Number"
                    onChange={onChange}
                    errors={getErrors('mobile_number')}
                  />
                  <Input
                    type="otp"
                    name="otp"
                    placeholder="OTP"
                    value={otp}
                    onChange={onChange}
                    errors={getErrors('otp')}
                  />
                  <Button
                    type="submit"
                    block
                    className="rounded-0"
                    disabled={loading}>
                    {loading ? 'Loading...' : 'Continue'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Login;
