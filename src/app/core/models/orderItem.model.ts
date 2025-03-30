// public string Name { get; set; } = string.Empty;
// public int ProductId { get; set; }
// public decimal UnitPrice { get; set; }
// public int Qty { get; set; }

export interface orderItem{
    name: string;
    productId : number;
    unitPrice : number;
    qty: number;
    productImg: string;
}