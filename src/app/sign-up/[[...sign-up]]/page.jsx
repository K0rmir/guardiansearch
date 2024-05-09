import {SignUp} from "@clerk/nextjs";
import "./signup.css";

export default function Page() {
  return (
    <>
      <div className="signUpContainer">
        <SignUp path="/sign-up" />
      </div>
    </>
  );
}
