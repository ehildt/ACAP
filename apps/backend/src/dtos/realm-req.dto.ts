import { ApiProperty } from "@nestjs/swagger";

export class RealmReq {
  @ApiProperty()
  realm: string;

  @ApiProperty()
  id: string;
}
