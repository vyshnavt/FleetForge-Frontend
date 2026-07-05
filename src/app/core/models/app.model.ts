export interface getCreateBillRes {
  clientData:client[]
  billIteams:billItem[]
}

export interface client {
    id: string
    name: string
    displayName: string
    phoneNo: string
    email: string
    place: string
    businessType: string
    description: string
    status: string
    createdAt: string
    updatedAt: string
    createdById: string
    updatedById: string
}

export interface billItem {
    id: string
    itemName: string
}