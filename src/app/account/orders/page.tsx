import { getCustomerOrders } from "@/modules/account/account/actions";
import { OrdersPage } from "@/modules/account/orders/OrdersPage";

export default async function Orders() {
  const ordersData = await getCustomerOrders();

  return <OrdersPage orders={ordersData?.customer?.orders?.items} />;
}
