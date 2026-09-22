import type { PageServerLoad } from '@analogjs/router';
import { getAbout } from '@lib/about';


export const load = async (_context: PageServerLoad): Promise<AboutDoc> => {
  return await getAbout();
};
