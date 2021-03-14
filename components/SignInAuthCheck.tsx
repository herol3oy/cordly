import { useContext } from "react";
import { UserContext } from "../lib/context";
import { useRouter } from "next/router";

export default function AuthCheck(props) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  if (!user) {
    return props.children;
  } else {
    router.push("/");
    return <p>You must be signed out!</p>;
  }
}
