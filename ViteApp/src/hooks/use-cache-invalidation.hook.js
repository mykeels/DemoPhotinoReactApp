import { useQueryClient } from "react-query";

/**
 *
 * @param {number} ms
 * @returns {Promise<void>}
 */
const sleep = ms => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};

/**
 * will update a react-query cache entry using a transform/mapping function
 * @param {(string|string[])} queryKey
 * @param {number} timeout
 */
export const useCacheInvalidation = (queryKey, timeout = 5000) => {
  const queryClient = useQueryClient();
  return {
    /**
     *
     * @param {(cachedValue: any) => any} transformCachedValue
     */
    updateCache: (transformCachedValue = value => value) =>
      queryClient.setQueryData(queryKey, cachedValue => {
        sleep(timeout).then(() =>
          queryClient.refetchQueries(queryKey, { active: true })
        );
        return transformCachedValue(cachedValue);
      })
  };
};
