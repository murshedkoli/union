import { useEffect } from "react";
import { host } from "../ConfigurText";

const FamilyTax = ({ familyMember }) => {
  const Data = useEffect(() => {
    const url = `${host}/familytax/${familyMember}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data.result[0];
      });
  }, [familyMember]);
  return Data;
};

export default FamilyTax;
