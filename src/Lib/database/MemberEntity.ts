import { BaseEntity, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, Column } from "typeorm";

@Entity("Member")
export class MemberEntity extends BaseEntity {
    @ObjectIdColumn() public _id?: ObjectID;
    @PrimaryColumn() public gid: string;
    @PrimaryColumn() public uid: string;
    @Column("economy") public economy: { bank: number, wallet: number} = { bank: 0, wallet: 0 }

    constructor(g: string, u: string) {
        super();
        this.gid = g;
        this.uid = u;
    }
}
