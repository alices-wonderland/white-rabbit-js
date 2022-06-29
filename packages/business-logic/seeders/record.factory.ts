import { Factory, Faker } from "@mikro-orm/seeder";
import { Constructor, EntityData } from "@mikro-orm/core";
import { RecordEntity, RecordTypeValue } from "../src/record";

export default class RecordFactory extends Factory<RecordEntity> {
  protected definition(faker: Faker): EntityData<RecordEntity> {
    return {
      name: faker.finance.transactionDescription(),
      description: faker.lorem.sentence(),
      timestamp: faker.date.between("2020-01-01", "2020-12-31"),
      type: RecordTypeValue.RECORD,
      tags: faker.helpers.uniqueArray(faker.commerce.product, 5),
    };
  }

  readonly model: Constructor<RecordEntity> = RecordEntity;
}