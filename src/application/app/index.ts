import { createDomain, createEvent } from "effector";
import { DialogError } from "@application/app/types";

export const app = createDomain();

export const initApp = createEvent();

export const $dialogError = app.createStore<DialogError | null>(null);
export const setDialogError = app.createEvent<DialogError>();
export const resetDialogError = app.createEvent<void>();
