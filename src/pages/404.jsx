import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
  return (
    <div className="d-flex center-layout">
      <p className="text text_type_digits-large">404</p>
      <Button htmlType="button" type="secondary" size="large" onClick={() => navigate('/','',true)}>
        Go Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
