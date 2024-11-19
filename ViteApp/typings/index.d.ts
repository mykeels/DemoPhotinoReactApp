type AnyOf<A extends object, B extends object> = A | B | (A & B);

type OneOf<TValues, TValueType = string> = TValues | (TValueType & { invalid?: never });