// src/hooks/useGasEstimation.js
import { usePrepareSendTransaction } from 'wagmi';
import { useEffect, useState } from 'react';

export function useGasEstimation({ to, value }) {
  const [gasEstimate, setGasEstimate] = useState(null);

  const { config, error, isError } = usePrepareSendTransaction({
    request: {
      to,
      value,
    },
  });

  useEffect(() => {
    if (config?.gasLimit) {
      setGasEstimate(config.gasLimit.toString());
    } else {
      setGasEstimate(null);
    }
  }, [config]);

  return { gasEstimate, error, isError };
}
