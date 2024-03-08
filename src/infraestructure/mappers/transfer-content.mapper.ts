
import { Image } from "./image-transfer.mapper";
import { Category } from "./transfer-category.mapper";
import { TransferDetailInfo } from "./transfer-details-info.mapper";
import { TransferRemark } from "./transfer-remark-mapper";

export interface Content {
    vehicle:                  Category;
    category:                 Category;
    images:                   Image[];
    transferDetailInfo:       TransferDetailInfo[];
    transferRemarks:          TransferRemark[];
}