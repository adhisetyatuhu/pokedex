import { useNavigate } from "react-router-dom";
import openSound from "../assets/sound/open.wav";

const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (navigateTo) => {
    let audio = new Audio(openSound);
    audio.play();
    navigate(navigateTo);
  };

  return { navigateTo };
};

export default useNavigation;
