import CaptainsLog from "../../components/members/CaptainsLog";
import HeadquartersBridge from "../../components/members/HeadquartersBridge";
import { useState } from "react";

export default function Headquarters() {

  const [entered, setEntered] = useState(false);

  return (

    <>
      {!entered ? (

        <CaptainsLog
          onEnter={() => setEntered(true)}
        />

      ) : (

        <HeadquartersBridge />

      )}

    </>

  );
}
