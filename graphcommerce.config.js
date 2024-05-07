// @ts-check

/**
 * Docs: https://graphcommerce.org/docs/framework/config
 *
 * @type {import('@graphcommerce/next-config/src/generated/config').GraphCommerceConfig}
 */
const config = {
  hygraphEndpoint: 'https://eu-west-2.cdn.hygraph.com/content/clvqopwih000008la2q1gdtjc/master',
  magentoEndpoint: 'https://mobelringen2-oazgdgy-bgqwzy7ueagk4.eu-3.magentosite.cloud/graphql',
  // magentoEndpoint: 'https:/mcstaging.mobelringen.no/graphql',
  canonicalBaseUrl: 'https://mobelringen2-oazgdgy-bgqwzy7ueagk4.eu-3.magentosite.cloud',
  storefront: [
    { locale: 'no', magentoStoreCode: 'mobelringen', defaultLocale: true },
    { locale: 'nl', magentoStoreCode: 'nl_NL' },
  ],
  recentlyViewedProducts: {
    enabled: true,
  },
  configurableVariantValues: {
    url: true,
    gallery: true,
    content: true,
  },
}

module.exports = config
