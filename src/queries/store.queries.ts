import { graphql } from "@/types/schema";

export const StoreConsentFragment = graphql(`
  fragment StoreConsent on ConfigConsent {
    code
    is_required
    label
  }
`);

export const StoreConfigDocument = graphql(`
  query StoreConfig {
    storeConfig {
      brands_category
      category_url_suffix
      consents {
        ...StoreConsent
      }
      copyright
      returns_enabled
      absolute_footer
      allow_gift_receipt
      allow_gift_wrapping_on_order
      allow_gift_wrapping_on_order_items
      allow_guests_to_write_product_reviews
      allow_items
      allow_order
      allow_printed_card
      autocomplete_on_storefront
      base_currency_code
      base_link_url
      base_media_url
      base_static_url
      base_url
      braintree_cc_vault_active
      cart_gift_wrapping
      cart_printed_card
      catalog_default_sort_by
      category_fixed_product_tax_display_setting
      check_money_order_enable_for_specific_countries
      check_money_order_enabled
      check_money_order_make_check_payable_to
      check_money_order_max_order_total
      check_money_order_min_order_total
      check_money_order_new_order_status
      check_money_order_payment_from_specific_countries
      check_money_order_send_check_to
      check_money_order_sort_order
      check_money_order_title
      cms_home_page
      cms_no_cookies
      cms_no_route
      code
      configurable_thumbnail_source
      default_description
      default_display_currency_code
      default_title
      default_keywords
      demonotice
      enable_multiple_wishlists
      front
      grid_per_page
      grid_per_page_values
      head_includes
      head_shortcut_icon
      header_logo_src
      id
      is_default_store
      is_default_store_group
      list_mode
      list_per_page
      list_per_page_values
      locale
      logo_alt
      logo_height
      logo_width
      magento_reward_general_is_enabled
      magento_reward_general_is_enabled_on_front
      magento_reward_general_min_points_balance
      magento_reward_general_publish_history
      magento_reward_points_invitation_customer
      magento_reward_points_invitation_customer_limit
      magento_reward_points_invitation_order
      magento_reward_points_invitation_order_limit
      magento_reward_points_newsletter
      magento_reward_points_order
      magento_reward_points_register
      magento_reward_points_review
      magento_reward_points_review_limit
      magento_wishlist_general_is_enabled
      maximum_number_of_wishlists
      minimum_password_length
      no_route
      payment_payflowpro_cc_vault_active
      printed_card_price
      product_fixed_product_tax_display_setting
      product_reviews_enabled
      product_url_suffix
      required_character_classes_number
      root_category_id
      root_category_uid
      sales_fixed_product_tax_display_setting
      sales_gift_wrapping
      sales_printed_card
      secure_base_link_url
      secure_base_media_url
      secure_base_static_url
      secure_base_url
      send_friend {
        enabled_for_customers
        enabled_for_guests
      }
      show_cms_breadcrumbs
      store_code
      store_group_code
      store_group_name
      store_name
      store_sort_order
      timezone
      title_prefix
      title_separator
      title_suffix
      use_store_in_url
      website_code
      website_id
      website_name
      weight_unit
      welcome
      zero_subtotal_enable_for_specific_countries
      zero_subtotal_enabled
      zero_subtotal_new_order_status
      zero_subtotal_payment_action
      zero_subtotal_payment_from_specific_countries
      zero_subtotal_sort_order
      zero_subtotal_title
    }
  }
`);
