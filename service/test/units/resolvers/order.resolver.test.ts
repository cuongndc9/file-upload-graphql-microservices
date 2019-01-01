import { describe, it } from 'mocha';
import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';
import sinonTest from 'sinon-test';
import { get } from 'lodash';

import OrderService from 'src/services/order.service';
import { OrderStatus } from 'src/components/constants';
import { callGraphql } from 'test/utils';

const test = sinonTest(sinon, { useFakeTimers: false });

describe('OrderResolver', () => {
  describe('orders', () => {
    it('should get orders', test(async () => {
      const stubValue = [
        {
          id: faker.random.uuid(),
          total: faker.random.number({ min: 50, max: 9999 }),
          finalTotal: faker.random.number(50),
          status: faker.random.arrayElement([OrderStatus.InProcess, OrderStatus.Done]),
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
        },
        {
          id: faker.random.uuid(),
          total: faker.random.number({ min: 100, max: 9999 }),
          finalTotal: faker.random.number(100),
          status: faker.random.arrayElement([OrderStatus.InProcess, OrderStatus.Done]),
          createdAt: faker.date.past(),
          updatedAt: faker.date.past(),
        },
      ];

      const getOrders = sinon.stub(OrderService, 'getOrders');
      getOrders.returns(stubValue as any);

      const query = `
        {
          orders { id total finalTotal status createdAt updatedAt }
        }
      `;

      const data = await callGraphql(query);

      expect(getOrders.calledOnce).to.be.true;
      expect(get(data, 'orders')).to.be.eql(stubValue);

      getOrders.restore();
    }));
  });
});
