import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";
import { useUser } from "../features/authentication/useUser";

function NewUsers() {
  const { user } = useUser();
  const isDemo = user?.email === "user@demo.com";

  if (isDemo)
    return <Heading as="h1">You cannot create users in Demo Mode</Heading>;

  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
