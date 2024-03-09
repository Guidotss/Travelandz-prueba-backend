import { Category, Image, TransferDetailInfo, TransferRemark } from ".";


export interface Content {
    vehicle:                  Category;
    category:                 Category;
    images:                   Image[];
    transferDetailInfo:       TransferDetailInfo[];
    transferRemarks:          TransferRemark[];
}