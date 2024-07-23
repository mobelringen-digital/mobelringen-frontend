import { useCookies } from "react-cookie";

export const useSession = () => {
  const [cookies] = useCookies<"token", { token?: string }>(["token"]);

  return {
    token: cookies.token,
  };
};
