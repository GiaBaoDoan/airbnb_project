import { z } from "zod";

export const registrationSchema = z.object({
  // ...
  favoriteColor: z.string().nonempty("Please select a color"),
  // ...
});
