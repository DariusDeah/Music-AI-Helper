export interface RepositoryBase<Entity, PersistenceModel, QueryFields> {
  insert(data: PersistenceModel): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  findOneByQuery(queryFields: Partial<QueryFields>): Promise<Entity>;
  findByAllQuery(queryFields: Partial<QueryFields>): Promise<Entity[]>;
  delete(): Promise<void>;
}
