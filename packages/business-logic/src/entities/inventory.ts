// eslint-disable-next-line max-classes-per-file
import { Cascade, Collection, Entity, Enum, OneToMany, OneToOne, Property, QueryOrder } from '@mikro-orm/core';
import { InventoryRecord, InventoryRecordCreateOptions } from './invertory-record';
import { Account } from './account';
import AbstractEntity from './abstract-entity';

export type BookingOperation = 'AVERAGE' | 'FIFO';

@Entity({
  discriminatorColumn: 'type',
  abstract: true,
})
export abstract class Inventory extends AbstractEntity<Inventory> {
  @Enum()
  readonly type: BookingOperation;

  @OneToOne(() => Account)
  readonly account: Account;

  protected constructor(account: Account) {
    super();
    this.account = account;
  }
}

@Entity({ discriminatorValue: 'AVERAGE' })
export class InventoryAverage extends Inventory {
  override readonly type: BookingOperation = 'AVERAGE';

  @Property()
  readonly amount: number;

  @Property({ nullable: true })
  readonly buyingUnit?: string;

  @Property({ nullable: true })
  readonly buyingPrice?: number;

  constructor({ account, amount, buyingUnit, buyingPrice }: Omit<InventoryAverageCreateOptions, 'type'>) {
    super(account);
    this.amount = amount;
    this.buyingUnit = buyingUnit;
    this.buyingPrice = buyingPrice;
  }
}

@Entity({ discriminatorValue: 'FIFO' })
export class InventoryFIFO extends Inventory {
  override readonly type: BookingOperation = 'FIFO';

  @OneToMany(() => InventoryRecord, (record) => record.inventory, {
    cascade: [Cascade.ALL],
    orphanRemoval: true,
    orderBy: { timestamp: QueryOrder.ASC },
  })
  readonly values: Collection<InventoryRecord>;

  constructor({ account, values }: Omit<InventoryFIFOCreateOptions, 'type'>) {
    super(account);
    this.values = new Collection<InventoryRecord>(
      this,
      values?.map(
        (v) =>
          new InventoryRecord({
            ...v,
            inventory: this,
          }),
      ),
    );
  }
}

type InventoryAverageCreateOptions = {
  type: 'AVERAGE';
  account: Account;
  amount: number;
  buyingUnit?: string;
  buyingPrice?: number;
};

type InventoryFIFOCreateOptions = {
  type: 'FIFO';
  account: Account;
  values?: Omit<InventoryRecordCreateOptions, 'inventory'>[];
};

export type InventoryCreateOptions = InventoryAverageCreateOptions | InventoryFIFOCreateOptions;