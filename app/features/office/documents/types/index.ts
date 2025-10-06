import z from "zod";

import { schema } from "@/features/office/documents/schema";

export type FormInputData = z.infer<typeof schema>;
