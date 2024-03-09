export interface CancellationPolicy {
    amount:         number;
    from:           string;
    currencyId:     string;
    isForceMajeure: boolean | null;
}