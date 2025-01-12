declare type AnyFunction = (...args: unknown[]) => unknown;
declare type StringIndexedObject<T> = {
    [key: string]: T;
};

declare type HorizontalDirection = 'left' | 'right';
declare type Orientation = 'horizontal' | 'vertical';