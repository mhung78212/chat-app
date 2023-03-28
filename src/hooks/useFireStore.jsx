import {
    collection,
    onSnapshot,
    query,
    where,
} from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../firebase/config";

// Collection tên bảng
// Condition câu điều kiện
const useFireStore = (collName, condition) => {
    const [documents, setDocuments] = useState([]);

    React.useEffect(() => {
        let collectionRef = query(collection(db, collName));
        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                setDocuments([]);
                return;
            }
            collectionRef = query(
                collectionRef,
                where(
                    condition.fieldName,
                    condition.operator,
                    condition.compareValue,
                ),
            );
        }
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setDocuments(documents);
        });

        return unsubscribe;
    }, [collName, condition]);

    return documents;
};

export default useFireStore;
