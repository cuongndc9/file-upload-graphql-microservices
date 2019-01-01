import {
  describe, beforeEach, afterEach, it,
} from 'mocha';
import { expect } from 'chai';
import faker from 'faker';
import sinon from 'sinon';
import sinonTest from 'sinon-test';

import Order from 'src/models/order.model';
import OrderService from 'src/services/order.service';
import { OrderStatus } from 'src/components/constants';

const test = sinonTest(sinon, { useFakeTimers: false });

describe('OrderService', () => {
  let findOne: any;
  let findAll: any;
  let create: any;

  beforeEach(() => {
    findOne = sinon.stub(Order, 'findOne');
    findAll = sinon.stub(Order, 'findAll');
    create = sinon.stub(Order, 'create');
  });

  afterEach(() => {
    findOne.restore();
    findAll.restore();
    create.restore();
  });

  describe('getOrders', () => {
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

      findAll.returns(stubValue as any);
      const orders = await OrderService.getOrders();

      expect(findAll.called).to.be.true;
      expect(orders).to.have.members(stubValue);
    }));
  });

  describe('getOrder', () => {
    it('should get order', test(async () => {
      const stubValue = {
        id: faker.random.uuid(),
        total: faker.random.number({ min: 100, max: 9999 }),
        finalTotal: faker.random.number(100),
        status: faker.random.arrayElement([OrderStatus.InProcess, OrderStatus.Done]),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };

      findOne.returns(stubValue as any);
      const order = await OrderService.getOrder(stubValue.id);

      expect(findOne.called).to.be.true;
      expect(order).to.eql(stubValue);
    }));

    it('should not get order with invalid id', test(async () => {
      findOne.returns(null as any);
      const order = await OrderService.getOrder(faker.random.uuid());

      expect(findOne.called).to.be.true;
      expect(order).to.be.null;
    }));
  });

  describe('createOrder', () => {
    it('should create order', test(async () => {
      const stubValue = {
        id: faker.random.uuid(),
        total: faker.random.number({ min: 100, max: 9999 }),
        finalTotal: faker.random.number(100),
        status: faker.random.arrayElement([OrderStatus.InProcess, OrderStatus.Done]),
        createdAt: faker.date.past(),
        updatedAt: faker.date.past(),
      };

      create.returns(stubValue as any);
      const order = await OrderService.createOrder({
        total: stubValue.total,
        finalTotal: stubValue.finalTotal,
        status: stubValue.status,
      });

      expect(create.called).to.be.true;
      expect(order).to.be.eql(stubValue);
    }));
  });
});
