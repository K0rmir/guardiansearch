import "./signin.css";

import {SignIn} from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="signInContainer">
        <SignIn path="/sign-in" />;
      </div>
    </>
  );
}
