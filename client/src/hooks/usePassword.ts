import { useCallback, useMemo, useState } from 'react';

const usePassword = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const togglePassword = useCallback(() => {
    setPasswordShown(!passwordShown);
  }, [passwordShown]);

  const adornmentProps = useMemo(() => {
    return {
      style: {
        cursor: 'pointer',
      },
      onClick: togglePassword,
    };
  }, [passwordShown]);

  return { passwordShown, adornmentProps };
};

export default usePassword;
