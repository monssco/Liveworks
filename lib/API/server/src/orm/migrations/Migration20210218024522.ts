import { Migration } from '@mikro-orm/migrations';

export class Migration20210218024522 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" varchar(255) not null, "email" varchar(255) not null, "first_name" varchar(255) null, "last_name" varchar(255) null, "date_of_birth" date null, "city" varchar(255) null, "province" varchar(255) null, "country" varchar(255) null, "stripe_customer_id" varchar(255) null, "stripe_account_id" varchar(255) null, "created" timestamptz not null, "modified" timestamptz not null, "status" boolean not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');

    this.addSql('create table "listing" ("id" varchar(255) not null, "email" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "city" varchar(255) not null, "jake" varchar(255) not null, "country" varchar(255) not null, "stripe_customer" varchar(255) not null, "stripe_account" varchar(255) not null);');
    this.addSql('alter table "listing" add constraint "listing_pkey" primary key ("id");');

    this.addSql('create table "profile_image" ("original_key" varchar(255) not null, "user_id" varchar(255) not null, "resized_medium" varchar(255) not null, "resized_small" varchar(255) not null, "resized_large" varchar(255) not null);');
    this.addSql('alter table "profile_image" add constraint "profile_image_pkey" primary key ("original_key");');
    this.addSql('alter table "profile_image" add constraint "profile_image_user_id_unique" unique ("user_id");');

    this.addSql('alter table "profile_image" add constraint "profile_image_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
