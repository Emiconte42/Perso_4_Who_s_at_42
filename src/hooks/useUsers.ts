import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase";
import type { User } from "../types/User";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = collection(db, "users");

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => doc.data() as User
      );

      setUsers(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    users,
    loading,
  };
}