export interface IRepository<T, LT, ID> {
    create(body: T): Promise<T | null>;
    readByID(id: ID): Promise<T | undefined>;
    readByOne(body: LT): Promise<LT | undefined>;
    update(id: ID, body: T): Promise<T | null>;
    delete(id: ID): Promise<boolean>;
}