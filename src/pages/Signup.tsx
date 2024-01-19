import SignupForm from "../features/authentication/SignupForm";
import FormTemplate from "../ui/FormTemplate";

function Signup() {
  return (
    <FormTemplate
      heading="Register Account"
      subheading="Get your free Doot account now."
    >
      <SignupForm />
    </FormTemplate>
  );
}

export default Signup;
