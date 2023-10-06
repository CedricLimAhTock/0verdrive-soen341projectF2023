import "./SigninCard.css";
import "@fontsource/inter";
const SigninCard = () => {
  return (
    <div className = "signin-card-container"> 
      <div className = "logo">Lorem Ipsum</div>
      <div className="signin-card">
        <h1>Sign In</h1>
        <div className="fields">
          <div className="user">
            <input type="text" placeholder="U S E R N A M E" />
          </div>
          <div className="pass">
            <input type="text" placeholder="P A S S W O R D" />
          </div>
        </div>
        <div className="signinButton">
          <button>Sign in</button>
        </div>
      </div>
    </div>
  );
};

export default SigninCard;
