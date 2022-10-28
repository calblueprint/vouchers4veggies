import fbApp from "./clientApp";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

const db = getFirestore(fbApp);
const testColl = collection(db, 'test-col')

export const getAllTestDocs = async () => {
    try{
        const dbQuery = query(testColl);
        const querySnapshots = await getDocs(dbQuery);
        querySnapshots.docs.map((doc) => console.log(doc.data()));
    } catch (e) {
        console.warn(e)
        throw e;
    }
}