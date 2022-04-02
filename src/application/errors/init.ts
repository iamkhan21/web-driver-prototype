import { $dialogError, resetDialogError, setDialogError } from "./index";

$dialogError.reset(resetDialogError).on(setDialogError, (_, error) => error);
