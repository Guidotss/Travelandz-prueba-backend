export interface CancellationPolicy {
    amount:         number;
    from:           Date;
    currencyId:     string;
    isForceMajeure: boolean | null;
}