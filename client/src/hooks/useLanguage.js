import { useSelector } from 'react-redux';

const useLanguage = () => {
  const language = useSelector((state) => state.language.value);
  return language;
};

export default useLanguage;
