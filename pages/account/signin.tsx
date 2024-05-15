import { PageOptions } from "@graphcommerce/framer-next-pages";
import { useMergeCustomerCart } from "@graphcommerce/magento-cart";
import { AccountSignInUpForm } from "@graphcommerce/magento-customer";
import { PageMeta, StoreConfigDocument } from "@graphcommerce/magento-store";
import { useMergeGuestWishlistWithCustomer } from "@graphcommerce/magento-wishlist";
import {
  GetStaticProps,
  LayoutOverlayHeader,
  LayoutTitle,
} from "@graphcommerce/next-ui";
import { i18n } from "@lingui/core";
import { Trans } from "@lingui/react";
import { Container } from "@mui/material";
import {
  LayoutDocument,
  LayoutNavigation,
  LayoutOverlayProps,
} from "../../components";
import {
  graphqlSharedClient,
  graphqlSsrClient,
} from "../../lib/graphql/graphqlSsrClient";

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>;

function AccountSignInPage() {
  useMergeCustomerCart();
  useMergeGuestWishlistWithCustomer();

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ "Sign in")} metaRobots={["noindex"]} />
      <LayoutOverlayHeader>
        <LayoutTitle size="small" component="span">
          <Trans id="Sign in" />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth="sm">
        <AccountSignInUpForm />
      </Container>
    </>
  );
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: "account-public",
  sharedKey: () => "account-public",
  Layout: LayoutNavigation,
};
AccountSignInPage.pageOptions = pageOptions;

export default AccountSignInPage;

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale);
  const staticClient = graphqlSsrClient(locale);
  const conf = client.query({ query: StoreConfigDocument });
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: "cache-first",
  });

  return {
    props: {
      ...(await layout).data,
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: "bottom",
    },
  };
};
