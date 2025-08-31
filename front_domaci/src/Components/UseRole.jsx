import { useState, useEffect } from "react";

function useRole() {
    const [role, setRole] = useState(() => sessionStorage.getItem("role"));

    useEffect(() => {
        sessionStorage.setItem("role", role);
    }, [role]);

    return [role, setRole];
}

export default useRole;
