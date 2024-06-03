import { useQuery } from "@tanstack/react-query";

export const useCartQuery = () => {
  const fetchUsers = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    return res.json();
  };

  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchUsers,
  });
};
