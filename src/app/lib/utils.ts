import { TransferState, inject, makeStateKey } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

export const useAsyncTransferState = async <T>(
    name: string,
    fn: () => T
) => {
    const state = inject(TransferState);
    const key = makeStateKey<T>(name);
    const cache = state.get(key, null);
    if (cache) {
        return cache;
    }
    const data = await fn() as T;
    state.set(key, data);
    return data;
};

export const useTransferState = <T>(
    name: string,
    fn: () => T
) => {
    const state = inject(TransferState);
    const key = makeStateKey<T>(name);
    const cache = state.get(key, null);
    if (cache) {
        return cache;
    }
    const data = fn() as T;
    state.set(key, data);
    return data;
};

export const injectResolver = <T>(name: string) =>
    inject(ActivatedRoute).data.pipe<T>(map(r => r[name]));

export const injectSnapResolver = <T>(name: string) =>
    inject(ActivatedRoute).snapshot.data[name] as T;