import { useCallback, useMemo, useState } from 'react';

const usePassword = () => {
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const togglePassword = useCallback(() => {
    setPasswordShown(!passwordShown);
  }, []);

  const adornmentProps = useMemo(() => {
    return {
      style: {
        cursor: 'pointer',
      },
      onClick: togglePassword,
    };
  }, []);
  return { passwordShown, adornmentProps };
};

export default usePassword;
