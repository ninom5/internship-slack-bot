import { Searcher } from "fast-fuzzy";
import { MAX_ITEMS, MIN_SCORE } from "./config.js";

export const likelyMatches = (text, items) => {
  console.log(text, items);
  const searcher = new Searcher(items);
  const results = searcher.search(text, {
    threshold: MIN_SCORE,
    limit: MAX_ITEMS,
    returnMatchData: true,
  });

  console.log(results);
  
  return results;
};
