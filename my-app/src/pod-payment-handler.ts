import { PaymentMethodHandler, LanguageCode } from '@vendure/core';

export const podPaymentMethodHandler = new PaymentMethodHandler({
 code: 'pod',
 description: [{ languageCode: LanguageCode.en, value: 'Pay on Delivery' }],
 args: {},
 createPayment: async (ctx, order, amount, args, metadata) => {
    // Here you can implement any logic needed to handle the payment.
    // For a simple POD implementation, you might not need to do anything here.
    return {
      amount,
      state: 'Settled', // Assuming the payment is settled immediately upon order placement
      transactionId: 'pod-' + order.code, // Generate a unique transaction ID
      metadata,
    };
 },
 settlePayment: async (ctx, order, payment, args) => {
    // Implement any logic needed to settle the payment.
    // For POD, this might involve confirming the order has been delivered.
    return {
      success: true,
      metadata: {
        ...payment.metadata,
        settled: true,
      },
    };
 },
});
