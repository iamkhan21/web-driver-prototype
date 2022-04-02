import { app } from "@application/app";
import { DialogError } from "./types";

export const $dialogError = app.createStore<DialogError | null>(null);
export const setDialogError = app.createEvent<DialogError>();
export const resetDialogError = app.createEvent<void>();
