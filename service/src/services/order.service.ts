import Order from '../models/order.model';
import { OrderStatus } from '../components/constants';
import { ServiceValidationError } from '../components/errors';

class OrderService {
  static getOrders() {
    return Order.findAll();
  }

  static getOrder(id: string) {
    return Order.findOne({
      where: {
        id,
      },
    });
  }

  static createOrder({ total, finalTotal, status }: { total: number; finalTotal: number; status: OrderStatus }) {
    const limitedTotal = 113;
    if (finalTotal > limitedTotal) {
      throw new ServiceValidationError(
        '"finalTotal" must be less than "limitedTotal"',
        'order.lessOrEqual',
        {
          finalTotal,
          limitedTotal,
        }
      );
    }
    return Order.create({
      total,
      finalTotal,
      status,
    });
  }
}

export default OrderService;
