import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { ContentUpsertReq } from '@/dtos/content-upsert-req.dto';
import { RealmReq } from '@/dtos/realm-req.dto';
import { RealmsUpsertReq } from '@/dtos/realms-upsert.dto.req';
import { prepareBulkWriteContents } from '@/helpers/prepare-bulk-write-contents.helper';
import { prepareBulkWriteDeleteContents } from '@/helpers/prepare-bulk-write-delete-contents.helper';
import { prepareBulkWriteDeleteRealms } from '@/helpers/prepare-bulk-write-delete-realms.helper';
import { prepareBulkWriteRealms } from '@/helpers/prepare-bulk-write-realms.helper';
import { FILTER } from '@/models/filter.model';
import { RealmContentsDocument, RealmContentsSchemaDefinition } from '@/schemas/realm-content-definition.schema';
import { RealmsDocument, RealmsSchemaDefinition } from '@/schemas/realms-schema-definition.schema';

@Injectable()
export class RealmRepository {
  constructor(
    @InjectModel(RealmContentsSchemaDefinition.name)
    private readonly contentModel: Model<RealmContentsDocument>,
    @InjectModel(RealmsSchemaDefinition.name)
    private readonly realmModel: Model<RealmsDocument>,
  ) {}

  async findAll() {
    return this.contentModel.find().sort({ realm: 'asc', updatedAt: 'asc' }).lean();
  }

  async countContents() {
    return this.contentModel.estimatedDocumentCount({ lean: true });
  }

  async countRealms() {
    return this.realmModel.estimatedDocumentCount({ lean: true });
  }

  async getMetaRealmsBySchemas(realms: Array<string>, propertiesToSelect: Array<string>) {
    return this.contentModel
      .find()
      .where({ realm: { $in: realms } })
      .select(propertiesToSelect)
      .sort({ updatedAt: 'descending' })
      .lean();
  }

  async find(filter: FILTER, propertiesToSelect?: Array<string>) {
    const { skip, take, search, verbose } = filter;
    const selectProperties = verbose ? propertiesToSelect.concat(['value']) : propertiesToSelect;

    if (search) {
      return this.contentModel
        .find(null, null, { limit: take, skip })
        .where({
          $or: [
            { realm: { $regex: `.*${search}.*`, $options: 'i' } },
            { value: { $regex: `.*${search}.*`, $options: 'i' } },
            { id: { $regex: `.*${search}.*`, $options: 'i' } },
          ],
        })
        .select(selectProperties)
        .sort({ updatedAt: 'descending' })
        .lean();
    }

    const realms = (
      await this.realmModel.find(null, null, { limit: take, skip }).sort({ updatedAt: 'descending' }).lean()
    ).map(({ realm }) => realm);

    return this.contentModel
      .where({ realm: { $in: realms } })
      .select(selectProperties)
      .sort({ updatedAt: 'descending' })
      .lean();
  }

  async where(filter: FilterQuery<RealmReq>) {
    return this.contentModel.where(filter);
  }

  async upsertMany(reqs: RealmsUpsertReq[]) {
    const realms = prepareBulkWriteRealms(reqs.map(({ realm }) => realm));
    await this.realmModel.bulkWrite(realms);
    const preparedUpserts = reqs.map((req) => prepareBulkWriteContents(req.contents, req.realm)).flat();
    return this.contentModel.bulkWrite(preparedUpserts);
  }

  async upsert(realm: string, req: ContentUpsertReq[]) {
    const realms = prepareBulkWriteRealms([realm]);
    await this.realmModel.bulkWrite(realms);
    const rowsToUpsert = prepareBulkWriteContents(req, realm);
    return this.contentModel.bulkWrite(rowsToUpsert);
  }

  async delete(realm: string, req?: string[]) {
    const rowsToDelete = prepareBulkWriteDeleteContents(realm, req);
    const rowsDeleted = await this.contentModel.bulkWrite(rowsToDelete);
    const isNotEmpty = Boolean(await this.contentModel.estimatedDocumentCount().where({ realm }));

    if (!isNotEmpty) {
      const realms = prepareBulkWriteDeleteRealms([realm]);
      await this.realmModel.bulkWrite(realms);
    }

    return rowsDeleted;
  }
}
