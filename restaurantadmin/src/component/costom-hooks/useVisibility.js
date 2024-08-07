import { useState } from "react";

const useVisibility = () => {
  const [isVisible, updateVisibility] = useState(false);

  return [
    isVisible,
    () => updateVisibility(true),
    () => updateVisibility(false),
  ];
};

export default useVisibility;
