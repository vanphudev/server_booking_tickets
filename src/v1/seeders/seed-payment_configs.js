"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      // Lấy payment_method_id từ bảng payment_methods
      const paymentMethods = await queryInterface.sequelize.query(
         `SELECT payment_method_id FROM payment_methods LIMIT 30;`
      );
      const methodRows = paymentMethods[0];

      return queryInterface.bulkInsert(
         "payment_configs",
         [
            // VNPay
            {
                api_key: process.env.VNPAY_API_KEY || "VNPAY_TEST_API_KEY",
                secret_key: process.env.VNPAY_SECRET_KEY || "VNPAY_TEST_SECRET_KEY",
                public_key: process.env.VNPAY_PUBLIC_KEY || "VNPAY_TEST_PUBLIC_KEY",
                payment_endpoint_url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
                transaction_timeout: 15,
                environment: "production",
                is_deleted: 0,
                payment_method_id: methodRows[0].payment_method_id
            },
            // Momo
            {
                api_key: process.env.MOMO_API_KEY || "MOMO_TEST_API_KEY",
                secret_key: process.env.MOMO_SECRET_KEY || "MOMO_TEST_SECRET_KEY",
                public_key: process.env.MOMO_PUBLIC_KEY || "MOMO_TEST_PUBLIC_KEY",
                payment_endpoint_url: "https://test-payment.momo.vn/v2/gateway/api/create",
                transaction_timeout: 20,
                environment: "develop",
                is_deleted: 0,
                payment_method_id: methodRows[1].payment_method_id
            },
            // ZaloPay
            {
                api_key: process.env.ZALOPAY_API_KEY || "ZALOPAY_TEST_API_KEY",
                secret_key: process.env.ZALOPAY_SECRET_KEY || "ZALOPAY_TEST_SECRET_KEY",
                public_key: process.env.ZALOPAY_PUBLIC_KEY || "ZALOPAY_TEST_PUBLIC_KEY",
                payment_endpoint_url: "https://sandbox.zalopay.com.vn/v2/create",
                transaction_timeout: 15,
                environment: "production",
                is_deleted: 0,
                payment_method_id: methodRows[2].payment_method_id
            },
            // PayPal
            {
                api_key: process.env.PAYPAL_API_KEY || "PAYPAL_TEST_API_KEY",
                secret_key: process.env.PAYPAL_SECRET_KEY || "PAYPAL_TEST_SECRET_KEY",
                public_key: process.env.PAYPAL_PUBLIC_KEY || "PAYPAL_TEST_PUBLIC_KEY",
                payment_endpoint_url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
                transaction_timeout: 30,
                environment: "develop",
                is_deleted: 0,
                payment_method_id: methodRows[3].payment_method_id
            },
            // Stripe
            {
                api_key: process.env.STRIPE_API_KEY || "STRIPE_TEST_API_KEY",
                secret_key: process.env.STRIPE_SECRET_KEY || "STRIPE_TEST_SECRET_KEY",
                public_key: process.env.STRIPE_PUBLIC_KEY || "STRIPE_TEST_PUBLIC_KEY",
                payment_endpoint_url: "https://api.stripe.com/v1/payment_intents",
                transaction_timeout: 25,
                environment: "production",
                is_deleted: 0,
                payment_method_id: methodRows[4].payment_method_id
            }
         ],
         {}
      );
   },

   down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("payment_configs", null, {});
   },
};